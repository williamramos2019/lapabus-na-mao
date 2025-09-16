import { useState } from 'react';
import { Bus, MapPin, Clock, Zap, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TransportData {
  line: string;
  destination: string;
  arrival: string;
  delay?: number;
  status: 'on_time' | 'delayed' | 'cancelled';
}

export const TransportIntegration = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [transportData, setTransportData] = useState<TransportData[]>([]);
  const [stopCode, setStopCode] = useState('');
  const [zapierWebhook, setZapierWebhook] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Mock data para demonstração
  const mockData: TransportData[] = [
    {
      line: '201 - Centro/Vila Nova',
      destination: 'Centro',
      arrival: '2 min',
      status: 'on_time'
    },
    {
      line: '304 - Industrial/Residencial',
      destination: 'Distrito Industrial',
      arrival: '7 min',
      delay: 3,
      status: 'delayed'
    },
    {
      line: '150 - Circular',
      destination: 'Centro via Hospital',
      arrival: '12 min',
      status: 'on_time'
    }
  ];

  const handleSearchRealTime = async () => {
    setIsLoading(true);
    
    try {
      // Simula chamada para API de transporte público
      // Em produção, usaria APIs como:
      // - SPTrans (São Paulo)
      // - BHTrans (Belo Horizonte) 
      // - GTFS Realtime
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTransportData(mockData);
      
      toast({
        title: "Dados atualizados",
        description: "Informações de transporte em tempo real carregadas",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar dados em tempo real",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleZapierNotification = async () => {
    if (!zapierWebhook) {
      toast({
        title: "Erro",
        description: "Insira a URL do webhook do Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await fetch(zapierWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          location: "São José da Lapa",
          transport_data: transportData,
          triggered_from: "Guia de Ônibus App",
        }),
      });

      toast({
        title: "Notificação enviada",
        description: "Webhook do Zapier foi disparado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao enviar notificação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return 'bg-green-500';
      case 'delayed': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_time': return 'No horário';
      case 'delayed': return 'Atrasado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Bus className="w-5 h-5" />
            Transporte em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="realtime" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="realtime">Tempo Real</TabsTrigger>
              <TabsTrigger value="apis">Configurar APIs</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="realtime" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Código do ponto (ex: 12345)"
                  value={stopCode}
                  onChange={(e) => setStopCode(e.target.value)}
                />
                <Button 
                  onClick={handleSearchRealTime}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? 'Carregando...' : 'Buscar'}
                </Button>
              </div>

              {transportData.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Próximos ônibus
                  </h3>
                  {transportData.map((transport, index) => (
                    <Card key={index} className="border-l-4 border-primary">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="font-semibold">{transport.line}</div>
                            <div className="text-sm text-muted-foreground">
                              {transport.destination}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-bold">{transport.arrival}</span>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(transport.status)} text-white`}
                            >
                              {getStatusText(transport.status)}
                            </Badge>
                            {transport.delay && (
                              <div className="text-xs text-orange-600">
                                +{transport.delay} min de atraso
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="apis" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">APIs Suportadas:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• SPTrans (São Paulo)</li>
                      <li>• BHTrans (Belo Horizonte)</li>
                      <li>• GTFS Realtime</li>
                      <li>• Google Maps Transit API</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="api-key">Chave da API (temporária)</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Sua chave da API"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Para produção, conecte ao Supabase para armazenamento seguro
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zapier-webhook">Webhook do Zapier</Label>
                  <Input
                    id="zapier-webhook"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={zapierWebhook}
                    onChange={(e) => setZapierWebhook(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure um Zap para receber notificações de transporte
                  </p>
                </div>
                
                <Button 
                  onClick={handleZapierNotification}
                  disabled={isLoading || !zapierWebhook}
                  className="w-full"
                  variant="outline"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isLoading ? 'Enviando...' : 'Testar Notificação'}
                </Button>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Como configurar:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Crie um Zap no Zapier</li>
                    <li>Use "Webhooks by Zapier" como trigger</li>
                    <li>Escolha "Catch Hook"</li>
                    <li>Cole a URL do webhook acima</li>
                    <li>Configure ações (email, Slack, etc.)</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};