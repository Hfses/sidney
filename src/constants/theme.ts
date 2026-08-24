export const colors = {
  background: '#080C14',
  card: '#111827',
  surface: '#182235',
  primary: '#00C8E8',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#243047',
  danger: '#F87171',
  success: '#34D399',

  // Identidade visual discreta por material
  copper: '#E28743',
  aluminum: '#8FB8D8',
  ccaw: '#B180D6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 999,
};

export const typography = {
  mono: undefined as string | undefined, // usa a fonte monoespaçada padrão do sistema
};

export const theme = { colors, spacing, radius, typography };
export default theme;
