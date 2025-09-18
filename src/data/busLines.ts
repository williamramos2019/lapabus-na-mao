import { BusLine } from '@/types/bus';
import { parseRealBusData } from '@/utils/busDataParser';

// Dados reais do transporte metropolitano de Minas Gerais
export const busLines: BusLine[] = parseRealBusData();