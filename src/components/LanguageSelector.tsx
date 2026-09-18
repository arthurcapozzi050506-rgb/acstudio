import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export function LanguageSelector() {
  const { lang, setLang } = useContext(AppContext);

  return (
    <div className="language-selector">
      <button
        onClick={() => setLang('pt')}
        className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
        aria-label="Português"
        title="Português"
      >
        PT
      </button>
      <span className="lang-separator">/</span>
      <button
        onClick={() => setLang('en')}
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
}
