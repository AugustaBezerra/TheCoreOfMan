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
  {
    id: 1,
    roman: "I",
    title: "O Chamado dos Céus",
    subtitle: "O Verbo, a Ruptura e a Sobrevivência",
    iconName: "Compass",
    summary: "A história do mundo fragmentado, onde os continentes flutuam sobre um abismo e navios de ferro erguem velas ao vento.",
    contentHtml: `
      <div class="space-y-6">
        <div class="p-4 rounded-lg bg-amber-900/10 border-l-4 border-amber-700 italic text-stone-800 leading-relaxed text-sm">
          "No princípio não havia o homem, apenas o Verbo. E quando os céus se partiram, os navios ergueram velas de ferro ao vento, e a alma humana descobriu o preço terrível de cada milagre."
        </div>

        <p class="leading-relaxed text-stone-800 text-justify">
          Bem-vindo a <strong>A Era dos Céus Partidos</strong>. Você está prestes a entrar em um universo onde a terra firme ruiu há séculos. Cidades inteiras flutuam suspensas por motores arcanos de éter, correntes colossais ancoram ilhas de rocha estelar, e corsários, artífices e místicos desbravam correntes de ar desconhecidas entre tempestades elétricas e ruínas de deuses esquecidos.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-6">A Realidade do Navegante</h3>
        <p class="leading-relaxed text-stone-800 text-justify">
          Neste mundo, sobreviver não é uma garantia concedida aos fracos. Cada gota de combustível éter custa sangue; cada feitiço invocado cobra uma fatia da sanidade do conjurador; e sob a camada mais densa de nuvens rastejam horrores que a luz das estrelas jamais tocou.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="p-4 rounded-lg bg-stone-100/80 border border-amber-900/20 shadow-sm">
            <h4 class="font-serif font-bold text-amber-900 mb-1">O Verbo Primordial</h4>
            <p class="text-xs text-stone-700 leading-relaxed">A centelha original da criação. Fragmentado durante o Grande Cataclismo, seus ecos ainda reverberam no sangue de linhagens ancestrais e nas profundezas do vácuo.</p>
          </div>
          <div class="p-4 rounded-lg bg-stone-100/80 border border-amber-900/20 shadow-sm">
            <h4 class="font-serif font-bold text-amber-900 mb-1">Os Céus Partidos</h4>
            <p class="text-xs text-stone-700 leading-relaxed">O arquipélago celestial. Ilhas flutuantes ligadas por cabos de aço e rotas marítimas aéreas patrulhadas por encouraçados a vapor e piratas dos ventos.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    roman: "II",
    title: "A Regra de Ouro",
    subtitle: "Resolução de Testes e Mecânicas Básicas",
    iconName: "Dices",
    summary: "Como os dados decidem o destino: o teste D20 + Atributo + Perícia contra a Dificuldade imposta pelo Mestre.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          Sempre que seu personagem tenta uma ação cujo desfecho seja incerto ou perigoso, o Mestre solicitará um <strong>Teste de Resolução</strong>. A mecânica central de Core é rápida, mortal e intuitiva:
        </p>

        <div class="p-4 bg-amber-950 text-amber-100 rounded-lg text-center font-serif text-lg tracking-wide shadow-md border border-amber-700">
          D20 + Atributo Relevante + Perícia Relevante &ge; Dificuldade (DT)
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-6">Graus de Dificuldade (DT)</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b-2 border-amber-900/40 text-amber-950 font-serif">
                <th class="py-2 px-3">Dificuldade (DT)</th>
                <th class="py-2 px-3">Classificação</th>
                <th class="py-2 px-3">Exemplo Prático</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-900/10 text-stone-800">
              <tr><td class="py-2 px-3 font-bold text-emerald-800">DT 10</td><td class="py-2 px-3">Fácil / Rotineira</td><td class="py-2 px-3">Reparar uma válvula comum de vapor com ferramentas em terra firme.</td></tr>
              <tr><td class="py-2 px-3 font-bold text-blue-800">DT 15</td><td class="py-2 px-3">Desafiadora</td><td class="py-2 px-3">Saltar entre dois dirigíveis em movimento durante ventania leve.</td></tr>
              <tr><td class="py-2 px-3 font-bold text-amber-800">DT 20</td><td class="py-2 px-3">Difícil</td><td class="py-2 px-3">Decifrar um manuscrito arcano enquanto a cabine está em chamas.</td></tr>
              <tr><td class="py-2 px-3 font-bold text-purple-800">DT 25</td><td class="py-2 px-3">Heroica</td><td class="py-2 px-3">Conter uma explosão de núcleo de cristal de éter com as próprias mãos.</td></tr>
              <tr><td class="py-2 px-3 font-bold text-red-800">DT 30+</td><td class="py-2 px-3">Quase Impossível</td><td class="py-2 px-3">Comunicar-se com a mente de um Primordial sem enlouquecer instantaneamente.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-6">Sucessos e Falhas Críticas</h3>
        <ul class="list-disc list-inside space-y-2 text-stone-800 text-sm leading-relaxed">
          <li><strong>20 Natural:</strong> Sucesso Crítico! A ação obtém um efeito espetacular além do esperado, como dano máximo ou economia de recursos vitais.</li>
          <li><strong>1 Natural:</strong> Falha Crítica! Uma complicação imprevista ocorre imediatamente: armas travam, cordas rompem ou o éter reverbera contra o conjurador.</li>
        </ul>
      </div>
    `
  },
  {
    id: 3,
    roman: "III",
    title: "Atributos e Perícias",
    subtitle: "A Matriz de Capacidades do Navegante",
    iconName: "UserCheck",
    summary: "Os seis atributos fundamentais (Físicos e Mentais) e a relação direta com o treinamento em perícias.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          Cada navegante em Core é definido por seus <strong>Atributos</strong> (escala natural de 0 a 5, onde 0 é inabilidade e 5 é o ápice do potencial humano) e suas <strong>Perícias</strong> especializadas.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2">Atributos Físicos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Vigor (VIG)</h4>
            <p class="text-xs text-stone-700 mt-1">Resistência corporal, fôlego e tolerância a venenos e fadiga. Base para cálculo de Pontos de Vida (HP).</p>
          </div>
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Destreza (DES)</h4>
            <p class="text-xs text-stone-700 mt-1">Coordenação motora fina, pontaria com armas de fogo e manipulação de ferramentas de precisão.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Agilidade (AGI)</h4>
            <p class="text-xs text-stone-700 mt-1">Velocidade de reação, reflexos, equilíbrio em mastros e capacidade de esquiva em combate.</p>
          </div>
        </div>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-4">Atributos Mentais & Sociais</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Percepção (PER)</h4>
            <p class="text-xs text-stone-700 mt-1">Sentidos aguçados, vigilância contra emboscadas nas nuvens e intuição de perigos ocultos.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Intelecto (INT)</h4>
            <p class="text-xs text-stone-700 mt-1">Raciocínio lógico, navegação estelar, conhecimento técnico, engenharia e cartografia celeste.</p>
          </div>
          <div class="p-3 bg-stone-100 rounded border border-amber-900/20">
            <h4 class="font-bold font-serif text-amber-900">Carisma (CAR)</h4>
            <p class="text-xs text-stone-700 mt-1">Força de personalidade, presença de comando, liderança de tripulação, persuasão e blefe.</p>
          </div>
        </div>

        <div class="p-4 bg-amber-900/10 rounded-lg border border-amber-900/30">
          <h4 class="font-bold font-serif text-amber-950 mb-1">A Regra de Limite de Perícia</h4>
          <p class="text-xs text-stone-800 leading-relaxed">
            Nenhuma perícia pode ter graduação superior a <strong>2 &times; o Atributo relacionado</strong>. Você não pode se tornar um mestre em pilotagem se não tiver o intelecto ou os reflexos mínimos exigidos pelo ar!
          </p>
        </div>
      </div>
    `
  },
  {
    id: 4,
    roman: "IV",
    title: "Força de Vontade",
    subtitle: "O Preço do Poder e o Sacrifício Punitivo",
    iconName: "Flame",
    summary: "O atributo especial que mede a resiliência espiritual e permite transcender os limites mortais mediante um sacrifício.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          <strong>Força de Vontade (FV)</strong> é o recurso mais precioso e perigoso de um protagonista em Core. Diferente dos atributos comuns, ela representa a fibra da alma &mdash; a capacidade de recusar a morte, resistir ao desespero cósmico e arrancar vitórias das mandíbulas da derrota.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-4">Usos da Força de Vontade</h3>
        <ul class="list-disc list-inside space-y-3 text-stone-800 text-sm leading-relaxed">
          <li><strong>O Sopro Heroico:</strong> Gastar 1 Ponto de FV permite rolar novamente um dado fracassado ou adicionar +1d6 a um teste vital de vida ou morte.</li>
          <li><strong>Ignorar a Agonia:</strong> Manter-se consciente e de pé por um turno mesmo após seus Pontos de Vida chegarem a zero.</li>
          <li><strong>Combustão Arcana:</strong> Substituir Pontos de Essência que você não possui consumindo diretamente sua Força de Vontade.</li>
        </ul>

        <div class="p-4 rounded-lg bg-red-950 text-red-100 border-l-4 border-red-600 shadow-md">
          <h4 class="font-serif font-bold text-red-300 text-base mb-1">O Sacrifício Punitivo (Quando a FV Zera)</h4>
          <p class="text-xs leading-relaxed">
            Se sua Força de Vontade for reduzida a zero, sua alma sofre uma <strong>Fratura do Cerne</strong>. O personagem entra em estado de catatonia ou desespero absoluto, sofrendo uma desvantagem permanente em todos os testes até que consiga cumprir um Juramento Solene diante do Mestre.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    roman: "V",
    title: "Os Quatro Pilares",
    subtitle: "Status Vitais de Sobrevivência",
    iconName: "Shield",
    summary: "A estrutura de vida de um personagem: Vida (HP), Classe de Armadura (CA), Psique (Sanidade) e Sistema Imune (SI).",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          No vazio dos Céus Partidos, a morte espreita por quatro portas distintas. Um navegador prudente monitora seus quatro pilares constantemente:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-stone-100 border-t-4 border-red-700 shadow-sm">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-serif font-bold text-red-900 text-lg">HP &bull; Pontos de Vida</h4>
              <span class="text-xs font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Físico</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed">A carne, o sangue e a integridade estrutural. Chegando a 0 HP, o personagem entra em estado de agonia e precisa de primeiros socorros imediatos antes de morrer.</p>
          </div>

          <div class="p-4 rounded-lg bg-stone-100 border-t-4 border-amber-700 shadow-sm">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-serif font-bold text-amber-900 text-lg">CA &bull; Classe de Armadura</h4>
              <span class="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Defesa</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed">Dificuldade necessária para atingir você. Combina couraças de couro reforçado, placas de bronze ou escudos arcanos com agilidade de esquiva.</p>
          </div>

          <div class="p-4 rounded-lg bg-stone-100 border-t-4 border-purple-700 shadow-sm">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-serif font-bold text-purple-900 text-lg">Psique &bull; Estabilidade Mental</h4>
              <span class="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">Sanidade</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed">Sua barreira contra o horror cósmico, fardos e alucinações. Danos à Psique geram fobias, alucinações auditivas e paralisia de pânico.</p>
          </div>

          <div class="p-4 rounded-lg bg-stone-100 border-t-4 border-emerald-700 shadow-sm">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-serif font-bold text-emerald-900 text-lg">SI &bull; Sistema Imune</h4>
              <span class="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Biológico</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed">Resistência ativa contra as infecções do eco, esporos de fungos do vazio e as terríveis pragas dos Fardos do Verbo.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 6,
    roman: "VI",
    title: "A Trama do Éter",
    subtitle: "Magia, Essência e Cristais Arcanos",
    iconName: "Sparkles",
    summary: "A energia cósmica que abastece dirigíveis e canaliza magias: os cinco domínios e o manuseio de cristais de éter.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          O <strong>Éter</strong> é o fluido cósmico deixado para trás pela quebra dos céus. Ele satura os ventos, solidifica-se em veios de cristal luminescente e serve tanto de combustível para os motores dos dirigíveis quanto de matéria-prima para a tecelagem arcana.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-4">Os Cinco Grandes Domínios</h3>
        <div class="space-y-3 text-xs">
          <div class="p-3 bg-stone-100 rounded border-l-4 border-amber-600">
            <strong class="font-serif text-amber-950 text-sm">1. Domínio da Matéria:</strong> Manipulação de metais, endurecimento de madeira de ferro e transmutações mecânicas.
          </div>
          <div class="p-3 bg-stone-100 rounded border-l-4 border-sky-600">
            <strong class="font-serif text-sky-950 text-sm">2. Domínio da Força:</strong> Controle de correntes de ar, campos de repulsão cinética, relâmpagos e propulsão.
          </div>
          <div class="p-3 bg-stone-100 rounded border-l-4 border-purple-600">
            <strong class="font-serif text-purple-950 text-sm">3. Domínio da Mente:</strong> Telepatia de tripulação, indução de medo, ilusões e proteção psíquica.
          </div>
          <div class="p-3 bg-stone-100 rounded border-l-4 border-emerald-600">
            <strong class="font-serif text-emerald-950 text-sm">4. Domínio da Vida:</strong> Cauterização de feridas, aceleração celular, necromorfismo e simbiose biológica.
          </div>
          <div class="p-3 bg-stone-100 rounded border-l-4 border-indigo-600">
            <strong class="font-serif text-indigo-950 text-sm">5. Domínio do Espaço-Tempo:</strong> Dobra de distâncias, desaceleração temporal e abertura temporária de atalhos cósmicos.
          </div>
        </div>
      </div>
    `
  },
  {
    id: 7,
    roman: "VII",
    title: "Combate Tático nos Céus",
    subtitle: "Confrontos Aéreos, Abordagens e Iniciativa",
    iconName: "Swords",
    summary: "A dinâmica de combate: turnos, ações táticas, movimentação em três dimensões e disparos em convés balançante.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          O combate em Core é cinético, perigoso e tridimensional. Quando os sinos de bordo tocam e os mosquetes rugem, a ordem dos acontecimentos segue a <strong>Iniciativa (1d20 + Agilidade)</strong>.
        </p>

        <h3 class="text-xl font-bold font-serif text-amber-950 border-b border-amber-900/30 pb-2 mt-4">A Economia de Ações no Turno</h3>
        <p class="text-xs text-stone-700 leading-relaxed">A cada rodada de combate, um navegante dispõe de:</p>
        <ul class="list-disc list-inside space-y-2 text-stone-800 text-xs leading-relaxed">
          <li><strong>Uma Ação Principal:</strong> Disparar uma arma, desferir um golpe de sabre, conjurar um feitiço de éter, operar um canhão de estibordo ou tratar um companheiro caído.</li>
          <li><strong>Um Movimento:</strong> Deslocar-se no convés até o valor do seu Deslocamento, subir em cordames ou buscar cobertura atrás de anteparas.</li>
          <li><strong>Uma Ação Bônus / Rápida:</strong> Sacar uma segunda pistola, beber uma ampola de cristal líquido ou puxar uma alavanca de emergência.</li>
          <li><strong>Uma Reação:</strong> Esquivar-se de um arpão voador ou aparar um golpe de lâmina quando atacado.</li>
        </ul>
      </div>
    `
  },
  {
    id: 8,
    roman: "VIII",
    title: "As Linhagens de Core",
    subtitle: "Povos, Raças e Heranças do Sangue",
    iconName: "Users",
    summary: "As origens dos povos dos Céus Partidos: Humanos, Silvestres, Autômatos a Éter e os temidos Tieflings marcados pelo eco.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          A fragmentação do mundo não poupou o sangue de quem nele habitava. Diversas linhagens prosperam nas ilhas celestes, cada uma com atributos e vantagens únicas:
        </p>

        <div class="space-y-3">
          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-900 text-sm">Humanos dos Céus</h4>
            <p class="text-xs text-stone-600 mb-1">Adaptabilidade implacável e tenacidade incomparável.</p>
            <p class="text-xs text-stone-700">Recebem +1 em dois atributos à escolha e 1 Perícia inicial adicional treinada.</p>
          </div>

          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-900 text-sm">Silvestres das Ilhas Verdes</h4>
            <p class="text-xs text-stone-600 mb-1">Herdeiros dos bosques flutuantes e botânica arcana.</p>
            <p class="text-xs text-stone-700">Imunidade natural a venenos de plantas e facilidade nata em saltos acrobáticos e comunicação natural.</p>
          </div>

          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-900 text-sm">Autômatos & Forjados</h4>
            <p class="text-xs text-stone-600 mb-1">Corpos de bronze, relógio e engrenagens movidos a um núcleo de cristal.</p>
            <p class="text-xs text-stone-700">Não necessitam de ar nem alimento orgânico, possuem armadura natural superior, mas são vulneráveis a pulsos magnéticos e ferrugem ácida.</p>
          </div>

          <div class="p-3 rounded-lg bg-stone-100 border border-amber-900/30">
            <h4 class="font-serif font-bold text-amber-900 text-sm">Marcados &bull; Tieflings</h4>
            <p class="text-xs text-stone-600 mb-1">Herdeiros de uma ascendência que a história tentou apagar.</p>
            <p class="text-xs text-stone-700">Marcados por chifres, caudas e um pulsar arcano peculiar. Carregam uma das maiores reservas natas de Essência entre todas as raças.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 9,
    roman: "IX",
    title: "Dons do Cerne & Fardos do Verbo",
    subtitle: "O Compêndio Integral de Ecos, Níveis e Patologias",
    iconName: "Scroll",
    summary: "A lista completa e sem resumos: todos os Dons do Cerne com seus níveis de 0 a 5, custos de XP, mecânicas e todos os Fardos do Verbo com suas cepas e consequências.",
    contentHtml: `
      <div class="space-y-8">
        <div class="p-4 rounded-lg bg-amber-900/10 border-l-4 border-amber-700 text-stone-800 leading-relaxed text-xs">
          <strong>Aviso do Mestre:</strong> Certas almas carregam marcas místicas únicas: <strong>Dons do Cerne</strong> (habilidades sobrenaturais compradas com Pontos de Experiência - XP) e <strong>Fardos do Verbo</strong> (patologias e maldições que cobram um preço cruel, mas concedem bônus de XP na criação do personagem). Abaixo constam todas as regras integrais.
        </div>

        <!-- SEÇÃO: DONS DO CERNE -->
        <div>
          <h3 class="text-xl font-bold font-serif text-amber-950 border-b-2 border-amber-900/40 pb-2 mb-4 flex items-center justify-between">
            <span>Dons do Cerne (Ecos Adquiridos com XP)</span>
            <span class="text-xs font-sans font-normal text-amber-800 bg-amber-100 px-3 py-1 rounded-full">Progressão por Níveis</span>
          </h3>

          <div class="space-y-4">
            <!-- Sempre Vivo -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Sempre Vivo</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Nível 0 a 5 &bull; 2 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Quando um personagem com essa característica morre, ele volta à vida no próximo amanhecer. Quando volta, ele volta com <strong>menos 28 de XP</strong>, podendo remover pontos de atributos já pagos. Caso algum atributo fique abaixo de 1, o personagem morre permanentemente. Reduza em <strong>4 pontos de XP cobrados para cada nível além do 0</strong> que tenha nesse eco.
              </p>
            </div>

            <!-- Caminhante -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Caminhante</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Diálogo com os Mortos</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Aqueles que são capazes de dialogar com os mortos.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Somente é capaz de dialogar com mortos na última semana desde que esteja na presença do corpo do morto.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Caso conheça o nome e rosto de uma pessoa, você sabe se esse indivíduo morreu na última semana. Caso essa pessoa seja próxima ou seja um possuído do eco, você sabe onde o corpo se encontra.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Você passa a ser capaz de dialogar com os mortos independente de corpo, mortos na última semana, mas precisa saber o seu rosto e nome.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Você pode dialogar com mortos na última década, mas ainda precisa de seu nome e rosto.</li>
                <li><strong>Nível 4 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Você pode dialogar com qualquer morto independente do tempo transcorrido, mas ainda precisa de seu nome e rosto.</li>
              </ul>
            </div>

            <!-- Parasita de Morto -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Parasita de Morto</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Assimilação</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Os parasitas de mortos são mal vistos, já que os seus antes queridos ou inimigos passam a fazer parte do parasita. Ironicamente, um parasita somente descobre que é um quando alguém morre.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-emerald-800 font-bold">[+4 XP Bônus]:</span></strong> Quando um personagem que você tem uma relação alta (tanto uma relação boa quanto negativa) morre, você assimila as piores lembranças dele.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[6 XP]:</span></strong> Quando uma pessoa próxima com boa relação morre e o parasita presencia a morte, ele assimila os 2 atributos mais altos que os seus e as memórias da pessoa.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Quando uma pessoa próxima com boa ou má relação morre e o parasita presencia a morte, ele assimila os 2 atributos mais altos que os seus e as memórias da pessoa.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[4 XP]:</span></strong> Assimila os 2 atributos mais altos e as memórias de qualquer pessoa próxima com boa ou má relação, sem a necessidade de testemunho físico. Contudo, quando ocorre sem testemunho, o parasita revisita a morte todas as noites pelo resto de sua vida.</li>
              </ul>
            </div>

            <!-- Morto por Nós -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Morto por Nós</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">4 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                São capazes de assumir ferimentos e doenças de outros de forma instantânea. Fazendo assim os outros perderem tais malefícios, enquanto o possuído do eco os assume. Podendo até mesmo assumir a morte de outro, desde que esse tenha morrido antes do amanhecer seguinte à sua morte.
              </p>
            </div>

            <!-- Tecelão de Sonho -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Tecelão de Sonho</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Onírico</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Os tecelões são capazes de vagar pelo subconsciente tanto seu quanto de outros, muitas vezes sendo capazes de reviver coisas que muitos já esqueceram.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Ao dormir perto de outros indivíduos que também dormem, ele pode conscientemente arrastar qualquer quantidade de pessoas para o seu próprio subconsciente.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Ao dormir perto de outros indivíduos que também dormem, ele pode conscientemente arrastar qualquer quantidade de pessoas para o subconsciente de alguém que esteja dormindo.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> O tecelão pode fazer o sonho ser sobre algum tema ou memória específica (ex: sobre sua infância). Quanto mais específico o tema, mais claro o sonho se torna.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> O tecelão pode forjar sonhos. Esses sonhos podem, a longo prazo, instalar ideias no subconsciente dos afetados. Contudo, qualquer ideia implantada é anulada quando alguém percebe ou é revelado o feito do tecelão. Quanto mais tempo os afetados passam longe do sonho, menos o efeito surte efeito.</li>
              </ul>
            </div>

            <!-- Aquele Anterior -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Aquele Anterior</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Os Caminhos</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Aqueles que são capazes de andar entre os caminhos. Mesmo sem mais as pressas das tradições, não são capazes de descrever os caminhos com clareza. Contudo, mesmo nesses novos tempos, esses novos caminhantes sempre descrevem uma criança de cabelos negros. Também se tornam capazes de forjar ou intermediar pactos com guardiões e arcanos nos caminhos.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> O possuído do eco, quando encontra pessoas com laços fortes com os caminhos ou quando sofre fortes emoções, entra nos caminhos, mas sem saber ao certo em qual caminho. Nunca pode se afastar muito do caminho no qual estava ao entrar.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> É capaz de acessar os caminhos uma a cada duas vezes caso se inflija dor de alguma natureza. Pode entrar em um caminho específico se o conhecer bem; caso falhe ou não conheça nenhum caminho, entra em um caminho aleatório. Caso tenha contato com alguém com laços fortes com os caminhos, pode trilhar pelos caminhos desse indivíduo, desde que não seja rejeitado pelo arcano.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Sempre que tentar entrar nos caminhos, o possuído do eco consegue. Pode entrar em um caminho específico se o conhecer bem ou com a descrição dada por outro possuído com este eco. Caso falhe ou não conheça nenhum caminho ou descrição, entra em um aleatório.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[3 XP]:</span></strong> Não há restrição de até onde é possível ir com os caminhos, mas é necessário saber para onde está indo. Simplesmente seguir os caminhos pode fazer o portador se perder neles para sempre.</li>
              </ul>
            </div>

            <!-- Farol -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Farol</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Daemos</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Aqueles que são um farol na escuridão somente servem para atrair mais escuridão.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-emerald-800 font-bold">[+3 XP Bônus]:</span></strong> Durante a noite, todos os Daemos a até 2 km sabem onde você está e farão de tudo para lhe matar.</li>
                <li><strong>Nível 1 <span class="text-emerald-800 font-bold">[+2 XP Bônus]:</span></strong> Todos os Daemos dentro do alcance sempre irão em sua direção, mas passam a matar tudo e todos os seres vivos à sua volta, inclusive o portador.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Todos os Daemos dentro do alcance sempre irão em sua direção, mas lhe tratam com indiferença.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[6 XP]:</span></strong> O farol passa a poder convocar Daemos, escolhendo quantos atenderão ao chamado, mas a qualidade dos Daemos é aleatória.</li>
                <li><strong>Nível 4 <span class="text-amber-800 font-bold">[3 XP]:</span></strong> O farol pode impor uma ordem a um Daemo; este vai executar a ordem ou ser destruído, mas o portador perderá 1 ano de lembranças para cada ordem que der. Ele também pode impor uma sede assassina aos Daemos sem nenhum custo, mas não fará distinção alguma de alvos.</li>
              </ul>
            </div>

            <!-- Nunca Vivo -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Nunca Vivo</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-900 text-emerald-100">+5 XP Bônus Inicial</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Clinicamente mortos. Ainda assim andam sobre a terra. Não apresentam nenhum sinal de velhice ou decomposição. Também são notórios por não serem capazes de se curar de quaisquer ferimentos a não ser que consumam coisas vivas, curando 1 ponto de HP para cada 5 kg de carne viva consumida.
              </p>
            </div>

            <!-- Predecessor do Caos e da Ordem -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-stone-100/90 border border-amber-900/20 rounded shadow-sm">
                <div class="flex justify-between items-start">
                  <h4 class="font-serif font-bold text-amber-900 text-sm">Predecessor do Caos</h4>
                  <span class="text-xs font-mono text-amber-800 font-bold">Nível 0 a 5</span>
                </div>
                <p class="text-xs text-stone-600 mt-1 italic">Pressente quando algo pode dar errado (confundido com sorte ou instinto ruim).</p>
                <ul class="space-y-1 text-xs text-stone-800 mt-2">
                  <li><strong>Nível 0 [2 XP]:</strong> Ao ir em direção a uma situação com grande risco de morte, pressente o perigo (1x ao dia).</li>
                  <li><strong>Nível 1 [2 XP]:</strong> 1x ao dia pode conscientemente sentir se uma situação é potencialmente ruim.</li>
                  <li><strong>Níveis 2 a 5 [1 XP/nível]:</strong> Some +1 uso diário para este eco a cada nível.</li>
                </ul>
              </div>

              <div class="p-3 bg-stone-100/90 border border-amber-900/20 rounded shadow-sm">
                <div class="flex justify-between items-start">
                  <h4 class="font-serif font-bold text-amber-900 text-sm">Predecessor da Ordem</h4>
                  <span class="text-xs font-mono text-amber-800 font-bold">Nível 0 a 5</span>
                </div>
                <p class="text-xs text-stone-600 mt-1 italic">Pressente quando algo pode dar certo e conceder grandes vantagens.</p>
                <ul class="space-y-1 text-xs text-stone-800 mt-2">
                  <li><strong>Nível 0 [2 XP]:</strong> Ao dar as costas a uma oportunidade vantajosa, pressente o potencial desperdiçado (1x ao dia).</li>
                  <li><strong>Nível 1 [2 XP]:</strong> 1x ao dia pode conscientemente sentir se uma situação é vantajosa.</li>
                  <li><strong>Níveis 2 a 5 [1 XP/nível]:</strong> Some +1 uso diário para este eco a cada nível.</li>
                </ul>
              </div>
            </div>

            <!-- Habitante de Olhos -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Habitante de Olhos</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Possessão Óptica</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Possuídos por arcanos que almejavam saber tudo. Quando o possuído usa este eco, seu corpo físico repousa inconsciente.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> É capaz de ver através dos olhos de animais com os quais esteja familiarizado.</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Capaz de tomar o controle motor de um animal familiar. Se vier a prejudicar o animal durante o controle, este deixa de considerá-lo familiar.</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Capaz de ver através dos olhos de animais sem familiaridade.</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Capaz de assumir o corpo de animais sem familiaridade e enxergar através dos olhos de humanos sem familiaridade.</li>
              </ul>
            </div>

            <!-- Fala Selvagem -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Fala Selvagem</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">Nível 0 a 4</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Aqueles que podem falar com os animais e árvores, concedido por arcanos ligados ao natural.</p>
              <ul class="space-y-1.5 text-xs text-stone-800">
                <li><strong>Nível 0 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Podem ouvir árvores ou animais quando falam em conjunto (ex: anunciar mudanças climáticas, pragas ou terremotos).</li>
                <li><strong>Nível 1 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Pode falar com árvores (conversas simples sobre clima, composição da terra e passagem do tempo).</li>
                <li><strong>Nível 2 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> É capaz de falar com animais (conceitos simples e diretos).</li>
                <li><strong>Nível 3 <span class="text-amber-800 font-bold">[1 XP]:</span></strong> Pode forjar pactos com animais e árvores com recompensas claras e mútuas.</li>
                <li><strong>Nível 4 <span class="text-amber-800 font-bold">[2 XP]:</span></strong> Caso convença o ser, pode acessar suas memórias em um período de tempo claro. Ao acessar memórias de uma planta, sua perspectiva será como o próprio ambiente; o portador reflete o comportamento do ser no ciclo oposto (se viu de dia, se comporta à noite e vice-versa).</li>
              </ul>
            </div>

            <!-- Alma Silvestre -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Alma Silvestre</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">5 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Eco raríssimo (menos de 15 por geração). Permite que qualquer um que entre em contato físico ceda HP, ferimentos e males físicos para o possuído, assim como ele pode ceder seus próprios pontos de HP e males para qualquer um. Também é capaz de nutrir a flora ao seu redor com seus pontos de HP (mas não de extrair dela). Não há necessidade de consentimento do alvo: <strong>exige apenas contato físico contínuo por mais de 1 minuto</strong>.
              </p>
            </div>

            <!-- Forjador de Vida -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-amber-900/20 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-900 text-base">Forjador de Vida</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-900 text-amber-100">12 XP</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Concedido por arcanos que abençoam os mais ambiciosos. Capazes de criar vidas distorcidas e homúnculos usando como base corpos (vivos ou mortos), utilizando-se da vitalidade alheia ou da sua própria. Podem forjar verdadeiros autômatos biológicos para compor exércitos particulares.
              </p>
            </div>

            <!-- Ascendência do Verbo -->
            <div class="p-5 rounded-lg bg-amber-950 text-amber-100 border-2 border-amber-500 shadow-lg">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-amber-300 text-lg">Ascendência do Verbo</h4>
                <span class="px-3 py-1 rounded text-xs font-mono font-bold bg-amber-600 text-amber-950">Custo Definido pelo Mestre</span>
              </div>
              <p class="text-xs text-amber-200 mt-2 leading-relaxed text-justify">
                <strong>Há poder no sangue... Você faz parte de uma linhagem direta do Verbo Primordial.</strong>
              </p>
              <div class="mt-3 p-3 bg-black/40 rounded border border-amber-500/30 text-xs leading-relaxed space-y-2">
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
            <span class="text-xs font-sans font-normal text-red-800 bg-red-100 px-3 py-1 rounded-full">Concedem Bônus de XP</span>
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
                <h4 class="font-serif font-bold text-red-950 text-base">Doença da Fera (Licanthropia e Metamorfoses)</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">As Cinco Cepas</span>
              </div>
              <p class="text-xs text-stone-600 mb-2 italic">Aumento em sentidos e físico ao preço de maldições incontroláveis. Se ferir um humano e o corte não for tratado, há 10% de chance de infecção. Podem tratar garras [Dano: 1d6, Silenciosa] e dentes [Dano: 1d4, Silenciosa, Leve] como armas naturais.</p>
              
              <div class="space-y-2 mt-3 text-xs text-stone-800">
                <div class="p-2 bg-stone-200/60 rounded border-l-4 border-amber-800">
                  <strong class="text-amber-950">Lupina [+4 XP]:</strong> Dificuldade de testes de olfato reduzida em 2. Quando derrotado em combate por alguém sem inimizade, precisa passar em Conhecimento (Intuição) para recusar ordens dele. Na lua cheia, a Força torna-se 3 (se não for maior) e ataca qualquer um, exceto quem já o derrotou ou por quem tenha afeto.
                </div>
                <div class="p-2 bg-stone-200/60 rounded border-l-4 border-blue-800">
                  <strong class="text-blue-950">Peixe / Afogados [+6 XP]:</strong> Nadar igual ao deslocamento terrestre, respirar debaixo d\'água e visão no escuro. Dano de fogo e contundente é DOBRADO. Na lua nova, entra em frenesi incontrolável. Transformado, Vigor torna-se 3 (se não for maior).
                </div>
                <div class="p-2 bg-stone-200/60 rounded border-l-4 border-emerald-800">
                  <strong class="text-emerald-950">Répteis / Escamosos [+2 XP]:</strong> Postura quadrúpede, 2 de armadura natural e membros amputados regeneram em 1d8 + 2 dias. Em dias ensolarados, transforma-se compulsivamente em locais altos e abertos com rituais agressivos. Força torna-se 3 quando transformado.
                </div>
                <div class="p-2 bg-stone-200/60 rounded border-l-4 border-stone-800">
                  <strong class="text-stone-950">Rato / Roedores [+3 XP]:</strong> Todo dano no Sistema Imune é reduzido pela metade. Deslocamento de escalada igual à caminhada e testes de acrobacia têm dificuldade reduzida em 1. Nas luas crescentes, transforma-se, junta-se a roedores a até 1 km e consome compulsivamente qualquer alimento. Vigor torna-se 3.
                </div>
                <div class="p-2 bg-stone-200/60 rounded border-l-4 border-purple-800">
                  <strong class="text-purple-950">Corvo / Penas Negras [+5 XP]:</strong> Dano de queda reduzido pela metade. Comunicação com árvores e pássaros. Dificuldade de testes de Carisma com humanos aumenta em 1 por traços animais. Quando intimidado ou em época migratória, transforma-se e pode VOAR com velocidade igual ao seu deslocamento. Destreza torna-se 3.
                </div>
              </div>
            </div>

            <!-- Doença da Raiz de Ossos -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença da Raiz de Ossos</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+4 XP (+1 a cada 3 anos)</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Faz os ossos crescerem desordenadamente rasgando a carne. Portadores de Ichor podem usá-la a seu favor: com 2 de Ichor podem usar os ossos como <strong>Osso-Espada [1d6 dano, Silenciosa, Leve, +1 dano a cada 3 anos de infecção]</strong>; com 4 de Ichor ganham <strong>2 de armadura natural (+1 a cada 5 anos)</strong>. A cada 3 anos de infecção, <strong>reduza Destreza em 1</strong>. Quando Destreza chega a 0, o portador morre empalado pelo próprio esqueleto.
              </p>
            </div>

            <!-- Doença da Imortalidade -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença da Imortalidade</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+8 XP Bônus</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                O envelhecimento biológico é completamente paralisado, mas o portador não sente sabor nem prazer carnal algum &mdash; <strong>somente conseguindo sentir qualquer gosto caso coma a própria carne!</strong> Membros amputados só se regeneram se o doente os consumir diretamente (a única exceção é se a cabeça for decepada). Qualquer dano letal comum ainda o mata normalmente.
              </p>
            </div>

            <!-- Doença do Crispo -->
            <div class="p-4 rounded-lg bg-stone-100/90 border border-red-900/30 shadow-sm">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-950 text-base">Doença do Crispo</h4>
                <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-900 text-red-100">+2 XP (+1/ano infectado)</span>
              </div>
              <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                Cristalização progressiva de órgãos internos em quartzo arcano. Causa dor crônica brutal, <strong>reduzindo a Psique permanentemente em 2 para cada ano infectado</strong> (+1 para cada dia com dor sem tratamento especializado). A cada 4 anos, o atributo de Força é reduzido em 1. Quando o portador morre, seu corpo se cristaliza integralmente em estátua de quartzo em apenas 3 horas.
              </p>
            </div>

            <!-- Doença do Não Homem -->
            <div class="p-4 rounded-lg bg-stone-900 text-stone-100 border-2 border-red-700 shadow-md">
              <div class="flex justify-between items-start">
                <h4 class="font-serif font-bold text-red-400 text-lg">Doença do Não Homem (A Praga dos Black Walkers)</h4>
                <span class="px-3 py-1 rounded text-xs font-mono font-bold bg-red-800 text-stone-100">+5 XP (+2/ano infectado)</span>
              </div>
              <p class="text-xs text-stone-400 mt-2 leading-relaxed text-justify">
                A mais aterrorizante das pragas. Reduz sinais vitais, destrói a capacidade de empatia e escurece a pele progressivamente ao longo de até 10 anos. Quando o portador morre, seu corpo <strong>se reanima entre 1 a 5 dias</strong> como um temível <strong>Black Walker</strong> &mdash; mantendo os atributos originais e uma inteligência homicida proporcional ao tempo de infecção:
              </p>
              
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-xs font-mono text-center">
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">1 Ano</div>8 HP &bull; Zero</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">2 Anos</div>12 HP &bull; Zero</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">3 Anos</div>16 HP &bull; Fuga</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">4 Anos</div>20 HP &bull; Rude</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">5 Anos</div>24 HP &bull; Rude</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">6 Anos</div>28 HP &bull; Humano</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">7 Anos</div>32 HP &bull; Humano</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">8 Anos</div>36 HP &bull; Sábio</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">9 Anos</div>40 HP &bull; Tático</div>
                <div class="p-1.5 bg-stone-800 rounded border border-stone-700"><div class="text-red-400 font-bold">10 Anos</div>60 HP &bull; Supremo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 10,
    roman: "X",
    title: "A Trilha do Navegante",
    subtitle: "Evolução e Tabela de Custos de XP",
    iconName: "TrendingUp",
    summary: "A tabela oficial de avanço de personagem: quanto custa aprimorar atributos, perícias, PV, psique e domínios arcanos.",
    contentHtml: `
      <div class="space-y-6">
        <p class="leading-relaxed text-stone-800 text-justify">
          Ao longo das navegações, o Mestre concederá <strong>Pontos de Experiência (XP)</strong> por sobrevivência, resolução de mistérios arcanos e audácia em combate naval. O avanço em Core é totalmente orgânico e flexível, permitindo construir seu arquétipo livremente:
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b-2 border-amber-900/40 text-amber-950 font-serif">
                <th class="py-2 px-3">Aprimoramento</th>
                <th class="py-2 px-3">Custo em XP</th>
                <th class="py-2 px-3">Regras & Limitações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-900/10 text-stone-800">
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Ponto em Perícia</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">3 XP</td><td class="py-2.5 px-3">Não pode ultrapassar 2 &times; o Atributo relacionado.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Ponto em Atributo Comum</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">5 XP</td><td class="py-2.5 px-3">Escala de 0 a 5 (Físicos ou Mentais).</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Força de Vontade (FV)</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">6 XP</td><td class="py-2.5 px-3">Aumenta a reserva para testes místicos e sacrifícios.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Ponto de Vida (HP)</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">2 XP</td><td class="py-2.5 px-3">Aumenta a reserva máxima de saúde física.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Ponto de Psique</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">3 XP</td><td class="py-2.5 px-3">Reforça a barreira contra loucura e desespero.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">+1 Sistema Imune (SI)</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">3 XP</td><td class="py-2.5 px-3">Resistência contra venenos e pragas do eco.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">Nova Proficiência Técnica</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">3 XP</td><td class="py-2.5 px-3">Habilitação em novas armas, veículos aéreos ou ferramentas.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">Habilidade Mística Nível I</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">2 a 4 XP</td><td class="py-2.5 px-3">Truques utilitários e pequenas manifestações de éter.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">Habilidade Mística Nível II</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">5 a 8 XP</td><td class="py-2.5 px-3">Habilidades de combate tático (disparos com correntes de éter).</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">Habilidade Mística Nível III</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">10 a 15 XP</td><td class="py-2.5 px-3">Feitos extraordinários capazes de virar o rumo de batalha naval.</td></tr>
              <tr><td class="py-2.5 px-3 font-bold text-amber-900">Habilidade Mística Nível IV</td><td class="py-2.5 px-3 font-mono font-bold text-amber-700">20+ XP</td><td class="py-2.5 px-3">Magias que alteram as leis da física ou o destino de uma cena inteira.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  }
];
