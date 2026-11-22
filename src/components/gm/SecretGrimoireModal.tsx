import React, { useState } from 'react';
import { BookOpen, X, Dices, Skull, Zap, Drama, Anchor, FileText } from 'lucide-react';

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
      icon: Skull,
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
      icon: Zap,
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
      icon: Drama,
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
      icon: Anchor,
      tactics: 'Aceleração brutal em linha reta para abalroar e partir ao meio qualquer embarcação rival. Despeja tropas de choque em exo-armaduras blindadas com machados de impacto.',
      hook: 'Brakka estabeleceu um bloqueio brutal sobre uma rota de abastecimento crucial e ameaça partir ao meio qualquer navio que não pague seu dízimo em ferro e éter.',
      stats: 'PC: 550 • CA: 22 • Velocidade: 22m/rodada • Aríete de Proa (10d10 impacto) + Lança-Chamas Alquímico',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn font-sans selection:bg-amber-500/30 selection:text-amber-100">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0c1019] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header Nobre do Grimório (Elden Ring Plaque) */}
        <header className="px-6 py-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl border border-amber-500/40 bg-amber-950/20 flex items-center justify-center text-amber-300 shadow-sm flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-serif font-bold text-slate-100 tracking-wide">
                  Grimório Secreto da Mestre
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-widest bg-amber-950/40 text-amber-300 border border-amber-500/30">
                  Apenas Mestre
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5 font-sans">
                Segredos do Vácuo • Embarcações & Céus • Os 4 Grandes Piratas • As Cidades Invisíveis
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar Grimório (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Abas Estilo Baldur's Gate 3 (Sublinhado elegante e tipografia clara) */}
        <nav className="bg-slate-950/70 border-b border-slate-800 px-6 pt-3 flex flex-wrap gap-7 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('piratas')}
            className={`pb-3 text-sm font-sans transition-colors cursor-pointer ${
              activeTab === 'piratas'
                ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-300 hover:text-amber-200 font-medium'
            }`}
          >
            Os 4 Grandes Piratas
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cidades')}
            className={`pb-3 text-sm font-sans transition-colors cursor-pointer ${
              activeTab === 'cidades'
                ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-300 hover:text-amber-200 font-medium'
            }`}
          >
            Cidades Invisíveis & O Véu
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('embarcacoes')}
            className={`pb-3 text-sm font-sans transition-colors cursor-pointer ${
              activeTab === 'embarcacoes'
                ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-300 hover:text-amber-200 font-medium'
            }`}
          >
            Embarcações & Voo Naval
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('abismo')}
            className={`pb-3 text-sm font-sans transition-colors cursor-pointer ${
              activeTab === 'abismo'
                ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-300 hover:text-amber-200 font-medium'
            }`}
          >
            O Abismo Tecnológico da Terra
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('regras')}
            className={`pb-3 text-sm font-sans transition-colors cursor-pointer ${
              activeTab === 'regras'
                ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-300 hover:text-amber-200 font-medium'
            }`}
          >
            Combate Naval & Encontros (1d20)
          </button>
        </nav>

        {/* Conteúdo com Scroll e Tipografia Altamente Confortável */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* TAB 1: OS 4 GRANDES PIRATAS */}
          {activeTab === 'piratas' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    Os Quatro Soberanos dos Céus & Mares
                  </h3>
                  <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                    Apenas estes 4 capitães possuem naus equipadas com as raríssimas <em className="text-amber-300 font-serif not-italic font-medium">Quilhas de Vácuo</em> que lhes permitem descolar da água e navegar nas nuvens.
                  </p>
                </div>
                {onRollDice && (
                  <button
                    type="button"
                    onClick={() => onRollDice('Abordagem Pirata (1d20)', 3)}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-100 border border-slate-700 hover:border-amber-500/40 text-sm font-sans font-medium flex items-center gap-2 flex-shrink-0 cursor-pointer transition-colors shadow-sm"
                  >
                    <Dices className="w-4 h-4 text-amber-400" />
                    <span>Rolar Emboscada</span>
                  </button>
                )}
              </div>

              {/* Botões de Seleção do Pirata (Ícones Vetoriais Monocromáticos - Fim dos Emojis) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {pirates.map((p, idx) => {
                  const Icon = p.icon;
                  const isSelected = selectedPirate === idx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPirate(idx)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-950/30 text-amber-200 shadow-md ring-1 ring-amber-500/30'
                          : 'border-slate-800 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-slate-100 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-sm text-slate-100 leading-snug">{p.name}</span>
                      <span className="text-xs text-slate-300 mt-1 line-clamp-1">{p.leader}</span>
                    </button>
                  );
                })}
              </div>

              {/* Divisor Rúnico Estilo Skyrim */}
              <div className="flex items-center justify-center my-4 space-x-4 opacity-40">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
                <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>

              {/* Detalhes do Pirata Selecionado (Paleta Nobre Monocromática Ouro + Ardósia) */}
              {pirates[selectedPirate] && (
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/70 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-amber-300 flex-shrink-0">
                        {React.createElement(pirates[selectedPirate].icon, { className: 'w-5 h-5' })}
                      </div>
                      <div>
                        <h4 className="text-xl font-serif font-bold text-slate-100">
                          {pirates[selectedPirate].name}
                        </h4>
                        <p className="text-sm text-slate-300 mt-0.5">
                          Capitão: <strong className="text-amber-200">{pirates[selectedPirate].leader}</strong>
                        </p>
                      </div>
                    </div>
                    <span className="text-sm italic text-amber-200/90 font-reading leading-relaxed">
                      {pirates[selectedPirate].quote}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1.5">
                      <span className="text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider block">
                        Nau Capitânia & Casco
                      </span>
                      <p className="text-sm text-slate-100 leading-relaxed">{pirates[selectedPirate].ship}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1.5">
                      <span className="text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider block">
                        Estatísticas de Bordo
                      </span>
                      <p className="text-sm text-slate-100 font-mono leading-relaxed">{pirates[selectedPirate].stats}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1.5">
                      <span className="text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider block">
                        Táticas de Combate & Abordagem
                      </span>
                      <p className="text-sm text-slate-100 leading-relaxed">{pirates[selectedPirate].tactics}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1.5">
                      <span className="text-amber-300 text-xs font-sans font-semibold uppercase tracking-wider block">
                        Gancho de Aventura para a Mestre
                      </span>
                      <p className="text-sm text-slate-100 leading-relaxed">{pirates[selectedPirate].hook}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CIDADES INVISÍVEIS & O VÉU */}
          {activeTab === 'cidades' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <h3 className="text-base font-serif font-bold text-amber-200">
                  O Segredo do Véu do Éter & As Cidades Invisíveis
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Na terra, todos acham que é apenas folclore de marinheiro. Mas elas são reais e derivam silenciosamente pelos céus.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    A Barreira de Refração Óptica
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Cada cidade flutuante é cercada por um escudo de energia pura que dobra os feixes de luz solar ao redor de si. Qualquer pessoa no solo ou em navios inferiores olhando para cima vê apenas o céu límpido.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    Deriva Constante no Céu
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    As cidades não ficam imóveis: elas navegam lentamente pelas correntes de jato da alta atmosfera ou usam megamáquinas gravitacionais milenares. Um navegador jamais a reencontrará no mesmo ponto meses depois.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    Como Penetrar no Véu
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Apenas com <em className="text-amber-300 font-serif not-italic">Lentes de Ressonância Primordial</em>, sinalizadores acústicos dos próprios piratas ou durante tempestades arcanas violentas, quando relâmpagos fazem o escudo oscilar.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="font-serif font-bold text-amber-200 text-base">
                  Os Habitantes: Os Arquitetos Silenciosos
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Linhagens nobres que abandonaram a crosta terrestre antes do Cataclismo. Eles consideram a superfície um cemitério em decadência e mantêm acordos secretos com alguns piratas para obter especiarias da terra em troca de cristais de éter de grau militar.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EMBARCAÇÕES & VOO NAVAL */}
          {activeTab === 'embarcacoes' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <h3 className="text-base font-serif font-bold text-amber-200">
                  A Anatomia do Voo Naval & As Quilhas de Vácuo
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Estes navios não são balões frágeis ou dirigíveis. São cascos náuticos que navegam na água do mar normalmente, mas desdobram estabilizadores e sobem aos céus quando o capitão aciona a quilha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    1. As Quilhas de Vácuo (Relíquias do Passado)
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Uma espinha dorsal de liga de <em className="text-amber-300 font-serif not-italic">Latonita de Éter</em> fundida no fundo do casco. Quando energizada, cancela a gravidade da embarcação, tornando um leviatã de 500 toneladas leve como uma pluma.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    2. Motores Primordiais a Éter Líquido
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Caldeiras monumentais que canalizam plasma de éter através de tubeiras traseiras e inferiores, proporcionando propulsão vertical instantânea.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    3. As Naus Marítimas Comuns (99.9% da Frota)
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Construídas com madeira densa e ferro rebitado. Estão presas aos oceanos salgados, dependentes de vento e vapor, e vulneráveis a monstros marinhos e ataques aéreos.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    4. A Escassez Absoluta
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Existem menos de 10 dessas quilhas ativas em todo o mundo de Core. Não podem ser forjadas novamente pela tecnologia atual. Quem detém uma quilha, detém a soberania dos mares e céus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: O ABISMO TECNOLÓGICO DA TERRA */}
          {activeTab === 'abismo' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <h3 className="text-base font-serif font-bold text-amber-200">
                  Por que os Reinos Terrestres Estão Indefesos?
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  As guildas e academias da superfície estão apenas começando a entender a fusão entre magia e tecnologia. O conhecimento atual é superficial e fragmentado.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-base font-serif font-bold text-amber-200">Armas Individuais vs Engenharia de Grande Escala</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Alguns exércitos conseguem fabricar lâminas de vibração, arcos com fiação elétrica e mosquetes a cartucho alquímico. Mas criar geradores de gravidade contínua para navios está séculos além de sua compreensão.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-base font-serif font-bold text-amber-200">O Pânico nos Portos</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Quando um navio pirata desce do céu, as baterias de canhões terrestres não conseguem nem angular seus canos para cima a tempo. A rendição quase sempre é a única opção de sobrevivência para os governadores costeiros.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMBATE NAVAL & TABELA 1d20 */}
          {activeTab === 'regras' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-200">
                    Tabela de Encontros Aleatórios nos Céus & Mares (1d20)
                  </h3>
                  <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                    Role um d20 para determinar que tipo de fenômeno ou frota cruza a rota dos heróis.
                  </p>
                </div>
                {onRollDice && (
                  <button
                    type="button"
                    onClick={() => onRollDice('Encontro Náutico/Aéreo (1d20)', 0)}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-100 border border-slate-700 hover:border-amber-500/40 text-sm font-sans font-medium flex items-center gap-2 flex-shrink-0 cursor-pointer transition-colors shadow-sm"
                  >
                    <Dices className="w-4 h-4 text-amber-400" />
                    <span>Rolar 1d20 no Encontro</span>
                  </button>
                )}
              </div>

              {/* Tabela de Encontros com Alto Contraste e Tipografia Clara */}
              <div className="border border-slate-800 rounded-xl overflow-hidden text-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-950 text-amber-300 font-sans border-b border-slate-800 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-3.5 w-20 text-center font-semibold">1d20</th>
                      <th className="p-3.5 font-semibold">Evento / Desafio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">1-3</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Calmaria Aparente:</strong> O mar ou o ar fica totalmente estagnado. Ecos de vozes antigas sussurram pelo casco (Perda de 1d4 de Psique se falharem em Vontade DT 12).</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">4-6</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Nuvem de Relâmpagos de Éter:</strong> Fagulhas correm pelas amuradas. Teste de Pilotagem (DT 14) para não sobrecarregar os sistemas mecânicos da tripulação.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">7-9</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Naufrágio Flutuante:</strong> Restos de balsa mercante pendurados nos galhos de uma ilha celeste deserta. Tesouros e armadilhas esperam no interior.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">10-12</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Patrulha dos Corsários do Relâmpago:</strong> Chalupa veloz de Vespera Voss cerca o barco exigindo pedágio em cristais de éter ou munição.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">13-15</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Besta do Firmamento:</strong> Uma raia celestial colossal ou dragão de nuvem sobrevoa os mastros. Se atacada, vira o barco com a cauda.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">16-17</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">A Sombra do Leviatã:</strong> A silhueta de ébano do <em>Leviatã Noturno</em> cruza a lua à distância. Nenhuma tripulação dorme em paz.</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-400 text-sm">18-19</td>
                      <td className="p-3.5 text-slate-100 leading-relaxed"><strong className="text-amber-200">Refração do Véu:</strong> Através da névoa, vislumbram-se torres de cristal flutuando onde não deveria haver nada. O Véu se fecha segundos depois.</td>
                    </tr>
                    <tr className="hover:bg-amber-950/30 bg-amber-950/20 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-amber-300 text-sm">20</td>
                      <td className="p-3.5 text-amber-200 leading-relaxed font-semibold">Encontro Lendário: Um dos 4 Capitães Piratas aborda o convés dos jogadores pessoalmente com uma proposta perigosa demais para recusar!</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Regras Rápidas de Manobras */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <strong className="text-amber-300 block font-serif text-sm">Curva Fechada (DT 15)</strong>
                  <p className="text-slate-200 text-xs leading-relaxed">Giro de 90° sem perder velocidade. Falha exige Agilidade DT 13 para não cair no convés.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <strong className="text-amber-300 block font-serif text-sm">Abordagem de Arpão</strong>
                  <p className="text-slate-200 text-xs leading-relaxed">Ataque +6 contra CA 15 a até 30m. Com 3 cabos fixados, navios são unidos para combate corpo a corpo.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <strong className="text-amber-300 block font-serif text-sm">Queda Livre de Nau</strong>
                  <p className="text-slate-200 text-xs leading-relaxed">Se a quilha sofrer dano crítico (&lt;20% PC), despenca 60m/rodada. Tripulação tem 3 rodadas para reparo de emergência (DT 18).</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer com atalhos */}
        <footer className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Documento salvo na raiz: <code className="text-amber-300 font-mono">LIVRO_DA_MESTRE_SEGREDOS_DO_VACUO.md</code></span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-850 hover:border-amber-500/40 text-slate-100 text-sm font-sans font-medium transition-colors cursor-pointer shadow-sm"
          >
            Fechar Grimório
          </button>
        </footer>

      </div>
    </div>
  );
};
