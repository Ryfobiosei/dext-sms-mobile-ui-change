export const semanticColors = {
  light: {
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    primary: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  dark: {
    background: '#05060b',
    surface: '#0d101c',
    card: '#111424',
    border: '#1e2336',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
} as const;

export type ThemeMode = 'light' | 'dark' | 'system';
