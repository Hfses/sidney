import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

interface InputFieldProps {
  label: string;
  unit?: string;
  value: string;
  onChangeText: (value: string) => void;
  hint?: string;
  error?: string;
  keyboardType?: 'decimal-pad' | 'number-pad';
}

export function InputField({
  label,
  unit,
  value,
  onChangeText,
  hint,
  error,
  keyboardType = 'decimal-pad',
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.danger : focused ? colors.primary : colors.border;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {!!unit && (
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}
      </View>

      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          style={styles.input}
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '45%',
    gap: spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  unitBadge: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unitText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  input: {
    height: 52,
    paddingHorizontal: spacing.lg,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.danger,
  },
  hintText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

export default InputField;
