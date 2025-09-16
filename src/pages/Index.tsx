import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Search, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusLineCard } from '@/components/BusLineCard';
import { busLines } from '@/data/busLines';
import busHeroImage from '@/assets/bus-hero.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredLines = busLines.filter(line =>
    line.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.number.includes(searchQuery) ||
    line.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLineClick = (lineId: string) => {
    navigate(`/linha/${lineId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-[300px] bg-gradient-hero flex items-center justify-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(22, 163, 74, 0.9)), url(${busHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-center text-white z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bus className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Guia de Ônibus</h1>
            </div>
            <p className="text-xl md:text-2xl mb-2 text-white/90">São José da Lapa - MG</p>
            <p className="text-white/80">Consulte horários e rotas em tempo real</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <Card className="mb-8 shadow-bus bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Search className="w-5 h-5" />
              Buscar Linha de Ônibus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Digite o número da linha, nome ou destino..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-6 text-center">
              <Bus className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{busLines.length}</div>
              <div className="text-white/80">Linhas Ativas</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-secondary text-white border-0">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {busLines.reduce((total, line) => total + line.stops.length, 0)}
              </div>
              <div className="text-white/80">Pontos de Parada</div>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">05:00 - 22:00</div>
              <div className="text-muted-foreground">Horário de Funcionamento</div>
            </CardContent>
          </Card>
        </div>

        {/* Bus Lines */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {filteredLines.length === busLines.length 
              ? 'Todas as Linhas' 
              : `${filteredLines.length} linha(s) encontrada(s)`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLines.map((busLine) => (
            <BusLineCard
              key={busLine.id}
              busLine={busLine}
              onClick={() => handleLineClick(busLine.id)}
            />
          ))}
        </div>

        {filteredLines.length === 0 && searchQuery && (
          <Card className="text-center py-12">
            <CardContent>
              <Bus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma linha encontrada</h3>
              <p className="text-muted-foreground">
                Tente buscar por outro termo ou verifique a ortografia.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
