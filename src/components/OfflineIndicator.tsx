import { Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePWA } from '@/hooks/usePWA';

export const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <Alert className="mb-4 bg-destructive/10 border-destructive/20">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Você está offline. Algumas funcionalidades podem estar limitadas.</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <WifiOff className="h-3 w-3" />
          Offline
        </div>
      </AlertDescription>
    </Alert>
  );
};