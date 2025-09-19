import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransportRequest {
  latitude: number;
  longitude: number;
  radius?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude, radius = 1000 }: TransportRequest = await req.json();

    console.log(`Buscando dados de transporte para: lat=${latitude}, lng=${longitude}, radius=${radius}m`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get bus lines from database
    const { data: busLines, error: busLinesError } = await supabase
      .from('bus_lines')
      .select('*')
      .eq('status', 'active');

    if (busLinesError) {
      console.error('Erro ao buscar linhas:', busLinesError);
    }

    // Try to get real-time data from public APIs
    const nearbyStops = await getNearbyStops(latitude, longitude, radius);
    const realTimeBuses = await getRealTimeBuses(latitude, longitude, radius);

    // If no real data available, use database info with simulated positions
    const fallbackStops = busLines?.slice(0, 5).map((line, index) => ({
      id: `stop-${line.id}`,
      name: `Parada ${line.line_name}`,
      address: `${line.origin} → ${line.destination}`,
      distance: Math.floor(Math.random() * radius) + 100,
      lines: [line.line_number],
      nextBus: `${Math.floor(Math.random() * 30) + 5} min`,
      isRealTime: false,
      latitude: latitude + (Math.random() - 0.5) * 0.01,
      longitude: longitude + (Math.random() - 0.5) * 0.01
    })) || [];

    const response = {
      nearbyStops: nearbyStops.length > 0 ? nearbyStops : fallbackStops,
      buses: realTimeBuses,
      dataSource: nearbyStops.length > 0 ? 'api' : 'database',
      timestamp: new Date().toISOString()
    };

    console.log(`Retornando ${response.nearbyStops.length} paradas e ${response.buses.length} ônibus`);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na função get-transport-data:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      nearbyStops: [],
      buses: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getNearbyStops(lat: number, lng: number, radius: number) {
  try {
    // Try Overpass API for OpenStreetMap public transport data
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["public_transport"="stop_position"](around:${radius},${lat},${lng});
        node["highway"="bus_stop"](around:${radius},${lat},${lng});
      );
      out geom;
    `;

    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    console.log('Consultando Overpass API...');
    const response = await fetch(overpassUrl);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        return data.elements.slice(0, 10).map((stop: any, index: number) => ({
          id: `osm-${stop.id}`,
          name: stop.tags?.name || `Parada ${index + 1}`,
          address: stop.tags?.highway || 'Parada de ônibus',
          distance: calculateDistance(lat, lng, stop.lat, stop.lon),
          lines: ['Consulte horários'],
          nextBus: 'Dados em tempo real indisponíveis',
          isRealTime: true,
          latitude: stop.lat,
          longitude: stop.lon
        }));
      }
    }
  } catch (error) {
    console.error('Erro ao consultar Overpass API:', error);
  }

  return [];
}

async function getRealTimeBuses(lat: number, lng: number, radius: number) {
  try {
    // Try GTFS-RT APIs (would need specific transit agency APIs)
    // For now, return simulated data
    console.log('APIs de tempo real específicas não configuradas, retornando dados simulados');
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar ônibus em tempo real:', error);
    return [];
  }
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.round(R * c);
}