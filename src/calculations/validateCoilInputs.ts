import { CoilValidationErrors } from '../types/coil';

interface RawInputs {
  diametroBobina: number;
  alturaEnrolamento: number;
  awg: number;
  numeroCamadas: number;
}

export function validateCoilInputs(v: RawInputs): CoilValidationErrors {
  const erros: CoilValidationErrors = {};

  if (!Number.isFinite(v.diametroBobina) || v.diametroBobina <= 0) {
    erros.diametroBobina = 'Informe um valor maior que zero';
  }
  if (!Number.isFinite(v.alturaEnrolamento) || v.alturaEnrolamento <= 0) {
    erros.alturaEnrolamento = 'Informe um valor maior que zero';
  }
  if (!Number.isFinite(v.awg) || v.awg < 0 || v.awg > 40) {
    erros.awg = 'Calibre deve estar entre 0 e 40 AWG';
  }
  if (!Number.isFinite(v.numeroCamadas) || v.numeroCamadas <= 0 || v.numeroCamadas % 1 !== 0) {
    erros.numeroCamadas = 'Informe um número inteiro maior que zero';
  }

  return erros;
}

export default validateCoilInputs;
