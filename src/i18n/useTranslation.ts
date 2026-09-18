import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { translations, type Language } from './translations';

export function useTranslation() {
  const { lang } = useContext(AppContext);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback para PT se a chave não existir no idioma atual
        value = translations.pt;
        for (const fk of keys) {
          if (value && typeof value === 'object' && fk in value) {
            value = value[fk];
          } else {
            return key; // Retorna a chave se não encontrar
          }
        }
        return value;
      }
    }

    return value;
  };

  return { t, lang };
}
