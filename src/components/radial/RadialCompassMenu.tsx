import React, { useState } from 'react';
import { Character, UserProfile } from '../../types/character';
import { FirecastLibraryPanel } from '../firecast/FirecastLibraryPanel';
import { ActiveSessionDrawer } from '../session/ActiveSessionDrawer';

export type RadialAction = 
  | 'sheet'
  | 'inventory'
  | 'library'
  | 'maps'
  | 'journal'
  | 'bestiary'
  | 'npcs'
  | 'hangar';

interface SectorSlice {
  id: RadialAction;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  startAngle: number;
  endAngle: number;
}

// 8 Setores angulares desenhados exatamente sobre as pétalas de radial-compass.webp
const SECTORS: SectorSlice[] = [
  {
    id: 'sheet',
    title: 'Ficha do Personagem',
    subtitle: 'Atributos & Dados',
    icon: '🎲',
    description: 'Atributos, perícias, dados D20, essências vitais e dons do seu herói.',
    startAngle: 247.5,
    endAngle: 292.5, // Topo (12 horas)
  },
  {
    id: 'inventory',
    title: 'Inventário & Carga',
    subtitle: 'Equipamentos & Éter',
    icon: '🎒',
    description: 'Armas de éter, trajes de vôo, cristais, munições e ferramentas.',
    startAngle: 292.5,
    endAngle: 337.5, // Superior Direito (1:30)
  },
  {
    id: 'library',
    title: 'Biblioteca do Verbo',
    subtitle: 'Manual de Regras',
    icon: '⚡',
    description: 'O livro de regras completo de CORE com todos os 10 capítulos originais.',
    startAngle: 337.5,
    endAngle: 382.5, // Direita (3 horas)
  },
  {
    id: 'maps',
    title: 'Mapas Celestiais',
    subtitle: 'Cartografia & Rotas',
    icon: '🗺️',
    description: 'Cartas náuticas, arquipélagos e rotas seguras reveladas pela Mestre.',
    startAngle: 22.5,
    endAngle: 67.5, // Inferior Direito (4:30)
  },
  {
    id: 'journal',
    title: 'Diário de Viagem',
    subtitle: 'Crônicas & Anotações',
    icon: '📜',
    description: 'Memórias pessoais da jornada, pistas, enigmas e anotações de viagem.',
    startAngle: 67.5,
    endAngle: 112.5, // Fundo (6 horas)
  },
  {
    id: 'bestiary',
    title: 'Bestiário dos Céus',
    subtitle: 'Criaturas & Ameaças',
    icon: '🐉',
    description: 'Catálogo de monstros, feras do vácuo e anomalias registradas.',
    startAngle: 112.5,
    endAngle: 157.5, // Inferior Esquerdo (7:30)
  },
  {
    id: 'npcs',
    title: 'Pessoas Conhecidas e NPCs',
    subtitle: 'Aliados & Contatos',
    icon: '🤝',
    description: 'Aliados, capitães, comerciantes e figuras misteriosas encontradas.',
    startAngle: 157.5,
    endAngle: 202.5, // Esquerda (9 horas)
  },
  {
    id: 'hangar',
    title: 'Hangar de Navegantes',
    subtitle: 'Seleção de Heróis',
    icon: '⚙️',
    description: 'Trocar de personagem, forjar um novo herói ou reverenciar o memorial.',
    startAngle: 202.5,
    endAngle: 247.5, // Superior Esquerdo (10:30)
  },
];

// Função geométrica para gerar o arco de cada pétala (annular sector)
function getSectorPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + rOuter * Math.cos(toRad(startAngle));
  const y1 = cy + rOuter * Math.sin(toRad(startAngle));
  const x2 = cx + rOuter * Math.cos(toRad(endAngle));
  const y2 = cy + rOuter * Math.sin(toRad(endAngle));
  const x3 = cx + rInner * Math.cos(toRad(endAngle));
  const y3 = cy + rInner * Math.sin(toRad(endAngle));
  const x4 = cx + rInner * Math.cos(toRad(startAngle));
  const y4 = cy + rInner * Math.sin(toRad(startAngle));
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
}

interface RadialCompassMenuProps {
  isOpen: boolean;
  activeCharacter: Character | null;
  currentUser?: UserProfile | null;
  allCharacters?: Character[];
  sessionCharacterIds?: string[];
  onToggleCharacterInSession?: (charId: string) => void;
  onSelectAction: (action: RadialAction) => void;
  onOpenCharacterSheet?: (charNameOrId: string) => void;
  onClose: () => void;
}

