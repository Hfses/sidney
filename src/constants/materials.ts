import { MaterialDefinition } from '../types/coil';

/**
 * Valores de resistividade (Ω·mm²/m) e densidade (g/cm³) extraídos
 * diretamente da planilha "Calculadora_de_Bobinas.xlsx" (células B16/D16/F16
 * e B17/D17/F17). NÃO alterar sem validar contra a planilha original.
 */
export const MATERIALS: MaterialDefinition[] = [
  { key: 'cobre', label: 'Cobre', resistividade: 0.017241, densidade: 8.89 },
  { key: 'aluminio', label: 'Alumínio', resistividade: 0.0282, densidade: 2.7 },
  { key: 'ccaw', label: 'CCAW 15%', resistividade: 0.0267, densidade: 3.63 },
];
