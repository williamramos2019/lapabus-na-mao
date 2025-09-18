export interface BusCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  criteria: (lineNumber: string, lineName: string) => boolean;
}

export const busCategories: BusCategory[] = [
  {
    id: 'metropolitano',
    name: 'Metropolitano',
    description: 'Linhas que conectam a região metropolitana de BH',
    color: '#2563eb',
    icon: 'building',
    criteria: (lineNumber: string, lineName: string) => 
      /^[1-6]\d{3}/.test(lineNumber) && lineName.includes('Metropolitano')
  },
  {
    id: 'terminal-vilarinho',
    name: 'Terminal Vilarinho',
    description: 'Linhas que conectam ao Terminal Vilarinho',
    color: '#16a34a',
    icon: 'map-pin',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('terminal vilarinho')
  },
  {
    id: 'pedro-leopoldo',
    name: 'Pedro Leopoldo',
    description: 'Linhas da região de Pedro Leopoldo',
    color: '#dc2626',
    icon: 'home',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('pedro leopoldo')
  },
  {
    id: 'aeroporto-confins',
    name: 'Aeroporto Confins',
    description: 'Linhas para o Aeroporto de Confins',
    color: '#7c3aed',
    icon: 'plane',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('aeroporto') || lineName.toLowerCase().includes('confins')
  },
  {
    id: 'circular',
    name: 'Circulares',
    description: 'Linhas circulares dentro de bairros/regiões',
    color: '#ea580c',
    icon: 'refresh-cw',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('circular')
  },
  {
    id: 'expressa',
    name: 'Expressas',
    description: 'Linhas expressas e diretas',
    color: '#0891b2',
    icon: 'zap',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('direta') || 
      lineName.toLowerCase().includes('expressa') ||
      lineName.toLowerCase().includes('executivo')
  },
  {
    id: 'hospitais',
    name: 'Hospitais',
    description: 'Linhas para hospitais e centros de saúde',
    color: '#be123c',
    icon: 'heart',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('hospital') || lineNumber.includes('H')
  },
  {
    id: 'vespasiano',
    name: 'Vespasiano',
    description: 'Linhas da região de Vespasiano',
    color: '#4338ca',
    icon: 'map',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('vespasiano')
  },
  {
    id: 'lagoa-santa',
    name: 'Lagoa Santa',
    description: 'Linhas para Lagoa Santa',
    color: '#059669',
    icon: 'waves',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('lagoa santa')
  },
  {
    id: 'sao-jose-lapa',
    name: 'São José da Lapa',
    description: 'Linhas de São José da Lapa',
    color: '#db2777',
    icon: 'church',
    criteria: (lineNumber: string, lineName: string) => 
      lineName.toLowerCase().includes('são josé da lapa') || 
      lineName.toLowerCase().includes('sao jose da lapa')
  },
  {
    id: 'outras',
    name: 'Outras Linhas',
    description: 'Demais linhas do sistema',
    color: '#6b7280',
    icon: 'bus',
    criteria: () => true // Catch-all para linhas não categorizadas
  }
];

export const categorizeBusLine = (lineNumber: string, lineName: string): BusCategory => {
  for (const category of busCategories) {
    if (category.id !== 'outras' && category.criteria(lineNumber, lineName)) {
      return category;
    }
  }
  return busCategories.find(cat => cat.id === 'outras')!;
};