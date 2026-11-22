# 📜 THE CORE OF MAN • DESIGN SYSTEM & GUIA DE ESTILO VISUAL
> **"A nobreza do Vácuo reside no silêncio e na contenção."**  
> Diretrizes oficiais de interface, arte e ergonomia visual para o ecossistema web de *The Core of Man - A Era dos Céus Partidos*.

---

## 🏛️ 1. O Conceito: A Tríade dos Mestres (Skyrim + Elden Ring + BG3) + Magitech

O universo de *Core* une **Magia Cósmica Ancestral** e **Tecnologia de Astrolábios/Aetherpunk**.  
Para fugir completamente do visual genérico e poluído de "IA" (caixas neon, excesso de glow, badges coloridas aleatórias), adotamos a filosofia de três grandes obras-primas do RPG mundial:

| Referência | O que absorvemos | O que eliminamos |
| :--- | :--- | :--- |
| **Skyrim** | Minimalismo austero, divisores lineares finos com runas/losangos centrais (`── ◆ ──`), constelações limpas, respiro e espaço negativo generoso. | Telas lotadas de caixas fechadas com bordas grossas. |
| **Elden Ring** | Tons nobres, sóbrios e misteriosos (obsidiana, ardósia, bronze envelhecido, ouro folheado queimado). Iluminação pontual dramática (a luz emana de onde importa). | Neons estridentes, arco-íris de badges roxas/verdes/laranjas. |
| **Baldur's Gate 3** | Arquitetura de informação diegética, abas horizontais com sublinhado sutil em vez de botões pílula, fichas táteis e botões funcionais de alta nitidez. | Fontes medievais forçadas em botões técnicos pequenos. |

---

## 🚫 2. As 5 Regras "Anti-IA" (Leis Invioláveis de UI)

Qualquer código ou tela nova gerada **deve** respeitar estas proibições:

### 1. Fim da "Containerite" (Caixa dentro de Caixa)
* **Proibido:** Aninhar 3 ou 4 níveis de retângulos com bordas douradas.
* **Correto:** O fundo do site deve respirar livremente. Seção e subseção são separadas por **espaço em branco** (`gap`, `space-y`) ou por **divisores lineares discretos** (`border-b border-amber-900/20`), nunca por outra caixa fechada.

### 2. Proibido o "Arco-Íris de Badges"
* **Proibido:** Misturar roxo, verde, laranja, ciano e amarelo na mesma tela para botões e contadores.
* **Correto:** A interface é **90% monocromática nobre** (obsidiana, ardósia, off-white, cinza fumê) e **10% ouro/âmbar** reservado para a ação primária ou item ativo.

### 3. Tipografia: Função vs. Arte
* **Proibido:** Usar fontes display/serifadas (`Cinzel`) em caixa alta para botões pequenos, tabelas, inputs e textos funcionais (`EMBARCAR TODOS (0)`, `MINHA CONTA`). Fica ilegível e pesado.
* **Correto:**
  * **Títulos e Capítulos Heráldicos:** `Cinzel` (com elegância e tracking respirado).
  * **Lore, Citações e Diários de Leitura:** `EB Garamond` (com entrelinha arejada).
  * **Toda a Interface (Botões, Abas, Contadores, Ficha, Modais):** `Inter` ou sans-serif pura, cristalina, fácil de ler em qualquer resolução.

### 4. Fim dos Ícones/Emojis Redundantes
* **Proibido:** Encher a tela de emojis coloridos (👑, 🧭, ⚓, ⛵, 🕯️, 📁) em cada linha de texto.
* **Correto:** Ícones apenas quando forem funcionais (lupa de busca, fechar modal, engrenagem de ajuste) e sempre em tom monocromático sóbrio (bronze ou off-white).

### 5. Fim da Duplicação de Comandos
* **Proibido:** Se uma ação já está na barra de topo (ex: *Astrolábio*, *Trono da Mestre*), ela **não pode** ser repetida como botão gigante dentro da mesma página.

---

## 🎨 3. Paleta de Materiais & Cores Oficiais

Em vez de cores digitais plásticas, pensamos em **materiais físicos do universo de Core**:

