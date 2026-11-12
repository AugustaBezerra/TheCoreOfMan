import React, { useState } from 'react';

interface SecretGrimoireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRollDice?: (label: string, bonus: number) => void;
}

export const SecretGrimoireModal: React.FC<SecretGrimoireModalProps> = ({
  isOpen,
  onClose,
  onRollDice,
}) => {
  const [activeTab, setActiveTab] = useState<'abismo' | 'embarcacoes' | 'piratas' | 'cidades' | 'regras'>('piratas');
  const [selectedPirate, setSelectedPirate] = useState<number>(0);

  if (!isOpen) return null;

  const pirates = [
    {
      id: 0,
      name: 'A Armada do Osso Negro',
      leader: 'Capitão Malakor, o Ceifador do Éter',
      quote: '“A noite não é a ausência de luz; é a sombra do nosso casco.”',
      ship: 'O Leviatã Noturno (Dreadnought de Ébano e Ossos de Leviatã)',
      sigil: '💀',
      tactics: 'Ataques furtivos noturnos em mergulho vertical a partir de nuvens escuras. Motores com abafadores de som gravitacionais e canhões de vácuo que sugam marinheiros para fora do convés.',
      hook: 'Malakor roubou uma relíquia ligada à linhagem de um dos jogadores. O grupo deve infiltrar-se em sua baía aérea oculta ou enfrentar um duelo de conveses em queda livre.',
      stats: 'PC: 480 • CA: 20 • Velocidade: 32m/rodada (Ar/Água) • 32 Canhões de Vácuo (6d8)',
    },
    {
      id: 1,
      name: 'Os Corsários do Relâmpago',
      leader: 'Comandante Vespera Voss',
      quote: '“Mais rápidos que o som do trovão. Mais letais que a faísca que o precede.”',
      ship: 'A Vingança de Cobre (Fragata Leve Aerodinâmica com Bobinas Tesla)',
      sigil: '⚡',
      tactics: 'Navega deliberadamente para dentro de tempestades elétricas para sobrecarregar seus acumuladores. Dispara arpões condutores que eletrocutam conveses inteiros e fritam equipamentos tecno-mágicos.',
      hook: 'Vespera cerca a embarcação dos heróis, mas oferece anistia se eles concordarem em sabotar a frota da marinha imperial antes do amanhecer.',
      stats: 'PC: 420 • CA: 19 • Velocidade: 38m/rodada • Bobinas de Relâmpago em Cadeia (5d10 elétrico)',
    },
    {
      id: 2,
      name: 'O Círculo das Máscaras Douradas',
      leader: 'Lorde Cassian Thorne',
      quote: '“A elegância é a mais alta forma de pirataria.”',
      ship: 'A Aurora de Ouro (Galeão Real Dourado de Quatro Conveses)',
      sigil: '🎭',
      tactics: 'Pirataria aristocrática, bailes de ilusão e armas sônicas harmônicas que atordoam tripulações inteiras sem derramar sangue nas sedas preciosas do convés.',
      hook: 'Um convite luxuoso chega aos heróis para um baile de máscaras aéreo, sem que saibam que Cassian pretende usar a mansão flutuante como isca para um resgate colossal.',
      stats: 'PC: 450 • CA: 19 • Velocidade: 26m/rodada • Baterias Sônicas e Canhões de Cristal Sonoro (4d12 psíquico)',
    },
    {
      id: 3,
      name: 'Os Quebradores de Ferro',
      leader: 'Brakka a Quebra-Mastros',
      quote: '“Se algo resiste, é porque ainda não batemos com força suficiente.”',
      ship: 'A Mandíbula de Aço (Fortaleza Blindada com Aríete Pneumático)',
      sigil: '⚓',
      tactics: 'Aceleração brutal em linha reta para abalroar e partir ao meio qualquer embarcação rival. Despeja tropas de choque em exo-armaduras blindadas com machados de impacto.',
      hook: 'Brakka estabeleceu um bloqueio brutal sobre uma rota de abastecimento crucial e ameaça partir ao meio qualquer navio que não pague seu dízimo em ferro e éter.',
      stats: 'PC: 550 • CA: 22 • Velocidade: 22m/rodada • Aríete de Proa (10d10 impacto) + Lança-Chamas Alquímico',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0c0d14] border-2 border-purple-500/70 rounded-3xl shadow-[0_0_70px_rgba(168,85,247,0.35)] flex flex-col overflow-hidden text-stone-200">
        
        {/* Header do Grimório */}
        <div className="p-5 sm:p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-950/70 via-stone-950 to-[#120b1c] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border border-purple-400 bg-purple-900/60 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-purple-200">
                  Grimório Secreto da Mestre
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider bg-red-950 text-red-200 border border-red-500/50">
                  🔒 Olhos da Mestre Apenas
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Segredos do Vácuo • Embarcações & Céus • Os 4 Grandes Piratas • As Cidades Invisíveis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition-colors text-base"
          >
            ✕
          </button>
        </div>

        {/* Barra de Navegação de Tópicos Secretos */}
        <div className="bg-stone-950/80 border-b border-purple-900/30 px-4 py-2 flex flex-wrap gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('piratas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'piratas'
                ? 'bg-purple-900/80 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <span>☠️</span> Os 4 Grandes Piratas
          </button>

          <button
            onClick={() => setActiveTab('cidades')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'cidades'
                ? 'bg-purple-900/80 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <span>☁️</span> Cidades Invisíveis & O Véu
          </button>

          <button
            onClick={() => setActiveTab('embarcacoes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'embarcacoes'
                ? 'bg-purple-900/80 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <span>⛵</span> Embarcações & Voo Naval
          </button>

          <button
            onClick={() => setActiveTab('abismo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'abismo'
                ? 'bg-purple-900/80 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <span>⚙️</span> O Abismo Tecnológico da Terra
          </button>

          <button
            onClick={() => setActiveTab('regras')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'regras'
                ? 'bg-purple-900/80 text-purple-200 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <span>⚔️</span> Combate Naval & Encontros (1d20)
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 custom-scrollbar">

          {/* TAB 1: OS 4 GRANDES PIRATAS */}
          {activeTab === 'piratas' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    Os Quatro Soberanos dos Céus & Mares
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Apenas estes 4 capitães possuem naus equipadas com as raríssimas <em>Quilhas de Vácuo</em> que lhes permitem descolar da água e navegar nas nuvens. As marinhas terrestres tremem ao ver suas silhuetas.
                  </p>
                </div>
                {onRollDice && (
                  <button
                    onClick={() => onRollDice('Abordagem Pirata (1d20)', 3)}
                    className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 text-xs font-serif font-bold border border-purple-400/50 flex-shrink-0"
                  >
                    🎲 Rolar Emboscada Pirata
                  </button>
                )}
              </div>

              {/* Botões de Seleção do Pirata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pirates.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPirate(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      selectedPirate === idx
                        ? 'border-purple-400 bg-purple-950/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'border-stone-800 bg-stone-950/60 hover:bg-stone-900'
                    }`}
                  >
                    <span className="text-2xl mb-1">{p.sigil}</span>
                    <span className="font-serif font-bold text-xs text-stone-100 leading-snug">{p.name}</span>
                    <span className="text-[10px] text-purple-300 mt-0.5 line-clamp-1">{p.leader}</span>
                  </button>
                ))}
              </div>

              {/* Detalhes do Pirata Selecionado */}
              {pirates[selectedPirate] && (
                <div className="p-6 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-br from-stone-950 via-[#130f21] to-stone-950 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/40 pb-3">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-amber-200">
                        {pirates[selectedPirate].sigil} {pirates[selectedPirate].name}
                      </h4>
                      <p className="text-xs text-purple-300 font-serif">
                        Capitão: <strong className="text-stone-100">{pirates[selectedPirate].leader}</strong>
                      </p>
                    </div>
                    <span className="text-xs italic text-stone-400 font-serif">
                      {pirates[selectedPirate].quote}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                      <strong className="text-amber-300 block font-serif">Nau Capitânia & Casco</strong>
                      <p className="text-stone-300 leading-relaxed">{pirates[selectedPirate].ship}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                      <strong className="text-purple-300 block font-serif">Estatísticas de Bordo</strong>
                      <p className="text-stone-300 font-mono text-[11px]">{pirates[selectedPirate].stats}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                      <strong className="text-red-300 block font-serif">Táticas de Combate & Abordagem</strong>
                      <p className="text-stone-300 leading-relaxed">{pirates[selectedPirate].tactics}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-600/30 space-y-1">
                      <strong className="text-emerald-300 block font-serif">Gancho de Aventura para a Mestre</strong>
                      <p className="text-stone-300 leading-relaxed">{pirates[selectedPirate].hook}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CIDADES INVISÍVEIS & O VÉU */}
          {activeTab === 'cidades' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">☁️</span>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-blue-200">
                      O Segredo do Véu do Éter & As Cidades Invisíveis
                    </h3>
                    <p className="text-xs text-stone-300">
                      Na terra, todos acham que é apenas folclore de marinheiro. Mas elas são reais e derivam pelos céus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
                    <span>🔮</span> A Barreira de Refração Óptica
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Cada cidade flutuante é cercada por um escudo de energia pura que dobra os feixes de luz solar ao redor de si. Qualquer pessoa no solo ou em navios inferiores olhando para cima vê apenas o azul límpido do céu ou nuvens naturais.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-purple-200 text-sm flex items-center gap-2">
                    <span>🧭</span> Deriva Constante no Céu
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    As cidades não ficam imóveis: elas navegam lentamente pelas correntes de jato da alta atmosfera ou usam megamáquinas gravitacionais milenares. Um navegador que jurou ver uma silhueta jamais a reencontrará no mesmo ponto meses depois.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-emerald-200 text-sm flex items-center gap-2">
                    <span>🔑</span> Como Penetrar no Véu
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Apenas com <em>Lentes de Ressonância Primordial</em>, sinalizadores acústicos dos próprios piratas ou durante tempestades arcanas violentas, quando as sobrecargas de relâmpagos fazem o escudo piscar em violeta por breves segundos.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-950 border border-purple-900/40 space-y-2">
                <h4 className="font-serif font-bold text-amber-200 text-sm">
                  👑 Os Habitantes: Os Arquitetos Silenciosos
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Linhagens nobres que abandonaram a crosta terrestre antes do Cataclismo. Eles consideram a superfície um cemitério em decadência e mantêm acordos secretos com alguns piratas (como Lorde Cassian Thorne) para obter especiarias da terra em troca de cristais de éter de grau militar.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EMBARCAÇÕES & VOO NAVAL */}
          {activeTab === 'embarcacoes' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <h3 className="text-lg font-serif font-bold text-amber-200">
                  A Anatomia do Voo Naval & As Quilhas de Vácuo
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Estes navios não são balões frágeis ou dirigíveis. São enormes cascos náuticos que navegam a água do mar normalmente, mas desdobram estabilizadores e sobem aos céus quando o capitão aciona a quilha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-300 text-sm">
                    1. As Quilhas de Vácuo (Relíquias do Passado)
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Uma espinha dorsal de liga de <em>Latonita de Éter</em> fundida no fundo do casco. Quando energizada, cancela a gravidade da embarcação, tornando um leviatã de 500 toneladas mais leve que uma pluma.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-cyan-300 text-sm">
                    2. Motores Primordiais a Éter Líquido
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Caldeiras monumentais que canalizam plasma de éter através de tubeiras traseiras e inferiores, proporcionando velocidade supersônica e empuxo vertical instantâneo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-purple-300 text-sm">
                    3. As Naus Marítimas Comuns (99.9% da Frota)
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Construídas com madeira densa e ferro rebitado. Estão presas aos oceanos salgados, dependentes de vento e pás a vapor, e vulneráveis a monstros marinhos e aos ataques aéreos dos piratas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-red-300 text-sm">
                    4. A Escassez Absoluta
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Existem menos de 10 dessas quilhas ativas em todo o mundo de Core. Não podem ser forjadas novamente pela tecnologia atual. Quem detém uma quilha, detém a soberania dos mares e céus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: O ABISMO TECNOLÓGICO DA TERRA */}
          {activeTab === 'abismo' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h3 className="text-lg font-serif font-bold text-purple-200">
                  Por que os Reinos Terrestres Estão Indefesos?
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  As guildas e academias da superfície estão apenas começando a entender a combinação de magia e tecnologia. O conhecimento atual é superficial e fragmentado.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <h4 className="text-xs font-serif font-bold text-amber-200">Armas Individuais vs Engenharia de Grande Escala</h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Alguns exércitos conseguem fabricar lâminas de vibração, arcos com fiação elétrica e mosquetes a cartucho alquímico (como visto no Livro do Jogador). Mas criar geradores de gravidade contínua para navios está séculos além de sua compreensão.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <h4 className="text-xs font-serif font-bold text-amber-200">O Pânico nos Portos</h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Quando um navio pirata desce do céu, as baterias de canhões terrestres não conseguem nem angular seus canos para cima a tempo. A rendição quase sempre é a única opção de sobrevivência para os governadores costeiros.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMBATE NAVAL & TABELA 1d20 */}
          {activeTab === 'regras' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    Tabela de Encontros Aleatórios nos Céus & Mares (1d20)
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Role um d20 para determinar que tipo de fenômeno ou frota cruza a rota dos heróis.
                  </p>
                </div>
                {onRollDice && (
                  <button
                    onClick={() => onRollDice('Encontro Náutico/Aéreo (1d20)', 0)}
                    className="px-4 py-2 rounded-xl bg-amber-900/80 hover:bg-amber-800 text-amber-100 text-xs font-serif font-bold border border-amber-500/40 flex-shrink-0"
                  >
                    🎲 Rolar 1d20 no Encontro
                  </button>
                )}
              </div>

              {/* Tabela de Encontros */}
              <div className="border border-stone-800 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-900/80 text-purple-300 font-serif border-b border-stone-800">
                    <tr>
                      <th className="p-3 w-16 text-center">1d20</th>
                      <th className="p-3">Evento / Desafio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900 bg-black/40">
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">1-3</td>
                      <td className="p-3 text-stone-300"><strong>Calmaria Aparente:</strong> O mar ou o ar fica totalmente estagnado. Ecos de vozes antigas sussurram pelo casco (Perda de 1d4 de Psique se falharem em Vontade DT 12).</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">4-6</td>
                      <td className="p-3 text-stone-300"><strong>Nuvem de Relâmpagos de Éter:</strong> Fagulhas correm pelas amuradas. Teste de Pilotagem (DT 14) para não sobrecarregar os sistemas mecânicos da tripulação.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">7-9</td>
                      <td className="p-3 text-stone-300"><strong>Naufrágio Flutuante:</strong> Restos de balsa mercante pendurados nos galhos de uma ilha celeste deserta. Tesouros e armadilhas esperam no interior.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">10-12</td>
                      <td className="p-3 text-stone-300"><strong>Patrulha dos Corsários do Relâmpago:</strong> Chalupa veloz de Vespera Voss cerca o barco exigindo pedágio em cristais de éter ou munição.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">13-15</td>
                      <td className="p-3 text-stone-300"><strong>Besta do Firmamento:</strong> Uma raia celestial colossal ou dragão de nuvem sobrevoa os mastros. Se atacada, vira o barco com a cauda.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">16-17</td>
                      <td className="p-3 text-stone-300"><strong>A Sombra do Leviatã:</strong> A silhueta de ébano do <em>Leviatã Noturno</em> cruza a lua à distância. Nenhuma tripulação dorme em paz.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-amber-400">18-19</td>
                      <td className="p-3 text-stone-300"><strong>Refração do Véu:</strong> Através da névoa, vislumbram-se torres de cristal flutuando onde não deveria haver nada. O Véu se fecha segundos depois.</td>
                    </tr>
                    <tr className="hover:bg-purple-950/20">
                      <td className="p-3 text-center font-mono font-bold text-emerald-400">20</td>
                      <td className="p-3 text-emerald-200"><strong>Encontro Lendário:</strong> Um dos 4 Capitães Piratas aborda o convés dos jogadores pessoalmente com uma proposta perigosa demais para recusar!</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Regras Rápidas de Manobras */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                  <strong className="text-amber-300 block font-serif">Curva Fechada (DT 15)</strong>
                  <p className="text-stone-400 mt-1">Giro de 90° sem perder velocidade. Falha exige Agilidade DT 13 para não cair no convés.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                  <strong className="text-purple-300 block font-serif">Abordagem de Arpão</strong>
                  <p className="text-stone-400 mt-1">Ataque +6 contra CA 15 a até 30m. Com 3 cabos fixados, navios são unidos para combate corpo a corpo.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                  <strong className="text-red-300 block font-serif">Queda Livre de Nau</strong>
                  <p className="text-stone-400 mt-1">Se a quilha sofrer crítico (&lt;20% PC), despenca 60m/rodada. Tripulação tem 3 rodadas para reparo de emergência (DT 18).</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer com atalhos */}
        <div className="p-4 border-t border-purple-500/20 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="text-stone-400 flex items-center gap-2">
            <span>💾</span>
            <span>Documento completo salvo na raiz: <code className="text-purple-300 font-mono">LIVRO_DA_MESTRE_SEGREDOS_DO_VACUO.md</code></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/50 font-serif font-bold transition-all"
          >
            Fechar Grimório
          </button>
        </div>

      </div>
    </div>
  );
};
