import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Database, FileJson, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import busDataJson from '@/data/complete-bus-data-new.json';

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleUploadJson = async () => {
    try {
      setIsUploading(true);
      
      // Convert JSON to Blob
      const jsonBlob = new Blob([JSON.stringify(busDataJson)], { type: 'application/json' });
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('bus-data')
        .upload('complete-bus-data-new.json', jsonBlob, {
          upsert: true,
          contentType: 'application/json'
        });

      if (uploadError) throw uploadError;

      toast({
        title: 'Arquivo enviado!',
        description: 'O arquivo JSON foi enviado para o storage com sucesso.',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Erro no upload',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImportData = async () => {
    try {
      setIsImporting(true);

      const { data, error } = await supabase.functions.invoke('import-bus-data', {
        body: { forceReimport: true }
      });

      if (error) throw error;

      toast({
        title: 'Importação concluída!',
        description: `${data.stats.imported} linhas importadas, ${data.stats.skipped} ignoradas`,
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: 'Erro na importação',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive'
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Administração do Sistema</h1>
            {user && (
              <p className="text-muted-foreground mt-2">
                Logado como: {user.email}
              </p>
            )}
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Upload JSON Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="w-5 h-5" />
                Upload de Dados
              </CardTitle>
              <CardDescription>
                Fazer upload do arquivo JSON com dados das linhas de ônibus para o Supabase Storage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Arquivo:</strong> complete-bus-data-new.json
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Total de linhas no arquivo:</strong> {busDataJson.length}
                  </p>
                </div>
                <Button 
                  onClick={handleUploadJson}
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload JSON para Storage
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Import Data Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Importação de Dados
              </CardTitle>
              <CardDescription>
                Processar o arquivo JSON e importar todas as linhas para o banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Atenção:</strong> Esta operação pode demorar alguns minutos. 
                    Linhas existentes serão atualizadas e novas linhas serão criadas.
                  </p>
                </div>
                <Button 
                  onClick={handleImportData}
                  disabled={isImporting}
                  variant="default"
                  className="w-full"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importando dados...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Importar Dados para o Banco
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
