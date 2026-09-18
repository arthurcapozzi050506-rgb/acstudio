import { createContext, useState, useEffect, ReactNode } from 'react';
import { type Language } from '../i18n/translations';

type Theme = 'dark' | 'light';

interface AppContextType {
  theme: Theme;
  lang: Language;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
}

export const AppContext = createContext<AppContextType>({
  theme: 'dark',
  lang: 'pt',
  toggleTheme: () => {},
  setLang: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Inicializar tema
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('ac-studio-theme') as Theme | null;
    if (saved) return saved;
    // Detectar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Inicializar idioma
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'pt';
    const saved = localStorage.getItem('ac-studio-lang') as Language | null;
    if (saved) return saved;
    // Detectar idioma do navegador
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('en') ? 'en' : 'pt';
  });

  // Aplicar tema ao document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ac-studio-theme', theme);
  }, [theme]);

  // Aplicar idioma ao localStorage
  useEffect(() => {
    localStorage.setItem('ac-studio-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, setLang }}>
      {children}
    </AppContext.Provider>
  );
}