export const RadialCompassMenu: React.FC<RadialCompassMenuProps> = ({
  isOpen,
  activeCharacter,
  currentUser = null,
  allCharacters = [],
  sessionCharacterIds = [],
  onToggleCharacterInSession,
  onSelectAction,
  onOpenCharacterSheet,
  onClose,
}) => {
  const [hoveredSector, setHoveredSector] = useState<SectorSlice | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [bottomTab, setBottomTab] = useState<'info' | 'library' | 'session'>('info');

  if (!isOpen) return null;

  // Centro e Raios geométricos da roda (em viewBox 0 0 500 500)
  const cx = 250;
  const cy = 250;
  const rInner = 72; // Raio do Diário de Bordo central
  const rOuter = 236; // Raio externo das pétalas

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      
      {/* Background click to close */}
      <div className="fixed inset-0 pointer-events-auto" onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-5xl my-auto py-4">
        
        {/* Top Info Banner */}
        <div className="relative z-10 mb-2 sm:mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-stone-950/85 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <span className="text-amber-400 text-sm animate-pulse">✦</span>
            <span className="text-xs font-serif tracking-widest text-amber-200 uppercase font-bold">
              Astrolábio dos Céus Partidos
            </span>
            <span className="text-amber-400 text-sm animate-pulse">✦</span>
          </div>
          <p className="mt-1 text-xs text-stone-300 font-sans">
            {activeCharacter 
              ? `Navegante Ativo: ${activeCharacter.name} (${activeCharacter.title}) • Clique diretamente nas partes da imagem`
              : 'Clique diretamente em uma das partes ilustradas da imagem para navegar'}
          </p>
        </div>

        {/* Central Wheel Container (100% PARADA E CLICÁVEL DIRETAMENTE NA IMAGEM) */}
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] flex items-center justify-center flex-shrink-0">
          
          {/* Imagem do Astrolábio Celestial (Totalmente Estática, sem rotação!) */}
          <div className="absolute inset-2 sm:inset-4 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.35)] pointer-events-none select-none">
            <img 
              src="./art/radial-compass.webp" 
              alt="Astrolábio Celestial" 
              className="w-full h-full object-cover opacity-95 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            />
            {/* Vinheta escura muito sutil nas bordas externas */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-stone-950/60 pointer-events-none" />
          </div>

          {/* Anéis decorativos fixos */}
          <div className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none" />
          <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-amber-500/30 pointer-events-none" />

          {/* SVG Interativo Clicável Diretamente nas Pétalas e no Centro */}
          <svg 
            viewBox="0 0 500 500" 
            className="absolute inset-2 sm:inset-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] h-[calc(100%-16px)] sm:h-[calc(100%-32px)] z-20 pointer-events-auto"
          >
            <defs>
              {/* Filtro de brilho estelar ao passar o mouse */}
              <filter id="gold-ether-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* As 8 Pétalas Clicáveis diretamente na imagem */}
            {SECTORS.map((sector) => {
              const pathD = getSectorPath(cx, cy, rInner, rOuter, sector.startAngle, sector.endAngle);
              const isHovered = hoveredSector?.id === sector.id;

              return (
                <path
                  key={sector.id}
                  d={pathD}
                  className="transition-all duration-200 cursor-pointer"
                  fill={isHovered ? 'rgba(245, 158, 11, 0.28)' : 'transparent'}
                  stroke={isHovered ? 'rgba(251, 191, 36, 0.95)' : 'transparent'}
                  strokeWidth={isHovered ? 2.5 : 0}
                  filter={isHovered ? 'url(#gold-ether-glow)' : undefined}
                  onMouseEnter={() => setHoveredSector(sector)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => onSelectAction(sector.id)}
                >
                  <title>{sector.title} - Clique para abrir</title>
                </path>
              );
            })}

            {/* Centro: Diário de Bordo Clicável */}
            <circle
              cx={cx}
              cy={cy}
              r={rInner}
              className="transition-all duration-200 cursor-pointer"
              fill={isCenterHovered ? 'rgba(245, 158, 11, 0.25)' : 'transparent'}
              stroke={isCenterHovered ? 'rgba(251, 191, 36, 0.95)' : 'transparent'}
              strokeWidth={isCenterHovered ? 2.5 : 0}
              filter={isCenterHovered ? 'url(#gold-ether-glow)' : undefined}
              onMouseEnter={() => setIsCenterHovered(true)}
              onMouseLeave={() => setIsCenterHovered(false)}
              onClick={() => {
                if (activeCharacter) onSelectAction('journal');
                else onSelectAction('hangar');
              }}
            >
              <title>Diário de Bordo Central - Clique para abrir</title>
            </circle>
          </svg>

        </div>

        {/* Seletor de visualização abaixo da roda: Ramo Inspecionado | Biblioteca Firecast | Sessão da Mesa */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 p-1.5 rounded-2xl border-2 border-stone-700 bg-stone-950/95 shadow-xl">
          <button
            type="button"
            onClick={() => setBottomTab('info')}
            className={`px-5 py-2.5 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer ${
              bottomTab === 'info'
                ? 'bg-amber-600 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🧭 Ramo Inspecionado
          </button>

          <button
            type="button"
            onClick={() => setBottomTab('library')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer ${
              bottomTab === 'library'
                ? 'bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span className="text-xl">📁</span>
            <span>Biblioteca Firecast</span>
          </button>

          <button
            type="button"
            onClick={() => setBottomTab('session')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer ${
              bottomTab === 'session'
                ? 'bg-amber-600 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span className="text-xl">👥</span>
            <span>Sessão da Mesa</span>
            {sessionCharacterIds.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-stone-900 text-amber-300 border border-stone-700">
                {sessionCharacterIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Painel Inferior Dinâmico */}
        <div className="relative z-10 mt-4 w-full max-w-4xl">
          {bottomTab === 'info' && (
            <div className="min-h-[100px] p-6 rounded-2xl border-2 border-amber-500/40 bg-stone-950/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.85)] text-center transition-all">
              {hoveredSector ? (
                <div className="animate-fadeIn space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">{hoveredSector.icon}</span>
                    <h4 className="text-xl sm:text-2xl font-black text-amber-200 uppercase tracking-wider">
                      {hoveredSector.title}
                    </h4>
                  </div>
                  <p className="text-base sm:text-lg text-stone-100 font-medium leading-relaxed max-w-2xl mx-auto">
                    {hoveredSector.description}
                  </p>
                  <p className="text-sm sm:text-base text-amber-300 font-bold">
                    ✦ Clique diretamente nesta parte da imagem para abrir.
                  </p>
                </div>
              ) : isCenterHovered ? (
                <div className="animate-fadeIn space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">📖</span>
                    <h4 className="text-xl sm:text-2xl font-black text-amber-200 uppercase tracking-wider">
                      Diário de Bordo Central
                    </h4>
                  </div>
                  <p className="text-base sm:text-lg text-stone-100 font-medium leading-relaxed max-w-2xl mx-auto">
                    Registre os eventos, mistérios e descobertas da sua viagem nas correntes de éter.
                  </p>
                  <p className="text-sm sm:text-base text-amber-300 font-bold">
                    ✦ Clique no centro da imagem para acessar o Diário ou a Ficha.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-stone-200 text-base font-sans space-y-1.5">
                  <span className="font-bold text-amber-200 text-lg sm:text-xl">
                    A roda do Astrolábio está totalmente estática (sem giro).
                  </span>
                  <span className="text-stone-300 text-base">
                    Passe o mouse sobre qualquer uma das 8 partes ilustradas da imagem ou no centro para inspecionar e clicar diretamente.
                  </span>
                </div>
              )}
            </div>
          )}

          {bottomTab === 'library' && (
            <div className="h-[520px] rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl animate-fadeIn">
              <FirecastLibraryPanel
                currentUser={currentUser}
                onOpenCharacterSheet={onOpenCharacterSheet}
                onOpenGridMap={() => onSelectAction('maps')}
                onOpenDocument={() => onSelectAction('library')}
              />
            </div>
          )}

          {bottomTab === 'session' && (
            <div className="animate-fadeIn">
              <ActiveSessionDrawer
                currentUser={currentUser}
                allCharacters={allCharacters}
                sessionCharacterIds={sessionCharacterIds}
                onToggleCharacterInSession={onToggleCharacterInSession || (() => {})}
                onOpenSheet={(char) => {
                  onSelectAction('sheet');
                  if (onOpenCharacterSheet) onOpenCharacterSheet(char.id);
                }}
              />
            </div>
          )}
        </div>

        {/* Close Button at bottom */}
        <button
          onClick={onClose}
          className="relative z-10 mt-6 px-8 py-3 rounded-2xl border-2 border-stone-600 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white text-base font-bold tracking-wider transition-all cursor-pointer shadow-lg"
        >
          ✕ Fechar Astrolábio
        </button>

      </div>
    </div>
  );
};
