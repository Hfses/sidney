import { Settings, Zap } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

interface HeaderProps {
  onPressSettings?: () => void;
}

export function Header({ onPressSettings }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <View style={styles.iconBadge}>
          <Zap size={16} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.title}>Calculadora de Bobinas</Text>
          <Text style={styles.subtitle}>Dimensionamento rápido e preciso</Text>
        </View>
      </View>

      <Pressable style={styles.settingsButton} onPress={onPressSettings}>
        <Settings size={18} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flexDirection: 'row',
    gap: spacing.md,
    flexShrink: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary + '1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textSecondary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
