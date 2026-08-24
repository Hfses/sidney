import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

interface SummaryCardProps {
  label: string;
  value: string;
  unit: string;
}

export function SummaryCard({ label, value, unit }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  unit: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

export default SummaryCard;
