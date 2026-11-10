import React, { useState } from 'react';
import { Character } from '../../types/character';

export type RadialAction = 
  | 'sheet'
  | 'inventory'
  | 'library'
  | 'maps'
  | 'journal'
  | 'bestiary'
  | 'npcs'
  | 'hangar';

interface RadialSlice {
  id: RadialAction;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  angle: number; // in degrees for circular positioning
  color: string;
}

const SLICES: RadialSlice[] = [
  {
    id: 'sheet',
    title: 'Ficha do Navegante',
    shortTitle: 'Ficha & Dados',
    icon: '🎲',
    description: 'Atributos, perícias, dados D20, essências vitais e dons do seu herói.',
    angle: 0,
    color: 'from-amber-500/80 to-amber-700/80',
  },
  {
    id: 'inventory',
    title: 'Inventário & Carga',
    shortTitle: 'Inventário',
    icon: '🎒',
    description: 'Armas de éter, trajes de vôo, cristais, munições e ferramentas.',
    angle: 45,
    color: 'from-emerald-500/80 to-emerald-700/80',
  },
  {
    id: 'library',
    title: 'Biblioteca do Verbo',
    shortTitle: 'Biblioteca',
    icon: '⚡',
    description: 'O livro de regras completo de CORE com todos os 10 capítulos originais.',
    angle: 90,
    color: 'from-blue-500/80 to-blue-700/80',
  },
  {
    id: 'maps',
    title: 'Mapas dos Céus',
    shortTitle: 'Cartografia',
    icon: '🗺️',
    description: 'Cartas náuticas, arquipélagos e rotas seguras reveladas pela Mestre.',
    angle: 135,
    color: 'from-cyan-500/80 to-cyan-700/80',
  },
  {
    id: 'journal',
    title: 'Diário de Bordo',
    shortTitle: 'Diário',
    icon: '📜',
    description: 'Memórias pessoais da jornada, pistas e anotações de viagem.',
    angle: 180,
    color: 'from-yellow-500/80 to-amber-600/80',
  },
  {
    id: 'bestiary',
    title: 'Bestiário dos Céus',
    shortTitle: 'Bestiário',
    icon: '🐉',
    description: 'Catálogo de monstros, feras do vácuo e anomalias registradas.',
    angle: 225,
    color: 'from-red-500/80 to-rose-700/80',
  },
  {
    id: 'npcs',
    title: 'Pessoas & Contatos',
    shortTitle: 'Contatos',
    icon: '🤝',
    description: 'Aliados, capitães, comerciantes e figuras conhecidas no caminho.',
    angle: 270,
    color: 'from-indigo-500/80 to-purple-700/80',
  },
  {
    id: 'hangar',
    title: 'Hangar de Navegantes',
    shortTitle: 'Hangar',
    icon: '⚙️',
    description: 'Trocar de personagem, forjar um novo herói ou reverenciar o memorial.',
    angle: 315,
    color: 'from-stone-400/80 to-stone-600/80',
  },
];

interface RadialCompassMenuProps {
  isOpen: boolean;
  activeCharacter: Character | null;
  onSelectAction: (action: RadialAction) => void;
  onClose: () => void;
}

