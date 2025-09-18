import { useState } from 'react';
import { MapPin, Bus, Clock, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { busLines } from '@/data/busLines';
import { useToast } from '@/hooks/use-toast';

export const TransportIntegration = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyStops, setNearbyStops] = useState<any[]>([]);
  const { toast } = useToast();

  const getUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocalização não suportada pelo navegador');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      setUserLocation(location);
      findNearbyStops(location);

      toast({
        title: "Localização obtida!",
        description: "Buscando paradas próximas...",
      });

    } catch (error) {
      console.error('Erro ao obter localização:', error);
      toast({
        title: "Erro de localização",
        description: "Não foi possível obter sua localização. Verifique as permissões do navegador.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const findNearbyStops = (location: { lat: number; lng: number }) => {
    // Simular paradas próximas baseadas nas linhas existentes
    const mockNearbyStops = busLines.slice(0, 3).map((line, index) => ({
      id: `stop-${index + 1}`,
      name: line.stops[0]?.name || 'Parada',
      address: line.stops[0]?.address || 'Endereço não disponível',
      distance: Math.floor(Math.random() * 500) + 100, // Distância simulada em metros
      lines: [line.number],
      nextBus: line.weekdaySchedule[0] || 'Não disponível'
    }));

    setNearbyStops(mockNearbyStops);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bus className="w-6 h-6" />
          Transporte em Tempo Real
        </CardTitle>
        <CardDescription>
          Encontre paradas próximas e consulte horários
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Localização */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Sua Localização
          </h3>
          
          {!userLocation ? (
            <Button 
              onClick={getUserLocation}
              disabled={isLoadingLocation}
              className="w-full"
              size="lg"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {isLoadingLocation ? 'Obtendo localização...' : 'Obter Localização'}
            </Button>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✓ Localização obtida com sucesso
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getUserLocation}
                className="mt-2"
              >
                Atualizar localização
              </Button>
            </div>
          )}
        </div>

        {/* Paradas Próximas */}
        {nearbyStops.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Paradas Próximas
            </h3>
            
            <div className="space-y-3">
              {nearbyStops.map((stop) => (
                <Card key={stop.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{stop.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{stop.address}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {stop.distance}m de distância
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Linha {stop.lines[0]}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Próximo: {stop.nextBus}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Nota:</strong> Os dados mostrados são simulados. Para informações em tempo real, 
                conecte-se ao Supabase para integrar APIs oficiais de transporte público.
              </p>
            </div>
          </div>
        )}

        {/* Informações das linhas disponíveis */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Linhas Disponíveis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Bus className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{busLines.length}</div>
              <div className="text-sm text-muted-foreground">Linhas Ativas</div>
            </Card>
            
            <Card className="p-4 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">
                {busLines.reduce((total, line) => total + line.stops.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Paradas</div>
            </Card>
            
            <Card className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">05:00</div>
              <div className="text-sm text-muted-foreground">Primeira Viagem</div>
            </Card>
            
            <Card className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">23:40</div>
              <div className="text-sm text-muted-foreground">Última Viagem</div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};