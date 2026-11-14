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
    summary: "O primeiro passo do protagonista no mundo de 1939: o passo a passo da ficha, os 4 pilares vitais e as 6 perguntas fundamentais da Psique.",
    contentHtml: `
      <div class="space-y-6">
        <div class="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-800 text-stone-900 text-base italic leading-relaxed shadow-sm">
          "O caminho mais sábio que o homem pode fazer é conhecer a si mesmo sem mentiras ou meias verdades. A fonte do homem é a sua alma; ele pode até tentar fugir dela, mas sempre será em vão."
        </div>

        <p class="leading-relaxed text-stone-900 text-justify">
          O ano é 1939. O mundo respira a fumaça das chaminés industriais e a iminência sufocante da Segunda Grande Guerra. Mas por trás das manchetes dos jornais, das engrenagens fabris e das marchas militares na Europa, uma verdade muito mais antiga e silenciosa começou a despertar do esquecimento: <strong>o Cerne (The Core)</strong>.
        </p>

        <p class="leading-relaxed text-stone-900 text-justify">
          Nas névoas de cidades cobertas de fuligem, nos portos de marujos mercenários e nos ermos ancestrais intocados pela civilização moderna, o sangue dos Verbos voltou a pulsar. Seja você um médico cirurgião cético, um militar forjado nas trincheiras, um marinheiro dos mares bravios ou um ocultista perseguido pela inquisição da razão, o tabuleiro foi armado e a sua alma foi convocada.
        </p>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Passo a Passo: Como Construir seu Personagem
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">1. Conceito & Linhagem</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Defina seu nome, idade, ocupação social e sua linhagem de sangue. Sua raça dita sua biologia base: pontos iniciais de HP, CA, Psique, Sistema Imune (SI), porte e o seu <strong>Dado de Essência</strong>.
            </p>
          </div>

          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">2. O Questionário da Psique</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Responda com verdade absoluta às 6 perguntas fundamentais da alma. Suas respostas definem suas fraquezas morais, gatilhos de estresse e como sua mente reage diante do sobrenatural.
            </p>
          </div>

          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">3. Atributos & Perícias</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Distribua seus pontos entre os atributos Físicos (Força, Vigor, Destreza), Mentais/Sociais (Carisma, Conhecimento, Inteligência) e sua Força de Vontade. Lembre-se: uma perícia nunca pode ultrapassar o dobro (2x) do seu atributo!
            </p>
          </div>

          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">4. Os Quatro Pilares Vitais</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Calcule sua Vida (HP), Classe de Armadura (CA), Psique (Sanidade/Estresse) e Sistema Imunológico (SI) somando a base da sua linhagem aos seus atributos e equipamentos.
            </p>
          </div>

          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">5. Escolha de Classe</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Selecione uma das 15 classes fundamentais. Receba seus bônus de perícia, suas proficiências de armas e ferramentas, seu orçamento inicial em Libras (£) e sua habilidade de classe com custo de Psique.
            </p>
          </div>

          <div class="p-4 bg-amber-50/90 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-base mb-1">6. Destino: Tarot & Patrono</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              O Mestre conduzirá a tiragem ritualística de 3 Arcanos do Tarot (Passado, Presente e Futuro) e revelará o Patrono secreto que vigia os passos da sua alma.
            </p>
          </div>
        </div>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          O Questionário da Psique (Obrigatório)
        </h3>
        <p class="text-stone-900 text-sm leading-relaxed text-justify">
          The Core of Man não é um sistema sobre números vazios; é um sistema sobre cicatrizes e escolhas. Antes de rolar qualquer dado, o jogador deve preencher com sinceridade as seis indagações da alma:
        </p>

        <div class="space-y-3 mt-4">
          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">1. Quem é você quando ninguém está vendo?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">Sua verdadeira moral despida de títulos, cargos sociais ou expectativas familiares. Seus vícios secretos e impulsos ocultos.</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">2. Por que você acorda / levanta todos os dias?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">O seu propósito motor de sobrevivência. É vingança, dever, proteção a alguém amado ou simples medo da morte?</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">3. O que ainda te dói, mesmo que você diga que já passou?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">A fratura psíquica do seu passado: uma traição, uma covardia em combate, a perda de um irmão ou uma promessa quebrada.</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">4. Quem foi seu primeiro amor?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">A memória humana que ancora sua sanidade quando o horror cósmico tentar despedaçar sua mente.</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">5. O que você mais teme perder?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">Sua honra, sua fortuna, um ente querido, a própria razão ou a liberdade? Este será o primeiro alvo dos seus inimigos.</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">6. Qual a verdade que você evita encarar?</strong>
            <span class="text-xs text-stone-700 italic block mt-0.5">A mentira que você conta a si mesmo todos os dias para continuar suportando o peso do mundo.</span>
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
    summary: "Como os dados decidem o destino: o teste 1d20 + Atributo + Perícia contra a Classe de Dificuldade (CD), vantagens e graus de sucesso.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Sempre que seu protagonista tenta realizar uma ação cujo resultado seja incerto, arriscado ou disputado, o Mestre solicitará um <strong>Teste de Resolução</strong>. A mecânica central de The Core é ágil, dramática e universal:
        </p>

        <div class="p-4 bg-amber-50 text-amber-950 rounded-xl text-center font-serif text-lg tracking-wide shadow-md border-2 border-amber-800">
          <span class="text-amber-800 font-black">1d20</span> + 
          <span class="text-stone-900 font-bold"> Atributo</span> + 
          <span class="text-stone-900 font-bold"> Perícia</span> &ge; 
          <span class="text-amber-800 font-black"> Classe de Dificuldade (CD)</span>
        </div>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Escala de Dificuldades (CD)
        </h3>
        <table class="w-full text-left border-collapse my-3">
          <thead>
            <tr class="bg-amber-100 text-amber-950 border border-amber-800/30">
              <th class="p-2.5 font-bold">Dificuldade</th>
              <th class="p-2.5 font-bold">CD</th>
              <th class="p-2.5 font-bold">Exemplo Prático</th>
            </tr>
          </thead>
          <tbody class="text-stone-900 text-sm">
            <tr class="border-b border-amber-800/20">
              <td class="p-2.5 font-bold text-amber-950">Fácil</td>
              <td class="p-2.5 font-mono font-bold">10</td>
              <td class="p-2.5">Arrombar fechadura comum de latão, pular cerca de madeira baixa.</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2.5 font-bold text-amber-950">Médio</td>
              <td class="p-2.5 font-mono font-bold">15</td>
              <td class="p-2.5">Realizar torniquete cirúrgico em meio a tiros, decifrar diário em código.</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2.5 font-bold text-amber-950">Difícil</td>
              <td class="p-2.5 font-mono font-bold">20</td>
              <td class="p-2.5">Acertar o motor de um avião em voo com rifle, resistir ao toque de uma quimera.</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2.5 font-bold text-amber-950">Formidável</td>
              <td class="p-2.5 font-mono font-bold">25</td>
              <td class="p-2.5">Conter uma hemorragia da aorta em plena tempestade em alto mar sem anestesia.</td>
            </tr>
            <tr>
              <td class="p-2.5 font-bold text-amber-950">Heroico / Quase Impossível</td>
              <td class="p-2.5 font-mono font-bold">30</td>
              <td class="p-2.5">Desviar a trajetória de um canhão naval com um disparo milimétrico.</td>
            </tr>
          </tbody>
        </table>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-800/40 text-stone-900 shadow-sm">
            <h4 class="font-serif font-black text-emerald-950 text-base mb-1">O 20 Natural (Sucesso Crítico)</h4>
            <p class="text-xs leading-relaxed">
              Obter um 20 natural no d20 é um triunfo da vontade: a ação é bem-sucedida automaticamente de maneira espetacular, dobrando o dano de armas ou concedendo um bônus tático narrativo imediato definido pelo Mestre.
            </p>
          </div>

          <div class="p-4 bg-red-50 rounded-xl border border-red-800/40 text-stone-900 shadow-sm">
            <h4 class="font-serif font-black text-red-950 text-base mb-1">O 1 Natural (Falha Crítica)</h4>
            <p class="text-xs leading-relaxed">
              Obter um 1 natural no d20 acarreta um revés catastrófico: a arma emperra, a lâmina lasca, o personagem perde o equilíbrio ou sofre dano colateral à sua Psique ou Integridade Física.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO III: ATRIBUTOS E PERÍCIAS (CORRETOS E OFICIAIS)
  // =========================================================================
  {
    id: 3,
    roman: "III",
    title: "Atributos e Perícias",
    subtitle: "A Matriz Completa de Capacidades",
    iconName: "UserCheck",
    summary: "A matriz completa dos 7 Atributos oficiais e suas Perícias correlatas, a regra do teto de aprendizado e a fórmula de Iniciativa.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Os <strong>Atributos</strong> definem quem você é e seu potencial inato, enquanto as <strong>Perícias</strong> mostram o que você treinou ao longo da sua vida. No sistema The Core, os atributos de personagens comuns variam de 1 a 5 (com lendas e primordiais alcançando patamares superiores).
        </p>

        <div class="p-3.5 bg-amber-100/90 rounded-lg border-l-4 border-amber-800 text-stone-950 text-xs font-semibold leading-relaxed">
          ⚡ <strong>Regra de Ouro do Aprendizado:</strong> O valor numérico de uma Perícia NUNCA pode ultrapassar o dobro (2x) do valor do seu Atributo correspondente. Exemplo: Para ter Luta 4, seu personagem precisa de pelo menos Força 2!
        </div>

        <!-- 1. ATRIBUTOS FÍSICOS -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-6">
          1. Atributos Físicos
        </h3>

        <div class="space-y-4">
          <!-- FORÇA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Força (O Poder Muscular & Impacto)</h4>
            <p class="text-xs text-stone-700 italic mb-2">Mede a potência muscular pura, capacidade de tração, elevação de carga e devastação física.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>Atletismo:</strong> Correr em disparada, saltar abismos, escalar paredões de pedra, nadar contra correntezas bravias.</li>
              <li><strong>Brutalidade:</strong> Arrombar portas de carvalho, erguer escombros pesados, torcer barras de ferro, destruição de estruturas.</li>
              <li><strong>Luta:</strong> Combate corpo a corpo desarmado (socos, chutes, agarrões) e manejo de armas brancas (espadas, sabres, facas, machados).</li>
            </ul>
          </div>

          <!-- VIGOR -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Vigor (A Resiliência Biológica)</h4>
            <p class="text-xs text-stone-700 italic mb-2">Mede a robustez física, fôlego, capacidade pulmonar e resistência a traumas corporais.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>Constituição:</strong> Resistência a venenos, toxinas industriais, privação de sono, frio congelante e calor tóxico de caldeiras.</li>
              <li><strong>Recuperação:</strong> Rapidez biológica para estancar hemorragias, fechar ferimentos abertos e regenerar tecidos.</li>
              <li><strong>Tolerância:</strong> Resistir à dor extrema sem gritar, suportar choques elétricos, queimaduras e tortura física sem desmaiar.</li>
            </ul>
          </div>

          <!-- DESTREZA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">Destreza (A Agilidade & Reflexos)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">Iniciativa = 1d20 + Destreza</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Mede a coordenação motora fina, velocidade de reação, equilíbrio e precisão de disparos.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>Acrobacia:</strong> Equilíbrio sobre mastros e cordas, cambalhotas, amortecimento de quedas e esquivas acrobáticas.</li>
              <li><strong>Furtividade:</strong> Mover-se sem emitir nenhum som, ocultar-se nas sombras da noite e passar despercebido por guardas.</li>
              <li><strong>Mira:</strong> Pontaria com armas de fogo (revólveres, mosquetes, rifles de precisão), arcos, bestas e facas arremessadas.</li>
            </ul>
          </div>
        </div>

        <!-- 2. ATRIBUTOS MENTAIS E SOCIAIS -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          2. Atributos Mentais e Sociais
        </h3>

        <div class="space-y-4">
          <!-- CARISMA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Carisma (A Presença & Magnetismo)</h4>
            <p class="text-xs text-stone-700 italic mb-2">A força de projeção da personalidade, magnetismo pessoal, liderança e influência sobre outros seres.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>Animais:</strong> Acalmar feras selvagens, interpretar sinais de animais, adestramento e montaria de cavalos sob tiroteio.</li>
              <li><strong>Lábia:</strong> Convencimento, barganha comercial, diplomacia, blefe, sedução e manipulação social de autoridades.</li>
              <li><strong>Teatralidade:</strong> Atuação, disfarce de identidade, imitação de sotaques, oratória política e entretenimento de multidões.</li>
            </ul>
          </div>

          <!-- CONHECIMENTO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Conhecimento (A Erudição Acadêmica)</h4>
            <p class="text-xs text-stone-700 italic mb-2">O acúmulo de estudos formais, teorias científicas, história das nações e ofícios práticos.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>História:</strong> Linhagens de famílias reais, tratados bélicos, guerras passadas, política mundial e arquitetura antiga.</li>
              <li><strong>Mito:</strong> Ocultismo, rituais do Verbo, lendas dos Primordiais, entidades do Vácuo e folclore esquecido.</li>
              <li><strong>Raciocínio:</strong> Dedução lógica, solução de enigmas matemáticos, quebra de cifras e análise tática de planos inimigos.</li>
              <li><strong>Ofício:</strong> Especialização técnica manual (Arqueologia, Mecânica a vapor, Medicina/Cirurgia, Ferraria, Carpintaria, etc.).</li>
            </ul>
          </div>

          <!-- INTELIGÊNCIA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Inteligência (A Agudeza & Instinto Prático)</h4>
            <p class="text-xs text-stone-700 italic mb-2">A capacidade de processamento sensorial imediato, percepção de detalhes sutis e instinto de sobrevivência.</p>
            <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
              <li><strong>Intuição:</strong> Pressentir perigo iminente, detectar mentiras no olhar de alguém e prever emboscadas antes do primeiro tiro.</li>
              <li><strong>Percepção:</strong> Olhos afiados para compartimentos secretos, ouvir sussurros através de portas e avistar vigias no horizonte.</li>
              <li><strong>Sobrevivência:</strong> Rastreamento de pegadas na terra batida, caça, pesca, orientação pelas estrelas e encontrar abrigos seguros.</li>
            </ul>
          </div>
        </div>

        <!-- 3. ATRIBUTO ESPECIAL: FORÇA DE VONTADE -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          3. Atributo Especial: Força de Vontade
        </h3>

        <div class="p-4 bg-amber-50/95 rounded-xl border-2 border-amber-800 shadow-sm">
          <h4 class="font-serif font-black text-amber-950 text-lg mb-1">Força de Vontade (O Combustível da Alma)</h4>
          <p class="text-xs text-stone-700 italic mb-3">
            Diferente dos atributos biológicos, a Força de Vontade representa a integridade espiritual do ser humano perante o insondável. É a armadura da mente contra a loucura e o canal pelo qual a Essência mística é manifestada no mundo real.
          </p>
          <ul class="text-xs text-stone-900 space-y-2 pl-4 list-disc">
            <li><strong>Mente:</strong> Resiliência contra o choque de insanidade, pavor de aberrações, pesadelos arcanos e manipulação psíquica.</li>
            <li><strong>Alma:</strong> Fé inabalável, convicção moral, integridade espiritual e conexão com o plano astral e os mortos.</li>
            <li><strong>Corpo:</strong> Superação física através da pura determinação mental (agir mesmo com ossos quebrados e músculos lacerados).</li>
            <li><strong>Essência:</strong> A centelha mágica pura que permite canalizar os Domínios da Manifestação. Role seu <strong>Dado de Essência</strong> conforme sua Linhagem!</li>
          </ul>

          <div class="mt-4 p-3 bg-white/90 rounded border border-amber-800/40 text-xs text-stone-900">
            <strong>Custo de Evolução em XP:</strong><br />
            &bull; +1 Atributo Comum: <strong>4 XP</strong> &nbsp;|&nbsp; +1 Perícia Comum: <strong>2 XP</strong><br />
            &bull; +1 Atributo de Força de Vontade: <strong>6 XP</strong> &nbsp;|&nbsp; +1 Perícia de Força de Vontade (Mente, Alma, Corpo, Essência): <strong>4 XP</strong>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO IV: FORÇA DE VONTADE & OS QUATRO PILARES VITAIS
  // =========================================================================
  {
    id: 4,
    roman: "IV",
    title: "Força de Vontade & Os Quatro Pilares",
    subtitle: "A Dinâmica da Alma e os Status Vitais de Sobrevivência",
    iconName: "Flame",
    summary: "Como funciona o sacrifício de pontos de perícia, os usos heroicos da Força de Vontade e os pilares de HP, CA, Psique, SI e Dado de Essência.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, a vontade não é apenas um número estático na ficha; é um sacrifício consciente. Quando seu protagonista desafia o destino para realizar algo extraordinário, ele negocia diretamente com as reservas da sua própria alma.
        </p>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Usos da Força de Vontade
        </h3>

        <div class="space-y-3">
          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">&bull; O Sopro Heroico</strong>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">
              Gastar 1 Ponto de Força de Vontade permite rolar novamente qualquer dado fracassado.
            </p>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">&bull; Ignorar a Agonia</strong>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">
              Manter-se consciente e agindo por 1 turno inteiro mesmo após seus Pontos de Vida (HP) chegarem a zero.
            </p>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border-l-4 border-amber-800 shadow-sm">
            <strong class="font-serif text-amber-950 text-sm block">&bull; Combustão Arcana</strong>
            <p class="text-xs text-stone-800 mt-1 leading-relaxed">
              Substituir Pontos de Essência que você não possui consumindo diretamente a sua Força de Vontade para alimentar uma manifestação sobrenatural.
            </p>
          </div>
        </div>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          A Dinâmica do Sacrifício: O Preço do Sucesso
        </h3>
        <p class="text-xs text-stone-900 leading-relaxed text-justify">
          Para realizar uma ação de Essência ou resistir a um terror cósmico, role: <strong>1d20 + Força de Vontade + Perícia Relacionada (Mente, Alma, Corpo ou Essência)</strong> contra a CD estipulada pelo Mestre.
        </p>
        <p class="text-xs text-stone-900 leading-relaxed text-justify">
          Se faltarem pontos para atingir a CD, você pode optar por um <strong>Sucesso Forçado</strong>: sacrifique pontos temporários daquela perícia para cobrir a diferença e passar no teste! Para cada 1 ponto que faltou, você perde 1 ponto daquela perícia. Esses pontos não voltam imediatamente e representam o esgotamento profundo do seu espírito.
        </p>

        <!-- CARD DE ALTO CONTRASTE: O SACRIFÍCIO PUNITIVO -->
        <div class="p-5 bg-red-50 rounded-xl border-2 border-red-800 shadow-sm mt-4">
          <h4 class="font-serif font-black text-red-950 text-base mb-1">
            ⚠️ O Sacrifício Punitivo (Quando a Força de Vontade Zera)
          </h4>
          <p class="text-xs text-stone-900 leading-relaxed text-justify">
            Se a sua Força de Vontade for reduzida a zero, sua alma sofre uma <strong>Fratura do Cerne</strong>. O personagem entra em estado de catatonia, choque ou desespero absoluto, sofrendo desvantagem permanente em todos os testes até que consiga cumprir um Juramento Solene diante do Mestre e reatar os laços com sua humanidade.
          </p>
        </div>

        <!-- OS QUATRO PILARES DE SOBREVIVÊNCIA -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Os Quatro Pilares Vitais
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 bg-stone-50 rounded-xl border border-red-800/40 shadow-sm">
            <h4 class="font-serif font-black text-red-950 text-base mb-1">❤️ Pontos de Vida (HP)</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              Mede a integridade dos seus tecidos e órgãos. Calculado como: <strong>HP Base da Linhagem + (Vigor &times; 2)</strong>. Quando chega a zero, o personagem cai inconsciente e inicia os testes contra a morte.
            </p>
          </div>

          <div class="p-4 bg-stone-50 rounded-xl border border-blue-800/40 shadow-sm">
            <h4 class="font-serif font-black text-blue-950 text-base mb-1">🛡️ Classe de Armadura (CA)</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              A dificuldade de ser atingido e ferido. Calculada como: <strong>CA Base da Linhagem + Destreza + Bônus de Armaduras e Escudos</strong>.
            </p>
          </div>

          <div class="p-4 bg-stone-50 rounded-xl border border-purple-800/40 shadow-sm">
            <h4 class="font-serif font-black text-purple-950 text-base mb-1">🔮 Psique (Sanidade & Estresse)</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              A resiliência mental diante do horror, da morte e da dor. Calculada como: <strong>Psique Base da Linhagem + Força de Vontade</strong>. É consumida para ativar habilidades de classe ou resistir a abalos psíquicos.
            </p>
          </div>

          <div class="p-4 bg-stone-50 rounded-xl border border-emerald-800/40 shadow-sm">
            <h4 class="font-serif font-black text-emerald-950 text-base mb-1">🧬 Sistema Imunológico (SI)</h4>
            <p class="text-xs text-stone-800 leading-relaxed">
              A barreira biológica contra venenos, infecções químicas, gases e patologias do Vácuo. Calculada como: <strong>SI Base da Linhagem + Constituição</strong>.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO V: OS DOMÍNIOS DA MANIFESTAÇÃO & TIPOS DE MAGIA
  // =========================================================================
  {
    id: 5,
    roman: "V",
    title: "Os Domínios da Manifestação",
    subtitle: "A Magia sem Amarras e a Criação de Habilidades",
    iconName: "Sparkles",
    summary: "O sistema dinâmico de magia e poderes: os 5 Grandes Domínios (Matéria, Carne, Éter, Trama, Elo), criação de habilidades e custos em XP.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, o poder sobrenatural não é uma lista estática e engessada de feitiços de um livro tradicional. Ele é o resultado direto do seu <strong>Domínio</strong> sobre um aspecto fundamental da existência. Enquanto os Primogênitos manifestam o Verbo por puro instinto biológico, os humanos e outros povos precisam estudar, treinar e investir seu próprio crescimento (XP) para codificar sua vontade na realidade. A imaginação do jogador é essencial!
        </p>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Como Funciona a Criação de Habilidades
        </h3>

        <div class="space-y-3">
          <div class="p-3 bg-stone-50 rounded-lg border-l-4 border-amber-800 text-xs text-stone-900">
            <strong>1. A Ideia do Jogador:</strong> Você descreve o efeito místico ou técnico que deseja realizar (Ex: <em>"Quero disparar uma flecha que se transforma em correntes de espinhos ao atingir o solo"</em> ou <em>"Quero endurecer minha pele como granito contra tiros"</em>).
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border-l-4 border-amber-800 text-xs text-stone-900">
            <strong>2. O Enquadramento:</strong> O Mestre e o jogador definem em qual dos 5 Grandes Domínios essa manifestação se enquadra.
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border-l-4 border-amber-800 text-xs text-stone-900">
            <strong>3. A Precificação em XP:</strong> O Mestre avalia o impacto mecânico da habilidade e estipula o custo em Pontos de Experiência (XP) para que o personagem a aprenda permanentemente.
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border-l-4 border-amber-800 text-xs text-stone-900">
            <strong>4. A Execução em Jogo:</strong> Uma vez adquirida, a habilidade é conjurada gastando os pontos correspondentes e rolando a Perícia-Chave designada.
          </div>
        </div>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Os 5 Grandes Domínios da Manifestação
        </h3>

        <div class="space-y-4">
          <!-- 1. MATÉRIA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">1. Domínio da Matéria (O Caminho do Condutor)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Perícia-Chave: Essência ou Corpo</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Foca na manipulação de objetos inanimados, ligas metálicas e substâncias físicas sólidas. É o caminho predileto de engenheiros, ferreiros e artilheiros.</p>
            <div class="text-xs text-stone-900">
              <strong>Exemplos Práticos:</strong> Imbuir lâminas ou balas com calor incandescente, forjar correntes de ferro que se movem sozinhas, reforçar coletes blindados no meio do combate, modelar fechaduras e travas de metal com o toque.
            </div>
          </div>

          <!-- 2. CARNE -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">2. Domínio da Carne (O Caminho do Ápice)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Perícia-Chave: Corpo</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Foca na alteração biológica, muscular e óssea da própria anatomia ou do organismo alheio.</p>
            <div class="text-xs text-stone-900">
              <strong>Exemplos Práticos:</strong> Cicatrização instantânea de tecidos e órgãos vitais, projeção de garras ósseas pelas pontas dos dedos, dilatação das pupilas para visão térmica/noturna, ou explosões temporárias de força que dobram a massa muscular.
            </div>
          </div>

          <!-- 3. ÉTER -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">3. Domínio do Éter (O Caminho dos Elementos)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Perícia-Chave: Essência</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Foca na canalização direta das energias puras do cosmos que não possuem massa nem forma física sólida.</p>
            <div class="text-xs text-stone-900">
              <strong>Exemplos Práticos:</strong> Chamas fátuas esmeraldas, lufadas de vendaval que dispersam fumaça tóxica, descargas elétricas estáticas pelas mãos, cortinas densas de névoa de ocultamento e ondas de choque acústico.
            </div>
          </div>

          <!-- 4. TRAMA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">4. Domínio da Trama (O Caminho da Mente)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Perícia-Chave: Mente</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Foca na alteração sensorial da percepção, criação de miragens e manipulação de emoções alheias.</p>
            <div class="text-xs text-stone-900">
              <strong>Exemplos Práticos:</strong> Vestidos ilusórios de vento ou nobreza, sugestão hipnótica em interrogatórios, gritos de pavor que forçam inimigos a recuar apavorados e "invisibilidade social" (fazer guardas ignorarem sua presença como se você fosse poeira).
            </div>
          </div>

          <!-- 5. ELO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-lg">5. Domínio do Elo (O Caminho da Alma)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Perícia-Chave: Alma</span>
            </div>
            <p class="text-xs text-stone-700 italic mb-2">Foca na conexão transcendental entre seres vivos, autoridade espiritual e sintonia com o além.</p>
            <div class="text-xs text-stone-900">
              <strong>Exemplos Práticos:</strong> Sentir os batimentos cardíacos e a mentira de alguém a metros de distância, comandar feras selvagens com um olhar, transferir dores corporais entre aliados ou projetar uma aura de autoridade primordial que paralisa adversários.
            </div>
          </div>
        </div>

        <!-- TABELA DE CUSTOS EM XP -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Tabela Guia de Custos em XP para Habilidades
        </h3>
        <table class="w-full text-left border-collapse my-3">
          <thead>
            <tr class="bg-amber-100 text-amber-950 border border-amber-800/30">
              <th class="p-2.5 font-bold">Nível da Habilidade</th>
              <th class="p-2.5 font-bold">Custo em XP</th>
              <th class="p-2.5 font-bold">Magnitude e Descrição do Efeito</th>
            </tr>
          </thead>
          <tbody class="text-stone-900 text-sm">
            <tr class="border-b border-amber-800/20">
              <td class="p-2.5 font-bold text-amber-950">Nível I (Básico)</td>
              <td class="p-2.5 font-mono font-bold">2 a 4 XP</td>
              <td class="p-2.5">Efeitos simples, utilitários práticos ou bônus leves em uma ação de combate.</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2.5 font-bold text-amber-950">Nível II (Incomum)</td>
              <td class="p-2.5 font-mono font-bold">5 a 8 XP</td>
              <td class="p-2.5">Habilidades que alteram o cenário tático ou causam dano moderado (Ex: flecha de espinhos).</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2.5 font-bold text-amber-950">Nível III (Raro)</td>
              <td class="p-2.5 font-mono font-bold">10 a 15 XP</td>
              <td class="p-2.5">Efeitos de grande poder bélico ou místico, capazes de decidir um combate inteiro ou afetar múltiplos alvos.</td>
            </tr>
            <tr>
              <td class="p-2.5 font-bold text-amber-950">Nível IV (Mítico)</td>
              <td class="p-2.5 font-mono font-bold">20+ XP</td>
              <td class="p-2.5">Manifestações que dobram as leis fundamentais da física, do tempo ou o destino de uma cena.</td>
            </tr>
          </tbody>
        </table>
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
    summary: "A anatomia dos 7 slots de equipamentos corporais, tabelas completas de armaduras leves, médias e pesadas, armas brancas, armas de fogo e dispositivos táticos em Libras (£).",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          O mundo de 1939 é cruel, bélico e impiedoso. As armas de fogo a vapor e pólvora negra convivem lado a lado com sabres afiados de abordagem marítima e blindagens forjadas para resistir a fragmentos de obuses.
        </p>

        <!-- SEÇÃO 1: OS 7 SLOTS CORPORAIS -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Anatomia do Equipamento: Os 7 Slots Corporais
        </h3>
        <p class="text-xs text-stone-900 leading-relaxed text-justify mb-3">
          Todo personagem possui 7 compartimentos corporais anatômicos para equipar vestimentas, blindagens e ferramentas. Itens fora desses slots devem ser guardados na mochila e exigem uma ação para serem sacados:
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">1. Cabeça</strong>
            <span class="text-stone-700">Elmos, chapéus, máscaras de gás, óculos de soldador.</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">2. Tronco</strong>
            <span class="text-stone-700">Coletes blindados, sobretudos, peitorais de aço, gibões.</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">3. Braços</strong>
            <span class="text-stone-700">Braçadeiras de couro, manoplas de aço, bandagens tratadas.</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">4. Pernas</strong>
            <span class="text-stone-700">Calças militares reforçadas, perneiras acolchoadas.</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">5. Pés</strong>
            <span class="text-stone-700">Botas de cano alto engraxadas, sapatilhas de marujo.</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block">6. Mão Principal</strong>
            <span class="text-stone-700">Arma primária (sabre, rifle, machado, bisturi).</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30 col-span-2 sm:col-span-1">
            <strong class="text-amber-950 font-serif block">7. Mão Secundária</strong>
            <span class="text-stone-700">Escudo, pistola secundária, lanterna a éter, astrolábio.</span>
          </div>
        </div>

        <!-- SEÇÃO 2: ARMADURAS & BLINDAGENS -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Tabela de Armaduras & Blindagens
        </h3>
        <table class="w-full text-left border-collapse my-3">
          <thead>
            <tr class="bg-amber-100 text-amber-950 border border-amber-800/30">
              <th class="p-2 font-bold">Armadura</th>
              <th class="p-2 font-bold">Tipo</th>
              <th class="p-2 font-bold">Bônus CA</th>
              <th class="p-2 font-bold">Redução de Dano (RD)</th>
              <th class="p-2 font-bold">Penalidade</th>
              <th class="p-2 font-bold">Preço (£)</th>
            </tr>
          </thead>
          <tbody class="text-stone-900 text-xs">
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Sobretudo de Couro Curtido</td>
              <td class="p-2">Leve</td>
              <td class="p-2 font-mono font-bold">+1 CA</td>
              <td class="p-2 font-mono">RD 0</td>
              <td class="p-2">Nenhuma</td>
              <td class="p-2 font-mono font-bold">5 £</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2 font-bold text-amber-950">Jaqueta Militar de Oficial com Dragonas</td>
              <td class="p-2">Leve</td>
              <td class="p-2 font-mono font-bold">+2 CA</td>
              <td class="p-2 font-mono">RD 0</td>
              <td class="p-2">Nenhuma</td>
              <td class="p-2 font-mono font-bold">12 £</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Brigandina com Rebites de Ferro</td>
              <td class="p-2">Média</td>
              <td class="p-2 font-mono font-bold">+3 CA</td>
              <td class="p-2 font-mono font-bold">RD 1</td>
              <td class="p-2">-1 Furtividade</td>
              <td class="p-2 font-mono font-bold">25 £</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2 font-bold text-amber-950">Colete Tático Blindado de Trincheira</td>
              <td class="p-2">Média</td>
              <td class="p-2 font-mono font-bold">+4 CA</td>
              <td class="p-2 font-mono font-bold">RD 2</td>
              <td class="p-2">-2 Furtividade</td>
              <td class="p-2 font-mono font-bold">45 £</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Armadura de Placas Imperial Completa</td>
              <td class="p-2">Pesada</td>
              <td class="p-2 font-mono font-bold">+6 CA</td>
              <td class="p-2 font-mono font-bold">RD 3</td>
              <td class="p-2">-3 Destreza / Acrobacia</td>
              <td class="p-2 font-mono font-bold">90 £</td>
            </tr>
            <tr>
              <td class="p-2 font-bold text-amber-950">Escafandro Pesado de Aço Temperado</td>
              <td class="p-2">Pesada</td>
              <td class="p-2 font-mono font-bold">+7 CA</td>
              <td class="p-2 font-mono font-bold">RD 4</td>
              <td class="p-2">Desvantagem em Destreza</td>
              <td class="p-2 font-mono font-bold">150 £</td>
            </tr>
          </tbody>
        </table>

        <!-- ESCUDOS -->
        <h4 class="font-serif font-black text-amber-950 text-base mt-4 mb-2">Escudos e Proteções Secundárias</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Broquel de Duelo</strong>
            <span class="text-stone-800 block mt-1">+1 CA. Permite aparar ataques corpo a corpo com reação de Luta.</span>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 8 £</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Escudo de Carvalho & Ferro</strong>
            <span class="text-stone-800 block mt-1">+2 CA. Concede cobertura parcial contra projéteis balísticos e disparos.</span>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 15 £</span>
          </div>
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Escudo Balístico Reforçado</strong>
            <span class="text-stone-800 block mt-1">+3 CA, RD 2 contra estilhaços de granadas. -1 de Destreza.</span>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 40 £</span>
          </div>
        </div>

        <!-- SEÇÃO 3: ARSENAL BÉLICO -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Arsenal Bélico: Armas Brancas e de Fogo
        </h3>
        <table class="w-full text-left border-collapse my-3">
          <thead>
            <tr class="bg-amber-100 text-amber-950 border border-amber-800/30">
              <th class="p-2 font-bold">Arma</th>
              <th class="p-2 font-bold">Tipo</th>
              <th class="p-2 font-bold">Dano</th>
              <th class="p-2 font-bold">Alcance</th>
              <th class="p-2 font-bold">Propriedades Especiais</th>
              <th class="p-2 font-bold">Preço (£)</th>
            </tr>
          </thead>
          <tbody class="text-stone-900 text-xs">
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Adaga de Trincheira</td>
              <td class="p-2">Branca</td>
              <td class="p-2 font-mono font-bold">1d4 + For</td>
              <td class="p-2">Corpo a corpo</td>
              <td class="p-2">Furtiva, fácil de ocultar</td>
              <td class="p-2 font-mono font-bold">2 £</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2 font-bold text-amber-950">Sabre de Oficial da Marinha</td>
              <td class="p-2">Branca</td>
              <td class="p-2 font-mono font-bold">1d6 + For/Des</td>
              <td class="p-2">Corpo a corpo</td>
              <td class="p-2">Ágil, bônus em aparar</td>
              <td class="p-2 font-mono font-bold">8 £</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Machado Pesado de Abordagem</td>
              <td class="p-2">Branca</td>
              <td class="p-2 font-mono font-bold">1d8 + For</td>
              <td class="p-2">Corpo a corpo</td>
              <td class="p-2">Quebra escudos e tábuas</td>
              <td class="p-2 font-mono font-bold">10 £</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2 font-bold text-amber-950">Pistola de Pederneira / Tambor</td>
              <td class="p-2">Fogo</td>
              <td class="p-2 font-mono font-bold">1d8</td>
              <td class="p-2">15 metros</td>
              <td class="p-2">Recarga: 1 turno, disparo ruidoso</td>
              <td class="p-2 font-mono font-bold">15 £</td>
            </tr>
            <tr class="border-b border-amber-800/20">
              <td class="p-2 font-bold text-amber-950">Mosquete Militar com Baioneta</td>
              <td class="p-2">Fogo</td>
              <td class="p-2 font-mono font-bold">1d10 / 1d6</td>
              <td class="p-2">40 metros</td>
              <td class="p-2">Duas mãos, baioneta corpo a corpo</td>
              <td class="p-2 font-mono font-bold">25 £</td>
            </tr>
            <tr class="border-b border-amber-800/20 bg-amber-50/50">
              <td class="p-2 font-bold text-amber-950">Rifle de Precisão de Ferrolho</td>
              <td class="p-2">Fogo</td>
              <td class="p-2 font-mono font-bold">1d12</td>
              <td class="p-2">100 metros</td>
              <td class="p-2">Luneta de latão, crítico no 19-20</td>
              <td class="p-2 font-mono font-bold">50 £</td>
            </tr>
            <tr>
              <td class="p-2 font-bold text-amber-950">Canhão de Mão / Bacamarte</td>
              <td class="p-2">Fogo</td>
              <td class="p-2 font-mono font-bold">2d8</td>
              <td class="p-2">Cones de 6m</td>
              <td class="p-2">Atinge múltiplos alvos próximos</td>
              <td class="p-2 font-mono font-bold">35 £</td>
            </tr>
          </tbody>
        </table>

        <!-- SEÇÃO 4: DISPOSITIVOS TÁTICOS -->
        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          Dispositivos Táticos, Arpões & Granadas
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Granada de Vácuo (Vórtice)</strong>
            <p class="text-stone-800 mt-1 leading-relaxed">
              Esfera de bronze com núcleo de éter comprimido. Ao explodir, gera uma micro-implosão gravitacional por 2 segundos, puxando todos os alvos até 6 metros para o centro.
            </p>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 20 £</span>
          </div>

          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Bomba de Pulso de Silêncio</strong>
            <p class="text-stone-800 mt-1 leading-relaxed">
              Emite uma onda ressonante que anula conjurações arcanas e desliga circuitos tecno-mágicos por 1 rodada inteira em um raio de 9 metros.
            </p>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 30 £</span>
          </div>

          <div class="p-3 bg-stone-50 rounded-lg border border-amber-800/30">
            <strong class="text-amber-950 font-serif block text-sm">Arpão Pneumático de Bordo</strong>
            <p class="text-stone-800 mt-1 leading-relaxed">
              Disparador de pulso com 25 metros de cabo de aço trançado e ponta de garra. Permite escalar mastros e realizar abordagens de convés com segurança absoluta.
            </p>
            <span class="font-mono font-bold text-amber-900 block mt-1">Preço: 18 £</span>
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
          A sua <strong>Classe</strong> define o seu papel no mundo dos homens e no tabuleiro cósmico de 1939. Cada classe fornece treinamento específico em perícias, proficiências bélicas ou intelectuais, uma cota inicial de equipamentos e moeda em Libras esterlinas (£), além de uma habilidade de classe que pode consumir pontos de <strong>Psique</strong>.
        </p>

        <div class="space-y-4">
          <!-- 1. CIRURGIÃO / MÉDICO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">1. Cirurgião / Médico</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Ciência & Anatomia</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"O corpo é um mecanismo de carne e tubos; se souber onde cortar e onde estancar, você pode arrancar qualquer homem da boca do inferno."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Ofício (Medicina), +1 Raciocínio</p>
              <p><strong>Proficiências:</strong> Instrumentos cirúrgicos, bisturis, anatomia humana e animal, diagnose de patologias.</p>
              <p><strong>Itens Iniciais:</strong> Maleta de couro com estojo cirúrgico (bisturis, agulhas, pinças de prata, linha de sutura), 3 frascos de éter anestésico, torniquete militar, <strong>20 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Intervenção Cirúrgica de Emergência</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para estancar hemorragias instantaneamente em um aliado adjacente, restaurando <strong>1d8 + Vigor do paciente</strong> em Pontos de Vida.</p>
              </div>
            </div>
          </div>

          <!-- 2. CURANDEIRO(A) -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">2. Curandeiro(a)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Tradição & Ervas</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"As plantas sentem a terra antes dos homens. Há venenos que curam e preces que fecham a carne."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Sobrevivência, +1 Alma</p>
              <p><strong>Proficiências:</strong> Ervas medicinais, infusões, unguentos naturais, rituais de purificação.</p>
              <p><strong>Itens Iniciais:</strong> Bolsa de pano com raízes e sementes raras, pilão de madeira de lei, 2 emplastros cicatrizantes, amuleto de osso polido, <strong>10 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Toque Revitalizante</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para expurgar infecções ou venenos naturais através de massagem e unguento, concedendo <strong>vantagem</strong> no próximo teste de Sistema Imunológico do alvo.</p>
              </div>
            </div>
          </div>

          <!-- 3. BOTICÁRIO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">3. Boticário</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Alquimia & Frascos</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Uma gota salva um rei; duas gotas o mandam para o túmulo sem deixar rastros no estômago."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Ofício (Química/Alquimia), +1 Intuição</p>
              <p><strong>Proficiências:</strong> Vidrarias de laboratório, destilação, ácidos, reagentes minerais e sedativos.</p>
              <p><strong>Itens Iniciais:</strong> Cinto com 6 tubos de ensaio de vidro reforçado, queimador portátil a querosene, frasco de ácido nítrico, frasco de tônico fortificante, <strong>15 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Preparo Alquímico Rápido</strong>
                <p class="text-stone-800 text-xs">Pode produzir em 10 minutos uma bomba de fumaça acre ou um antídoto caseiro misturando compostos à mão sem necessidade de bancada.</p>
              </div>
            </div>
          </div>

          <!-- 4. CLERICAL / RELIGIOSO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">4. Clerical / Religioso</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Fé & Convicção</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Mesmo quando as estrelas caírem, a palavra sagrada continuará sendo a rocha sobre a qual os homens se apoiam."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Alma, +1 Mito</p>
              <p><strong>Proficiências:</strong> Textos sagrados, línguas antigas (Latim, Aramaico, Grego clássico), oratória religiosa.</p>
              <p><strong>Itens Iniciais:</strong> Livro sagrado de capa dura encadernado em couro, símbolo religioso de prata maciça, frasco com água benta, vela consagrada, <strong>8 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Benção Protetora da Fé</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para recitar uma prece fervorosa: concede <strong>+2 em todos os testes de Mente e Alma</strong> a todos os aliados ouvintes por 1 cena.</p>
              </div>
            </div>
          </div>

          <!-- 5. DETETIVE -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">5. Detetive</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Dedução & Sombras</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"As cinzas de um charuto e a lama na sola de uma bota contam a história que o assassino tentou enterrar."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Percepção, +1 Raciocínio</p>
              <p><strong>Proficiências:</strong> Interrogatório, busca de pegadas e impressões digitais, revólveres de cano curto.</p>
              <p><strong>Itens Iniciais:</strong> Lupa de latão, bloco de notas com lápis de grafite, revólver de 6 tiros de bolso, sobretudo impermeável, <strong>18 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Olho Clínico de Investigação</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena de crime, pode gastar <strong>1 ponto de Psique</strong> para que o Mestre revele instantaneamente um detalhe crucial que passou despercebido por todos.</p>
              </div>
            </div>
          </div>

          <!-- 6. ARQUEÓLOGO / ANTROPÓLOGO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">6. Arqueólogo / Antropólogo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Ruínas & Mitos</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"O passado não está morto; está apenas esperando sob três metros de terra e areia que alguém cometa o erro de acordá-lo."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 História, +1 Mito</p>
              <p><strong>Proficiências:</strong> Decifração de hieróglifos e runas, desarmar armadilhas de tumbas, cartografia antiga.</p>
              <p><strong>Itens Iniciais:</strong> Picareta de mão de geólogo, pincéis de escavação, caderneta com esboços de tumbas, cantil de latão, <strong>14 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Leitura de Relíquias e Linguagens Perdidas</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para traduzir instantaneamente qualquer dialeto ou inscrição ancestral gravada em pedra ou metal.</p>
              </div>
            </div>
          </div>

          <!-- 7. ARTISTA DE CIRCO / SALTIMBANCO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">7. Artista de Circo / Saltimbanco</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Acrobacia & Ilusão</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Faça o público olhar para a sua mão direita iluminada enquanto a esquerda surrupia o relógio e a verdade."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Acrobacia, +1 Teatralidade</p>
              <p><strong>Proficiências:</strong> Malabarismo, contorcionismo, corda bamba, arremesso de adagas de teatro.</p>
              <p><strong>Itens Iniciais:</strong> 3 adagas de lâmina polida balanceadas para arremesso, maquiagem teatral branca e carmim, baralho de cartas marcadas, corda de seda de 10 metros, <strong>6 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Acrobacia Evasiva</strong>
                <p class="text-stone-800 text-xs">Como reação ao ser alvo de um ataque, gasta <strong>1 ponto de Psique</strong> para somar <strong>+4 na sua CA</strong> contra aquele golpe específico com uma pirueta evasiva.</p>
              </div>
            </div>
          </div>

          <!-- 8. FERREIRO / ARMEIRO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">8. Ferreiro / Armeiro</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Metalurgia & Forja</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Filho da forja e mestre dos metais, o Ferreiro é habilidoso na criação e reparo de armas de fogo e lâminas. Sua conexão com o fogo e o aço o torna um artífice mortal."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Força, +1 Ofício (Mecânica/Ferraria)</p>
              <p><strong>Proficiências:</strong> Forja de metais temperados, calibração balística prática, conserto de engrenagens, marretas pesadas.</p>
              <p><strong>Itens Iniciais:</strong> Martelo de forja pesado (1d6 dano), conjunto de limas e alicates, avental de couro grosso (RD 1), <strong>5 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Ferreiro</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena, role <strong>1d20</strong>: com resultado <strong>12 ou mais</strong>, aprimora uma arma ou blindagem em campo: concedendo <strong>+1 de Dano</strong>, <strong>+1 de Precisão</strong> ou <strong>+1 de RD</strong> temporário.</p>
              </div>
            </div>
          </div>

          <!-- 9. CAÇADOR / RASTREADOR -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">9. Caçador / Rastreador</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Floresta & Sangue</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Filho da floresta, acostumado ao silêncio, ao sangue e ao faro. Ninguém conhece os caminhos da mata como ele — nem os sinais de que algo antigo passou por lá."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Sobrevivência, +1 Mira</p>
              <p><strong>Proficiências:</strong> Rastreamento de feras e homens, montagem de armadilhas mecânicas, arcos longos e espingardas de caça.</p>
              <p><strong>Itens Iniciais:</strong> Espingarda de caça de cano longo (1d10 dano), faca denteada de caçador, 5 armadilhas de mola de ferro, capa de camuflagem impermeável, <strong>10 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Presa</strong>
                <p class="text-stone-800 text-xs">Uma vez por cena, role <strong>1d20</strong>: com <strong>10 ou mais</strong>, move-se sem ser detectado mesmo em áreas vigiadas ou rastreia uma trilha impossível deixada dias atrás.</p>
              </div>
            </div>
          </div>

          <!-- 10. MILITAR DE CARREIRA -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">10. Militar de Carreira</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Trincheira & Tática</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Veio de uma vida de ordens, estratégias e sobrevivência sob artilharia. Sabe como agir sob pressão e como fazer os homens manterem a linha."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Vigor, +1 Mira</p>
              <p><strong>Proficiências:</strong> Rifles de serviço militar, baionetas, comando tático sob bombardeio, manobras de trincheira.</p>
              <p><strong>Itens Iniciais:</strong> Farda de serviço de oficial, pistola de calibre militar no coldre de couro, faca de trincheira com soqueira, medalha de honra, <strong>20 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Instinto de Combate</strong>
                <p class="text-stone-800 text-xs">Age sempre primeiro em rodadas de surpresa. Uma vez por cena, pode bradar uma ordem enfática que concede <strong>vantagem imediata</strong> no próximo ataque de um aliado.</p>
              </div>
            </div>
          </div>

          <!-- 11. PROFESSOR(A) / ERUDITO(A) -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">11. Professor(a) / Erudito(a)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Letras & Enciclopédia</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"A ignorância é a mãe de todos os monstros; a tinta de uma caneta tem mais poder para erguer impérios do que uma divisão de canhões."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 História, +1 Raciocínio</p>
              <p><strong>Proficiências:</strong> Tradução de manuscritos raros, geografia comparada, retórica acadêmica e catalogação botânica.</p>
              <p><strong>Itens Iniciais:</strong> Maleta de couro com livros raros encadernados, caneta-tinteiro com frasco de tinta indelével, óculos de leitura com aro de ouro, <strong>22 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Enciclopédia Viva</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para recordar um fato crucial, fraqueza anatômica ou contexto político obscuro sobre qualquer criatura, família nobre ou artefato encontrado.</p>
              </div>
            </div>
          </div>

          <!-- 12. ENGENHEIRO / CARPINTEIRO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">12. Engenheiro / Carpinteiro</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Vapor & Engrenagens</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"Tudo o que se move obedece a alavancas, vapor e dentes de engrenagem. O que um homem constrói, outro pode desmontar com as ferramentas certas."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Ofício (Engenharia/Carpintaria), +1 Brutalidade</p>
              <p><strong>Proficiências:</strong> Maquinário a vapor, estruturas de madeira naval, dinamite, serras mecânicas e manômetros.</p>
              <p><strong>Itens Iniciais:</strong> Caixa de ferramentas pesadas de ferro, planta técnica em papel vegetal, maçarico portátil de querosene, óculos de proteção de acetato, <strong>16 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Engenho Improvisado</strong>
                <p class="text-stone-800 text-xs">Pode construir ou consertar em 1 rodada qualquer barreira física, escoramento de túnel ou mecanismo de ponte, impedindo o avanço de inimigos.</p>
              </div>
            </div>
          </div>

          <!-- 13. MARINHEIRO / LOBO DO MAR -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">13. Marinheiro / Lobo do Mar</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Oceano & Conveses</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"O mar não tem pena de covardes; aprenda a amarrar seu cabo antes que a onda quebre sobre a proa."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Atletismo (Natação/Equilíbrio), +1 Vigor</p>
              <p><strong>Proficiências:</strong> Manobra de cordames, nós náuticos, arpões manuais, navegação costeira e combate com facas curtas de marinheiro.</p>
              <p><strong>Itens Iniciais:</strong> Faca de marinheiro inoxidável com cabo de osso, capa impermeável oleada contra tempestade, rolo de 20m de corda de cânhamo, cachimbo de madeira, <strong>8 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Equilíbrio de Conveses e Nós de Marinheiro</strong>
                <p class="text-stone-800 text-xs">Ignora qualquer terreno difícil causado por balanço de navios, pisos molhados ou gelo. Pode imobilizar um alvo com cordas usando uma única ação de combate.</p>
              </div>
            </div>
          </div>

          <!-- 14. PIRATA / CORSÁRIO -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">14. Pirata / Corsário</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Abordagem & Audácia</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"As leis terminam onde o mar aberto começa. O que está a bordo do seu navio é nosso por direito do mais audacioso."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Luta (Lâminas Curtas/Sabres), +1 Lábia</p>
              <p><strong>Proficiências:</strong> Sabres de abordagem, pistolas de pederneira rápida, táticas de pilhagem e intimidação de tripulações.</p>
              <p><strong>Itens Iniciais:</strong> Sabre de abordagem curvado (1d6 dano), pistola de pederneira no coldre de peito (1d8 dano), tapa-olho ou bandana marcada por pólvora, garrafa de rum envelhecido, <strong>12 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
                <strong class="text-amber-950 font-serif block text-xs">Habilidade: Abordagem Violenta & Tiro de Finta</strong>
                <p class="text-stone-800 text-xs">Gasta <strong>1 ponto de Psique</strong> para desferir um golpe duplo no mesmo turno (ataque de sabre seguido de tiro à queima-roupa), forçando o inimigo a recuar 3 metros em desvantagem.</p>
              </div>
            </div>
          </div>

          <!-- 15. NAVEGADOR / CARTÓGRAFO DAS MARÉS -->
          <div class="p-4 bg-stone-50 rounded-xl border border-amber-900/30 shadow-sm">
            <div class="flex justify-between items-start mb-1">
              <h4 class="font-serif font-black text-amber-950 text-base">15. Navegador / Cartógrafo das Marés</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2 py-0.5 rounded">Cartas & Astrolábio</span>
            </div>
            <p class="text-xs italic text-stone-700 mb-2">"As estrelas não mentem, os homens sim. Dê-me um astrolábio e dez minutos de céu limpo, e eu levarei este navio através do próprio inferno."</p>
            <div class="text-xs text-stone-900 space-y-1">
              <p><strong>Bônus:</strong> +2 Raciocínio, +1 Percepção</p>
              <p><strong>Proficiências:</strong> Astrolábio e sextante, cartas náuticas, leitura das constelações celestes, sinais de código morse, geografia marítima.</p>
              <p><strong>Itens Iniciais:</strong> Sextante de latão em estojo acolchoado, tubo de couro com cartas náuticas em pergaminho, relógio de bolso com cronômetro, compasso de desenho náutico, lanterna de querosene fechada, <strong>15 £</strong>.</p>
              <div class="mt-2 p-2.5 bg-amber-100/70 rounded border border-amber-800/30">
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
  // CAPÍTULO VIII: AS LINHAGENS DE CORE (INTEGRAL DE ANTES DO VERBO)
  // =========================================================================
  {
    id: 8,
    roman: "VIII",
    title: "As Linhagens de Core",
    subtitle: "Povos, Raças e Heranças do Sangue Ancestral",
    iconName: "Users",
    summary: "O compêndio integral e minucioso de todas as 11 linhagens de Antes Do Verbo: textos descritivos originais completos, dados de Essência, porte de altura e atributos vitais base.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Em <em>The Core of Man</em>, a raça de um personagem é muito mais do que sua aparência externa: é o alicerce de sua resistência biológica e a medida de sua conexão com a Essência primordial do mundo. Cada linhagem possui uma <strong>Base Biológica</strong> fixa que representa sua resistência natural antes do treinamento profissional, além do seu <strong>Dado de Essência</strong> característico.
        </p>

        <div class="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-800 text-stone-950 text-xs italic leading-relaxed shadow-sm">
          "As linhagens que caminharam sobre a terra antes do Dilúvio de Esquecimento não desapareceram; elas apenas silenciaram. O sangue dos Draconatos e a astúcia dos Gnomos ainda correm nas veias da humanidade de 1900, adormecidos sob séculos de lógica e ciência. Mas o 'Core' está despertando, e o que antes era mito está prestes a se tornar carne novamente."
        </div>

        <div class="space-y-5">
          <!-- 1. HUMANOS -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🧬 Detalhes da Linhagem: Humanos</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,50m a 1,90m &bull; Porte Médio</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Os humanos em The Core são definidos por sua centelha de determinação. Eles não possuem reservas infinitas de energia mística, mas sua alma é resiliente e capaz de lampejos de poder extraordinário sob pressão. Enquanto outras raças se definem por heranças ancestrais rígidas, os humanos são o "coringa" do universo. Eles habitam desde cidades tecnológicas até vilarejos esquecidos, adaptando sua cultura e moral conforme a necessidade. No sistema The Core, ser humano significa ter o potencial de se especializar em qualquer caminho: um humano pode não ter a visão de um elfo ou a resistência de um anão, mas sua capacidade de aprender novos ofícios e sua teimosia em não aceitar a derrota os torna os arquitetos da civilização moderna. Eles são movidos pela ambição e pela necessidade de deixar um legado antes que sua vida curta se apague.
            </p>
          </div>

          <!-- 2. ANÕES -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⛏️ Detalhes da Linhagem: Anões</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,20m a 1,45m &bull; Médio (Largo)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 12</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 4</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Diferente dos humanos, a resistência do anão não vem apenas da vontade, mas de uma constituição física bruta. Seu alto SI Base reflete corpos densos, capazes de resistir a venenos, miasmas e doenças que matariam outras raças em minutos. A alma anã é pragmática e ligada à matéria. Eles encaram o mundo com a solidez de uma montanha: difíceis de mover, perigosos de confrontar e profundamente leais ao que constroem com as próprias mãos. Sua cultura antiga era focada na precisão e na imutabilidade das leis da física e da forja.
            </p>
          </div>

          <!-- 3. ELFOS -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🍃 Detalhes da Linhagem: Elfos</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,60m a 1,90m &bull; Médio (Esguios)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 12</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Os elfos possuem uma elegância inata que se traduz em sua CA Base, movendo-se com uma fluidez que desafia o olhar. Sua Psique elevada demonstra uma mente treinada na contemplação e na memória milenar. Contudo, sua conexão com o mundo físico é delicada: eles adoecem menos por infecções mundanas, mas sofrem profundamente quando a própria Essência ao seu redor é corrompida. Em The Core, os elfos do passado eram guardiões de verdades esquecidas, seres que viam o tempo correr devagar demais para as ambições humanas.
            </p>
          </div>

          <!-- 4. MEIO-ELFO -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌓 Detalhes da Linhagem: Meio-Elfo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,55m a 1,90m &bull; Porte Médio</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 10</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              O Meio-Elfo equilibra a fragilidade élfica com a determinação humana. Eles possuem uma adaptabilidade única, sendo capazes de transitar entre círculos sociais de ambas as raças sem nunca pertencerem completamente a nenhum. Sua mente é flexível e curiosa, mas carrega o peso do isolamento identitário. No sistema, eles oferecem um equilíbrio sólido entre agilidade, mente e resistência.
            </p>
          </div>

          <!-- 5. DROW (ELFOS NEGROS) -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌑 Detalhes da Linhagem: Drow (Elfos Negros)</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,60m a 1,90m &bull; Médio (Esguios)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 13</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Morfologicamente semelhantes aos elfos da superfície, os Drow desenvolveram reflexos ainda mais letais para sobreviver em ambientes hostis e subterrâneos. Sua CA Base é a mais alta entre os povos humanoides comuns, refletindo uma capacidade de esquiva quase pré-cognitiva. Eles são desconfiados, calculistas e possuem uma mente blindada contra enganos, fruto de séculos de intriga e silêncio. Para um Drow, a fraqueza é punida com o esquecimento.
            </p>
          </div>

          <!-- 6. MEIO-DROW -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🌓 Detalhes da Linhagem: Meio-Drow</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,60m a 1,90m &bull; Médio (Esguios)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 9</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 11</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              A ponte entre dois mundos. No passado remoto, eram diplomatas ou párias renegados pelas duas linhagens; no futuro de The Core, eles representam a fusão definitiva das linhagens, combinando reflexos sombrios com a perseverança inquebrável humana.
            </p>
          </div>

          <!-- 7. HALFLING -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">👣 Detalhes da Linhagem: Halfling</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">0,80m a 1,00m &bull; Porte Pequeno</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 8</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 12</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 3</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d4 (Rerrola 1)</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Pequenos, ágeis e estranhamente afortunados. No passado remoto de The Core, os Halflings eram nômades que sobreviviam através da invisibilidade social e da sorte pura. Os Halflings possuem uma CA Base elevada não por armadura pesada, mas por serem alvos diminutos e extremamente difíceis de atingir, dotados de um instinto de preservação aguçado. Eles são a prova viva de que o tamanho não define a resistência: sua mente é otimista e resiliente contra o desespero. Em eras antigas, eram os olhos e ouvidos das rotas comerciais, sobrevivendo onde gigantes caíam.
            </p>
          </div>

          <!-- 8. DRACONATO -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🐲 Detalhes da Linhagem: Draconato</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,90m a 2,20m &bull; Médio / Grande</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 15</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 14</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 3</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d8</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Descendentes de linhagens titânicas. No mundo antigo, eles eram a personificação do poder físico e da autoridade elemental. Com o maior HP Base inicial de todo o sistema, o Draconato é um verdadeiro tanque biológico. Sua estrutura óssea reforçada e escamas ancestrais oferecem uma proteção natural que poucos humanos conseguem compreender. Eles são movidos pela honra e pelo sangue; na antiguidade de The Core, eram líderes de guerra e guardiões de locais de alta concentração de Essência. Sua presença é imponente e sua biologia é forjada para a conquista.
            </p>
          </div>

          <!-- 9. GNOMO -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⚙️ Detalhes da Linhagem: Gnomo</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">0,90m a 1,10m &bull; Porte Pequeno</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 7</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 9</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 5</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 2</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d6</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Mestres da curiosidade e da manipulação da matéria. Enquanto o mundo antigo era movido por espadas e lanças, os Gnomos já viam as engrenagens por trás da realidade. Gnomos possuem a maior Psique Base do jogo. Suas mentes são labirintos de lógica e criatividade, tornando-os quase imunes a confusões mentais comuns e horrores ordinários. Eles veem a Essência como uma ferramenta técnica. Eram os inventores de mecanismos impossíveis que a ciência moderna ainda levaria milênios para redescobrir.
            </p>
          </div>

          <!-- 10. MEIO-ORC -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">👹 Detalhes da Linhagem: Meio-Orc</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,80m a 2,10m &bull; Médio / Grande</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 12</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 14</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 1</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 4</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              A força bruta forjada na necessidade de sobrevivência extrema. Eles são os sobreviventes de ambientes inóspitos onde nada mais deveria viver. Focados em HP e SI elevados, os Meio-Orcs são quase impossíveis de serem derrubados por doenças, venenos ou fadiga muscular. Sua Psique é mais vulnerável, pois sua natureza é voltada para a ação direta e para o instinto visceral, deixando pouco espaço para a introspecção defensiva. Na antiguidade, eram a vanguarda feroz contra as criaturas que espreitavam no escuro.
            </p>
          </div>

          <!-- 11. TIEFLING -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">🔱 Detalhes da Linhagem: Tiefling</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,60m a 1,90m &bull; Porte Médio</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 10</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 8</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 4</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 1</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d8</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Marcados por uma ascendência que a história tentou apagar. Sua existência é uma prova viva de que a Essência pode transformar o sangue biológico. Tieflings possuem uma Psique alta e uma conexão profunda e instintiva com o lado sombrio da Essência cósmica. Suas mentes são treinadas para resistir ao preconceito humano e à influência externa. Embora seus corpos não sejam mais resistentes que os dos homens comuns, sua vontade espiritual é profunda, exótica e magnética, manifestando-se em habilidades que desafiam qualquer dogma religioso.
            </p>
          </div>

          <!-- AUTÔMATOS & FORJADOS (INDUSTRIAL) -->
          <div class="p-4 bg-stone-50 rounded-xl border-2 border-amber-800/40 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-serif font-black text-amber-950 text-lg">⚙️ Detalhes da Linhagem: Autômatos & Forjados</h4>
              <span class="text-xs font-mono font-bold bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded">1,70m a 2,10m &bull; Porte Pesado</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3 font-mono">
              <div class="p-1.5 bg-red-100 text-red-950 rounded font-bold">HP Base: 14</div>
              <div class="p-1.5 bg-blue-100 text-blue-950 rounded font-bold">CA Base: 12</div>
              <div class="p-1.5 bg-purple-100 text-purple-950 rounded font-bold">Psique Base: 2</div>
              <div class="p-1.5 bg-emerald-100 text-emerald-950 rounded font-bold">SI Base: 5 (Imune a venenos orgânicos)</div>
              <div class="p-1.5 bg-amber-200 text-amber-950 rounded font-black col-span-2 sm:col-span-1 border border-amber-600">Dado de Essência: 1d4</div>
            </div>
            <p class="text-xs text-stone-900 leading-relaxed text-justify">
              Criados durante os primeiros experimentos bélicos que misturaram caldeiras a vapor com núcleos ressonantes de meteoritos, os Forjados são consciências artificiais despertas. Seus corpos são feitos de latonita, aço e válvulas pneumáticas. Não sofrem por hemorragias nem venenos biológicos, mas necessitam de manutenção com peças mecânicas e graxa especial para reparar danos estruturais graves.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO IX: DONS DO CERNE & FARDOS DO VERBO (ALTO CONTRASTE TOTAL!)
  // =========================================================================
  {
    id: 9,
    roman: "IX",
    title: "Dons do Cerne & Fardos do Verbo",
    subtitle: "O Compêndio Integral de Ecos, Níveis e Patologias",
    iconName: "Scroll",
    summary: "A lista completa e sem resumos: todos os Dons do Cerne com seus níveis de 0 a 5, custos de XP, mecânicas e todos os Fardos do Verbo com a tabela dos Black Walkers em alto contraste.",
    contentHtml: `
      <div class="space-y-8">
        <div class="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-800 text-stone-950 leading-relaxed text-xs shadow-sm">
          <strong>Aviso do Mestre:</strong> Certas almas carregam marcas místicas únicas: <strong>Dons do Cerne</strong> (habilidades sobrenaturais compradas com Pontos de Experiência - XP) e <strong>Fardos do Verbo</strong> (patologias e maldições que cobram um preço cruel na carne e na mente, mas concedem bônus de XP na criação do personagem). Abaixo constam todas as regras integrais.
        </div>

        <!-- SEÇÃO: DONS DO CERNE -->
        <div>
          <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/40 pb-2 mb-4 flex items-center justify-between">
            <span>Dons do Cerne (Habilidades do Eco)</span>
            <span class="text-xs font-sans font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-800/30">Comprados com XP</span>
          </h3>

          <div class="space-y-4">
            <!-- Sempre Vivo -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Sempre Vivo</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">2 XP (Nível 0-5)</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                Quando um personagem com essa característica morre, ele volta à vida no próximo amanhecer. Quando volta, ele volta com <strong>menos 28 de XP</strong>, podendo remover pontos de atributos já pagos; caso algum atributo fique abaixo de 1, o personagem morre permanentemente. Reduza em <strong>4 pontos de XP</strong> cobrados para cada nível além do 0 que tenham nesse eco.
              </p>
            </div>

            <!-- Caminhante (Diálogo com os Mortos) -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Caminhante (Diálogo com os Mortos)</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">Progressivo em Níveis</span>
              </div>
              <p class="text-xs italic text-stone-700 mt-1 mb-2">Aqueles que são capazes de dialogar com os mortos.</p>
              <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
                <li><strong>Nível 0:</strong> Somente é capaz de dialogar com mortos na última semana, desde que esteja na presença física do corpo do morto. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 1:</strong> Caso conheça o nome e o rosto de uma pessoa, você sabe se esse indivíduo morreu na última semana; caso essa pessoa seja próxima ou seja um possuído do eco, você sabe exatamente onde o corpo se encontra. <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 2:</strong> Você passa a ser capaz de dialogar com os mortos na última semana independente da presença do corpo, mas ainda precisa conhecer o seu rosto e nome. <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 3:</strong> Você pode dialogar com mortos da última década, necessitando apenas do nome e rosto da pessoa. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 4:</strong> Você pode dialogar com qualquer morto independente do tempo transcorrido, desde que saiba seu nome e rosto. <em>[Custo: 2 XP]</em></li>
              </ul>
            </div>

            <!-- Parasita de Morto -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Parasita de Morto</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">Assimilação de Almas</span>
              </div>
              <p class="text-xs italic text-stone-700 mt-1 mb-2">Os parasitas de mortos são mal vistos, já que os seus entes queridos ou inimigos passam a fazer parte do parasita. Ironicamente, um parasita só descobre sua condição quando alguém morre.</p>
              <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
                <li><strong>Nível 0:</strong> Quando um personagem com quem você tem uma relação forte (boa ou má) morre, você assimila as piores lembranças dele. <em>[Concede: +4 XP de bônus inicial]</em></li>
                <li><strong>Nível 1:</strong> Quando uma pessoa próxima com boa relação morre e o parasita presencia a morte, ele assimila os 2 atributos mais altos dela e todas as suas memórias. <em>[Custo: 6 XP]</em></li>
                <li><strong>Nível 2:</strong> Quando uma pessoa próxima com boa ou má relação morre diante do parasita, ele assimila seus 2 atributos mais altos e suas memórias. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 3:</strong> Assimila os 2 atributos mais altos e memórias de qualquer pessoa próxima sem necessidade de presenciar a morte; contudo, o parasita revisita a agonia daquela morte em pesadelos todas as noites pelo resto da vida. <em>[Custo: 4 XP]</em></li>
              </ul>
            </div>

            <!-- Morto por Nós -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Morto por Nós</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">4 XP</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                São capazes de assumir ferimentos e doenças de outros de forma instantânea. Fazendo assim os outros perderem tais malefícios, enquanto o possuído do eco os assume em seu próprio corpo. Podendo até mesmo assumir a morte de outro, desde que este tenha morrido antes do amanhecer seguinte à sua morte.
              </p>
            </div>

            <!-- Tecelão de Sonho -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Tecelão de Sonho</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">Domínio Onírico</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                Capazes de vagar pelo subconsciente próprio e alheio, revivendo memórias esquecidas, implantando sugestões sutis em alvos adormecidos ou extraindo segredos protegidos por barreiras conscientes.
              </p>
            </div>

            <!-- Habitante de Olhos -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Habitante de Olhos</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">Vigília Sensorial</span>
              </div>
              <p class="text-xs italic text-stone-700 mt-1 mb-2">Possuídos por arcanos que almejavam saber tudo. Quando o possuído usa qualquer nível desse eco, seu corpo físico original fica inconsciente.</p>
              <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
                <li><strong>Nível 0:</strong> Enxerga através dos olhos de animais com os quais já tem familiaridade prévia. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 1:</strong> Assume o controle total do corpo de um animal com familiaridade (se prejudicar o animal, ele perde a familiaridade). <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 2:</strong> Enxerga através dos olhos de animais desconhecidos sem familiaridade. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 3:</strong> Assume o corpo de animais sem familiaridade e enxerga através dos olhos de seres humanos desconhecidos. <em>[Custo: 2 XP]</em></li>
              </ul>
            </div>

            <!-- Fala Selvagem -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Fala Selvagem</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">Comunhão Natural</span>
              </div>
              <p class="text-xs italic text-stone-700 mt-1 mb-2">Comunicação com árvores e animais, concedida por arcanos ligados à natureza.</p>
              <ul class="text-xs text-stone-900 space-y-1.5 pl-4 list-disc">
                <li><strong>Nível 0:</strong> Ouve árvores ou animais quando falam em conjunto (anunciando mudanças climáticas, pragas ou terremotos). <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 1:</strong> Fala com árvores (diálogos simples sobre composição da terra, clima, passado). <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 2:</strong> Fala diretamente com animais em conversas de raciocínio simples e direto. <em>[Custo: 2 XP]</em></li>
                <li><strong>Nível 3:</strong> Forja pactos de mútua ajuda com árvores e feras. <em>[Custo: 1 XP]</em></li>
                <li><strong>Nível 4:</strong> Acessa memórias de árvores e animais vivenciando a perspectiva do ambiente ao redor. <em>[Custo: 2 XP]</em></li>
              </ul>
            </div>

            <!-- Alma Silvestre -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Alma Silvestre</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">5 XP (Raríssimo)</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                Raríssimo (menos de 15 por geração). Permite que qualquer ser em contato físico contínuo por mais de 1 minuto ceda ou receba HP, ferimentos ou males físicos do possuidor da Alma Silvestre. Pode nutrir flora ao redor com seu próprio HP (mas não extrai vitalidade da flora).
              </p>
            </div>

            <!-- Forjador de Vida -->
            <div class="p-4 rounded-lg bg-stone-50 border border-amber-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-base">Forjador de Vida</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">12 XP</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                Capaz de criar vidas distorcidas e servos animados usando corpos (vivos ou mortos) e a própria vitalidade ou de outros, podendo erguer pequenas hostes leais.
              </p>
            </div>

            <!-- CARD REFORMULADO EM ALTO CONTRASTE: ASCENDÊNCIA DO VERBO -->
            <div class="p-5 rounded-xl bg-amber-50 border-2 border-amber-800 shadow-md">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-amber-950 text-lg">Ascendência do Verbo</h4>
                <span class="px-3 py-1 rounded text-xs font-mono font-bold bg-amber-900 text-amber-50">Custo Definido pelo Mestre</span>
              </div>
              <p class="text-xs font-bold text-amber-950 mt-2 leading-relaxed text-justify">
                Há poder no sangue... Você faz parte de uma linhagem direta do Verbo Primordial.
              </p>
              <div class="mt-3 p-3.5 bg-white rounded-lg border border-amber-800/40 text-xs text-stone-900 leading-relaxed space-y-2">
                <p>
                  <strong>• Custo em XP:</strong> [X de XP] — A quantidade de XP não é fixa em tabela porque é definida pelo Mestre com base no ancestral em questão e na magnitude da sua força cósmica.
                </p>
                <p>
                  <strong>• Bênção do Antecessor:</strong> Dê a ideia de habilidades específicas que deseja manifestar com sua linhagem ancestral, e o Mestre fará o balanceamento e definirá o custo exato em XP para o seu personagem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- SEÇÃO: FARDOS DO VERBO (PATOLOGIAS) -->
        <div class="mt-12">
          <h3 class="text-xl font-bold font-serif text-red-950 border-b-2 border-red-900/40 pb-2 mb-4 flex items-center justify-between">
            <span>Fardos do Verbo (Patologias e Maldições)</span>
            <span class="text-xs font-sans font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full border border-red-800/30">Concedem Bônus de XP</span>
          </h3>

          <div class="space-y-4">
            <!-- Doença Pálida -->
            <div class="p-4 rounded-lg bg-stone-50 border border-red-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-red-950 text-base">Doença Pálida (Vampirismo)</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-800 text-red-50">+3 XP Inicial</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                A pele torna-se alva e translúcida. O infectado não tolera luz solar direta (-2 em todas as rolagens diurnas a céu aberto) e necessita ingerir sangue fresco a cada três dias para não sofrer penalidades cumulativas em Vigor e Psique. Em contrapartida, enxerga no escuro total e possui sentidos aguçados.
              </p>
            </div>

            <!-- Doença da Fera -->
            <div class="p-4 rounded-lg bg-stone-50 border border-red-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-red-950 text-base">Doença da Fera (Licanotropia & Penas Negras)</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-800 text-red-50">+4 XP Inicial</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                Os lobisomens e criaturas bestiais. Esta é a mais prolixa linhagem da doença do eco. Sob estresse extremo, luar cheio ou ferimentos graves, a besta interior emerge: unhas engrossam, mandíbulas se projetam e a sede por carne viva assume o controle da mente, exigindo testes contínuos de Força de Vontade para não ferir aliados.
              </p>
            </div>

            <!-- Doença da Imortalidade -->
            <div class="p-4 rounded-lg bg-stone-50 border border-red-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-red-950 text-base">Doença da Imortalidade</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-800 text-red-50">+8 XP Inicial</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                A doença existencial. O envelhecimento cessa por completo, mas o indivíduo perde a capacidade de sentir prazer carnal, sono repousante ou gosto de comida comum — só consegue sentir paladar ao consumir a própria carne. Caso um membro seja amputado, o hospedeiro o regenera se devorar o membro cortado.
              </p>
            </div>

            <!-- Doença do Crispo -->
            <div class="p-4 rounded-lg bg-stone-50 border border-red-800/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-red-950 text-base">Doença do Crispo</h4>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-800 text-red-50">+2 XP (+1/ano infectado)</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                A doença do flagelo. Cristaliza órgãos internos gradativamente, causando dores crônicas terríveis (-2 de Psique permanente por ano de infecção). A cada 4 anos, reduz em 1 a Força. Três horas após o óbito, o corpo se transforma em uma estátua completa de cristal translúcido.
              </p>
            </div>

            <!-- CARD REFORMULADO EM ALTO CONTRASTE TOTAL: DOENÇA DO NÃO HOMEM (BLACK WALKERS) -->
            <div class="p-5 rounded-xl bg-stone-100 border-2 border-stone-800 shadow-md">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-black text-stone-950 text-lg">Doença do Não Homem (Gênese dos Black Walkers)</h4>
                <span class="px-3 py-1 rounded text-xs font-mono font-bold bg-stone-900 text-stone-100">+5 XP (+2/ano infectado)</span>
              </div>
              <p class="text-xs text-stone-900 mt-2 leading-relaxed text-justify">
                A patologia mais aterradora do mundo. Apresenta batimentos cardíacos lentos, escurecimento da epiderme e engrossamento capilar até atingir o ápice após 10 anos. Ao falecer, o corpo se reanima entre 1 e 5 dias como um <strong>Black Walker</strong>: uma criatura violenta cujos atributos e inteligência crescem conforme o tempo que passou infectado em vida.
              </p>

              <!-- TABELA ANO A ANO EM ALTO CONTRASTE CLARO -->
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4 text-center text-xs font-mono">
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">1 Ano</span>
                  <span class="text-stone-900 font-black">8 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Zero Raciocínio</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">2 Anos</span>
                  <span class="text-stone-900 font-black">12 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Zero Raciocínio</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">3 Anos</span>
                  <span class="text-stone-900 font-black">16 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Instinto de Fuga</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">4 Anos</span>
                  <span class="text-stone-900 font-black">20 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Rude / Fuga</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">5 Anos</span>
                  <span class="text-stone-900 font-black">24 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Rude / Fuga</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">6 Anos</span>
                  <span class="text-stone-900 font-black">28 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Humano Comum</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">7 Anos</span>
                  <span class="text-stone-900 font-black">32 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Humano Comum</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">8 Anos</span>
                  <span class="text-stone-900 font-black">36 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Humano Sábio</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">9 Anos</span>
                  <span class="text-stone-900 font-black">40 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Tático Superior</span>
                </div>
                <div class="p-2.5 bg-white rounded border border-stone-400 text-stone-950 shadow-sm">
                  <span class="font-bold text-red-800 block">10 Anos</span>
                  <span class="text-stone-900 font-black">60 HP</span><br />
                  <span class="text-stone-700 text-[10px]">Supremo Violento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // =========================================================================
  // CAPÍTULO X: A TRILHA DO NAVEGANTE (EVOLUÇÃO, XP & TAROT)
  // =========================================================================
  {
    id: 10,
    roman: "X",
    title: "A Trilha do Navegante",
    subtitle: "Evolução, Tabela de XP e o Sistema de Tarot",
    iconName: "TrendingUp",
    summary: "Como o protagonista evolui: marcos de avanço, tabela oficial de XP e a mecânica das cartas do Tarot e Patronos cósmicos.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-900 text-justify">
          Ninguém permanece o mesmo após encarar o abismo. Em <em>The Core of Man</em>, o avanço do personagem é medido em <strong>Pontos de Experiência (XP)</strong> recebidos ao final de cada sessão, além das revelações cósmicas trazidas pelo <strong>Tarot</strong>.
        </p>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2">
          Custos de Evolução em XP
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-3.5 bg-stone-50 rounded-lg border border-amber-800/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">Avanço Físico e Mental</strong>
            <p class="text-stone-800">&bull; +1 Ponto em qualquer Atributo Comum: <strong>4 XP</strong></p>
            <p class="text-stone-800">&bull; +1 Ponto em qualquer Perícia Comum: <strong>2 XP</strong></p>
            <span class="text-stone-600 italic block mt-1">Lembre-se do limite: Perícia &le; 2x Atributo.</span>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-lg border border-amber-800/30 shadow-sm">
            <strong class="text-amber-950 font-serif block text-sm mb-1">Avanço Espiritual (Força de Vontade)</strong>
            <p class="text-stone-800">&bull; +1 Ponto no Atributo Força de Vontade: <strong>6 XP</strong></p>
            <p class="text-stone-800">&bull; +1 Ponto em Mente, Alma, Corpo ou Essência: <strong>4 XP</strong></p>
            <span class="text-stone-600 italic block mt-1">Desenvolver a alma exige provações extremas.</span>
          </div>
        </div>

        <h3 class="font-serif font-bold text-amber-950 text-xl border-b border-amber-900/30 pb-2 mt-8">
          O Destino das Cartas: O Sistema de Tarot
        </h3>
        <p class="text-xs text-stone-900 leading-relaxed text-justify">
          Na criação e em momentos cruciais da jornada, o Mestre tirará 3 cartas do Tarot:
        </p>
        <div class="space-y-2 mt-2 text-xs">
          <div class="p-3 bg-amber-50 rounded border-l-4 border-amber-800 text-stone-900">
            <strong>1. A Carta do Passado:</strong> Representa o trauma fundacional, o primeiro amor ou a dívida moral que forjou sua psique.
          </div>
          <div class="p-3 bg-amber-50 rounded border-l-4 border-amber-800 text-stone-900">
            <strong>2. A Carta do Presente:</strong> O conflito imediato, o dilema ético que ameaça quebrar sua Força de Vontade no arco atual.
          </div>
          <div class="p-3 bg-amber-50 rounded border-l-4 border-amber-800 text-stone-900">
            <strong>3. A Carta do Futuro & Patrono:</strong> A sombra do destino, a profecia ou a entidade primordial que aguarda sua alma nas encruzilhadas do tempo.
          </div>
        </div>
      </div>
    `
  }
];
