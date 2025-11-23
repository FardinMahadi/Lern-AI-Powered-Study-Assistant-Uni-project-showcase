import { PaletteOptions } from '@mui/material/styles';

export const BRAND_COLORS = {
  accent: '#00D9FF',
  accentDark: '#0096B5',
  accentLight: '#7EEBFF',
  neutralDark: '#0A0A0A',
  neutralDarker: '#040404',
  neutralLight: '#F5F9FC',
  neutralMedium: '#101418',
  surfaceDark: '#1A1A1A',
  surfaceMedium: '#22272E',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: BRAND_COLORS.accent,
    light: BRAND_COLORS.accentLight,
    dark: BRAND_COLORS.accentDark,
    contrastText: BRAND_COLORS.neutralDark,
  },
  secondary: {
    main: '#6E59F0',
    light: '#8A79FF',
    dark: '#3E2EB8',
    contrastText: '#FFFFFF',
  },
  background: {
    default: BRAND_COLORS.neutralLight,
    paper: '#FFFFFF',
  },
  text: {
    primary: '#101418',
    secondary: '#4F5B67',
    disabled: 'rgba(16, 20, 24, 0.38)',
  },
  success: {
    main: BRAND_COLORS.success,
    contrastText: '#FFFFFF',
  },
  warning: {
    main: BRAND_COLORS.warning,
    contrastText: '#FFFFFF',
  },
  error: {
    main: BRAND_COLORS.error,
    contrastText: '#FFFFFF',
  },
  divider: 'rgba(18, 44, 73, 0.12)',
  action: {
    active: 'rgba(16, 20, 24, 0.54)',
    hover: 'rgba(16, 20, 24, 0.04)',
    selected: 'rgba(16, 20, 24, 0.08)',
    disabled: 'rgba(16, 20, 24, 0.26)',
    disabledBackground: 'rgba(16, 20, 24, 0.12)',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: BRAND_COLORS.accent,
    light: BRAND_COLORS.accentLight,
    dark: BRAND_COLORS.accentDark,
  },
  secondary: {
    main: '#6E59F0',
    light: '#8A79FF',
    dark: '#3E2EB8',
  },
  background: {
    default: BRAND_COLORS.neutralDark,
    paper: BRAND_COLORS.surfaceDark,
  },
  text: {
    primary: '#F7F9FB',
    secondary: 'rgba(255, 255, 255, 0.72)',
  },
  success: {
    main: BRAND_COLORS.success,
  },
  warning: {
    main: BRAND_COLORS.warning,
  },
  error: {
    main: BRAND_COLORS.error,
  },
  divider: 'rgba(255, 255, 255, 0.08)',
};
