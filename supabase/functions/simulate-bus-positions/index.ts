import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Simulando atualização de posições dos ônibus...');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all active bus positions
    const { data: busPositions, error: fetchError } = await supabase
      .from('bus_positions')
      .select('*')
      .eq('status', 'in_service');

    if (fetchError) {
      console.error('Erro ao buscar posições:', fetchError);
      throw fetchError;
    }

    console.log(`Atualizando ${busPositions?.length || 0} posições de ônibus`);

    // Update each bus position with simulated movement
    const updates = busPositions?.map(async (bus) => {
      // Simulate small random movement (within ~100m)
      const latOffset = (Math.random() - 0.5) * 0.001; // ~100m
      const lngOffset = (Math.random() - 0.5) * 0.001; // ~100m
      
      // Keep within reasonable bounds around Belo Horizonte
      const newLat = Math.max(-20.0, Math.min(-19.8, bus.latitude + latOffset));
      const newLng = Math.max(-44.1, Math.min(-43.8, bus.longitude + lngOffset));

      // Simulate speed changes
      const newSpeed = Math.max(0, Math.min(80, bus.speed_kmh + (Math.random() - 0.5) * 10));
      
      // Randomly change occupancy
      const occupancyLevels = ['low', 'medium', 'high', 'full'];
      const newOccupancy = Math.random() < 0.1 ? 
        occupancyLevels[Math.floor(Math.random() * occupancyLevels.length)] : 
        bus.occupancy_level;

      // Simulate occasional delays
      const newDelay = Math.random() < 0.05 ? Math.floor(Math.random() * 15) : bus.delay_minutes;

      return supabase
        .from('bus_positions')
        .update({
          latitude: newLat,
          longitude: newLng,
          speed_kmh: Math.floor(newSpeed),
          occupancy_level: newOccupancy,
          delay_minutes: newDelay,
          last_updated: new Date().toISOString()
        })
        .eq('id', bus.id);
    }) || [];

    // Execute all updates
    const results = await Promise.all(updates);
    const successCount = results.filter(result => !result.error).length;
    const errorCount = results.filter(result => result.error).length;

    console.log(`Atualizações concluídas: ${successCount} sucessos, ${errorCount} erros`);

    // Occasionally add some alerts
    if (Math.random() < 0.1) {
      const alertTypes = [
        {
          title: 'Trânsito Intenso',
          message: 'Congestionamento na Av. Principal causando atrasos de até 10 minutos.',
          severity: 'warning',
          alert_type: 'delay'
        },
        {
          title: 'Manutenção Programada',
          message: 'Manutenção na linha 5180 prevista para este fim de semana.',
          severity: 'info',
          alert_type: 'maintenance'
        },
        {
          title: 'Desvio de Rota',
          message: 'Linha 5293 com desvio temporário devido a obras na via.',
          severity: 'warning',
          alert_type: 'route_change'
        }
      ];

      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      // Get a random bus line
      const { data: randomLine } = await supabase
        .from('bus_lines')
        .select('id')
        .eq('status', 'active')
        .limit(1);

      if (randomLine && randomLine.length > 0) {
        await supabase
          .from('bus_alerts')
          .insert({
            line_id: randomLine[0].id,
            ...randomAlert,
            ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
          });
        
        console.log('Novo alerta criado:', randomAlert.title);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Atualizadas ${successCount} posições de ônibus`,
      timestamp: new Date().toISOString(),
      totalUpdated: successCount,
      errors: errorCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na simulação de posições:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
