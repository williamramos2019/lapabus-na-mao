import { useState, useEffect } from 'react';
import { Bell, Settings, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBusData } from '@/hooks/useBusData';

interface NotificationPreference {
  id: string;
  line_id: string;
  stop_name: string;
  notification_type: 'arrival' | 'delay' | 'route_change';
  advance_minutes: number;
  is_active: boolean;
  bus_lines?: {
    line_number: string;
    line_name: string;
  };
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<NotificationPreference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    line_id: '',
    stop_name: '',
    notification_type: 'arrival' as const,
    advance_minutes: 5
  });
  
  const { busLines } = useBusData();
  const { toast } = useToast();

  const loadNotifications = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login necessário",
          description: "Faça login para gerenciar suas notificações.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_notifications')
        .select(`
          *,
          bus_lines (
            line_number,
            line_name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications((data || []) as unknown as NotificationPreference[]);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar suas notificações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNotification = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login necessário",
          description: "Faça login para criar notificações.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_notifications')
        .insert({
          user_id: user.id,
          ...newNotification
        });

      if (error) throw error;

      toast({
        title: "Notificação criada",
        description: "Sua notificação foi configurada com sucesso.",
      });

      setNewNotification({
        line_id: '',
        stop_name: '',
        notification_type: 'arrival',
        advance_minutes: 5
      });
      setShowAddForm(false);
      loadNotifications();
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a notificação.",
        variant: "destructive",
      });
    }
  };

  const toggleNotification = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('user_notifications')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      loadNotifications();
    } catch (error) {
      console.error('Erro ao atualizar notificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a notificação.",
        variant: "destructive",
      });
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Notificação removida",
        description: "A notificação foi removida com sucesso.",
      });
      
      loadNotifications();
    } catch (error) {
      console.error('Erro ao remover notificação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a notificação.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const getNotificationTypeText = (type: string) => {
    switch (type) {
      case 'arrival': return 'Chegada';
      case 'delay': return 'Atraso';
      case 'route_change': return 'Mudança de rota';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Carregando notificações...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Central de Notificações
            </CardTitle>
            <CardDescription>
              Gerencie alertas para suas linhas favoritas
            </CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add notification form */}
        {showAddForm && (
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-4">
              <h4 className="font-semibold">Nova Notificação</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="line">Linha de Ônibus</Label>
                  <Select value={newNotification.line_id} onValueChange={(value) => 
                    setNewNotification({...newNotification, line_id: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma linha" />
                    </SelectTrigger>
                    <SelectContent>
                      {busLines.map((line) => (
                        <SelectItem key={line.id} value={line.id}>
                          {line.number} - {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stop">Nome da Parada</Label>
                  <Input
                    id="stop"
                    value={newNotification.stop_name}
                    onChange={(e) => setNewNotification({
                      ...newNotification, 
                      stop_name: e.target.value
                    })}
                    placeholder="Ex: Terminal Central"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo de Notificação</Label>
                  <Select value={newNotification.notification_type} onValueChange={(value: any) => 
                    setNewNotification({...newNotification, notification_type: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arrival">Chegada</SelectItem>
                      <SelectItem value="delay">Atraso</SelectItem>
                      <SelectItem value="route_change">Mudança de rota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minutes">Antecedência (minutos)</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="1"
                    max="30"
                    value={newNotification.advance_minutes}
                    onChange={(e) => setNewNotification({
                      ...newNotification, 
                      advance_minutes: parseInt(e.target.value) || 5
                    })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={addNotification} disabled={!newNotification.line_id || !newNotification.stop_name}>
                  Criar Notificação
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications list */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`${notification.is_active ? 'border-green-200' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          Linha {notification.bus_lines?.line_number}
                        </Badge>
                        <Badge variant={notification.is_active ? "default" : "secondary"}>
                          {notification.is_active ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold">
                        {notification.bus_lines?.line_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Parada: {notification.stop_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getNotificationTypeText(notification.notification_type)} • {notification.advance_minutes} min antes
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleNotification(notification.id, notification.is_active)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold text-muted-foreground mb-2">
              Nenhuma notificação configurada
            </p>
            <p className="text-muted-foreground">
              Clique em "Adicionar" para criar sua primeira notificação
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};