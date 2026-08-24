/**
 * Converte um texto digitado no padrão brasileiro ("31,5") para number (31.5).
 * Retorna NaN se o texto não puder ser convertido.
 */
export function parseDecimalBr(text: string): number {
  if (!text) return NaN;
  const normalized = text.trim().replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized);
}

/**
 * Formata um número no padrão brasileiro com N casas decimais,
 * evitando NaN / Infinity / undefined na tela.
 */
export function formatNumberBr(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatMm(value: number, decimals = 4): string {
  return `${formatNumberBr(value, decimals)} mm`;
}

export function formatM(value: number, decimals = 2): string {
  return `${formatNumberBr(value, decimals)} m`;
}

export function formatCm(value: number, decimals = 4): string {
  return `${formatNumberBr(value, decimals)} cm`;
}

export function formatOhm(value: number, decimals = 4): string {
  return `${formatNumberBr(value, decimals)} Ω`;
}

export function formatGrams(value: number, decimals = 2): string {
  return `${formatNumberBr(value, decimals)} g`;
}

export function formatEspiras(value: number, decimals = 2): string {
  return `${formatNumberBr(value, decimals)} esp.`;
}

export function formatMm2(value: number, decimals = 6): string {
  return `${formatNumberBr(value, decimals)} mm²`;
}
