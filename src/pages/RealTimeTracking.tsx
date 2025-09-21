import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Bell, Clock, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BusPosition {
  id: string;
  line_id: string;
  vehicle_id: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed_kmh: number;
  occupancy_level: 'low' | 'medium' | 'high' | 'full';
  status: 'in_service' | 'breakdown' | 'out_of_service';
  delay_minutes: number;
  last_updated: string;
  bus_lines?: {
    line_number: string;
    line_name: string;
    origin: string;
    destination: string;
  };
}

interface BusAlert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  alert_type: string;
}

const RealTimeTracking = () => {
  const [busPositions, setBusPositions] = useState<BusPosition[]>([]);
  const [alerts, setAlerts] = useState<BusAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadBusPositions = async () => {
    try {
      const { data, error } = await supabase
        .from('bus_positions')
        .select(`
          *,
          bus_lines!inner (
            line_number,
            line_name,
            origin,
            destination
          )
        `)
        .eq('status', 'in_service')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      setBusPositions((data || []) as unknown as BusPosition[]);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao carregar posições:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as posições dos ônibus.",
        variant: "destructive",
      });
    }
  };

  const loadAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('bus_alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts((data || []) as unknown as BusAlert[]);
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await Promise.all([loadBusPositions(), loadAlerts()]);
      setIsLoading(false);
    };

    initialize();

    // Set up real-time subscription for bus positions
    const channel = supabase
      .channel('bus-positions-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bus_positions'
      }, (payload) => {
        console.log('Bus position update:', payload);
        loadBusPositions(); // Reload positions when there's a change
      })
      .subscribe();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadBusPositions, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const getOccupancyColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOccupancyText = (level: string) => {
    switch (level) {
      case 'low': return 'Baixa ocupação';
      case 'medium': return 'Ocupação moderada';
      case 'high': return 'Alta ocupação';
      case 'full': return 'Lotado';
      default: return 'Desconhecido';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Carregando rastreamento...</h2>
          <p className="text-muted-foreground">Conectando com dados em tempo real</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rastreamento em Tempo Real</h1>
            <p className="text-muted-foreground">
              Acompanhe a localização dos ônibus em tempo real
            </p>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Navigation className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{busPositions.length}</div>
              <div className="text-sm text-muted-foreground">Ônibus Ativos</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-500">
                {lastUpdate ? lastUpdate.toLocaleTimeString() : '--:--'}
              </div>
              <div className="text-sm text-muted-foreground">Última Atualização</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-orange-500">{alerts.length}</div>
              <div className="text-sm text-muted-foreground">Alertas Ativos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-500">
                {busPositions.filter(bus => bus.occupancy_level !== 'full').length}
              </div>
              <div className="text-sm text-muted-foreground">Com Lugares</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alertas do Sistema
            </h2>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <Alert key={alert.id} className={
                  alert.severity === 'critical' ? 'border-red-500' :
                  alert.severity === 'warning' ? 'border-yellow-500' : 'border-blue-500'
                }>
                  {getAlertIcon(alert.severity)}
                  <AlertDescription className="ml-2">
                    <strong>{alert.title}</strong> - {alert.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Bus Positions */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ônibus em Tempo Real
          </h2>
          
          {busPositions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {busPositions.map((bus) => (
                <Card key={bus.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Linha {bus.bus_lines?.line_number}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {bus.bus_lines?.origin} → {bus.bus_lines?.destination}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{bus.vehicle_id}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {bus.latitude.toFixed(4)}, {bus.longitude.toFixed(4)}
                      </span>
                    </div>
                    
                    {/* Speed */}
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="w-4 h-4 text-muted-foreground" />
                      <span>{bus.speed_kmh} km/h</span>
                    </div>
                    
                    {/* Occupancy */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ocupação:</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getOccupancyColor(bus.occupancy_level)}`}></div>
                        <span className="text-sm">{getOccupancyText(bus.occupancy_level)}</span>
                      </div>
                    </div>
                    
                    {/* Delay info */}
                    {bus.delay_minutes > 0 && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span>Atraso: {bus.delay_minutes} min</span>
                      </div>
                    )}
                    
                    {/* Last update */}
                    <div className="text-xs text-muted-foreground border-t pt-2">
                      Atualizado: {new Date(bus.last_updated).toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Navigation className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-xl font-semibold text-muted-foreground mb-2">
                  Nenhum ônibus em operação
                </p>
                <p className="text-muted-foreground text-center">
                  Não há ônibus sendo rastreados no momento
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;