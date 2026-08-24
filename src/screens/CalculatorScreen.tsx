import { RotateCcw, SlidersHorizontal } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calculateCoil } from '../calculations/calculateCoil';
import { validateCoilInputs } from '../calculations/validateCoilInputs';
import { AwgSelector } from '../components/AwgSelector';
import { DetailsSection } from '../components/DetailsSection';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { MaterialCard } from '../components/MaterialCard';
import { SummaryCard } from '../components/SummaryCard';
import { DEFAULT_AWG } from '../constants/awg';
import { colors, radius, spacing } from '../constants/theme';
import { parseDecimalBr, formatEspiras, formatGrams, formatM, formatMm, formatOhm } from '../utils/format';

const DEFAULTS = { diametroBobina: '31', alturaEnrolamento: '13', awg: DEFAULT_AWG, numeroCamadas: '2' };

export function CalculatorScreen() {
  const [diametroBobina, setDiametroBobina] = useState(DEFAULTS.diametroBobina);
  const [alturaEnrolamento, setAlturaEnrolamento] = useState(DEFAULTS.alturaEnrolamento);
  const [awg, setAwg] = useState<number | null>(DEFAULTS.awg);
  const [numeroCamadas, setNumeroCamadas] = useState(DEFAULTS.numeroCamadas);
  const parsed = useMemo(() => ({ diametroBobina: parseDecimalBr(diametroBobina), alturaEnrolamento: parseDecimalBr(alturaEnrolamento), awg: awg ?? NaN, numeroCamadas: parseDecimalBr(numeroCamadas) }), [diametroBobina, alturaEnrolamento, awg, numeroCamadas]);
  const errors = useMemo(() => validateCoilInputs(parsed), [parsed]);
  const result = useMemo(() => Object.keys(errors).length === 0 ? calculateCoil(parsed) : null, [parsed, errors]);
  const reset = () => { setDiametroBobina(DEFAULTS.diametroBobina); setAlturaEnrolamento(DEFAULTS.alturaEnrolamento); setAwg(DEFAULTS.awg); setNumeroCamadas(DEFAULTS.numeroCamadas); };
  const lowestResistance = result?.materiais.reduce((a, b) => a.resistencia < b.resistencia ? a : b);
  const lowestWeight = result?.materiais.reduce((a, b) => a.peso < b.peso ? a : b);

  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}><StatusBar barStyle="light-content" backgroundColor={colors.background} /><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <Header />
    <View style={styles.inputCard}><View style={styles.cardHeading}><View><Text style={styles.cardTitle}>Dados da bobina</Text><Text style={styles.cardSubtitle}>Informe os parâmetros para realizar o cálculo</Text></View><SlidersHorizontal size={20} color={colors.primary} /></View>
      <InputField label="Diâmetro da bobina" unit="mm" value={diametroBobina} onChangeText={setDiametroBobina} error={errors.diametroBobina} />
      <InputField label="Altura do enrolamento" unit="mm" value={alturaEnrolamento} onChangeText={setAlturaEnrolamento} error={errors.alturaEnrolamento} />
      <AwgSelector value={awg} onChange={setAwg} error={errors.awg} />
      <InputField label="Número de camadas" value={numeroCamadas} onChangeText={setNumeroCamadas} keyboardType="number-pad" error={errors.numeroCamadas} />
      <Pressable accessibilityRole="button" accessibilityLabel="Restaurar valores padrão" style={({ pressed }) => [styles.reset, pressed && styles.pressed]} onPress={reset}><RotateCcw size={15} color={colors.textSecondary} /><Text style={styles.resetText}>Restaurar padrão</Text></Pressable>
    </View>
    {result && <><Text style={styles.section}>Resumo do cálculo</Text><View style={styles.summaryRow}><SummaryCard label="Diâmetro do fio" value={formatMm(result.dFio).split(' ')[0]} unit="mm" /><SummaryCard label="Total de espiras" value={formatEspiras(result.totalEspiras).split(' ')[0]} unit="esp." /><SummaryCard label="Comprimento do fio" value={formatM(result.comprimentoTotal).split(' ')[0]} unit="m" /></View><DetailsSection result={result} /><Text style={styles.section}>Comparação de materiais</Text><Text style={styles.sectionHint}>Veja como cada material se comporta</Text><View style={styles.insights}><View><Text style={styles.insightLabel}>Melhor resistência</Text><Text style={[styles.insightValue, { color: colors.copper }]}>{lowestResistance?.label}</Text><Text style={styles.insightMetric}>{lowestResistance && formatOhm(lowestResistance.resistencia)}</Text></View><View><Text style={styles.insightLabel}>Menor peso</Text><Text style={[styles.insightValue, { color: colors.aluminum }]}>{lowestWeight?.label}</Text><Text style={styles.insightMetric}>{lowestWeight && formatGrams(lowestWeight.peso)}</Text></View></View>{result.materiais.map((material) => <MaterialCard key={material.key} material={material} />)}</>}
    <Text style={styles.footer}>Calculadora de Bobinas • v1.0.0</Text>
  </ScrollView></KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1 }, content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl }, inputCard: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md }, cardHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: spacing.sm }, cardTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '800' }, cardSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 }, reset: { height: 44, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: spacing.xs }, pressed: { opacity: 0.7, backgroundColor: colors.surface }, resetText: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' }, section: { color: colors.textPrimary, fontSize: 16, fontWeight: '800', marginTop: spacing.sm }, sectionHint: { color: colors.textSecondary, fontSize: 12, marginTop: -spacing.md }, summaryRow: { flexDirection: 'row', gap: spacing.sm }, insights: { flexDirection: 'row', gap: spacing.sm }, insightLabel: { color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: .7, fontWeight: '700' }, insightValue: { fontSize: 15, fontWeight: '800', marginTop: 5 }, insightMetric: { color: colors.textPrimary, fontSize: 12, marginTop: 2 }, footer: { color: colors.textSecondary, textAlign: 'center', fontSize: 11, paddingTop: spacing.md } });
export default CalculatorScreen;
