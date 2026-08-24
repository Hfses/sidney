export type MaterialKey = 'cobre' | 'aluminio' | 'ccaw';

export interface MaterialDefinition {
  key: MaterialKey;
  label: string;
  /** Resistividade (Ω·mm²/m) */
  resistividade: number;
  /** Densidade (g/cm³) */
  densidade: number;
}

export interface MaterialResult extends MaterialDefinition {
  resistencia: number; // Ω
  peso: number; // g
  menorResistencia: boolean;
  menorPeso: boolean;
}

export interface CoilInputs {
  diametroBobina: number; // mm
  alturaEnrolamento: number; // mm
  awg: number; // 0-40
  numeroCamadas: number; // inteiro > 0
}

export interface CoilResult {
  dFio: number; // mm
  espirasPorCamada: number;
  totalEspiras: number;
  comprimentoCadaEspira: number; // cm
  comprimentoTotal: number; // m
  area: number; // mm²
  materiais: MaterialResult[];
}

export interface CoilValidationErrors {
  diametroBobina?: string;
  alturaEnrolamento?: string;
  awg?: string;
  numeroCamadas?: string;
}
