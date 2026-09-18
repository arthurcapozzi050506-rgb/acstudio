# 🎨 Prompt — Modo Claro e Internacionalização (EN/PT-BR)

> **Projeto:** AC Studio — Portfolio Pessoal  
> **Autor:** Arthur Capozzi  
> **Versão:** 1.0.0  
> **Data:** 2026-01  
> **Status:** 🟡 Pendente de Implementação  
> **Prioridade:** 🔴 Alta  

---

## 📋 Sumário

1. [Contexto](#-contexto)
2. [Objetivos](#-objetivos)
3. [Requisitos de Design](#-requisitos-de-design)
4. [Implementação Técnica](#-implementação-técnica)
5. [Conteúdo para Tradução](#-conteúdo-para-tradução)
6. [Critérios de Aceitação](#-critérios-de-aceitação)
7. [Especificações Visuais](#-especificações-visuais)
8. [Estrutura de Arquivos](#-estrutura-de-arquivos)
9. [Plano de Testes](#-plano-de-testes)
10. [Prioridades](#-prioridades)
11. [Definição de Pronto](#-definição-de-pronto)
12. [Notas Importantes](#-notas-importantes)

---

## 🎯 Contexto

O site AC Studio atualmente opera apenas em **dark mode** e em **português (PT-BR)**. Para alcançar um público internacional e oferecer melhor experiência de usuário, é necessário implementar:

- Alternância entre temas claro e escuro
- Suporte a dois idiomas (PT-BR e EN)
- Persistência das preferências do usuário
- Detecção automática de preferências do sistema/navegador

---

## 🎯 Objetivos

| # | Objetivo | Tipo |
|---|----------|------|
| 1 | Adicionar toggle de tema (dark/light) | Feature |
| 2 | Persistir preferência de tema | Feature |
| 3 | Adicionar seletor de idioma (PT/EN) | Feature |
| 4 | Traduzir todo o conteúdo para inglês | Feature |
| 5 | Detectar preferências do sistema automaticamente | Feature |
| 6 | Manter contraste WCAG AA em ambos os temas | Acessibilidade |

---

## 🎨 Requisitos de Design

### Modo Claro (Light Mode)

| Elemento | Cor | Observação |
|----------|-----|------------|
| Background primário | `#ffffff` | Fundo principal |
| Background secundário | `#f5f5f7` | Seções alternadas |
| Texto principal | `#1d1d1f` | Headings, body |
| Texto secundário | `#6e6e73` | Legendas, descrições |
| Glass card bg | `rgba(0, 0, 0, 0.03)` | Com backdrop-filter |
| Glass card border | `rgba(0, 0, 0, 0.08)` | Borda sutil |
| Gradiente marca | `#5E5CE6` → `#64D2FF` | Mantido em ambos |

> **Contraste mínimo:** 4.5:1 para texto normal (WCAG AA)

### Toggle de Tema

| Propriedade | Valor |
|-------------|-------|
| Posição | Navegação, ao lado do seletor de idioma |
| Ícone dark | 🌙 Lua |
| Ícone light | ☀️ Sol |
| Animação | `transition: 0.3s ease` |
| Storage key | `ac-studio-theme` |
| Padrão | `prefers-color-scheme` do sistema |

### Seletor de Idioma

| Propriedade | Valor |
|-------------|-------|
| Posição | Navegação, ao lado do toggle |
| Formato | Botões "PT" / "EN" |
| Storage key | `ac-studio-lang` |
| Padrão | `navigator.language` |
| Fallback | PT-BR |

---

## 🛠️ Implementação Técnica

### 1. Sistema de Temas (CSS Variables)

```css
:root {
  /* Dark mode (padrão) */
  --bg-primary: #000000;
  --bg-secondary: #0b0b0f;
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f7;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --glass-bg: rgba(0, 0, 0, 0.03);
  --glass-border: rgba(0, 0, 0, 0.08);
}

/* Transição suave entre temas */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease;
}
```

### 2. Contexto React (Theme + Language)

```typescript
// src/contexts/AppContext.tsx
interface AppContextType {
  theme: 'dark' | 'light';
  lang: 'pt' | 'en';
  toggleTheme: () => void;
  setLang: (lang: 'pt' | 'en') => void;
  t: (key: string) => string;
}
```

### 3. Sistema de Traduções

```typescript
// src/i18n/translations.ts
export const translations = {
  pt: {
    nav: {
      inicio: 'Início',
      sobre: 'Sobre',
      servicos: 'Serviços',
      projetos: 'Projetos',
      contato: 'Contato',
      iniciarProjeto: 'Iniciar projeto'
    },
    hero: {
      eyebrow: 'Desenvolvimento · Design · Inteligência Artificial',
      title1: 'Inteligência para',
      title2: 'criar',
      title3: 'Dedicação para',
      title4: 'transformar',
      subtitle: 'Sites, lojas virtuais e experiências digitais...',
      ctaPrimary: 'Iniciar um projeto',
      ctaSecondary: 'Ver projetos'
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      sobre: 'About',
      servicos: 'Services',
      projetos: 'Projects',
      contato: 'Contact',
      iniciarProjeto: 'Start project'
    },
    hero: {
      eyebrow: 'Development · Design · Artificial Intelligence',
      title1: 'Intelligence to',
      title2: 'create',
      title3: 'Dedication to',
      title4: 'transform',
      subtitle: 'Websites, online stores and digital experiences...',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'View projects'
    }
  }
};
```

### 4. Componentes de Controle

```tsx
// ThemeToggle.tsx
<button
  onClick={toggleTheme}
  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>

// LanguageSelector.tsx
<div className="lang-selector">
  <button
    onClick={() => setLang('pt')}
    className={lang === 'pt' ? 'active' : ''}
  >
    PT
  </button>
  <button
    onClick={() => setLang('en')}
    className={lang === 'en' ? 'active' : ''}
  >
    EN
  </button>
</div>
```

---

## 📝 Conteúdo para Tradução

| Seção | Elementos |
|-------|-----------|
| Navegação | Links e botões |
| Hero | Eyebrow, título, subtítulo, CTAs |
| Marquee | Lista de serviços |
| Stats | Labels dos números |
| Sobre | Título, subtítulo, 4 capítulos |
| Serviços | Título, subtítulo, 6 cards |
| Projetos | Título, subtítulo, empty state |
| Processo | Título, 4 passos |
| Contato | Título, subtítulo, CTAs |
| Footer | Slogan, copyright |
| WhatsApp | Mensagem pré-preenchida (2 versões) |

---

## ✅ Critérios de Aceitação

### Modo Claro

- [ ] Toggle funciona em todos os navegadores modernos
- [ ] Preferência salva no localStorage
- [ ] Transição suave sem flash de conteúdo (FOUC)
- [ ] Contraste AA em todos os elementos
- [ ] Ícones visíveis em ambos os temas
- [ ] Gradientes da marca mantêm legibilidade
- [ ] Cards glass funcionam corretamente
- [ ] `prefers-color-scheme` respeitado na primeira visita

### Internacionalização

- [ ] Todos os textos traduzidos (PT-BR e EN)
- [ ] Seletor de idioma visível e funcional
- [ ] Preferência salva no localStorage
- [ ] Detecção automática do idioma do navegador
- [ ] Fallback para PT-BR se idioma não suportado
- [ ] Mensagem do WhatsApp traduzida
- [ ] Sem textos hardcoded (todos via função `t()`)
- [ ] Direção do texto (LTR) mantida em ambos

### Acessibilidade

- [ ] `aria-label` em todos os botões de controle
- [ ] Foco visível em ambos os temas
- [ ] Contraste WCAG AA em todos os textos
- [ ] `prefers-reduced-motion` respeitado
- [ ] Navegação por teclado funcional

### Performance

- [ ] Sem re-render desnecessário ao trocar tema/idioma
- [ ] Traduções carregadas sob demanda (code splitting)
- [ ] localStorage lido apenas uma vez no mount
- [ ] Bundle size < 300KB (JS) e < 35KB (CSS)

---

## 🎨 Especificações Visuais

### Light Mode — Cores Específicas

```css
/* Botões gradient */
.btn-primary {
  background: linear-gradient(135deg, #5E5CE6, #64D2FF);
  color: #ffffff; /* manter branco em ambos os temas */
}

/* Cards glass */
.glass-card {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Hover state */
.glass-card:hover {
  border-color: rgba(94, 92, 230, 0.3);
  box-shadow: 0 8px 30px rgba(94, 92, 230, 0.1);
}
```

### Ícones

| Ícone | Uso | Especificação |
|-------|-----|---------------|
| ☀️ Sol | Modo light | stroke-width 1.5, 20x20px |
| 🌙 Lua | Modo dark | stroke-width 1.5, 20x20px |
| PT | Idioma português | Texto ou bandeira 🇧🇷 |
| EN | Idioma inglês | Texto ou bandeira 🇺🇸 |

---

## 📦 Estrutura de Arquivos

```
src/
├── contexts/
│   └── AppContext.tsx          # Contexto global (theme + lang)
├── i18n/
│   ├── translations.ts        # Objeto de traduções
│   └── useTranslation.ts      # Hook personalizado
├── components/
│   ├── ThemeToggle.tsx         # Botão de toggle de tema
│   └── LanguageSelector.tsx    # Seletor de idioma
└── App.tsx                     # Atualizado para usar contexto
```

---

## 🧪 Plano de Testes

### Testes de Modo Claro

| # | Teste | Resultado Esperado |
|---|-------|-------------------|
| 1 | Trocar tema múltiplas vezes | Transição suave, sem flicker |
| 2 | Recarregar página | Preferência mantida |
| 3 | Viewport 360px - 1920px | Layout responsivo OK |
| 4 | Lighthouse Accessibility | Score ≥ 90 |

### Testes de Internacionalização

| # | Teste | Resultado Esperado |
|---|-------|-------------------|
| 1 | Trocar idioma múltiplas vezes | Textos atualizados instantaneamente |
| 2 | Recarregar página | Idioma mantido |
| 3 | Mudar idioma do navegador | Detecção automática |
| 4 | Verificar textos hardcoded | Nenhum encontrado |

### Testes de Combinações

| Combinação | Status |
|------------|--------|
| Dark + PT | ⬜ Pendente |
| Dark + EN | ⬜ Pendente |
| Light + PT | ⬜ Pendente |
| Light + EN | ⬜ Pendente |

---

## 🎯 Prioridades

| Prioridade | Item | Esforço |
|------------|------|---------|
| 🔴 Alta | Sistema de temas (CSS variables + toggle) | Médio |
| 🔴 Alta | Persistência em localStorage | Baixo |
| 🟡 Média | Sistema de traduções (estrutura + hook) | Médio |
| 🟡 Média | Traduzir conteúdo (PT → EN) | Alto |
| 🟢 Baixa | Detecção automática de idioma | Baixo |
| 🟢 Baixa | Animações de transição entre temas | Baixo |

---

## ✅ Definição de Pronto

> **Entregável esperado:** Site funcional com toggle de tema (dark/light) e seletor de idioma (PT/EN), com todas as preferências persistidas e traduções completas.

### Checklist Final

- [ ] Toggle de tema funcional
- [ ] Seletor de idioma funcional
- [ ] Todas as traduções implementadas
- [ ] localStorage funcionando
- [ ] Build sem erros
- [ ] Lighthouse ≥ 90 (Performance, A11y, SEO)
- [ ] Testado em mobile e desktop
- [ ] `prefers-reduced-motion` respeitado
- [ ] Documentação atualizada

---

## 📌 Notas Importantes

> ⚠️ **Não quebrar funcionalidades existentes** (WhatsApp, projetos, animações)

> ⚡ **Manter performance** (bundle < 300KB)

> ♿ **Respeitar `prefers-reduced-motion`** em ambas as configurações

> 📱 **Testar em dispositivos móveis** (iOS Safari, Android Chrome)

> 📊 **Validar com Lighthouse** (Performance, Accessibility, SEO ≥ 90)

---

## 📎 Referências

- [WCAG 2.1 — Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [MDN — prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [Apple Design — Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

---

*Prompt formatado seguindo o padrão AC Studio para documentação de features.*
