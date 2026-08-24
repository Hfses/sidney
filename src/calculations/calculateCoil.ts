import { MATERIALS } from '../constants/materials';
import { CoilInputs, CoilResult, MaterialResult } from '../types/coil';

/**
 * calculateCoil
 * ─────────────────────────────────────────────────────────────────────────
 * Toda a lógica matemática da Calculadora de Bobinas, fiel à planilha
 * Excel original ("Calculadora_de_Bobinas.xlsx"). Nenhuma UI deve conter
 * fórmulas — todo cálculo passa por aqui.
 *
 * Fórmulas oficiais (não alterar sem validar contra a planilha):
 *
 *  dFio                   = 0.127 * 92 ^ ((36 - AWG) / 39)
 *  espirasPorCamada       = alturaEnrolamento / dFio
 *  totalEspiras           = espirasPorCamada * numeroCamadas
 *  comprimentoCadaEspira  = PI * diametroBobina / 10
 *  comprimentoTotal       = totalEspiras * comprimentoCadaEspira / 100
 *  area                   = PI * (dFio / 2)^2
 *
 *  resistencia(material)  = resistividade * comprimentoTotal / area
 *  peso(material)         = comprimentoTotal * area * densidade
 *
 * Nenhum valor é arredondado durante o cálculo — o arredondamento
 * acontece apenas na camada de apresentação (ver src/utils/format.ts).
 */
export function calculateCoil(inputs: CoilInputs): CoilResult {
  const { diametroBobina, alturaEnrolamento, awg, numeroCamadas } = inputs;

  const dFio = 0.127 * Math.pow(92, (36 - awg) / 39);
  const espirasPorCamada = alturaEnrolamento / dFio;
  const totalEspiras = espirasPorCamada * numeroCamadas;
  const comprimentoCadaEspira = (Math.PI * diametroBobina) / 10;
  const comprimentoTotal = (totalEspiras * comprimentoCadaEspira) / 100;
  const area = Math.PI * Math.pow(dFio / 2, 2);

  const materiaisBrutos = MATERIALS.map((m) => ({
    ...m,
    resistencia: (m.resistividade * comprimentoTotal) / area,
    peso: comprimentoTotal * area * m.densidade,
  }));

  const menorResistenciaValor = Math.min(...materiaisBrutos.map((m) => m.resistencia));
  const menorPesoValor = Math.min(...materiaisBrutos.map((m) => m.peso));

  const materiais: MaterialResult[] = materiaisBrutos.map((m) => ({
    ...m,
    menorResistencia: m.resistencia === menorResistenciaValor,
    menorPeso: m.peso === menorPesoValor,
  }));

  return {
    dFio,
    espirasPorCamada,
    totalEspiras,
    comprimentoCadaEspira,
    comprimentoTotal,
    area,
    materiais,
  };
}

export default calculateCoil;
