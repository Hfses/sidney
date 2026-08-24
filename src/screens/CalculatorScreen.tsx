import { RotateCcw } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { formatEspiras, formatM, formatMm } from '../utils/format';
import { parseDecimalBr } from '../utils/format';

const DEFAULTS = {
  diametroBobina: '31',
  alturaEnrolamento: '13',
  awg: DEFAULT_AWG,
  numeroCamadas: '2',
};

export function CalculatorScreen() {
  const [diametroBobina, setDiametroBobina] = useState(DEFAULTS.diametroBobina);
  const [alturaEnrolamento, setAlturaEnrolamento] = useState(DEFAULTS.alturaEnrolamento);
  const [awg, setAwg] = useState<number | null>(DEFAULTS.awg);
  const [numeroCamadas, setNumeroCamadas] = useState(DEFAULTS.numeroCamadas);

  const parsed = useMemo(
    () => ({
      diametroBobina: parseDecimalBr(diametroBobina),
      alturaEnrolamento: parseDecimalBr(alturaEnrolamento),
      awg: awg ?? NaN,
      numeroCamadas: parseDecimalBr(numeroCamadas),
    }),
    [diametroBobina, alturaEnrolamento, awg, numeroCamadas],
  );

  const errors = useMemo(() => validateCoilInputs(parsed), [parsed]);
  const isValid = Object.keys(errors).length === 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateCoil(parsed);
  }, [parsed, isValid]);

  const handleReset = () => {
    setDiametroBobina(DEFAULTS.diametroBobina);
    setAlturaEnrolamento(DEFAULTS.alturaEnrolamento);
    setAwg(DEFAULTS.awg);
    setNumeroCamadas(DEFAULTS.numeroCamadas);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header />

          {/* Card de entrada */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dados da bobina</Text>
            <Text style={styles.cardSubtitle}>
              Informe os parâmetros para realizar o cálculo
            </Text>

            <View style={styles.grid}>
              <InputField
                label="Diâmetro da bobina"
                unit="mm"
                value={diametroBobina}
                onChangeText={setDiametroBobina}
                error={errors.diametroBobina}
              />
              <InputField
                label="Altura do enrolamento"
                unit="mm"
                value={alturaEnrolamento}
                onChangeText={setAlturaEnrolamento}
                error={errors.alturaEnrolamento}
              />
            </View>

            <View style={styles.grid}>
              <AwgSelector value={awg} onChange={setAwg} error={errors.awg} />
              <InputField
                label="Número de camadas"
                unit=""
                value={numeroCamadas}
                onChangeText={setNumeroCamadas}
                keyboardType="number-pad"
                error={errors.numeroCamadas}
              />
            </View>

            <Pressable style={styles.resetButton} onPress={handleReset}>
              <RotateCcw size={14} color={colors.textSecondary} />
              <Text style={styles.resetButtonText}>Restaurar padrão</Text>
            </Pressable>
          </View>

          {/* Resultados */}
          {result && (
            <>
              <Text style={styles.sectionLabel}>Resumo do cálculo</Text>

              <View style={styles.summaryRow}>
                <SummaryCard
                  label="Diâmetro do fio"
                  value={formatMm(result.dFio).split(' ')[0]}
                  unit="mm"
                />
                <SummaryCard
                  label="Total de espiras"
                  value={formatEspiras(result.totalEspiras).split(' ')[0]}
                  unit="esp."
                />
                <SummaryCard
                  label="Comprimento do fio"
                  value={formatM(result.comprimentoTotal).split(' ')[0]}
                  unit="m"
                />
              </View>

              <DetailsSection result={result} />

              <Text style={styles.sectionLabel}>Comparação de materiais</Text>
              <View style={{ gap: spacing.md }}>
                {result.materiais.map((m) => (
                  <MaterialCard key={m.key} material={m} />
                ))}
              </View>
            </>
          )}

          <Text style={styles.footer}>
            Feito com carinho para facilitar o seu trabalho ❤️
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  cardSubtitle: {
    marginTop: -spacing.md,
    fontSize: 12,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    paddingTop: spacing.sm,
  },
});

export default CalculatorScreen;
