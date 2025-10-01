import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BusDataItem {
  url: string;
  linha: string;
  horarios: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get bus data from request body or use default endpoint
    const { forceReimport } = await req.json().catch(() => ({ forceReimport: false }));
    
    // For now, we'll need to pass the data in the request
    // In production, you'd fetch from your data source
    const response = await fetch('https://ztrmokiqwxzindrhjcbq.supabase.co/storage/v1/object/public/bus-data/complete-bus-data-new.json').catch(() => null);
    
    if (!response || !response.ok) {
      throw new Error('Could not fetch bus data. Please ensure the data file is uploaded to Supabase Storage.');
    }
    
    const busData: BusDataItem[] = await response.json();

    console.log(`Processing ${busData.length} bus lines`);

    let importedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    for (const item of busData) {
      try {
        // Skip invalid entries
        if (!item.linha || item.linha === 'LinhasMunicipais' || !item.horarios || item.horarios.length === 0) {
          skippedCount++;
          continue;
        }

        // Extract line number and name
        const lineMatch = item.linha.match(/^(\d+[A-Z]?)\s+(.+?)\s*(?:–|\/|–)/);
        if (!lineMatch) {
          console.warn(`Could not parse line: ${item.linha}`);
          skippedCount++;
          continue;
        }

        const lineNumber = lineMatch[1];
        const lineName = lineMatch[2].trim();

        // Extract origin and destination from the route
        const routeParts = lineName.split(' / ');
        const origin = routeParts[0]?.trim() || lineName;
        const destination = routeParts[1]?.trim() || routeParts[0]?.trim();

        // Determine route type
        let routeType = 'convencional';
        if (lineName.toLowerCase().includes('circular')) {
          routeType = 'circular';
        } else if (lineName.toLowerCase().includes('express') || lineName.toLowerCase().includes('diret')) {
          routeType = 'express';
        } else if (lineNumber.startsWith('5')) {
          routeType = 'metropolitana';
        }

        // Check if line already exists
        const { data: existingLine } = await supabaseClient
          .from('bus_lines')
          .select('id')
          .eq('line_number', lineNumber)
          .single();

        let lineId: string;

        if (existingLine) {
          // Update existing line
          const { data: updatedLine, error: updateError } = await supabaseClient
            .from('bus_lines')
            .update({
              line_name: lineName,
              origin,
              destination,
              route_type: routeType,
              scraped_url: item.url,
              status: 'active',
              updated_at: new Date().toISOString()
            })
            .eq('id', existingLine.id)
            .select()
            .single();

          if (updateError) throw updateError;
          lineId = existingLine.id;

          // Delete existing schedules for this line
          await supabaseClient
            .from('bus_schedules')
            .delete()
            .eq('line_id', lineId);
        } else {
          // Insert new line
          const { data: newLine, error: insertError } = await supabaseClient
            .from('bus_lines')
            .insert({
              line_number: lineNumber,
              line_name: lineName,
              origin,
              destination,
              route_type: routeType,
              scraped_url: item.url,
              status: 'active'
            })
            .select()
            .single();

          if (insertError) throw insertError;
          lineId = newLine.id;
        }

        // Insert schedules (assuming these are weekday schedules for now)
        const schedules = item.horarios.map((time, index) => ({
          line_id: lineId,
          departure_time: time,
          day_type: 'weekday',
          direction: 'ida',
          stop_order: index
        }));

        const { error: scheduleError } = await supabaseClient
          .from('bus_schedules')
          .insert(schedules);

        if (scheduleError) throw scheduleError;

        importedCount++;
        
        if (importedCount % 10 === 0) {
          console.log(`Imported ${importedCount} lines...`);
        }
      } catch (error) {
        errors.push(`Error processing line ${item.linha}: ${error.message}`);
        console.error(`Error processing line ${item.linha}:`, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Import completed`,
        stats: {
          total: busData.length,
          imported: importedCount,
          skipped: skippedCount,
          errors: errors.length
        },
        errors: errors.slice(0, 10) // Return first 10 errors only
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
