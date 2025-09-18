import { BusLine } from '@/types/bus';
import realBusData from '@/data/realBusData.json';

export const parseRealBusData = (): BusLine[] => {
  return realBusData.map((item, index) => {
    // Extrair número da linha do campo "linha"
    const lineNumberMatch = item.linha.match(/^(\d+[A-Z]?)/);
    const lineNumber = lineNumberMatch ? lineNumberMatch[1] : `L${index + 1}`;
    
    // Extrair nome da rota
    const routeMatch = item.linha.match(/^[\d\w]+\s+(.+?)\s+–/);
    const routeName = routeMatch ? routeMatch[1] : item.linha.split('–')[0].replace(/^\d+[A-Z]?\s+/, '');
    
    // Cores variadas para as linhas
    const colors = [
      '#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c', 
      '#0891b2', '#be123c', '#4338ca', '#059669', '#db2777'
    ];
    
    // Calcular frequência baseada nos horários
    let frequency = 'Varia durante o dia';
    if (item.horarios.length > 1) {
      const intervals = [];
      for (let i = 1; i < item.horarios.length; i++) {
        const prev = item.horarios[i-1].split(':').map(Number);
        const curr = item.horarios[i].split(':').map(Number);
        const prevMinutes = prev[0] * 60 + prev[1];
        const currMinutes = curr[0] * 60 + curr[1];
        
        if (currMinutes > prevMinutes) {
          intervals.push(currMinutes - prevMinutes);
        }
      }
      
      if (intervals.length > 0) {
        const avgInterval = Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length);
        if (avgInterval <= 15) frequency = 'A cada 15 minutos';
        else if (avgInterval <= 30) frequency = 'A cada 30 minutos';
        else if (avgInterval <= 60) frequency = 'A cada 1 hora';
        else frequency = 'Acima de 1 hora';
      }
    }
    
    // Gerar paradas baseadas na rota
    const generateStops = (routeName: string, lineNumber: string) => {
      const routeParts = routeName.split(' / ');
      const stops = [];
      
      if (routeParts.length >= 2) {
        stops.push({
          id: `${lineNumber}-1`,
          name: routeParts[0].trim(),
          address: `Terminal ${routeParts[0].trim()}`
        });
        
        // Adicionar paradas intermediárias
        stops.push({
          id: `${lineNumber}-2`,
          name: 'Centro',
          address: 'Região Central'
        });
        
        stops.push({
          id: `${lineNumber}-3`,
          name: routeParts[1].trim(),
          address: `Destino ${routeParts[1].trim()}`
        });
      } else {
        stops.push({
          id: `${lineNumber}-1`,
          name: 'Terminal',
          address: 'Terminal de origem'
        });
        stops.push({
          id: `${lineNumber}-2`,
          name: routeName,
          address: 'Destino principal'
        });
      }
      
      return stops;
    };

    return {
      id: `line-${index + 1}`,
      name: routeName,
      number: lineNumber,
      color: colors[index % colors.length],
      route: routeName,
      frequency,
      firstDeparture: item.horarios[0] || '05:00',
      lastDeparture: item.horarios[item.horarios.length - 1] || '22:00',
      weekdaySchedule: item.horarios,
      saturdaySchedule: item.horarios.filter((_, i) => i % 2 === 0), // Reduzir horários aos sábados
      sundaySchedule: item.horarios.filter((_, i) => i % 3 === 0), // Ainda menos aos domingos
      stops: generateStops(routeName, lineNumber)
    };
  });
};