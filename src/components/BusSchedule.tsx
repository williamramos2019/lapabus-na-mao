import { useState } from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BusLine, ScheduleType } from '@/types/bus';

interface BusScheduleProps {
  busLine: BusLine;
}

export const BusSchedule = ({ busLine }: BusScheduleProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType>('weekday');

  const getSchedule = (type: ScheduleType) => {
    switch (type) {
      case 'weekday':
        return busLine.weekdaySchedule;
      case 'saturday':
        return busLine.saturdaySchedule;
      case 'sunday':
        return busLine.sundaySchedule;
      default:
        return busLine.weekdaySchedule;
    }
  };

  const getNextBus = () => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const todaySchedule = getSchedule('weekday'); // Simplificado para o exemplo
    
    const nextBus = todaySchedule.find(time => time > currentTime);
    return nextBus || todaySchedule[0]; // Se não houver próximo hoje, mostra o primeiro de amanhã
  };

  return (
    <div className="space-y-6">
      {/* Header da linha */}
      <Card className="bg-gradient-hero text-white border-0 shadow-glow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-elevated bg-white/20 backdrop-blur-sm"
            >
              {busLine.number}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{busLine.name}</h1>
              <p className="text-white/80 mb-2">{busLine.route}</p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{busLine.frequency}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{busLine.stops.length} paradas</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Próximo ônibus */}
      <Card className="bg-gradient-card border-primary/20 shadow-bus">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            Próximo Ônibus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{getNextBus()}</div>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              Em aproximadamente 15 min
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Horários */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Horários Completos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedSchedule} onValueChange={(value) => setSelectedSchedule(value as ScheduleType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekday">Segunda a Sexta</TabsTrigger>
              <TabsTrigger value="saturday">Sábado</TabsTrigger>
              <TabsTrigger value="sunday">Domingo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekday" className="mt-4">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {busLine.weekdaySchedule.map((time, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {time}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saturday" className="mt-4">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {busLine.saturdaySchedule.map((time, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {time}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sunday" className="mt-4">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {busLine.sundaySchedule.map((time, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {time}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pontos de parada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Pontos de Parada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {busLine.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{stop.name}</h4>
                  <p className="text-sm text-muted-foreground">{stop.address}</p>
                  {stop.landmark && (
                    <p className="text-xs text-secondary">📍 {stop.landmark}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};