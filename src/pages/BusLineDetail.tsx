import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusSchedule } from '@/components/BusSchedule';
import { busLines } from '@/data/busLines';

const BusLineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const busLine = busLines.find(line => line.id === id);

  if (!busLine) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Linha não encontrada</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às linhas
          </Button>
        </div>
        
        <BusSchedule busLine={busLine} />
      </div>
    </div>
  );
};

export default BusLineDetail;