export const RadialCompassMenu: React.FC<RadialCompassMenuProps> = ({
  isOpen,
  activeCharacter,
  onSelectAction,
  onClose,
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<RadialSlice | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none">
      
      {/* Background glow & click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl max-h-[95vh]">
        
        {/* Top Info Banner */}
        <div className="relative z-10 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-stone-950/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="text-amber-400 text-sm animate-pulse">✦</span>
            <span className="text-xs font-serif tracking-widest text-amber-200 uppercase font-bold">
              Astrolábio dos Céus Partidos
            </span>
            <span className="text-amber-400 text-sm animate-pulse">✦</span>
          </div>
          <p className="mt-1 text-xs text-stone-400 font-sans">
            {activeCharacter 
              ? `Navegante Ativo: ${activeCharacter.name} (${activeCharacter.title})`
              : 'Selecione uma coordenada de vôo para navegar'}
          </p>
        </div>

        {/* Central Wheel Container (Not Cropped!) */}
        <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] flex items-center justify-center">
          
          {/* Circular Astrolabe User Asset Image */}
          <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.25)] pointer-events-none">
            <img 
              src="./art/radial-compass.webp" 
              alt="Astrolábio Celestial" 
              className="w-full h-full object-cover animate-spin-slow opacity-85"
            />
            {/* Dark radial gradient overlay for contrast */}
            <div className="absolute inset-0 bg-radial from-transparent via-stone-950/50 to-stone-950/90 pointer-events-none" />
          </div>

          {/* Decorative Outer Rings */}
          <div className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none animate-pulse" />
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/30 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-amber-600/30 pointer-events-none" />

          {/* Center Hub Display */}
          <div 
            onClick={() => {
              if (activeCharacter) onSelectAction('sheet');
              else onSelectAction('hangar');
            }}
            className="group relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-amber-400 bg-stone-950/95 shadow-[0_0_35px_rgba(245,158,11,0.4)] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all hover:scale-105 hover:border-amber-300"
          >
            {activeCharacter ? (
              <>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-amber-400/60 overflow-hidden mb-1 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <img 
                    src={activeCharacter.avatarUrl || './art/journey.webp'} 
                    alt={activeCharacter.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-serif font-bold text-amber-200 truncate max-w-full">
                  {activeCharacter.name}
                </span>
                <span className="text-[9px] text-amber-400/70 font-sans uppercase tracking-tighter">
                  {hoveredSlice ? hoveredSlice.shortTitle : 'Ver Ficha'}
                </span>
              </>
            ) : (
              <>
                <div className="text-2xl sm:text-3xl text-amber-300 mb-1">🧭</div>
                <span className="text-xs font-serif font-bold text-amber-200">Escolha</span>
                <span className="text-[9px] text-amber-400/70 font-sans uppercase">ou crie herói</span>
              </>
            )}
          </div>

          {/* 8 Radial Action Buttons positioned around circumference */}
          {SLICES.map((slice, index) => {
            // Calculate polar coordinates on circle
            // radius in px depending on screen size, standard approx 190px - 220px
            const rad = (slice.angle - 90) * (Math.PI / 180);
            const isHovered = hoveredSlice?.id === slice.id;

            return (
              <div
                key={slice.id}
                className="absolute z-20"
                style={{
                  top: `calc(50% + ${Math.sin(rad) * 40}%)`,
                  left: `calc(50% + ${Math.cos(rad) * 40}%)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setHoveredSlice(slice)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  onClick={() => onSelectAction(slice.id)}
                  className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl border-2 transition-all duration-300 shadow-2xl ${
                    isHovered
                      ? 'scale-115 border-amber-300 bg-amber-950/90 shadow-[0_0_30px_rgba(245,158,11,0.6)] z-30'
                      : 'border-amber-600/50 bg-[#0d1117]/90 hover:border-amber-400 hover:scale-105'
                  }`}
                >
                  {/* Subtle inner glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${slice.color} opacity-20 group-hover:opacity-40 transition-opacity`} />

                  <span className="text-xl sm:text-2xl filter drop-shadow group-hover:scale-110 transition-transform">
                    {slice.icon}
                  </span>
                  <span className="mt-1 text-[10px] sm:text-[11px] font-serif font-bold text-amber-100 tracking-tight text-center px-1 leading-tight group-hover:text-amber-300">
                    {slice.shortTitle}
                  </span>

                  {/* Cardinal Compass Indicator Marker */}
                  {index % 2 === 0 && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card / Tooltip Box below Wheel */}
        <div className="relative z-10 mt-5 w-full max-w-lg min-h-[76px] p-4 rounded-xl border border-amber-500/30 bg-stone-950/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] text-center transition-all">
          {hoveredSlice ? (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg">{hoveredSlice.icon}</span>
                <h4 className="text-sm font-serif font-bold text-amber-200 uppercase tracking-wider">
                  {hoveredSlice.title}
                </h4>
              </div>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {hoveredSlice.description}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 text-xs font-sans">
              <span>Passe o cursor sobre as 8 coordenadas celestes para inspecionar.</span>
              <span className="text-[10px] text-amber-400/60 mt-1">Pressione ESC ou clique fora para fechar a qualquer momento.</span>
            </div>
          )}
        </div>

        {/* Close Button at bottom */}
        <button
          onClick={onClose}
          className="relative z-10 mt-4 px-6 py-2 rounded-full border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-serif tracking-widest transition-all"
        >
          ✕ Fechar Astrolábio
        </button>

      </div>
    </div>
  );
};
