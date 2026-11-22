import React, { useState } from 'react';
import { Character, UserProfile } from '../../types/character';
import { Users, Scroll, Plus, Minus, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ActiveSessionDrawerProps {
  currentUser: UserProfile | null;
  allCharacters: Character[];
  sessionCharacterIds: string[];
  onToggleCharacterInSession: (charId: string) => void;
  onOpenSheet: (char: Character) => void;
  onQuickUpdatePv?: (charId: string, delta: number) => void;
}

export const ActiveSessionDrawer: React.FC<ActiveSessionDrawerProps> = ({
  currentUser,
  allCharacters,
  sessionCharacterIds,
  onToggleCharacterInSession,
  onOpenSheet,
  onQuickUpdatePv,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'inSession'>('all');

  const isGM = currentUser?.role === 'gm';
  const activeCount = sessionCharacterIds.length;

  const displayedCharacters = allCharacters.filter((char) => {
    if (char.status === 'fallen') return false;
    if (filterMode === 'inSession') return sessionCharacterIds.includes(char.id);
    return true;
  });

  return (
    <div className="w-full rounded-2xl border border-slate-800/80 bg-[#090c14]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-slate-100 font-sans transition-all overflow-hidden">
      
      {/* Top Header Bar da Gaveta */}
      <div className="px-5 py-3.5 bg-[#0f1420]/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm sm:text-base font-serif font-bold text-amber-200 hover:text-amber-100 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-amber-500/80" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-500/80" />
            )}
            <span>Mesa de Jogo • Heróis na Sessão</span>
          </button>

          <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-amber-300/90 border border-slate-700">
            {activeCount} {activeCount === 1 ? 'embarcado' : 'embarcados'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Filtros rápidos estilo BG3 */}
          {isExpanded && (
            <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all' 
                    ? 'bg-amber-600/90 text-slate-950 font-medium shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos ({allCharacters.filter((c) => c.status !== 'fallen').length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('inSession')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'inSession' 
                    ? 'bg-amber-600/90 text-slate-950 font-medium shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Na Sessão ({activeCount})
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Recolher' : 'Expandir'}
          </button>
        </div>
      </div>

      {/* Conteúdo Expansível: Grid de Jogadores */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-[#06080e]/60">
          {displayedCharacters.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              Nenhum personagem selecionado para a sessão de hoje.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedCharacters.map((char) => {
                const isInSession = sessionCharacterIds.includes(char.id);

                return (
                  <div
                    key={char.id}
                    className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 bg-[#0d111a] ${
                      isInSession
                        ? 'border-amber-600/50 shadow-[0_2px_18px_rgba(212,175,55,0.1)]'
                        : 'border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    {/* Header do Card */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-700/30 bg-slate-900 flex-shrink-0 shadow">
                        <img
                          src={char.avatarUrl || './art/journey.webp'}
                          alt={char.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-serif font-bold text-amber-100 truncate">
                            {char.name}
                          </h4>
                          
                          {/* Botão de Sessão */}
                          {isGM ? (
                            <button
                              type="button"
                              onClick={() => onToggleCharacterInSession(char.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-sans transition-all cursor-pointer ${
                                isInSession
                                  ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                              }`}
                            >
                              {isInSession ? '✓ Sessão' : '+ Escalar'}
                            </button>
                          ) : (
                            isInSession && (
                              <span className="text-[10px] text-amber-400/90 font-mono">
                                Ativo
                              </span>
                            )
                          )}
                        </div>

                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {char.title || char.lineage}
                        </p>
                        <p className="text-[11px] text-amber-400/60 truncate">
                          {char.playerName}
                        </p>
                      </div>
                    </div>

                    {/* Barras de Status Vitais e Ações Rápidas */}
                    <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      {/* PV com botões rápidos para a Mestre */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-red-400/90 font-medium">PV:</span>
                        <span className="font-mono text-slate-100">
                          {char.pv.current}/{char.pv.max}
                        </span>
                        {isGM && onQuickUpdatePv && (
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              type="button"
                              onClick={() => onQuickUpdatePv(char.id, -1)}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 flex items-center justify-center text-xs cursor-pointer"
                              title="Dano -1 PV"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onQuickUpdatePv(char.id, 1)}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-700 flex items-center justify-center text-xs cursor-pointer"
                              title="Cura +1 PV"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Éter */}
                      <div className="flex items-center gap-1 text-xs text-amber-300/80 font-mono">
                        <span>Éter:</span>
                        <span>{char.essencias?.current ?? 4}/{char.essencias?.max ?? 6}</span>
                      </div>

                      {/* Botão Ver Ficha */}
                      <button
                        type="button"
                        onClick={() => onOpenSheet(char)}
                        className="px-2 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-200 text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        title="Abrir ficha completa"
                      >
                        <Scroll className="w-3 h-3 text-amber-400" />
                        <span>Ficha</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