### Superfícies & Fundos
* **Obsidiana Profunda (`#06080e` / `bg-[#06080e]`):** Fundo base cósmico, imersivo e sem brilho desnecessário.
* **Ardósia Fumê (`#0f141f` / `bg-[#0f141f]`):** Superfície de painéis principais, com transparência sutil e desfoque (`backdrop-blur-md`).
* **Pergaminho Antigo (`#f7eedb`):** Exclusivo para telas de leitura de códice e diário.

### Metais & Luz (Acentos)
* **Ouro Velho / Folha Celestial (`#d4af37` / `#c59b27`):** Usado com parcimônia em destaques, coroas e botões de ação primordial.
* **Bronze Envelhecido (`#8c6d3b` / `#785b28`):** Para bordas ultrafinas, molduras de retratos e divisores sutis.
* **Ciano Etéreo (`#38bdf8` / opacidade suave):** Usado apenas para representar ressonância mística ativa ou dados de mana/éter.
* **Carmesim Heráldico (`#611818` / `#801c1c`):** Alertas de perigo, fardos arcanos e sanidade.

### Tipografia & Textos
* **Título Primário:** Dourado suave acetinado (`#f3e5ab` ou degradê suave `#fef3c7` para `#d4af37`).
* **Corpo de Texto (Fundo Escuro):** Off-white claro (`#e2e8f0` ou `#f8fafc`), **nunca** cinza escuro ilegível.
* **Texto Secundário / Muted:** Ardósia claro (`#94a3b8`), mantendo contraste com o fundo escuro.
* **Corpo de Texto (Pergaminho):** Castanho profundo / Quase preto (`#1c1917`).

---

## 📐 4. Padrões de Componentes (Design System)

### A. Divisores Estilo Skyrim (`Runed Dividers`)
Em vez de caixas fechadas, seções se dividem com linhas elegantes:
```tsx
<div className="flex items-center justify-center my-8 space-x-4 opacity-40">
  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
  <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
  <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
</div>
```

### B. Abas Estilo Baldur's Gate 3 (Tabs Limpas)
Nada de pílulas gigantes com fundo colorido. Abas de navegação utilizam tipografia limpa com sublinhado acetinado e iluminação suave:
```tsx
{/* Aba Inativa */}
<button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-amber-200 transition-colors">
  Navegantes em Atividade (3)
</button>

{/* Aba Ativa */}
<button className="relative px-4 py-2 text-sm font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]">
  Biblioteca de Fichas
</button>
```

### C. Botões com Hierarquia Real
1. **Botão Primário (CTA Máximo - Ex: "+ Forjar Navegante"):**
   * Fundo âmbar metálico suave com texto escuro de alto contraste.
   * `bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-medium px-5 py-2.5 rounded-lg shadow-md hover:brightness-110 active:scale-[0.98]`
2. **Botão Secundário (Ação Neutra - Ex: "Filtrar", "Ordenar"):**
   * Fundo translúcido com borda de bronze suave.
   * `bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-amber-500/40 hover:text-amber-100 rounded-lg px-4 py-2 text-sm`
3. **Botão Fantasma / Ação Discreta (Ex: "Cancelar", "Minimizar"):**
   * Sem borda, apenas texto que acende no hover.
   * `text-slate-400 hover:text-slate-200 text-sm transition-colors`

---

## 🔍 5. Checklist Obrigatório de Entrega de Tela (Definition of Done)

Antes de considerar qualquer página ou componente pronto, o desenvolvedor/agente deve responder **SIM** para:
- [ ] O visual transmite a elegância madura de RPGs como Skyrim/BG3/Elden Ring em vez de um painel de IA genérico?
- [ ] Eliminei todas as caixas dentro de caixas que não são estritamente necessárias?
- [ ] A tela possui apenas **uma** cor ou elemento primário chamando a atenção?
- [ ] Os botões e números usam tipografia legível (`Inter`), deixando `Cinzel` apenas para cabeçalhos majestosos?
- [ ] O contraste de texto passa com conforto em qualquer monitor (sem texto cinza escuro no fundo preto)?
- [ ] Todos os comandos duplicados ou ícones decorativos redundantes foram removidos?
