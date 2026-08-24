import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { CoilResult } from '../types/coil';
import { colors, radius, spacing } from '../constants/theme';
import {
  formatCm,
  formatEspiras,
  formatM,
  formatMm,
  formatMm2,
} from '../utils/format';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DetailsSectionProps {
  result: CoilResult;
}

export function DetailsSection({ result }: DetailsSectionProps) {
  const [open, setOpen] = useState(false);
  const firstRender = useRef(true);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  const rows: [string, string][] = [
    ['Diâmetro do fio', formatMm(result.dFio)],
    ['Espiras por camada', formatEspiras(result.espirasPorCamada)],
    ['Total de espiras', formatEspiras(result.totalEspiras)],
    ['Comprimento de cada espira', formatCm(result.comprimentoCadaEspira)],
    ['Comprimento total', formatM(result.comprimentoTotal)],
    ['Área da seção', formatMm2(result.area)],
  ];

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggle}>
        <Text style={styles.headerText}>Detalhes do cálculo</Text>
        {open ? (
          <ChevronUp size={16} color={colors.textSecondary} />
        ) : (
          <ChevronDown size={16} color={colors.textSecondary} />
        )}
      </Pressable>

      {open && (
        <View style={styles.body}>
          {rows.map(([label, value], idx) => (
            <View
              key={label}
              style={[
                styles.row,
                idx === rows.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  body: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  rowLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

export default DetailsSection;
