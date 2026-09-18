# 📋 Template Padrão de Prompts — AC Studio

> **Como usar:** Copie este arquivo, renomeie para `FEATURE-[nome-da-feature].md` ou `FIX-[nome-do-bug].md` e preencha as seções relevantes.

---

## 📌 Metadados

```markdown
# [Emoji] Prompt — [Título da Tarefa]

> **Projeto:** AC Studio — Portfolio Pessoal
> **Autor:** Arthur Capozzi
> **Versão:** 1.0.0
> **Data:** AAAA-MM
> **Status:** 🟡 Pendente | 🔵 Em Progresso | 🟢 Concluído | 🔴 Bloqueado
> **Prioridade:** 🔴 Alta | 🟡 Média | 🟢 Baixa
```

### Emojis de Status

| Emoji | Significado |
|-------|-------------|
| 🟡 | Pendente de implementação |
| 🔵 | Em progresso |
| 🟢 | Concluído e validado |
| 🔴 | Bloqueado / Crítico |

### Emojis de Prioridade

| Emoji | Significado |
|-------|-------------|
| 🔴 | Alta — fazer agora |
| 🟡 | Média — fazer em breve |
| 🟢 | Baixa — fazer quando possível |

### Emojis de Categoria

| Emoji | Categoria |
|-------|-----------|
| 🎨 | Design / UI |
| ⚙️ | Funcionalidade |
| 🐛 | Bug fix |
| ♿ | Acessibilidade |
| ⚡ | Performance |
| 🔍 | SEO |
| 🌐 | Internacionalização |
| 📱 | Mobile / Responsivo |
| 🛡️ | Segurança |
| 📝 | Conteúdo / Copy |

---

## 📑 Estrutura Padrão

### 1. Contexto
Descreva **o que existe hoje** e **qual é o problema/oportunidade**.

### 2. Objetivos
Lista numerada com **o que deve ser entregue**.

### 3. Requisitos
Divididos em subseções:
- **Design** (cores, tipografia, espaçamento)
- **Técnico** (stack, APIs, integrações)
- **Acessibilidade** (WCAG, navegação, contraste)
- **Performance** (métricas, limites)

### 4. Implementação
Código de exemplo, estrutura de arquivos, padrões a seguir.

### 5. Critérios de Aceitação
Checklist com caixas `[ ]` para marcar conforme implementado.

### 6. Especificações Visuais
Tabelas de cores, tamanhos, espaçamentos.

### 7. Estrutura de Arquivos
Árvore de diretórios afetados.

### 8. Plano de Testes
Tabela com cenários de teste e resultados esperados.

### 9. Prioridades
Tabela classificando itens por prioridade e esforço.

### 10. Definição de Pronto
Checklist final do que significa "entregue".

### 11. Notas Importantes
Avisos, restrições, dependências.

### 12. Referências
Links para documentação, inspirações, artigos.

---

## 📝 Exemplo de Uso

### Para uma nova feature:
```
prompts/FEATURE-dark-mode-i18n.md
prompts/FEATURE-blog-integration.md
prompts/FEATURE-analytics-dashboard.md
```

### Para correção de bug:
```
prompts/FIX-whatsapp-loading.md
prompts/FIX-mobile-overflow.md
prompts/FIX-image-fallback.md
```

### Para melhoria de performance:
```
prompts/PERF-lighthouse-score.md
prompts/PERF-image-optimization.md
```

### Para ajustes de design:
```
prompts/DESIGN-typography-update.md
prompts/DESIGN-color-palette.md
```

---

## 🎯 Regras de Ouro

1. **Um prompt = uma tarefa clara** — não misture features diferentes
2. **Sempre inclua critérios de aceitação** — sem checklist, não há definição de pronto
3. **Documente o contexto** — quem for implementar precisa entender o "porquê"
4. **Use tabelas para especificações** — mais fácil de ler que texto corrido
5. **Inclua código de exemplo** — reduz ambiguidade na implementação
6. **Liste prioridades** — ajuda a decidir o que fazer primeiro
7. **Mencione restrições** — performance, acessibilidade, compatibilidade
8. **Atualize o status** — mantenha o prompt sincronizado com o progresso

---

## 📊 Template de Tabela para Especificações

```markdown
| Elemento | Propriedade | Valor | Observação |
|----------|-------------|-------|------------|
| Background | `color` | `#000000` | Fundo principal |
| Texto | `font-size` | `clamp(2rem, 5vw, 3.5rem)` | Responsivo |
| Card | `border-radius` | `24px` | Borda arredondada |
```

---

## 📊 Template de Tabela para Testes

```markdown
| # | Cenário | Ação | Resultado Esperado | Status |
|---|---------|------|-------------------|--------|
| 1 | Login | Clicar em "Entrar" | Redireciona para dashboard | ⬜ |
| 2 | Logout | Clicar em "Sair" | Volta para home | ⬜ |
```

**Status dos testes:**
- ⬜ Pendente
- 🔄 Em execução
- ✅ Passou
- ❌ Falhou
- ⏭️ Ignorado

---

## 📊 Template de Tabela para Prioridades

```markdown
| Prioridade | Item | Esforço | Impacto | Prazo |
|------------|------|---------|---------|-------|
| 🔴 Alta | Item crítico | Alto | Alto | Urgente |
| 🟡 Média | Item importante | Médio | Médio | Esta semana |
| 🟢 Baixa | Item desejável | Baixo | Baixo | Sem prazo |
```

---

*Template mantido como padrão para todos os prompts do projeto AC Studio.*
