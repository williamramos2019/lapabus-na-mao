export const countBusLinesInJSON = async (jsonPath: string): Promise<number> => {
  try {
    const response = await fetch(jsonPath);
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data.length;
    }
    
    return 0;
  } catch (error) {
    console.error('Error counting bus lines:', error);
    return 0;
  }
};

export const extractBusLineNumber = (linha: string): string => {
  // Extract just the line number from strings like "4211 Terminal São Benedito / Circular Conjunto Cristina"
  const match = linha.match(/^(\w+)/);
  return match ? match[1] : '';
};

export const extractRouteName = (linha: string): string => {
  // Extract route name after the number
  const parts = linha.split(' – ')[0]; // Remove the suffix part
  const match = parts.match(/^\w+\s+(.+)/);
  return match ? match[1].trim() : linha;
};