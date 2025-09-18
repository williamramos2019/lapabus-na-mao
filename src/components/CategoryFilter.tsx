import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { busCategories, BusCategory } from "@/types/categories";
import { Building, MapPin, Home, Plane, RefreshCw, Zap, Heart, Map, Waves, Church, Bus } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  categoryCounts: Record<string, number>;
}

const iconMap = {
  building: Building,
  'map-pin': MapPin,
  home: Home,
  plane: Plane,
  'refresh-cw': RefreshCw,
  zap: Zap,
  heart: Heart,
  map: Map,
  waves: Waves,
  church: Church,
  bus: Bus,
};

export const CategoryFilter = ({ selectedCategory, onCategoryChange, categoryCounts }: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Categorias</h3>
      
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className="w-full justify-start mb-2"
      >
        <Bus className="w-4 h-4 mr-2" />
        Todas as Linhas
        <Badge variant="secondary" className="ml-auto">
          {Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)}
        </Badge>
      </Button>

      <div className="grid grid-cols-1 gap-2">
        {busCategories
          .filter(category => category.id !== 'outras')
          .map((category: BusCategory) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Bus;
            const count = categoryCounts[category.id] || 0;
            
            if (count === 0) return null;
            
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className="w-full justify-start text-sm"
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : undefined,
                  borderColor: category.color,
                }}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.name}
                <Badge variant="secondary" className="ml-auto">
                  {count}
                </Badge>
              </Button>
            );
          })}
      </div>
      
      {/* Mostrar categoria "Outras" apenas se houver linhas */}
      {categoryCounts.outras > 0 && (
        <Button
          variant={selectedCategory === 'outras' ? "default" : "outline"}
          onClick={() => onCategoryChange('outras')}
          className="w-full justify-start text-sm"
        >
          <Bus className="w-4 h-4 mr-2" />
          Outras Linhas
          <Badge variant="secondary" className="ml-auto">
            {categoryCounts.outras}
          </Badge>
        </Button>
      )}
    </div>
  );
};