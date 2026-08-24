import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AWG_OPTIONS } from '../constants/awg';
import { colors, radius, spacing } from '../constants/theme';

interface AwgSelectorProps {
  value: number | null;
  onChange: (awg: number) => void;
  error?: string;
}

export function AwgSelector({ value, onChange, error }: AwgSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return AWG_OPTIONS;
    return AWG_OPTIONS.filter((n) => String(n).includes(search.trim()));
  }, [search]);

  const borderColor = error ? colors.danger : colors.border;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Calibre do fio</Text>
        <View style={styles.unitBadge}>
          <Text style={styles.unitText}>AWG</Text>
        </View>
      </View>

      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.trigger, { borderColor }]}
      >
        <Text style={styles.triggerText}>
          {value !== null ? `${value} AWG` : 'Selecione'}
        </Text>
      </Pressable>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.hintText}>0 – 40</Text>
      )}

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Selecione o calibre</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pesquisar AWG..."
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              style={styles.searchInput}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => String(item)}
              style={{ maxHeight: 360 }}
              renderItem={({ item }) => {
                const selected = item === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item);
                      setOpen(false);
                      setSearch('');
                    }}
                    style={[styles.option, selected && styles.optionSelected]}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {item} AWG
                    </Text>
                    {selected && <View style={styles.selectedDot} />}
                  </Pressable>
                );
              }}
            />

            <Pressable style={styles.closeButton} onPress={() => setOpen(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  trigger: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  triggerText: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    borderTopWidth: 1,
    borderColor: colors.border,
    maxHeight: '75%',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  searchInput: {
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  option: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  optionSelected: {
    backgroundColor: colors.surface,
  },
  optionText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.primary,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  closeButton: {
    marginTop: spacing.md,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 13,
  },
});

export default AwgSelector;
