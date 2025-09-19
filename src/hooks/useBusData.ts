import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BusLine } from '@/types/bus';

export const useBusData = () => {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBusLines = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get bus lines from Supabase
      const { data: lines, error: linesError } = await supabase
        .from('bus_lines')
        .select('*')
        .eq('status', 'active')
        .order('line_number');

      if (linesError) throw linesError;

      // Get schedules
      const { data: schedules, error: schedulesError } = await supabase
        .from('bus_schedules')
        .select('*')
        .order('departure_time');

      if (schedulesError) throw schedulesError;

      // Transform Supabase data to BusLine format
      const transformedLines: BusLine[] = (lines || []).map(line => {
        const lineSchedules = schedules?.filter(s => s.line_id === line.id) || [];
        
        // Group schedules by day type
        const weekdaySchedules = lineSchedules
          .filter(s => s.day_type === 'weekday')
          .map(s => s.departure_time);
        
        const saturdaySchedules = lineSchedules
          .filter(s => s.day_type === 'saturday')
          .map(s => s.departure_time);
        
        const sundaySchedules = lineSchedules
          .filter(s => s.day_type === 'sunday')
          .map(s => s.departure_time);

        // Generate stops from database data
        const stops = [
          {
            id: `${line.id}-origin`,
            name: line.origin || 'Terminal de Origem',
            address: line.origin || 'Endereço não especificado'
          },
          {
            id: `${line.id}-destination`,
            name: line.destination || 'Terminal de Destino', 
            address: line.destination || 'Endereço não especificado'
          }
        ];

        // Calculate frequency
        let frequency = 'Consulte horários';
        if (weekdaySchedules.length > 1) {
          const intervals: number[] = [];
          for (let i = 1; i < Math.min(weekdaySchedules.length, 5); i++) {
            const prev = weekdaySchedules[i-1].split(':').map(Number);
            const curr = weekdaySchedules[i].split(':').map(Number);
            const prevMinutes = prev[0] * 60 + prev[1];
            const currMinutes = curr[0] * 60 + curr[1];
            
            if (currMinutes > prevMinutes) {
              intervals.push(currMinutes - prevMinutes);
            }
          }
          
          if (intervals.length > 0) {
            const avgInterval = Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length);
            if (avgInterval <= 15) frequency = 'A cada 15 min';
            else if (avgInterval <= 30) frequency = 'A cada 30 min';
            else if (avgInterval <= 60) frequency = 'A cada 1h';
            else frequency = 'Acima de 1h';
          }
        }

        return {
          id: line.id,
          name: line.line_name,
          number: line.line_number,
          color: line.route_type === 'express' ? '#dc2626' : 
                 line.route_type === 'circular' ? '#7c3aed' : '#2563eb',
          route: `${line.origin} → ${line.destination}`,
          frequency,
          firstDeparture: weekdaySchedules[0] || '05:00',
          lastDeparture: weekdaySchedules[weekdaySchedules.length - 1] || '22:00',
          weekdaySchedule: weekdaySchedules,
          saturdaySchedule: saturdaySchedules,
          sundaySchedule: sundaySchedules,
          stops,
          category: line.route_type || 'convencional'
        };
      });

      setBusLines(transformedLines);
    } catch (err) {
      console.error('Erro ao carregar dados dos ônibus:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBusLines();
  }, []);

  return {
    busLines,
    isLoading,
    error,
    refetch: loadBusLines
  };
};