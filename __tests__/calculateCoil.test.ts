import { calculateCoil } from '../src/calculations/calculateCoil';

/**
 * Valores de referência calculados manualmente com as mesmas fórmulas
 * da planilha "Calculadora_de_Bobinas.xlsx", usando os parâmetros
 * padrão: Diâmetro = 31, Altura = 13, AWG = 31, Camadas = 2.
 *
 * B10 =0.127*92^((36-B7)/39)              -> dFio
 * B11 =B6/B10                             -> espirasPorCamada
 * B12 =B11*B8                             -> totalEspiras
 * B13 =PI()*B5/10                         -> comprimentoCadaEspira
 * B14 =B12*B13/100                        -> comprimentoTotal
 * área =PI()*(B10/2)^2
 * B16/D16/F16 =resistividade*B14/área     -> resistência (Cobre/Alumínio/CCAW)
 * B17/D17/F17 =B14*área*densidade         -> peso (Cobre/Alumínio/CCAW)
 */
describe('calculateCoil', () => {
  const defaultInputs = {
    diametroBobina: 31,
    alturaEnrolamento: 13,
    awg: 31,
    numeroCamadas: 2,
  };

  const result = calculateCoil(defaultInputs);

  test('diâmetro do fio (dFio)', () => {
    expect(result.dFio).toBeCloseTo(0.22676258082456563, 10);
  });

  test('espiras por camada', () => {
    expect(result.espirasPorCamada).toBeCloseTo(57.328682504532885, 8);
  });

  test('total de espiras', () => {
    expect(result.totalEspiras).toBeCloseTo(114.65736500906577, 8);
  });

  test('comprimento de cada espira', () => {
    expect(result.comprimentoCadaEspira).toBeCloseTo(9.738937226128359, 8);
  });

  test('comprimento total do fio', () => {
    expect(result.comprimentoTotal).toBeCloseTo(11.166408803365778, 8);
  });

  test('área da seção do fio', () => {
    expect(result.area).toBeCloseTo(0.04038616949563362, 10);
  });

  test('resistência e peso — Cobre', () => {
    const cobre = result.materiais.find((m) => m.key === 'cobre')!;
    expect(cobre.resistencia).toBeCloseTo(4.766979799845683, 8);
    expect(cobre.peso).toBeCloseTo(4.009109774667462, 8);
  });

  test('resistência e peso — Alumínio', () => {
    const aluminio = result.materiais.find((m) => m.key === 'aluminio')!;
    expect(aluminio.resistencia).toBeCloseTo(7.797043695588902, 8);
    expect(aluminio.peso).toBeCloseTo(1.2176148921937173, 8);
  });

  test('resistência e peso — CCAW 15%', () => {
    const ccaw = result.materiais.find((m) => m.key === 'ccaw')!;
    expect(ccaw.resistencia).toBeCloseTo(7.382307328802259, 8);
    expect(ccaw.peso).toBeCloseTo(1.6370155772826644, 8);
  });

  test('identifica corretamente menor resistência e menor peso', () => {
    const cobre = result.materiais.find((m) => m.key === 'cobre')!;
    const aluminio = result.materiais.find((m) => m.key === 'aluminio')!;
    const ccaw = result.materiais.find((m) => m.key === 'ccaw')!;

    expect(cobre.menorResistencia).toBe(true);
    expect(aluminio.menorResistencia).toBe(false);
    expect(ccaw.menorResistencia).toBe(false);

    expect(aluminio.menorPeso).toBe(true);
    expect(cobre.menorPeso).toBe(false);
    expect(ccaw.menorPeso).toBe(false);
  });

  test('não produz NaN/Infinity para entradas válidas', () => {
    Object.values(result).forEach((v) => {
      if (typeof v === 'number') {
        expect(Number.isFinite(v)).toBe(true);
      }
    });
  });
});
