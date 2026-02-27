export type ThemeId = 'light' | 'dark' | 'dark-blue' | 'gray';

export interface Theme {
  id: ThemeId;
  name: string;
  colors: {
    bgColor: string;
    surfaceColor: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentColor: string;
    accentHover: string;
    successColor: string;
    errorColor: string;
    borderColor: string;
  };
}

export const themes: Record<ThemeId, Theme> = {
  dark: {
    id: 'dark',
    name: 'Oscuro',
    colors: {
      bgColor: '#0d0d12',
      surfaceColor: 'rgba(30, 30, 35, 0.4)',
      surfaceHover: 'rgba(50, 50, 60, 0.6)',
      textPrimary: '#ffffff',
      textSecondary: '#c0c0c0',
      textMuted: '#888888',
      accentColor: '#bb86fc',
      accentHover: '#9c4dcc',
      successColor: '#03dac6',
      errorColor: '#cf6679',
      borderColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  light: {
    id: 'light',
    name: 'Claro',
    colors: {
      bgColor: '#f4f5f7',
      surfaceColor: 'rgba(255, 255, 255, 0.8)',
      surfaceHover: 'rgba(240, 242, 245, 0.9)',
      textPrimary: '#1a1a1c',
      textSecondary: '#4a4a4e',
      textMuted: '#6b6b70',
      accentColor: '#6200ee',
      accentHover: '#3700b3',
      successColor: '#018786',
      errorColor: '#b00020',
      borderColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  'dark-blue': {
    id: 'dark-blue',
    name: 'Azul Oscuro',
    colors: {
      bgColor: '#0f172a', /* slate-900 */
      surfaceColor: 'rgba(30, 41, 59, 0.5)', /* slate-800 mostly */
      surfaceHover: 'rgba(51, 65, 85, 0.6)', /* slate-700 */
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accentColor: '#38bdf8', /* sky-400 */
      accentHover: '#0ea5e9', /* sky-500 */
      successColor: '#22c55e', /* green-500 */
      errorColor: '#ef4444', /* red-500 */
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  gray: {
    id: 'gray',
    name: 'Gris',
    colors: {
      bgColor: '#202020',
      surfaceColor: 'rgba(45, 45, 45, 0.5)',
      surfaceHover: 'rgba(60, 60, 60, 0.6)',
      textPrimary: '#e0e0e0',
      textSecondary: '#a0a0a0',
      textMuted: '#707070',
      accentColor: '#f39c12', /* orange accent for contrast */
      accentHover: '#d68910',
      successColor: '#27ae60',
      errorColor: '#c0392b',
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },
  },
};

export const defaultThemeId: ThemeId = 'dark';

// Future-proofing support for system preference
export const getSystemTheme = (): ThemeId => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'; // Could return 'dark' or 'dark-blue' based on preference
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }
  return defaultThemeId;
};
