import { Clock, MapPin, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BusLine } from '@/types/bus';

interface BusLineCardProps {
  busLine: BusLine;
  onClick: () => void;
}

export const BusLineCard = ({ busLine, onClick }: BusLineCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-border/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-bus"
              style={{ backgroundColor: busLine.color }}
            >
              {busLine.number}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg leading-tight">
                {busLine.name}
              </h3>
              <p className="text-muted-foreground text-sm">{busLine.route}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
            <Zap className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{busLine.frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{busLine.stops.length} paradas</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Primeiro ônibus</span>
            <span className="text-xs text-muted-foreground">Último ônibus</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="font-medium text-primary">{busLine.firstDeparture}</span>
            <span className="font-medium text-primary">{busLine.lastDeparture}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};