import { useState, useEffect, useCallback } from 'react';

// Read current theme from DOM — single source of truth
function getIsDark(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Apply theme immediately on load (before React renders)
if (typeof window !== 'undefined') {
  applyTheme(getIsDark());
}

// Shared event so all useTheme instances stay in sync
const THEME_EVENT = 'cp-theme-change';

export function useTheme() {
  const [isDark, setIsDark] = useState(getIsDark);

  // Listen for theme changes from any component
  useEffect(() => {
    const handler = () => setIsDark(getIsDark());
    window.addEventListener(THEME_EVENT, handler);
    return () => window.removeEventListener(THEME_EVENT, handler);
  }, []);

  const toggle = useCallback(() => {
    const next = !getIsDark();
    applyTheme(next);
    setIsDark(next);
    // Notify all other useTheme instances
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { isDark, toggle };
}
