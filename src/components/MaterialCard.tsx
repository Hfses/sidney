import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialResult } from '../types/coil';
import { colors, radius, spacing } from '../constants/theme';
import { formatGrams, formatOhm } from '../utils/format';

interface MaterialCardProps {
  material: MaterialResult;
}

const ACCENTS: Record<MaterialResult['key'], string> = {
  cobre: colors.copper,
  aluminio: colors.aluminum,
  ccaw: colors.ccaw,
};

export function MaterialCard({ material }: MaterialCardProps) {
  const accent = ACCENTS[material.key];

  return (
    <View style={[styles.card, { borderColor: accent + '55' }]}>
      <View style={[styles.header, { backgroundColor: accent + '1F' }]}>
        <Text style={[styles.title, { color: accent }]}>{material.label}</Text>
        <View style={[styles.rhoBadge, { backgroundColor: accent + '2A' }]}>
          <Text style={[styles.rhoText, { color: accent }]}>
            ρ {material.resistividade}
          </Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Resistência</Text>
          <Text style={[styles.metricValue, { color: accent }]}>
            {formatOhm(material.resistencia)}
          </Text>
          {material.menorResistencia && (
            <View style={[styles.tag, { backgroundColor: colors.success + '26' }]}>
              <Text style={[styles.tagText, { color: colors.success }]}>Menor resistência</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Peso</Text>
          <Text style={[styles.metricValue, { color: accent }]}>
            {formatGrams(material.peso)}
          </Text>
          {material.menorPeso && (
            <View style={[styles.tag, { backgroundColor: colors.success + '26' }]}>
              <Text style={[styles.tagText, { color: colors.success }]}>Menor peso</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>d = {material.densidade} g/cm³</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  rhoBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rhoText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metrics: {
    flexDirection: 'row',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  tag: {
    marginTop: 2,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.textSecondary,
  },
});

export default MaterialCard;
