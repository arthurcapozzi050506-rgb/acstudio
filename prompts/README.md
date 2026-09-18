# 📁 Prompts — AC Studio

> Sistema padronizado de documentação de tarefas, features e correções do projeto AC Studio.

---

## 📖 Como Usar

1. **Copie o template:** `TEMPLATE.md`
2. **Renomeie seguindo a convenção** (veja abaixo)
3. **Preencha as seções relevantes**
4. **Atualize o status** conforme o progresso

---

## 🏷️ Convenção de Nomenclatura

```
[CATEGORIA]-[nome-da-tarefa].md
```

### Categorias

| Prefixo | Categoria | Exemplo |
|---------|-----------|---------|
| `FEATURE-` | Nova funcionalidade | `FEATURE-dark-mode-i18n.md` |
| `FIX-` | Correção de bug | `FIX-whatsapp-loading.md` |
| `PERF-` | Otimização de performance | `PERF-lighthouse-score.md` |
| `DESIGN-` | Ajuste visual/UI | `DESIGN-typography-update.md` |
| `A11Y-` | Acessibilidade | `A11Y-keyboard-navigation.md` |
| `SEO-` | Otimização SEO | `SEO-meta-tags.md` |
| `CONTENT-` | Conteúdo/copy | `CONTENT-english-translation.md` |
| `SEC-` | Segurança | `SEC-form-validation.md` |
| `MOBILE-` | Responsivo/mobile | `MOBILE-menu-animation.md` |
| `REFAC-` | Refatoração | `REFAC-component-structure.md` |

---

## 📊 Status dos Prompts

| Status | Emoji | Significado |
|--------|-------|-------------|
| Pendente | 🟡 | Aguardando implementação |
| Em Progresso | 🔵 | Sendo desenvolvido |
| Concluído | 🟢 | Implementado e validado |
| Bloqueado | 🔴 | Aguardando dependência |
| Cancelado | ⚫ | Não será implementado |

---

## 📋 Prompts Atuais

| Arquivo | Categoria | Status | Prioridade |
|---------|-----------|--------|------------|
| `FEATURE-dark-mode-i18n.md` | Feature | 🟡 Pendente | 🔴 Alta |
| `TEMPLATE.md` | Template | 🟢 Padrão | — |

---

## 🎯 Checklist Rápido

Antes de criar um novo prompt, verifique:

- [ ] Título claro e objetivo
- [ ] Contexto bem descrito
- [ ] Objetivos listados
- [ ] Requisitos definidos (design, técnico, a11y, perf)
- [ ] Critérios de aceitação com checkboxes
- [ ] Prioridade definida
- [ ] Definição de pronto clara

---

## 💡 Dicas

1. **Seja específico** — "melhorar performance" é vago; "reduzir bundle para < 250KB" é acionável
2. **Use tabelas** — mais fácil de ler que parágrafos longos
3. **Inclua código** — exemplos reduzem ambiguidade
4. **Liste restrições** — o que NÃO pode ser quebrado
5. **Mantenha atualizado** — mude o status conforme avança

---

*Mantido como padrão para documentação do projeto AC Studio.*
