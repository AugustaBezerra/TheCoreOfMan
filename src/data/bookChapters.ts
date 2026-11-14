export interface Chapter {
  id: number;
  roman: string;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  contentHtml: string;
}

export const BOOK_CHAPTERS: Chapter[] = [
  // =========================================================================
  // CAPÍTULO I: O CHAMADO DO CERNE & CRIAÇÃO DE PERSONAGEM
  // =========================================================================
  {
    id: 1,
    roman: "I",
    title: "O Chamado do Cerne",
    subtitle: "A Criação do Personagem & O Questionário da Psique",
    iconName: "Compass",
    summary: "As bases do universo em 1939, o despertar do Verbo e o passo a passo completo para criar seu protagonista, incluindo o questionário psicológico da alma.",
    contentHtml: `
      <div class="space-y-6">
        <div class="p-4 rounded-xl bg-amber-100/90 border-l-4 border-amber-800 text-stone-950 italic leading-relaxed text-sm shadow-sm">
          "No princípio não havia o homem, apenas o Verbo. E o Verbo era a Fera, e a Fera era a Vontade. Quando o mundo estremeceu, os homens descobriram o preço terrível de cada milagre."
        </div>

        <p class="leading-relaxed text-stone-900 text-justify">
          O ano é <strong>1939</strong>. O mundo dos homens vive sob a sombra opressiva da fumaça fabril e a iminência de uma Segunda Grande Guerra. Mas por trás das notícias de jornais e das marchas militares na Europa, uma verdade muito mais antiga começou a despertar: <strong>o Cerne (The Core)</strong>.
        </p>
        <p class="leading-relaxed text-stone-900 text-justify">
          Nas névoas de Thornfield, nas rotas marítimas britânicas e nos vales esquecidos, forças primordiais voltam a circular na carne e na alma humana. Seja você um médico cirurgião, um militar marcado pelas trincheiras, uma parteira tradicional, um detetive obstinado ou um corsário dos mares, você foi chamado a cruzar esse limiar.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Passo a Passo: Como Construir seu Personagem
        </h3>
        <p class="text-xs text-stone-800 leading-relaxed">
          Siga estas etapas para dar vida, mente, corpo e alma ao seu protagonista:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">1. Conceito & Linhagem</strong>
            <p class="text-stone-800">Defina seu nome, idade, história, profissão e linhagem biológica (Capítulo VIII). Sua linhagem determina seus valores iniciais de sobrevivência.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">2. O Questionário da Psique</strong>
            <p class="text-stone-800">Responda com honestidade às 6 perguntas existenciais da sua alma. Elas ditarão sua resistência moral ao horror e às decisões difíceis.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">3. Atributos & Perícias</strong>
            <p class="text-stone-800">Distribua seus pontos entre Físicos, Mentais/Sociais e Força de Vontade (Capítulo III), respeitando o teto de treino (Perícia &le; 2 &times; Atributo).</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">4. Os Quatro Pilares Vitais</strong>
            <p class="text-stone-800">Calcule seus pontos de HP (Vida), CA (Armadura/Esquiva), Psique (Sanidade/Energia) e SI (Sistema Imune) com base nas fórmulas oficiais (Capítulo IV).</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">5. Escolha de Classe</strong>
            <p class="text-stone-800">Selecione uma das 15 classes fundamentais (Capítulo VII). Anote seus bônus, proficiências, itens em Libras (£) e sua habilidade única com Psique.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100/95 border border-amber-900/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">6. Destino: Tarot & Patrono</strong>
            <p class="text-stone-800">O Mestre conduzirá sua tiragem dos 3 Arcanos (Passado, Presente, Futuro) e o registro secreto do Patrono Oculto que observa seus passos.</p>
          </div>
        </div>

        <!-- O QUESTIONÁRIO DA PSIQUE -->
        <div class="mt-6 p-5 rounded-xl bg-amber-50/90 border-2 border-amber-900/40 shadow-md">
          <div class="text-center mb-4">
            <span class="text-xs font-serif uppercase tracking-widest text-amber-900 font-bold block mb-1">Inquérito Psicológico & Espiritual</span>
            <h4 class="font-serif font-black text-amber-950 text-xl">O Questionário da Alma</h4>
            <p class="text-xs italic text-stone-700 mt-1">"O caminho mais sábio que o homem pode fazer é conhecer a si mesmo sem mentiras ou meias verdades."</p>
          </div>

          <p class="text-xs text-stone-800 leading-relaxed text-justify mb-4">
            Em <em>The Core of Man</em>, atributos numéricos não bastam para resistir ao vácuo e ao sobrenatural. A mente humana precisa de âncoras. Cada jogador deve preencher as 6 perguntas abaixo antes de iniciar a campanha:
          </p>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">1. Quem é você quando ninguém está vendo?</strong>
              <span class="text-stone-600 italic">Sua verdadeira essência despida de títulos sociais, orgulho e expectativas familiares.</span>
            </div>
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">2. Por que você acorda / levanta todos os dias?</strong>
              <span class="text-stone-600 italic">O propósito inegociável que impede seu espírito de desistir diante da dor e da rotina.</span>
            </div>
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">3. O que ainda te dói, mesmo que você diga que já passou?</strong>
              <span class="text-stone-600 italic">A ferida emocional ou culpa que nunca cicatrizou de verdade.</span>
            </div>
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">4. Quem foi seu primeiro amor?</strong>
              <span class="text-stone-600 italic">A pessoa que primeiro ensinou seu coração a pulsar com intensidade, quer tenha terminado em bênção ou tragédia.</span>
            </div>
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">5. O que você mais teme perder?</strong>
              <span class="text-stone-600 italic">Sua maior vulnerabilidade: um ente querido, uma lembrança, a sanidade ou sua própria humanidade.</span>
            </div>
            <div class="p-3 rounded bg-white/90 border border-amber-900/20">
              <strong class="text-amber-900 block font-serif text-sm">6. Qual a verdade que você evita encarar?</strong>
              <span class="text-stone-600 italic">A mentira de conforto que você conta para si mesmo para conseguir dormir à noite.</span>
            </div>
          </div>

          <div class="mt-4 p-2 text-center text-xs italic font-serif text-amber-950 font-bold border-t border-amber-900/30">
            "A fonte do homem é a sua alma; ele pode até tentar fugir dela, mas sempre será em vão."
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO II: A REGRA DE OURO
  // =========================================================================
  {
    id: 2,
    roman: "II",
    title: "A Regra de Ouro",
    subtitle: "Resolução de Testes e Mecânicas Básicas",
    iconName: "Dices",
    summary: "Como os dados decidem o destino: o teste 1d20 + Atributo + Perícia contra a Classe de Dificuldade (CD) e vantagens narrativas.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Sempre que seu protagonista tenta realizar uma ação cujo resultado seja incerto, arriscado ou disputado, o Mestre solicitará um <strong>Teste de Resolução</strong>. A mecânica central de The Core é ágil, dramática e universal:
        </p>

        <div class="p-4 bg-amber-950 text-amber-50 rounded-xl text-center font-serif text-lg tracking-wide shadow-md border-2 border-amber-600">
          <span class="text-amber-400 font-bold">1d20</span> + 
          <span class="text-amber-200 font-bold"> Atributo</span> + 
          <span class="text-amber-200 font-bold"> Perícia</span> &ge; 
          <span class="text-amber-400 font-bold"> Classe de Dificuldade (CD)</span>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Escala de Classes de Dificuldade (CD)
        </h3>
        <p class="text-xs text-stone-800 leading-relaxed">
          O Mestre estabelece o número-alvo com base na periculosidade da cena e nas condições ambientais:
        </p>

        <div class="overflow-x-auto shadow-sm rounded-lg border border-amber-900/30">
          <table class="w-full text-left text-xs bg-stone-50">
            <thead class="bg-amber-900/20 text-amber-950 font-serif border-b border-amber-900/30">
              <tr>
                <th class="py-2.5 px-3 font-bold">Dificuldade</th>
                <th class="py-2.5 px-3 font-bold">CD</th>
                <th class="py-2.5 px-3 font-bold">Exemplo Prático de Cena</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-900/10 text-stone-900">
              <tr>
                <td class="py-2.5 px-3 font-bold text-emerald-900">Fácil</td>
                <td class="py-2.5 px-3 font-mono font-bold text-emerald-900">CD 10</td>
                <td class="py-2.5 px-3">Escalar um muro baixo de tijolos secos; acalmar um cavalo assustado; identificar um remédio comum.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold text-blue-900">Moderada</td>
                <td class="py-2.5 px-3 font-mono font-bold text-blue-900">CD 15</td>
                <td class="py-2.5 px-3">Arrombar uma fechadura de latão no escuro; saltar entre conveses em mar revolto; notar uma mentira bem contada.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold text-amber-900">Difícil</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">CD 20</td>
                <td class="py-2.5 px-3">Tratar ferimentos graves sem anestesia sob fogo inimigo; decifrar runas esquecidas do Verbo; pilotar em meio a um nevoeiro denso.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold text-red-900">Extrema</td>
                <td class="py-2.5 px-3 font-mono font-bold text-red-900">CD 25+</td>
                <td class="py-2.5 px-3">Conter uma besta em fúria de sangue; invadir uma mente protegida por pactos arcanos; sobreviver a venenos de Black Walkers.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Vantagem e Desvantagem
        </h3>
        <p class="text-xs text-stone-800 leading-relaxed text-justify">
          Quando o ambiente ou habilidades concedem uma oportunidade favorável (terreno elevado, cobertura tática, emboscada, assistência de um companheiro), o jogador rola <strong>2d20 e escolhe o maior resultado</strong> (Vantagem). Quando há impedimentos graves (chuva torrencial, cegueira, veneno, exaustão), rola <strong>2d20 e escolhe o menor resultado</strong> (Desvantagem).
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">&bull; Sucesso Crítico (20 Natural):</strong>
            <p class="text-stone-800">Ocorre um triunfo espetacular. Em combate, dobra os dados de dano. Em testes sociais ou técnicos, alcança o objetivo com benefícios narrativos imprevistos.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">&bull; Falha Crítica (1 Natural):</strong>
            <p class="text-stone-800">A ação dá tragicamente errado. Uma arma pode emperrar, uma ferramenta quebrar ou a mente vacilar diante do perigo imediato.</p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO III: ATRIBUTOS E PERÍCIAS
  // =========================================================================
  {
    id: 3,
    roman: "III",
    title: "Atributos e Perícias",
    subtitle: "A Matriz Completa de Capacidades",
    iconName: "UserCheck",
    summary: "Os seis atributos fundamentais (Físicos e Mentais), suas 18 perícias especializadas e a Regra do Teto de Treinamento.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Os <strong>Atributos</strong> definem o potencial biológico e mental inato do seu personagem (escala usual de 0 a 5). Já as <strong>Perícias</strong> refletem o que você treinou ao longo dos anos — estudos teóricos, ofícios manuais e disciplina física.
        </p>

        <!-- ATRIBUTOS FÍSICOS -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2">
          1. Atributos Físicos
        </h3>
        <div class="space-y-3">
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Força (O Poder Bruto)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Físico</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">Potência muscular, capacidade de tração e impacto corporal em combates brutos.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>Atletismo:</strong> Correr em disparada, saltar abismos, escalar árvores e mastros, nadar em águas revoltas.</li>
              <li><strong>Brutalidade:</strong> Atos de esforço puro: arrombar portas reforçadas, erguer vigas e dobrar grades de ferro.</li>
              <li><strong>Luta:</strong> Combate desarmado corporal e maestria com armas brancas (espadas, machados, cutelos, facas).</li>
            </ul>
          </div>

          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Vigor (A Resiliência)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Físico</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">A capacidade de aguentar castigo físico, manter o fôlego e permanecer de pé.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>Constituição:</strong> Resistência a venenos, pragas mundanas, choque térmico e noites sem dormir.</li>
              <li><strong>Recuperação:</strong> Rapidez biológica com que o corpo estanca sangramentos e cicatriza ferimentos.</li>
              <li><strong>Tolerância:</strong> Suporte à dor física excruciante sem gritar, desmaiar ou vacilar em combate.</li>
            </ul>
          </div>

          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Destreza (A Agilidade & Precisão)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Físico</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">Coordenação motora fina, velocidade de reação, reflexos rápidos e equilíbrio corporal.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>Acrobacia:</strong> Equilíbrio sobre parapeitos e cordames, manobras evasivas e quedas amortecidas.</li>
              <li><strong>Furtividade:</strong> Mover-se sem emitir ruído, ocultar-se em sombras e passar despercebido por patrulhas.</li>
              <li><strong>Mira:</strong> Pontaria com armas de fogo (pistolas, rifles, espingardas), arcos compostos e facas de arremesso.</li>
            </ul>
          </div>
        </div>

        <!-- ATRIBUTOS MENTAIS & SOCIAIS -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          2. Atributos Mentais e Sociais
        </h3>
        <div class="space-y-3">
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Carisma (A Presença & Magnetismo)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Social</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">Não é apenas beleza física, mas o peso da sua personalidade e sua capacidade de influenciar outros.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>Animais:</strong> Interpretar o comportamento de feras, acalmar cães de guarda e domesticar criaturas selvagens.</li>
              <li><strong>Lábia:</strong> A arte de convencer, mentir, negociar preços, blefar e seduzir com palavras afiadas.</li>
              <li><strong>Teatralidade:</strong> Atuação pública, disfarce de identidade, manipulação de multidões e oratória.</li>
            </ul>
          </div>

          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Conhecimento (A Erudição Acadêmica)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Mental</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">A bagagem teórica e prática acumulada através de livros, expedições e oficinas.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>História:</strong> Lembrar fatos antigos, lendas locais, tratados políticos e genealogias dinásticas.</li>
              <li><strong>Mito:</strong> Conhecimento sobre o ocultismo, rituais proibidos, criaturas do folclore e ecos do Verbo.</li>
              <li><strong>Raciocínio:</strong> Lógica pura, dedução investigativa, cálculo balístico e quebra de enigmas.</li>
              <li><strong>Ofício:</strong> Sua especialização técnica manual (Medicina, Engenharia, Arqueologia, Mecânica, Carpintaria).</li>
            </ul>
          </div>

          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-amber-950 text-base">Inteligência (A Agudeza & Instinto)</h4>
              <span class="text-xs font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Mental</span>
            </div>
            <p class="text-xs text-stone-800 mb-2">Seu tempo de resposta perceptivo instantâneo e a leitura do ambiente ao seu redor.</p>
            <ul class="list-disc list-inside text-xs text-stone-900 space-y-1">
              <li><strong>Intuição:</strong> Pressentir perigos iminentes, notar hesitações na voz e sentir quando alguém está mentindo.</li>
              <li><strong>Percepção:</strong> Notar pistas ocultas, ouvir sussurros no quarto ao lado e enxergar silhuetas na névoa.</li>
              <li><strong>Sobrevivência:</strong> Rastrear pegadas na lama, encontrar abrigo, purificar água e guiar o grupo em locais hostis.</li>
            </ul>
          </div>
        </div>

        <div class="p-4 bg-amber-50 rounded-xl border-2 border-amber-800/40 shadow-sm mt-4">
          <h4 class="font-bold font-serif text-amber-950 mb-1 text-sm">⚖️ A Regra de Ouro do Teto de Treinamento</h4>
          <p class="text-xs text-stone-900 leading-relaxed text-justify">
            O valor numérico de uma Perícia <strong>nunca pode ultrapassar o dobro (2x) do valor do seu Atributo correspondente</strong>. Se você possui Força 2, o seu limite máximo em Luta é 4. Para atingir Luta 5, você precisará elevar seu atributo de Força para pelo menos 3!
          </p>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO IV: FORÇA DE VONTADE & OS QUATRO PILARES
  // =========================================================================
  {
    id: 4,
    roman: "IV",
    title: "Força de Vontade & Os Quatro Pilares",
    subtitle: "A Dinâmica da Alma e os Status Vitais de Sobrevivência",
    iconName: "Flame",
    summary: "A energia da alma como recurso sacrificial: testes de Vontade, dano de sanidade à Psique e os cálculos de HP, CA, Psique e Sistema Imune.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, a vontade não é apenas um número estático na ficha — ela é o sacrifício e o combustível da sua alma. Quando você tenta realizar algo que desafia os limites do corpo humano ou toca as energias do Verbo, você trava um embate direto contra o desconhecido.
        </p>

        <!-- FORÇA DE VONTADE -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2">
          As 4 Perícias de Força de Vontade
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm">Mente</strong>
            <p class="text-stone-800">Sua defesa contra o horror cósmico, choques de insanidade, torturas mentais e pesadelos do eco.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm">Alma</strong>
            <p class="text-stone-800">Sua conexão com o plano espiritual, a convicção moral profunda e a firmeza da sua fé interior.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm">Corpo</strong>
            <p class="text-stone-800">A superação dos limites biológicos da carne através da pura teimosia e obstinação de viver.</p>
          </div>
          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm">Essência (Dado de Linhagem)</strong>
            <p class="text-stone-800">Sua reserva inata de energia arcana pura. Utiliza o Dado de Essência definido por sua Linhagem (1d4, 1d6 ou 1d8).</p>
          </div>
        </div>

        <!-- REGRAS DE TESTE DE VONTADE -->
        <div class="p-4 bg-amber-100/90 rounded-xl border-l-4 border-amber-800 text-stone-900 text-xs space-y-2">
          <strong class="font-serif text-amber-950 text-sm block">O Preço do Poder: Dinâmica de Vontade</strong>
          <p><strong>1. O Teste de Vontade:</strong> Role <code>1d20 + Força de Vontade + Perícia Relacionada</code> contra a CD imposta.</p>
          <p><strong>2. A Falha e o Dano na Psique:</strong> Se falhar, role seu Dado de Sanidade (1d4, 1d6...) determinado pelo Mestre; o valor é subtraído diretamente da sua <strong>Psique</strong>.</p>
          <p><strong>3. O Sacrifício Punitivo (Sucesso Forçado):</strong> Se faltaram pontos para passar, você pode queimar temporariamente pontos daquela perícia para forçar o sucesso na ação! Esses pontos só voltam investindo XP novamente.</p>
        </div>

        <!-- OS 4 PILARES DE SOBREVIVÊNCIA -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Os 4 Pilares de Sobrevivência (Fórmulas Oficiais)
        </h3>
        <p class="text-xs text-stone-800 leading-relaxed">
          Para calcular seus status, consulte o <strong>Valor Base da sua Linhagem</strong> (Capítulo VIII) e some seus atributos:
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-xl bg-stone-100/90 border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-red-950 text-sm">🩸 HP &bull; Pontos de Vida</h4>
              <span class="text-xs font-mono font-bold text-red-900 bg-red-100 px-2 py-0.5 rounded">Integridade da Carne</span>
            </div>
            <p class="text-xs font-mono font-bold text-stone-950 bg-stone-200/80 p-2 rounded">
              HP = [Base da Linhagem] + Vigor + Constituição + Corpo + Bônus
            </p>
            <p class="text-xs text-stone-800 mt-1">Representa o trauma físico que seu corpo suporta antes de cair morrendo (0 HP).</p>
          </div>

          <div class="p-4 rounded-xl bg-stone-100/90 border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-blue-950 text-sm">🛡️ CA &bull; Classe de Armadura</h4>
              <span class="text-xs font-mono font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">Defesa & Esquiva</span>
            </div>
            <p class="text-xs font-mono font-bold text-stone-950 bg-stone-200/80 p-2 rounded">
              CA = [Base da Linhagem] + Destreza + Corpo + Bônus de Armadura
            </p>
            <p class="text-xs text-stone-800 mt-1">A dificuldade numérica que os ataques inimigos precisam igualar para te acertar.</p>
          </div>

          <div class="p-4 rounded-xl bg-stone-100/90 border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-purple-950 text-sm">🧠 Psique &bull; Vida Mental & Sanidade</h4>
              <span class="text-xs font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">Reserva Mental & Habilidades</span>
            </div>
            <p class="text-xs font-mono font-bold text-stone-950 bg-stone-200/80 p-2 rounded">
              Psique = [Base da Linhagem] + Inteligência + Intuição + Mente + Bônus
            </p>
            <p class="text-xs text-stone-800 mt-1">Sua blindagem contra loucura e pânico. Pontos de Psique também são gastos para ativar habilidades especiais de Classe!</p>
          </div>

          <div class="p-4 rounded-xl bg-stone-100/90 border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-center mb-1">
              <h4 class="font-bold font-serif text-emerald-950 text-sm">🧪 SI &bull; Sistema Imune</h4>
              <span class="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">Barreira Biológica</span>
            </div>
            <p class="text-xs font-mono font-bold text-stone-950 bg-stone-200/80 p-2 rounded">
              SI = [Base da Linhagem] + Vigor + Tolerância + Corpo + Bônus
            </p>
            <p class="text-xs text-stone-800 mt-1">Sua defesa contra toxinas, venenos, contaminações biológicas e pragas místicas do Verbo.</p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO V: OS DOMÍNIOS DA MANIFESTAÇÃO
  // =========================================================================
  {
    id: 5,
    roman: "V",
    title: "Os Domínios da Manifestação",
    subtitle: "A Magia sem Amarras e a Criação de Habilidades",
    iconName: "Sparkles",
    summary: "Como funciona o poder místico em The Core: a imaginação como limite, a negociação de efeitos com o Mestre e os 5 Grandes Domínios da existência.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, o poder sobrenatural não é uma lista estática de magias prontas com "slots" por dia. Ele é a consequência direta do seu <strong>Domínio</strong> sobre um aspecto primordial da existência.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2">
          Como Funciona a Criação Livre de Habilidades
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">1. A Ideia do Jogador</strong>
            <p class="text-stone-800">Você descreve o que deseja realizar: <em>"Quero que minha flecha crie raízes que paralisem o inimigo"</em> ou <em>"Quero sentir batimentos cardíacos atrás da porta"</em>.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">2. O Enquadramento</strong>
            <p class="text-stone-800">O Mestre e o jogador identificam qual dos 5 Domínios rege aquele fenômeno e qual perícia de Vontade será rolada.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">3. A Precificação em XP</strong>
            <p class="text-stone-800">O Mestre avalia a magnitude do efeito e estabelece o custo em XP para que o personagem "aprenda" essa técnica permanentemente.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 font-serif block text-sm mb-1">4. A Execução em Jogo</strong>
            <p class="text-stone-800">Em cena, você ativa a habilidade rolando o teste correspondente e arcando com os custos de esforço e sanidade.</p>
          </div>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Os 5 Grandes Domínios
        </h3>
        <div class="space-y-3">
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20">
            <h4 class="font-serif font-bold text-amber-950 text-sm">1. Domínio da Matéria (O Caminho do Condutor)</h4>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">Manipulação de objetos inanimados, metalurgia arcana e reforço físico. Permite imbuir armas com elementos, moldar ferro a frio e reforçar blindagens. <em>Perícia Chave: Essência ou Corpo.</em></p>
          </div>
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20">
            <h4 class="font-serif font-bold text-amber-950 text-sm">2. Domínio da Carne (O Caminho do Ápice)</h4>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">Alteração e fortalecimento da própria biologia ou da biologia alheia. Permite cura acelerada, garras ósseas, visão térmica e explosões de vigor muscular. <em>Perícia Chave: Corpo.</em></p>
          </div>
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20">
            <h4 class="font-serif font-bold text-amber-950 text-sm">3. Domínio do Éter (O Caminho dos Elementos)</h4>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">Manifestação de energias brutas da natureza sem corpo sólido: faíscas elétricas, rajadas de vento, chamas espectrais azuis e névoas de ocultamento. <em>Perícia Chave: Essência.</em></p>
          </div>
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20">
            <h4 class="font-serif font-bold text-amber-950 text-sm">4. Domínio da Trama (O Caminho da Mente)</h4>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">Ilusões óticas e sonoras, sugestão mental sutil, alteração das emoções alheias, gritos de pavor e invisibilidade social. <em>Perícia Chave: Mente.</em></p>
          </div>
          <div class="p-4 bg-stone-100/90 rounded-xl border border-amber-900/20">
            <h4 class="font-serif font-bold text-amber-950 text-sm">5. Domínio do Elo (O Caminho da Alma)</h4>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">Conexão entre seres vivos, autoridade moral inquestionável, comando de feras selvagens e sintonia com o mundo espiritual. <em>Perícia Chave: Alma.</em></p>
          </div>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Tabela Guia de Custos em XP para Habilidades Criadas
        </h3>
        <div class="overflow-x-auto shadow-sm rounded-lg border border-amber-900/30">
          <table class="w-full text-left text-xs bg-stone-50">
            <thead class="bg-amber-900/20 text-amber-950 font-serif border-b border-amber-900/30">
              <tr>
                <th class="py-2.5 px-3 font-bold">Nível</th>
                <th class="py-2.5 px-3 font-bold">Custo em XP</th>
                <th class="py-2.5 px-3 font-bold">Escopo do Efeito Místico</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-900/10 text-stone-900">
              <tr>
                <td class="py-2.5 px-3 font-bold">Nível I (Básico)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">2 a 4 XP</td>
                <td class="py-2.5 px-3">Efeitos sutis e utilitários: acender tochas, sentir presenças espirituais, +1 em rolagem específica.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">Nível II (Incomum)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">5 a 8 XP</td>
                <td class="py-2.5 px-3">Altera o cenário ou causa dano moderado: flecha de raízes, cura de ferida aberta, barreira de vento.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">Nível III (Raro)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">10 a 15 XP</td>
                <td class="py-2.5 px-3">Efeitos poderosos que mudam o combate: paralisar vários inimigos, rajadas gravitacionais em área.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">Nível IV (Mítico)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">20+ XP</td>
                <td class="py-2.5 px-3">Rompe as leis da física: falar com mortos de séculos passados, erguer tempestades ou alterar o destino.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO VI: COMBATE TÁTICO, ARMAS & EQUIPAMENTOS
  // =========================================================================
  {
    id: 6,
    roman: "VI",
    title: "Combate Tático, Armas & Equipamentos",
    subtitle: "Ações, Arsenal Bélico, Blindagens e Slots Corporais",
    iconName: "Swords",
    summary: "Economia de combate em turnos, slots anatômicos corporais, catálogo completo de armas brancas e de fogo, munições alquímicas e blindagens.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          O combate em The Core é rápido, tenso e implacável. A iniciativa é definida rolando <strong>1d20 + Destreza</strong> (com certas classes, como Militar, agindo primeiro por instinto tático).
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2">
          A Economia de Ações no Turno
        </h3>
        <ul class="list-disc list-inside space-y-1.5 text-stone-900 text-xs leading-relaxed">
          <li><strong>Uma Ação Principal:</strong> Disparar uma arma, desferir um golpe de lâmina, usar uma habilidade mística, prestar primeiros socorros ou arrombar barricadas.</li>
          <li><strong>Um Movimento:</strong> Correr até seu limite de deslocamento, buscar cobertura atrás de trincheiras ou subir em escadas/cordames.</li>
          <li><strong>Uma Ação Rápida / Bônus:</strong> Sacar uma arma secundária, beber um frasco de remédio ou bolar uma fita cirúrgica.</li>
          <li><strong>Uma Reação:</strong> Esquivar-se de um disparo mortal, aparar um golpe ou ativar uma manobra defensiva.</li>
        </ul>

        <!-- SLOTS CORPORAIS DE EQUIPAMENTO -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Os 7 Slots Anatômicos de Equipamento
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🎩 Cabeça</strong>
            <span class="text-stone-700">Chapéus de feltro, óculos de solda/latão, máscaras antigás, elmos militares.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🧥 Tronco</strong>
            <span class="text-stone-700">Fardas da Grande Guerra, sobretudos de lã impermeável, couraças de placas, jaquetas de couro.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🧤 Braços</strong>
            <span class="text-stone-700">Braçadeiras de couro reforçado, luvas de forja, faixas médicas de contenção.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">👖 Pernas</strong>
            <span class="text-stone-700">Calças de lona pesada, perneiras de montaria em couro, cinturões de ferramentas.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🥾 Pés</strong>
            <span class="text-stone-700">Botas de marcha com sola de aço, sapatos de couro lubrificado, calçados náuticos antiderrapantes.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🗡️ Mão 1 (Principal)</strong>
            <span class="text-stone-700">Arma de combate corpo a corpo primária, rifle de repetição ou ferramenta pesada de ofício.</span>
          </div>
          <div class="p-2.5 bg-stone-100 rounded-lg border border-amber-900/20">
            <strong class="text-amber-900 block font-serif">🛡️ Mão 2 (Secundária)</strong>
            <span class="text-stone-700">Escudo tático, pistola leve, tocha, lanterna náutica ou frasco de medicamento.</span>
          </div>
        </div>

        <!-- ARSENAL DE ARMAS BRANCAS -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Arsenal de Armas Brancas
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Cutelo Naval / Sabre de Bordo</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d6 cortante</span></div>
            <p class="text-stone-800 mt-1">Arma ágil e resistente, perfeita para conveses apertados, trincheiras e duelos de reação rápida.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Lâmina de Ressonância (Vibro-Sabre)</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d8 cortante</span></div>
            <p class="text-stone-800 mt-1">Filamento de cristal no gume que vibra em frequência ultrassônica, cortando blindagens e portas de aço.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Machado de Forja Hidráulico</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d10 contundente</span></div>
            <p class="text-stone-800 mt-1">Pistão pneumático na haste que descarrega impacto violento na colisão, esmagando anteparas e escudos.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Faca de Trincheira &bull; Adaga Injetora</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d4 perfurante</span></div>
            <p class="text-stone-800 mt-1">Lâmina oca com mecanismo no pomo para injetar venenos alquímicos ou sedativos diretamente na carne do alvo.</p>
          </div>
        </div>

        <!-- ARSENAL DE ARMAS DE FOGO -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Armas de Fogo e Balística de 1939
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Pistola de Serviço / Revólver Leve</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d8 perfurante</span></div>
            <p class="text-stone-800 mt-1">Arma padrão militar britânica e policial (Webley / Enfield .38), 6 tiros, confiável e fácil de ocultar sob o sobretudo.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Revólver Pesado Spark-Lock</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">1d10 perfurante</span></div>
            <p class="text-stone-800 mt-1">Tambor de vidro reforçado com fluido alquímico que dispara projéteis impulsionados por centelhas sem cheiro de enxofre.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Espingarda de Cano Duplo</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">2d8 a curta distância</span></div>
            <p class="text-stone-800 mt-1">Arma de caça clássica de Thornfield. Causa dano massivo em alvos a até 6 metros de distância.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Rifle Estriado Lee-Enfield &bull; Mosquete de Bordo</strong><span class="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">2d8 perfurante</span></div>
            <p class="text-stone-800 mt-1">Arma de ombro militar precisa com mira de ferro, letal a distâncias de até 150 metros mesmo sob chuva ou vento.</p>
          </div>
        </div>

        <!-- ARMADURAS & TRAJES -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          Armaduras e Trajes Defensivos
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Traje Tático de Lona</strong><span class="font-mono font-bold text-amber-900">CA 13 + Des</span></div>
            <p class="text-stone-800 mt-1">Couro flexível impermeabilizado com ombreiras leves. Garante proteção sem restringir acrobacias.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Farda Militar Reforçada</strong><span class="font-mono font-bold text-amber-900">CA 15 (Média)</span></div>
            <p class="text-stone-800 mt-1">Placas de aço costuradas sob o tecido da caserna com colete balístico primitivo de trincheira.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded-lg border border-amber-900/20">
            <div class="flex justify-between items-center"><strong class="font-serif text-amber-950 text-sm">Exo-Couraça Pesada</strong><span class="font-mono font-bold text-amber-900">CA 18 (Pesada)</span></div>
            <p class="text-stone-800 mt-1">Chassi de ferro fundido com placas de latão nos ombros e peito. Desvantagem em Furtividade e Natação.</p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO VII: O COMPÊNDIO DAS 15 CLASSES
  // =========================================================================
  {
    id: 7,
    roman: "VII",
    title: "O Compêndio das 15 Classes",
    subtitle: "As Vocações Fundamentais de The Core",
    iconName: "Shield",
    summary: "Todas as 15 classes oficiais com suas citações, contexto histórico, bônus numéricos, proficiências, equipamentos iniciais (£) e habilidades com Psique.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          A sua <strong>Classe</strong> define o seu papel no mundo dos homens e nas sombras do sobrenatural. Cada classe concede bônus permanentes de atributos, um conjunto de proficiências de ofício, equipamentos de sobrevivência com moedas em <strong>Libras Esterlinas (£)</strong> e uma <strong>Habilidade Especial</strong> única acionada através do esforço da <strong>Psique</strong>.
        </p>

        <div class="space-y-4">
          <!-- 1. Cirurgião / Médico -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">1. Cirurgião / Médico</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Medicina Moderna</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Mestre da anatomia, do cálculo e da frieza necessária para abrir um corpo vivo. Conhece os limites da carne, e também os da ética, às vezes cruzando-os em nome da vida — ou da curiosidade."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Medicina, +1 Força de Vontade</p>
              <p><strong>Proficiências:</strong> Ferramentas cirúrgicas, remédios modernos, anestesia, anatomia humana.</p>
              <p><strong>Itens Iniciais:</strong> Bolsa médica de couro, bisturi de precisão, frascos de anestesia, diário clínico, bandagens estéreis, <strong>20 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Corte Preciso</strong>
                <p class="text-stone-800 text-xs">Pode gastar <strong>1 ponto de Psique</strong> para realizar cirurgia de emergência no meio de uma cena: cura <strong>10 HP</strong> no ato, mas o alvo sofre -1 em ações físicas até o fim da cena devido à dor dos pontos recentes.</p>
              </div>
            </div>
          </div>

          <!-- 2. Curandeiro(a) -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">2. Curandeiro(a)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Tradição Ancestral</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Conhece mais corpos do que túmulos. Viu vidas começarem e acabarem na mesma noite. Parteira, curandeira ou bruxa — depende de quem pergunta. Em Thornfield, a medicina nunca foi só bisturi — é chá, toque e sussurros para afastar maus espíritos."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Intuição, +1 Medicina</p>
              <p><strong>Proficiências:</strong> Poções, ervas medicinais, venenos leves, partos, tratamentos e rezas populares.</p>
              <p><strong>Itens Iniciais:</strong> Cesto de raízes e chás secos, tesoura de parteira, cordão de oração, água benta ou maldição guardada, 3 pomadas naturais, <strong>15 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Mão entre os Mundos</strong>
                <p class="text-stone-800 text-xs">Uma vez por dia, pode curar um personagem morrendo, trazendo-o de volta do limiar com <strong>1 HP</strong>. No entanto, o personagem revive com uma <strong>marca</strong> (sonhos estranhos, hematoma em forma de mão no peito ou perda parcial de memória).</p>
              </div>
            </div>
          </div>

          <!-- 3. Boticário -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">3. Boticário</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Química & Alquimia</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Trabalha com compostos químicos, fórmulas e poções. Conhece bem as reações — físicas e humanas. Seu laboratório é um refúgio de lógica em meio ao caos da vida."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Intuição, +1 Medicina</p>
              <p><strong>Proficiências:</strong> Compostos químicos, toxinas, antídotos, manipulação farmacêutica, perfumes e solventes.</p>
              <p><strong>Itens Iniciais:</strong> Kit de alquimia portátil com almofariz, 2 poções (cura ou veneno à escolha), receita secreta de família, óculos de proteção de latão, <strong>18 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Preparação Antecipada</strong>
                <p class="text-stone-800 text-xs">No início de cada dia de repouso, pode preparar <strong>1 frasco adicional</strong> (cura leve, veneno paralisante ou outra mistura simples). Ganha vantagem em qualquer teste de conhecimento sobre doenças ou substâncias químicas.</p>
              </div>
            </div>
          </div>

          <!-- 4. Clerical / Religioso -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">4. Clerical / Religioso</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Fé & Autoridade</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Representante da fé na vila. Pode ser padre, pastora, monge, beata ou eremita — não importa o título, sua presença pesa como ferro. Mistura teologia, cuidado pastoral e autoridade moral. Conhece ritos, segredos e a escuridão que espreita o espírito."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Lábia, +1 Religião (ou Teologia/Mito)</p>
              <p><strong>Proficiências:</strong> Retórica, rituais religiosos, leitura de sinais do além, aconselhamento moral.</p>
              <p><strong>Itens Iniciais:</strong> Livro sagrado com anotações em latim, vela de cera pura para rituais, colar com símbolo sagrado de prata, frasco de água benta, <strong>10 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Voz que Guia</strong>
                <p class="text-stone-800 text-xs">Uma vez por dia, pode inspirar um aliado com palavras sagradas: o alvo <strong>remove 1 ponto de Loucura</strong> ou ganha <strong>+1 de bônus</strong> em uma rolagem social imediata.</p>
              </div>
            </div>
          </div>

          <!-- 5. Detetive -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">5. Detetive</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Investigação</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Forasteiro ou não, cético, determinado. Veio atrás de verdades, talvez por dinheiro, talvez por vingança, ou apenas porque não consegue evitar seguir rastros. Em Thornfield, há perguntas demais — e algumas respostas nunca deveriam ser encontradas."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Intuição, +1 Percepção</p>
              <p><strong>Proficiências:</strong> Interrogatório, dedução de pistas, rastreamento urbano, gazuas e fechaduras.</p>
              <p><strong>Itens Iniciais:</strong> Caderno com pistas riscadas, arma oculta sob o casaco (canivete, soco-inglês ou revólver leve), trinco de porta antigo (gazua), <strong>18 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Verdade</strong>
                <p class="text-stone-800 text-xs">Pode gastar <strong>1 ponto de Psique</strong> para perceber instantaneamente se alguém está mentindo ou dissimulando, mesmo sem provas físicas — ou para obter uma pista narrativa crucial sobre uma pessoa ou cena de crime.</p>
              </div>
            </div>
          </div>

          <!-- 6. Arqueólogo / Antropólogo -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">6. Arqueólogo / Antropólogo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">História Oculta</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Veio estudar o passado... e encontrou algo que o encara de volta. Especialista em símbolos, cultura e ruínas — mas por dentro começa a ruir também. O que era só um campo de estudo se tornou um campo de ecos antigos e mistérios que mudam a mente."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Raciocínio, +1 Mito</p>
              <p><strong>Proficiências:</strong> Linguagens antigas, identificação de relíquias, decifração de glifos e runas.</p>
              <p><strong>Itens Iniciais:</strong> Diário de pesquisa de campo, conjunto de ferramentas (pincel fino, estilete afiado, lente de precisão), fragmento fóssil de objeto estranho, <strong>12 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Eco do Passado</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena, pode gastar <strong>1 ponto de Psique</strong> para reconhecer símbolos, arquiteturas ou padrões sobrenaturais esquecidos, evitando armadilhas milenares e revelando o propósito oculto de relíquias.</p>
              </div>
            </div>
          </div>

          <!-- 7. Artista de Circo / Saltimbanco -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">7. Artista de Circo / Saltimbanco</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Agilidade & Trapaça</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Cresceu entre caravanas e aplausos. Seja um trapezista, um ilusionista ou um domador, o artista de circo possui um corpo treinado para o impossível e uma mente acostumada a enganar os sentidos. No circo, aprende-se que o medo é apenas parte do show."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Acrobacia, +1 Lábia ou Atuação (Teatralidade)</p>
              <p><strong>Proficiências:</strong> Prestidigitação (mãos leves), equilíbrio em cordas, arremesso de facas, disfarce, escapologia.</p>
              <p><strong>Itens Iniciais:</strong> Baralho de tarô gasto com cartas marcadas ou kit de maquiagem, 3 facas de arremesso balanceadas, figurino de apresentação, corrente ou corda de seda, <strong>12 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: O Grande Truque</strong>
                <p class="text-stone-800 text-xs">Pode gastar <strong>1 ponto de Psique</strong> para realizar uma manobra evasiva ou de distração espetacular: ganha vantagem imediata em um teste de Esquiva OU permite que um aliado passe despercebido por inimigos enquanto atrai toda a atenção para si por um turno.</p>
              </div>
            </div>
          </div>

          <!-- 8. Ferreiro / Armeiro -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">8. Ferreiro / Armeiro</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Metalurgia & Fogo</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Filho da forja e mestre dos metais, o Ferreiro/Armeiro é habilidoso tanto na criação quanto na manutenção de armas de fogo e lâminas. Conhecedor das tecnologias e ofícios, ele pode forjar, ajustar e reparar qualquer armamento com destreza e precisão. Sua conexão com o fogo da forja e o aço o torna um verdadeiro mestre das armas."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Força, +1 Mecânica (Ofício)</p>
              <p><strong>Proficiências:</strong> Forja de metais, balística prática, reparos mecânicos, lâminas pesadas.</p>
              <p><strong>Itens Iniciais:</strong> Martelo pesado de forja, revólver de tambor ou espingarda de cano duplo, conjunto de ferramentas de reparos, <strong>5 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Ferreiro</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena, pode ajustar ou reparar uma arma em campo: role <strong>1d20</strong>. Se tirar <strong>12 ou mais</strong>, adiciona um aprimoramento à arma: <strong>+1 de Dano</strong>, <strong>+1 de Precisão</strong> ou <strong>+1 de Resistência/Durabilidade</strong>.</p>
              </div>
            </div>
          </div>

          <!-- 9. Caçador / Rastreador -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">9. Caçador / Rastreador</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Floresta & Sangue</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Filho da floresta, acostumado ao silêncio, ao sangue e ao faro. Ninguém conhece os caminhos da mata como ele — nem os sinais de que algo antigo passou por lá."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Sobrevivência, +1 Mira</p>
              <p><strong>Proficiências:</strong> Rastreamento, armadilhas, arco e flecha, espingarda, camuflagem natural.</p>
              <p><strong>Itens Iniciais:</strong> Arco composto ou espingarda leve, faca de caça de lâmina denteada, capa camuflada tratada contra chuva, 5 armadilhas de mola de ferro, <strong>10 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Presa</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena, role <strong>1d20</strong>: com resultado <strong>10 ou mais</strong>, move-se sem ser detectado mesmo em áreas vigiadas ou rastreia algo impossível (criatura mística, presença oculta ou fugitivo dias após o rastro) com precisão sobrenatural.</p>
              </div>
            </div>
          </div>

          <!-- 10. Militar de Carreira -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">10. Militar de Carreira</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Tática & Trincheira</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Veio de uma vida de ordens, estratégias e sobrevivência. Pode ser ex-capitão, sargento ou apenas alguém que viveu na caserna tempo o bastante pra nunca mais ser o mesmo. Sabe como agir sob pressão e como fazer os outros obedecerem."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Vigor, +1 Mira</p>
              <p><strong>Proficiências:</strong> Armas de fogo militares, armamento padrão, comando tático sob estresse.</p>
              <p><strong>Itens Iniciais:</strong> Farda antiga de combate, coldre de couro engraxado, pistola leve de serviço, faca de trincheira militar, medalha pessoal de condecoração, <strong>20 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Combate</strong>
                <p class="text-stone-800 text-xs">Age sempre primeiro em situações de perigo ou emboscada. Uma vez por cena, pode bradar uma ordem militar enfática que concede <strong>vantagem imediata</strong> na próxima ação de um aliado sob seu comando.</p>
              </div>
            </div>
          </div>

          <!-- 11. Professor(a) / Erudito(a) -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">11. Professor(a) / Erudito(a)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Erudição & Letras</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Educador ou educadora, versado nas letras, ciências, línguas ou filosofia. Pode ter lecionado em escolas da cidade grande ou ensinado meia dúzia de crianças na vila. Em tempos de superstição, saber é poder — e perigo."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Conhecimento, +1 Raciocínio</p>
              <p><strong>Proficiências:</strong> Leitura e escrita avançadas, idiomas antigos e modernos, história geral, dialética e debates.</p>
              <p><strong>Itens Iniciais:</strong> Caderno de anotações pedagógicas, conjunto de pena e tinteiro negro, óculos de aro de latão, exemplar de livro histórico raro, <strong>15 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Lição Certeira</strong>
                <p class="text-stone-800 text-xs">Pode usar um turno fora de combate para explicar um conceito difícil ou estratagema: o aliado instruído recebe <strong>vantagem em testes de resolução mental</strong> OU um bônus de <strong>+1 em testes de estratégia e planejamento durante 1 hora</strong>.</p>
              </div>
            </div>
          </div>

          <!-- 12. Engenheiro / Carpinteiro -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">12. Engenheiro / Carpinteiro</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Construção & Estrutura</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Mãos calejadas, olhos atentos às rachaduras. Conhece cada fresta, cada rangido do vilarejo. Trabalha com madeira, mas entende de gente — e sabe quando uma estrutura está prestes a ruir, seja uma casa ou uma alma."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Ofício (carpintaria ou engenharia), +1 Percepção</p>
              <p><strong>Proficiências:</strong> Estruturas de madeira e pedra, instrumentos de medição, entalhe de precisão, barricadas.</p>
              <p><strong>Itens Iniciais:</strong> Conjunto de ferramentas de carpintaria e entalhe (serrote, formões, esquadro), faca de entalhe, miniatura de casa em madeira, <strong>16 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Estrutura Oculta</strong>
                <p class="text-stone-800 text-xs">Pode gastar <strong>1 ponto de Psique</strong> para perceber fragilidades arquitetônicas, passagens secretas ou pontos de colapso em construções. Também pode improvisar barricadas ou esconderijos fortificados com bônus narrativos de cobertura.</p>
              </div>
            </div>
          </div>

          <!-- 13. Marinheiro / Lobo do Mar -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">13. Marinheiro / Lobo do Mar</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Navegação & Convés</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"O mar não perdoa fraqueza e não aceita desculpas. Quem aprendeu a ficar de pé em um convés ensanguentado durante uma tempestade não cai fácil em terra firme."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Atletismo, +1 Sobrevivência</p>
              <p><strong>Proficiências:</strong> Nós náuticos, manuseio de cordas e amarras, previsão do tempo/clima, arpões, combate com ferramentas improvisadas, natação.</p>
              <p><strong>Itens Iniciais:</strong> Faca de marinheiro (navalha de ponta chata), gorro de lã escura, bússola de latão de bolso, cantil com rum ou gim, rolo de corda naval resistente de 10 metros, <strong>12 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Pés no Convés</strong>
                <p class="text-stone-800 text-xs">Possui equilíbrio sobrenatural: nunca é derrubado no chão por pisos escorregadios, óleo ou balanço. Uma vez por cena, pode gastar <strong>1 ponto de Psique</strong> para ignorar completamente qualquer penalidade de fadiga física, atordoamento ou enjoo.</p>
              </div>
            </div>
          </div>

          <!-- 14. Pirata / Corsário -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">14. Pirata / Corsário</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Armadas & Abordagem</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Não há leis a dez nós da costa. O mundo pertence a quem tem coragem de içar a bandeira e puxar o gatilho primeiro."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Acrobacia, +1 Luta (ou Lábia)</p>
              <p><strong>Proficiências:</strong> Sabres/cutelos navais, pistolas de cano curto, abordagem rápida, intimidação, trapaça em jogos de azar.</p>
              <p><strong>Itens Iniciais:</strong> Cutelo curto naval ou sabre de fita, revólver de tambor pesado, jaqueta de couro naval com botões de osso, luneta retrátil de latão, moeda da sorte de armada pirata, <strong>16 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Salto de Abordagem</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para se projetar acrobaticamente sobre um inimigo: seu próximo ataque no turno ganha <strong>vantagem</strong>, causa <strong>+1d6 de dano de corte/impacto</strong> e faz o alvo <strong>largar a arma ou cair de bruços</strong>.</p>
              </div>
            </div>
          </div>

          <!-- 15. Navegador / Cartógrafo das Marés -->
          <div class="p-4 bg-stone-100/95 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">15. Navegador / Cartógrafo das Marés</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Cartas & Astrolábio</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"As estrelas não mentem, os homens sim. Dê-me um astrolábio e dez minutos de céu limpo, e eu levarei este navio através do próprio inferno."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Raciocínio, +1 Percepção</p>
              <p><strong>Proficiências:</strong> Astrolábio e sextante, cartas náuticas, leitura das constelações, sinais de código morse, geografia marítima.</p>
              <p><strong>Itens Iniciais:</strong> Sextante de latão em estojo acolchoado, tubo de couro com cartas náuticas em pergaminho, relógio de bolso com cronômetro, compasso de desenho náutico, lanterna de querosene fechada, <strong>15 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-50 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Caminho das Correntes</strong>
                <p class="text-stone-800 text-xs">Pode gastar <strong>1 ponto de Psique</strong> para decifrar em segundos correntes marinhas, rotas cegas ou relevo urbano, descobrindo passagens secretas de fuga que anulam chances de emboscada e reduzem o tempo de viagem do grupo pela metade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO VIII: AS LINHAGENS DE CORE (SEM RESUMOS!)
  // =========================================================================
  {
    id: 8,
    roman: "VIII",
    title: "As Linhagens de Core",
    subtitle: "Povos, Raças e Heranças do Sangue Ancestral",
    iconName: "Users",
    summary: "O compêndio integral e minucioso de todas as 11 linhagens de Core: textos descritivos originais, atributos vitais base, porte e conexão cósmica.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, a raça de um personagem é muito mais do que sua aparência externa: é o alicerce de sua resistência biológica e a medida de sua conexão com a Essência do mundo. Cada linhagem possui uma <strong>Base Biológica</strong> — um conjunto de valores numéricos fixos que representam a resistência natural daquela espécie antes mesmo de considerarmos o treinamento ou a profissão individual.
        </p>

        <div class="p-4 bg-amber-100/90 rounded-xl border-l-4 border-amber-800 text-stone-950 text-xs italic leading-relaxed">
          "As linhagens que caminharam sobre a terra antes do Dilúvio de Esquecimento não desapareceram; elas apenas silenciaram. O sangue dos Draconatos e a astúcia dos Gnomos ainda correm nas veias da humanidade de 1900, adormecidos sob séculos de lógica e ciência. Mas o 'Core' está despertando, e o que antes era mito está prestes a se tornar carne novamente."
        </div>

        <div class="space-y-4">
          <!-- HUMANOS -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🧬 Detalhes da Linhagem: Humanos</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio (1,50m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Os humanos em The Core são definidos por sua centelha de determinação. Eles não possuem reservas infinitas de energia mística, mas sua alma é resiliente e capaz de lampejos de poder extraordinário sob pressão. Enquanto outras raças se definem por heranças ancestrais rígidas, os humanos são o "coringa" do universo. Eles habitam desde cidades tecnológicas até vilarejos esquecidos, adaptando sua cultura e moral conforme a necessidade. No sistema The Core, ser humano significa ter o potencial de se especializar em qualquer caminho: um humano pode não ter a visão de um elfo ou a resistência de um anão, mas sua capacidade de aprender novos ofícios e sua teimosia em não aceitar a derrota os torna os arquitetos da civilização moderna. Eles são movidos pela ambição e pela necessidade de deixar um legado antes que sua vida curta se apague.
            </p>
          </div>

          <!-- ANÕES -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⛏️ Detalhes da Linhagem: Anões</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio/Largo (1,20m a 1,50m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 4</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Os anões são as pedras angulares do mundo físico. Criaturas de ossos densos e mentes focadas, eles possuem uma resistência biológica que beira o sobrenatural. Diferente dos humanos, a resistência do anão não vem apenas da vontade, mas de uma constituição física bruta. Seu SI (Sistema Imune) elevado os torna praticamente imunes a toxinas que matariam outras raças. Em The Core, um anão é sinônimo de estabilidade: eles são artesãos excepcionais e guardiões de tradições que duram milênios. Sua conexão com a terra e os metais lhes confere uma mente difícil de ser abalada por ilusões, mas sua natureza metódica pode ser uma barreira quando a improvisação é necessária.
            </p>
          </div>

          <!-- ELFOS -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🍃 Detalhes da Linhagem: Elfos</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio/Esguio (1,70m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 8</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 10</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 6</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 1</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Seres de sentidos aguçados e longevidade melancólica. Os elfos percebem o mundo de uma forma mais vibrante — e por vezes mais terrível — que as outras raças. Possuem uma elegância inata que se traduz em sua CA Base, movendo-se com uma fluidez que desafia o olhar. Sua Psique é naturalmente expandida devido à sua conexão intrínseca com a Essência do mundo, o que lhes confere um dado de essência superior (1d6). No entanto, essa sensibilidade extrema tem um preço: seus corpos são mais frágeis e seu sistema imunológico é menos adaptado às pragas mundanas. Um elfo em The Core é alguém que vê o que outros ignoram, carregando o peso de séculos de memórias em uma mente que nunca dorme verdadeiramente.
            </p>
          </div>

          <!-- MEIO-ELFO -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌓 Detalhes da Linhagem: Meio-Elfo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio (1,60m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 11</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              A ponte entre dois mundos. No passado, eram diplomatas ou párias; no universo de The Core, representam a fusão viva das linhagens. O Meio-Elfo equilibra a fragilidade élfica com a determinação humana. Eles possuem uma adaptabilidade única, permitindo que naveguem tanto em círculos sociais refinados quanto em ambientes selvagens. Eles herdam a conexão espiritual elevada (1d6 de Essência), mas com uma estrutura física consideravelmente mais robusta que seus parentes de sangue puro.
            </p>
          </div>

          <!-- DROW (ELFOS NEGROS) -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌑 Detalhes da Linhagem: Drow (Elfos Negros)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio/Esguio (1,60m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 11</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 5</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 3</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Os Drow são sobreviventes do isolamento e da escuridão. Adaptados a ambientes hostis onde a luz nunca chega, sua biologia reflete uma vida inteira de vigilância e perigo. Morfologicamente semelhantes aos elfos da superfície, desenvolveram reflexos ainda mais letais para sobreviver em emboscadas, elevando sua CA Base ao ápice. Eles possuem uma mente afiada para a estratégia e para o oculto, embora a severidade de sua vivência muitas vezes torne sua Psique um campo de batalha interno. Em The Core, um Drow é um mestre da furtividade e do sacrifício calculado, sabendo exatamente o valor de cada gota de essência gasta nas sombras.
            </p>
          </div>

          <!-- MEIO-DROW -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌓 Detalhes da Linhagem: Meio-Drow</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio (1,60m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 11</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Indivíduos que carregam o peso da noite no sangue, mas caminham sob a luz do dia. O Meio-Drow preserva os reflexos excepcionais de esquiva dos elfos das profundezas somados à tenacidade e adaptabilidade dos humanos, funcionando como intermediários e batedores que navegam territórios cinzentos.
            </p>
          </div>

          <!-- HALFLING -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">👣 Detalhes da Linhagem: Halfling</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Pequeno (0,80m a 1,00m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 8</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 12</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d4*</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Pequenos, ágeis e estranhamente afortunados. No passado remoto de The Core, os Halflings eram nômades que sobreviviam através da invisibilidade social e da sorte pura. Possuem uma CA Base muito elevada (12) não por blindagem corporal, mas por serem alvos minúsculos, rápidos e dotados de um instinto de autopreservação quase premonitório. Sua mente é surpreendentemente otimista e resiliente contra o desespero. <em>*Habilidade Especial de Linhagem: Podem rerrolar qualquer resultado '1' em rolagens do Dado de Essência.</em>
            </p>
          </div>

          <!-- DRACONATO -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🐲 Detalhes da Linhagem: Draconato</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Grande (1,90m a 2,20m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 15</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 14</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 3</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d8</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Descendentes de linhagens titânicas ancestrais. No mundo antigo, eles eram a personificação do poder físico e da autoridade elemental. Com o maior HP Base inicial de todo o sistema (15) e escamas que garantem CA 14 natural, o Draconato é uma verdadeira fortaleza biológica. Sua estrutura óssea e couraça oferecem proteção que poucas armaduras humanas conseguem igualar. São movidos pela honra, pelo juramento do sangue e pela autoridade marcial. Sua presença emana imponência bélica inconfundível.
            </p>
          </div>

          <!-- GNOMO -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⚙️ Detalhes da Linhagem: Gnomo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Pequeno (0,90m a 1,10m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 7</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 9</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 5</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Mestres da curiosidade e da manipulação engenhosa da matéria. Enquanto o mundo antigo era movido por espadas e superstições, os Gnomos já enxergavam as engrenagens e frequências por trás da realidade. Possuem a maior Psique Base inicial do jogo (5); suas mentes são labirintos de lógica e criatividade, tornando-os quase imunes a perturbações mentais comuns. Eles veem a Essência como uma ferramenta científica e mecânica a ser moldada em invenções revolucionárias.
            </p>
          </div>

          <!-- MEIO-ORC -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">👹 Detalhes da Linhagem: Meio-Orc</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Grande (1,80m a 2,10m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 12</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 14</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 1</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 4</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              A força bruta forjada na necessidade imperativa de sobrevivência extrema. Focados em HP (12) e em um Sistema Imune monumental (4), os Meio-Orcs são praticamente impossíveis de serem abatidos por doenças, frio ou fadiga. Sua Psique inicial é baixa (1), pois sua natureza é totalmente voltada à ação física e ao instinto primordial de sobrevivência, deixando pouco espaço para dilemas teóricos ou introspecção. Em combate, são vanguardas intransponíveis.
            </p>
          </div>

          <!-- TIEFLING -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🔱 Detalhes da Linhagem: Tiefling</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio (1,60m a 1,90m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 4</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 1</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d8</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Marcados por uma ascendência que a história das igrejas tentou apagar. Sua existência é a prova viva de que o Verbo pode transmutar o sangue humano. Carregam uma Psique alta (4) e uma das conexões mais profundas com o lado sombrio e cósmico da Essência (Dado 1d8). Suas mentes foram calejadas pelo estigma social e pela solidão, desenvolvendo uma vontade espiritual exótica capaz de manifestar fenômenos que desafiam o dogma comum.
            </p>
          </div>

          <!-- AUTÔMATOS & FORJADOS A ÉTER -->
          <div class="p-4 bg-stone-100/95 rounded-xl border-2 border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⚙️ Detalhes da Linhagem: Autômatos & Forjados</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Porte Médio/Pesado (1,70m a 2,00m)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 12</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 12</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 5</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-bold col-span-2 sm:col-span-1">Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Seres construídos de bronze, ferro fundido e engrenagens de relógio, animados por um núcleo pulsante de cristal e fluido de éter. Não respiram, não necessitam de sono biológico nem de ração comum. Seu Sistema Imune (5) confere imunidade total a toxinas biológicas e infecções de sangue, embora sejam suscetíveis a magnetismo extremo e corrosão química ácida.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO IX: DONS DO CERNE & FARDOS DO VERBO
  // =========================================================================
  {
    id: 9,
    roman: "IX",
    title: "Dons do Cerne & Fardos do Verbo",
    subtitle: "O Compêndio Integral de Ecos, Níveis e Patologias",
    iconName: "Scroll",
    summary: "A lista completa e sem resumos: todos os Dons do Cerne com seus níveis de 0 a 5, custos de XP, mecânicas e todos os Fardos do Verbo com suas cepas e consequências.",
    contentHtml: `
      <div class="space-y-8">
        <div class="p-4 rounded-xl bg-amber-100/90 border-l-4 border-amber-800 text-stone-950 leading-relaxed text-xs shadow-sm">
          <strong>Aviso do Mestre:</strong> Certas almas carregam marcas místicas únicas: <strong>Dons do Cerne</strong> (habilidades sobrenaturais compradas com Pontos de Experiência - XP) e <strong>Fardos do Verbo</strong> (patologias e maldições que cobram um preço cruel, mas concedem bônus de XP na criação do personagem). Abaixo constam todas as regras integrais.
        </div>

        <!-- SEÇÃO: DONS DO CERNE -->
        <div>
          <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/40 pb-2 mb-4 flex items-center justify-between">
            <span>Dons do Cerne (Habilidades do Eco)</span>
            <span class="text-xs font-sans font-normal text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">Comprados com XP</span>
          </h3>

          <div class="space-y-4">
            <!-- Sempre Vivo -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Sempre Vivo</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">8 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Quando um personagem com essa característica morre, ele volta à vida no próximo amanhecer. No entanto, ele retorna com <strong>metade do seu HP máximo</strong> e <strong>menos 1 ponto de Psique permanentemente</strong>.
              </p>
            </div>

            <!-- Caminhante -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Caminhante (Diálogo com os Mortos)</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Níveis 0 a 4</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Capazes de cruzar palavras com os ecos de quem já partiu.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> É capaz de dialogar com indivíduos mortos na última semana, desde que esteja em presença física do cadáver.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Caso conheça o nome e o rosto de uma pessoa, você sabe se ela morreu na última semana, sem necessidade de ver o corpo.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Pode dialogar com mortos da última semana à distância (sem o corpo físico), necessitando apenas de seu nome e rosto.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Pode dialogar com qualquer indivíduo morto na última década, necessitando de seu nome e fisionomia.</li>
                <li><strong>Nível 4 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Pode dialogar com qualquer falecido independente do tempo decorrido de sua morte, necessitando apenas de seu nome e rosto.</li>
              </ul>
            </div>

            <!-- Parasita de Morto -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Parasita de Morto</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Níveis 0 a 3</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Geralmente malvistos, pois seus entes queridos e inimigos passam a habitar dentro dele.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Quando um personagem com quem você tem uma relação forte (positiva ou negativa) morre, você assimila permanentemente a perícia mais alta dele em nível 1.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Ao presenciar a morte de uma pessoa próxima de boa relação, assimila os 2 atributos mais altos dela com +1 temporário por 24 horas.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[3 XP]:</span></strong> Ao presenciar a morte de alguém próximo (boa ou má relação), assimila os 2 atributos mais altos e fragmentos cruciais de memória.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[4 XP]:</span></strong> Assimila os atributos e memórias sem necessidade de presenciar a morte física, bastando o vínculo em vida.</li>
              </ul>
            </div>

            <!-- Morto por Nós -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Morto por Nós</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">4 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                O portador é capaz de absorver ferimentos abertos, dores, envenenamentos e doenças de outro ser vivo para o seu próprio corpo de forma instantânea através do toque, livrando a outra pessoa da aflição.
              </p>
            </div>

            <!-- Tecelão de Sonho -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Tecelão de Sonho</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Níveis 0 a 3</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Caminham pelo subconsciente e manipulam a matéria dos pesadelos.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Ao dormir perto de outros, arrasta conscientemente sua mente para o mesmo plano onírico.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Consegue moldar a ambientação do sonho compartilhado.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Faz o sonho ser focado em uma memória ou trauma específico de um dos sonhadores.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[3 XP]:</span></strong> Forja e planta ideias sutis no subconsciente dos afetados, que acordam acreditando que a conclusão foi deles.</li>
              </ul>
            </div>

            <!-- Habitante de Olhos -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Habitante de Olhos</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Níveis 0 a 3</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Projetam sua consciência nas pupilas alheias. O portador entra em transe/inconsciência durante o uso.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Enxerga através dos olhos de animais com os quais possui familiaridade prévia.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Toma o controle motor do corpo de um animal familiar (se feri-lo, perde o vínculo).</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Enxerga através dos olhos de animais desconhecidos sem necessidade de vínculo.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Assume o corpo de animais desconhecidos e é capaz de enxergar através dos olhos de outros seres humanos.</li>
              </ul>
            </div>

            <!-- Fala Selvagem -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Fala Selvagem</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Níveis 0 a 4</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Compreensão da linguagem silenciosa das florestas e das feras.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Ouve o murmúrio coletivo de árvores e bandos anunciando pragas ou mudanças climáticas violentas.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Dialoga com árvores individuais (lembranças da composição da terra, passos na mata).</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> É capaz de falar com animais (conceitos simples e diretos).</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Forja pactos com animais e árvores com recompensas claras e mútuas.</li>
                <li><strong>Nível 4 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Acessa memórias profundas de plantas e animais no ciclo inverso do dia/noite.</li>
              </ul>
            </div>

            <!-- Alma Silvestre -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Alma Silvestre</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">5 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Eco raríssimo (menos de 15 por geração). Permite que qualquer um que entre em contato físico ceda HP, ferimentos e males físicos para o possuído, assim como ele pode ceder seus próprios pontos de HP para outros. Também nutre a flora ao seu redor com sua vitalidade. Não exige consentimento: <strong>basta contato físico contínuo por mais de 1 minuto</strong>.
              </p>
            </div>

            <!-- Forjador de Vida -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-950 text-base">Forjador de Vida</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">12 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Concedido por arcanos que abençoam os mais ambiciosos. Capazes de criar vidas distorcidas e homúnculos usando como base corpos (vivos ou mortos), utilizando-se da vitalidade alheia ou da sua própria para forjar autômatos biológicos.
              </p>
            </div>

            <!-- Ascendência do Verbo (Com alto contraste perfeito para leitura!) -->
            <div class="p-5 rounded-xl bg-amber-100/95 border-2 border-amber-800 shadow-md">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-lg">Ascendência do Verbo</h4>
                <span class="px-3 py-1 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Custo Definido pelo Mestre</span>
              </div>
              <p class="text-xs font-bold text-amber-900 mt-2 leading-relaxed text-justify">
                Há poder no sangue... Você faz parte de uma linhagem direta do Verbo Primordial.
              </p>
              <div class="mt-3 p-3 bg-white/90 rounded border border-amber-800/40 text-xs leading-relaxed space-y-2 text-stone-900 shadow-sm">
                <p><strong>&bull; Custo em XP:</strong> [X de XP] &mdash; A quantidade de XP não é fixa em tabela porque é definida pelo Mestre com base no ancestral em questão e na magnitude da sua força cósmica.</p>
                <p><strong>&bull; Bênção do Antecessor:</strong> Dê a ideia de habilidades específicas que deseja manifestar com sua linhagem ancestral, e o Mestre fará o balanceamento e definirá o custo exato em XP para o seu personagem.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SEÇÃO: FARDOS DO VERBO -->
        <div class="mt-8">
          <h3 class="text-xl font-bold font-serif text-red-950 border-b-2 border-red-900/40 pb-2 mb-4 flex items-center justify-between">
            <span>Fardos do Verbo (Patologias e Maldições)</span>
            <span class="text-xs font-sans font-normal text-red-900 bg-red-200/60 px-3 py-1 rounded-full font-bold">Concedem Bônus de XP</span>
          </h3>

          <div class="space-y-4">
            <!-- Doença Pálida -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença Pálida (Vampirismo)</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+4 a +8 XP</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Deforma o corpo e impõe desvantagens severas em troca de muito pouco.</p>
              <p class="text-xs text-stone-800 leading-relaxed text-justify">
                Todos que sofrem da doença precisam consumir sangue ao invés de comida, curando <strong>1d6 HP</strong> toda vez que se alimentam. Sofrem <strong>1d4 de dano</strong> para cada turno que ficam expostos à luz solar direta. São capazes de ver no escuro. Ao se alimentar de humano vivo, há 15% de chance de contaminá-lo.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 text-xs">
                <div class="p-2 bg-stone-200/60 rounded border border-red-900/20"><strong>Nobre [+4 XP]:</strong> Dificuldade de todos os testes de Carisma reduzida em 1.</div>
                <div class="p-2 bg-stone-200/60 rounded border border-red-900/20"><strong>Comum [+6 XP]:</strong> Sem bônus de atributos sociais.</div>
                <div class="p-2 bg-stone-200/60 rounded border border-red-900/20"><strong>Bestial [+8 XP]:</strong> Atletismo e Destreza tornam-se 5 permanentemente, mas Intelecto e Conhecimento tornam-se 1 pelo resto da vida.</div>
              </div>
            </div>

            <!-- Doença da Fera -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença da Fera (Licanotropia & Penas Negras)</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+6 a +10 XP</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">A mais prolífica linhagem da aflição lupina e avícola ancestral.</p>
              <div class="space-y-2 text-xs text-stone-800 text-justify">
                <p><strong>Lobisomens [+10 XP]:</strong> Sob a lua cheia ou estresse violento, o portador transmuta em uma besta lupina descomunal. Causa 1d10 de corte com garras, regenera 2 HP por rodada, mas perde o discernimento moral, atacando qualquer ser vivo que não compartilhe seu sangue ancestral.</p>
                <p><strong>Penas Negras [+6 XP]:</strong> Cepa mais branda; ossos ocos e plumagem negra irrompendo pelas omoplatas. Permite planar em correntes de vento, mas o corpo torna-se vulnerável ao frio e a impactos contundentes.</p>
              </div>
            </div>

            <!-- Doença da Imortalidade -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença da Imortalidade</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+8 XP</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">A maldição existencial. Desejada por ambiciosos, odiada por quem a carrega.</p>
              <p class="text-xs text-stone-800 leading-relaxed text-justify">
                Os contaminados não sentem prazer em qualquer sensação carnal e perdem o paladar (somente sentem gosto caso consumam a própria carne). O envelhecimento é interrompido. Se consumir um membro amputado do próprio corpo, regenera a parte em questão (com exceção da decapitação total). Coisas que matariam um homem comum ainda o matam.
              </p>
            </div>

            <!-- Doença do Crispo -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença do Crispo</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+2 XP (+1/ano)</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">A patologia do flagelo da cristalização progressiva da carne.</p>
              <p class="text-xs text-stone-800 leading-relaxed text-justify">
                A doença cristaliza um órgão interno parcial ou completamente a cada ano, causando dor crônica atroz. Reduz a <strong>Psique em -2 permanentemente para cada ano de infecção</strong>. A cada 4 anos, reduz o atributo de <strong>Força em -1</strong>. Quando o portador morre, seu corpo cristaliza completamente em pedra vítrea em apenas 3 horas.
              </p>
            </div>

            <!-- Doença do Não Homem -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença do Não Homem (Gênese dos Black Walkers)</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+5 XP (+2/ano)</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">A mais aterradora das patologias do eco.</p>
              <p class="text-xs text-stone-800 leading-relaxed text-justify">
                Sinais vitais baixíssimos e perda paulatina da empatia (dificuldade de perceber emoções aumentada em +2). A pele escurece e os cabelos engrossam. Quando o portador morre, ele se reanima como um <strong>Black Walker</strong>:
              </p>

              <!-- TABELA BLACK WALKERS -->
              <div class="mt-3 overflow-x-auto rounded border border-red-900/30">
                <table class="w-full text-left text-xs bg-stone-50">
                  <thead class="bg-red-900/20 text-red-950 font-serif">
                    <tr>
                      <th class="py-1.5 px-2">Tempo Infectado</th>
                      <th class="py-1.5 px-2">HP do Reanimado</th>
                      <th class="py-1.5 px-2">Comportamento & Intelecto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-red-900/10 text-stone-900">
                    <tr><td class="py-1 px-2 font-bold">1 Ano</td><td class="py-1 px-2 font-mono">8 HP</td><td>Descerebrado, sem estratégia nem raciocínio.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">2 Anos</td><td class="py-1 px-2 font-mono">12 HP</td><td>Instinto violento irracional.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">3 Anos</td><td class="py-1 px-2 font-mono">16 HP</td><td>Desenvolve instinto de fuga quando encurralado.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">4 Anos</td><td class="py-1 px-2 font-mono">20 HP</td><td>Raciocínio rudimentar em emboscadas.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">5 Anos</td><td class="py-1 px-2 font-mono">24 HP</td><td>Comportamento de matilha e uso de pedras/paus.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">6 Anos</td><td class="py-1 px-2 font-mono">28 HP</td><td>Raciocínio equivalente ao de um ser humano comum.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">7 Anos</td><td class="py-1 px-2 font-mono">32 HP</td><td>Compreende armadilhas e linguagem humana.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">8 Anos</td><td class="py-1 px-2 font-mono">36 HP</td><td>Inteligência superior e manipulação tática.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">9 Anos</td><td class="py-1 px-2 font-mono">40 HP</td><td>Inteligência extraordinária e liderança de hordas.</td></tr>
                    <tr><td class="py-1 px-2 font-bold">10 Anos (Ápice)</td><td class="py-1 px-2 font-mono font-bold text-red-900">60 HP</td><td>Inteligência brilhante e implacável voltada à violência pura.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO X: A TRILHA DO NAVEGANTE & SISTEMA DE TAROT
  // =========================================================================
  {
    id: 10,
    roman: "X",
    title: "A Trilha do Navegante",
    subtitle: "Evolução, Tabela de XP e o Sistema de Tarot",
    iconName: "TrendingUp",
    summary: "Como evoluir seu protagonista ao longo da campanha, a tabela de custos de XP e como funcionam as cartas de Tarot e o Patrono Secreto.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          A experiência acumulada ao fim de cada sessão em <em>The Core of Man</em> não serve apenas para contar histórias — ela é a moeda com a qual seu protagonista fortalece o corpo, aguça a mente e expande a própria alma.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2">
          Tabela Geral de Custos em Experiência (XP)
        </h3>

        <div class="overflow-x-auto shadow-sm rounded-lg border border-amber-900/30">
          <table class="w-full text-left text-xs bg-stone-50">
            <thead class="bg-amber-900/20 text-amber-950 font-serif border-b border-amber-900/30">
              <tr>
                <th class="py-2.5 px-3 font-bold">Melhoria Adquirida</th>
                <th class="py-2.5 px-3 font-bold">Custo em XP</th>
                <th class="py-2.5 px-3 font-bold">Descrição & Limitações Mecânicas</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-900/10 text-stone-900">
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 Graduação em Perícia</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">3 XP</td>
                <td class="py-2.5 px-3">Aprimora seu treino específico (ex: Atletismo de 2 para 3). Respeita o teto de 2 &times; Atributo.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 Ponto em Atributo Comum</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">5 XP</td>
                <td class="py-2.5 px-3">Aumenta seu potencial inato corporal ou mental (ex: Força de 2 para 3).</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">Nova Proficiência</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">3 XP</td>
                <td class="py-2.5 px-3">Aprende o manejo de uma nova arma de fogo pesada, ferramenta técnica ou idioma estrangeiro.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 HP (Ponto de Vida)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">2 XP</td>
                <td class="py-2.5 px-3">Fortalece a resistência biológica da carne contra traumas letais.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 Ponto de Psique</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">3 XP</td>
                <td class="py-2.5 px-3">Amplia a reserva de sanidade mental e o combustível para manobras especiais de classe.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 SI (Sistema Imune)</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">3 XP</td>
                <td class="py-2.5 px-3">Aumenta as defesas celulares e místicas contra pragas, infecções e toxinas.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 Atributo de Força de Vontade</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">6 XP</td>
                <td class="py-2.5 px-3">Expande o canal primordial da sua alma e sua resiliência contra o sobrenatural.</td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-bold">+1 Perícia de Vontade</td>
                <td class="py-2.5 px-3 font-mono font-bold text-amber-900">4 XP</td>
                <td class="py-2.5 px-3">Aprimora <em>Mente</em>, <em>Alma</em>, <em>Corpo</em> ou a sua <em>Essência</em> mística.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- O SISTEMA DE TAROT & PATRONO OCULTO -->
        <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/30 pb-2 mt-6">
          O Destino: Tarot Pessoal e o Patrono Oculto
        </h3>
        <p class="text-xs text-stone-800 leading-relaxed text-justify">
          Durante o prólogo da história, cada protagonista é submetido a duas tiragens cósmicas conduzidas pelo Mestre:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-3">
          <div class="p-4 bg-stone-100 rounded-xl border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-950 text-sm mb-1">🃏 A Tríade dos 22 Arcanos Maiores</h4>
            <p class="text-stone-800 leading-relaxed mb-2">Simboliza as correntes do destino que regem a vida do seu personagem:</p>
            <ul class="list-disc list-inside space-y-1 text-stone-900">
              <li><strong>Carta do Passado:</strong> O arquétipo de suas origens, traumas de infância ou herança familiar.</li>
              <li><strong>Carta do Presente:</strong> O dilema ético e as provações enfrentadas no ano de 1939.</li>
              <li><strong>Carta do Futuro:</strong> A profecia ou encruzilhada trágica/heroica no horizonte do personagem.</li>
            </ul>
          </div>

          <div class="p-4 bg-stone-100 rounded-xl border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-950 text-sm mb-1">👁️ O Patrono Oculto</h4>
            <p class="text-stone-800 leading-relaxed mb-2">Uma entidade mística primordial que observa seus passos nas sombras:</p>
            <p class="text-stone-800 leading-relaxed">
              O Patrono nunca se repete entre os personagens da mesa e sua identidade é mantida sob segredo rigoroso. Em momentos de desespero e morte iminente, ele pode intervir com bênçãos salvadoras &mdash; mas toda intervenção cobra um preço amargo e dívidas de sangue futuras.
            </p>
          </div>
        </div>

        <div class="p-4 bg-amber-50 rounded-xl border-2 border-amber-800/40 text-center mt-6">
          <p class="font-serif font-bold text-amber-950 text-sm">
            "No princípio não havia o homem, apenas o Verbo. E o Verbo era a Fera, e a Fera era a Vontade."
          </p>
          <span class="text-xs text-stone-600 italic block mt-1">Guia Oficial do Jogador de The Core &bull; Edição 1939</span>
        </div>
      </div>
    `
  }
];
