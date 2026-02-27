import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes, defaultThemeId } from './themeConfig';
import type { ThemeId } from './themeConfig';

interface ThemeState {
  currentThemeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  initTheme: () => void;
}

const applyThemeVariables = (themeId: ThemeId) => {
  const theme = themes[themeId] || themes[defaultThemeId];
  const root = document.documentElement;

  root.style.setProperty('--bg-color', theme.colors.bgColor);
  root.style.setProperty('--surface-color', theme.colors.surfaceColor);
  root.style.setProperty('--surface-hover', theme.colors.surfaceHover);
  root.style.setProperty('--text-primary', theme.colors.textPrimary);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--text-muted', theme.colors.textMuted);
  root.style.setProperty('--accent-color', theme.colors.accentColor);
  root.style.setProperty('--accent-hover', theme.colors.accentHover);
  root.style.setProperty('--success-color', theme.colors.successColor);
  root.style.setProperty('--error-color', theme.colors.errorColor);
  root.style.setProperty('--border-color', theme.colors.borderColor);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentThemeId: defaultThemeId,
      setTheme: (id: ThemeId) => {
        applyThemeVariables(id);
        set({ currentThemeId: id });
      },
      initTheme: () => {
        // Will be called once on mount
        const storedThemeId = (JSON.parse(localStorage.getItem('theme-storage') || '{}').state?.currentThemeId || defaultThemeId) as ThemeId;
        applyThemeVariables(storedThemeId);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
