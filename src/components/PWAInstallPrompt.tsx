import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export const PWAInstallPrompt = () => {
  const { isInstallable, isInstalled, isOnline, installPWA } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isInstalled || isDismissed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {!isOnline && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="flex items-center gap-2 p-3">
              <WifiOff className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">Modo Offline</span>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 mx-auto max-w-sm z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm">Instalar App</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          Instale o Lapa Bus na sua tela inicial para acesso rápido
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={installPWA} size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-1" />
            Instalar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDismissed(true)}
          >
            Agora não
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};