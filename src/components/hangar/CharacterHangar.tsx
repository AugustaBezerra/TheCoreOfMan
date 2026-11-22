import React, { useState, useEffect } from 'react';
import { Character, UserProfile } from '../../types/character';
import { 
  subscribePlayerCharacters, 
  createNewCharacter, 
  archiveOrDeleteCharacter,
  saveCharacter,
  getOrCreateLibraryCharacter
} from '../../services/characterService';
import { FirecastLibraryPanel } from '../firecast/FirecastLibraryPanel';
import { ActiveSessionDrawer } from '../session/ActiveSessionDrawer';
import { 
  Upload, 
  Plus, 
  Compass, 
  Users, 
  FolderArchive, 
  Flame, 
  Scroll, 
  Check, 
  X, 
  Crown, 
  User, 
  Sparkles,
  Shield,
  Heart,
  Brain,
  Feather,
  Anchor
} from 'lucide-react';

interface CharacterHangarProps {
  currentUser: UserProfile | null;
  activeCharacter: Character | null;
  onSelectCharacter: (char: Character) => void;
  onOpenSheet: (char: Character) => void;
  onOpenGmScreen: () => void;
  onOpenAuth: () => void;
  onOpenAstrolabe?: () => void;
}

export const CharacterHangar: React.FC<CharacterHangarProps> = ({
  currentUser,
  activeCharacter,
  onSelectCharacter,
  onOpenSheet,
  onOpenGmScreen,
  onOpenAuth,
  onOpenAstrolabe,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'alive' | 'library' | 'session' | 'fallen'>('alive');

  const [sessionCharacterIds, setSessionCharacterIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('core_of_man_active_session');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleToggleSession = (charId: string) => {
    setSessionCharacterIds((prev) => {
      const updated = prev.includes(charId) 
        ? prev.filter((id) => id !== charId) 
        : [...prev, charId];
      localStorage.setItem('core_of_man_active_session', JSON.stringify(updated));
      return updated;
    });
  };

  const handleEmbarkAll = () => {
    const allAliveIds = characters.filter((c) => c.status !== 'fallen').map((c) => c.id);
    setSessionCharacterIds(allAliveIds);
    localStorage.setItem('core_of_man_active_session', JSON.stringify(allAliveIds));
  };

  const handleDisembarkAll = () => {
    setSessionCharacterIds([]);
    localStorage.setItem('core_of_man_active_session', JSON.stringify([]));
  };

  const handleQuickUpdatePv = async (charId: string, delta: number) => {
    const target = characters.find((c) => c.id === charId);
    if (!target) return;
    const newPv = Math.max(0, Math.min(target.pv.max, target.pv.current + delta));
    const updated: Character = {
      ...target,
      pv: { ...target.pv, current: newPv },
    };
    await saveCharacter(updated);
  };

  // Form State for New Character
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [lineage, setLineage] = useState('Humano dos Céus');
  const [quote, setQuote] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('./art/journey.webp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PRESET_AVATARS = [
    { label: 'Corsário dos Céus', url: './art/journey.webp' },
    { label: 'Engenheiro Astral', url: './art/emblem.webp' },
    { label: 'Erudita do Verbo', url: './art/library.webp' },
    { label: 'Cartógrafo Alado', url: './art/parchment-center.webp' },
  ];

  useEffect(() => {
    const userId = currentUser ? currentUser.uid : 'all';
    const unsubscribe = subscribePlayerCharacters(userId, (chars) => {
      setCharacters(chars);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentUser]);

  const aliveCharacters = characters.filter((c) => c.status !== 'fallen');
  const fallenCharacters = characters.filter((c) => c.status === 'fallen');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const created = await createNewCharacter({
        userId: currentUser?.uid || 'player_guest',
        playerName: currentUser?.displayName || 'Navegante Anônimo',
        name,
        title: title || 'Aventureiro das Correntes de Éter',
        lineage,
        quote: quote || '"Nas alturas do abismo, cada escolha ecoa no infinito."',
        avatarUrl,
      });
      setShowCreateModal(false);
      setName('');
      setTitle('');
      setQuote('');
      onSelectCharacter(created);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkFallen = async (charId: string) => {
    const confirmed = window.confirm(
      'Tem certeza de que este navegante tombou no vácuo? Ele será eternizado no Memorial dos Céus Partidos.'
    );
    if (confirmed) {
      await archiveOrDeleteCharacter(charId, 'fallen');
    }
  };

  const handleRevive = async (char: Character) => {
    const revived: Character = { ...char, status: 'alive' };
    await archiveOrDeleteCharacter(char.id, 'delete');
    await saveCharacter(revived);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-[#06080e] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header & Navigation Bar (Framed to save vertical space on notebooks) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-1 flex-shrink-0 flex flex-col gap-2">
        <header className="relative flex items-center justify-between gap-4">
          
          {/* Lado Esquerdo: Brasão & Identidade do Navegador */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-amber-600/40 bg-gradient-to-b from-[#161c28] to-[#0c0f17] shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
              ) : (
                <img src="./art/emblem.webp" alt="Selo do Cerne" className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow" />
              )}
              <div className="absolute inset-0 rounded-xl border border-amber-400/20 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400">
                  Hangar de Navegantes
                </h1>
                {currentUser?.role === 'gm' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-wider bg-amber-950/40 text-amber-300 border border-amber-600/40">
                    <Crown className="w-3 h-3 text-amber-400" /> Selo da Mestre
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {currentUser ? (
                  <>Comandante <span className="text-amber-200 font-medium">{currentUser.displayName}</span> <span className="text-slate-500">(@{currentUser.username})</span></>
                ) : (
                  'Cais Astral • Registro de heróis e almas prontas para cruzar os Céus Partidos'
                )}
              </p>
            </div>
          </div>

          {/* Lado Direito: Ação Primária Única (Sem duplicações de Trono da Mestre ou Minha Conta) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Forjar Navegante</span>
              <span className="sm:hidden">Forjar</span>
            </button>
          </div>
        </header>

        {/* Divisor Sutil */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-700/20 to-transparent my-1" />

        {/* Navegação de Abas Horizontais (Baldur's Gate 3 Style) */}
        <nav className="flex items-center border-b border-slate-800/80 gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          
          {/* Aba: Navegantes em Atividade */}
          <button
            onClick={() => setActiveTab('alive')}
            className={`relative pb-2 px-3 sm:px-4 text-xs sm:text-sm font-sans tracking-wide transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'alive'
                ? 'text-amber-200 font-semibold border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-slate-200 font-normal'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500/80" />
            <span>Navegantes em Atividade</span>
            <span className="text-xs px-1.5 py-0.2 bg-slate-800/90 text-slate-300 rounded-md font-mono">
              {aliveCharacters.length}
            </span>
          </button>

          {/* Aba: Sessão da Mesa */}
          <button
            onClick={() => setActiveTab('session')}
            className={`relative pb-2 px-3 sm:px-4 text-xs sm:text-sm font-sans tracking-wide transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'session'
                ? 'text-amber-200 font-semibold border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-slate-200 font-normal'
            }`}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>Sessão da Mesa</span>
            {sessionCharacterIds.length > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded-md font-mono">
                {sessionCharacterIds.length}
              </span>
            )}
          </button>

          {/* Aba: Biblioteca */}
          <button
            onClick={() => setActiveTab('library')}
            className={`relative pb-2 px-3 sm:px-4 text-xs sm:text-sm font-sans tracking-wide transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'library'
                ? 'text-amber-200 font-semibold border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-slate-200 font-normal'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-slate-400" />
            <span>Biblioteca</span>
          </button>

          {/* Aba: Memorial dos Céus Partidos */}
          <button
            onClick={() => setActiveTab('fallen')}
            className={`relative pb-2 px-3 sm:px-4 text-xs sm:text-sm font-sans tracking-wide transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'fallen'
                ? 'text-amber-200 font-semibold border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-slate-200 font-normal'
            }`}
          >
            <Flame className="w-4 h-4 text-stone-500" />
            <span>Memorial dos Caídos</span>
            {fallenCharacters.length > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-stone-800 text-stone-400 rounded-md font-mono">
                {fallenCharacters.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Main Content Area (Fills remaining height without overflowing the viewport) */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-3 flex flex-col overflow-hidden">
        {/* TAB 1: NAVEGANTES EM ATIVIDADE */}
        {activeTab === 'alive' && (
          <div className="h-full overflow-y-auto pr-1 space-y-4">
            
            {/* Barra Sutil de Ações e Controles (Discreta, sem visual pesado de caixa) */}
            {aliveCharacters.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-800/40">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <Anchor className="w-4 h-4 text-amber-500/70" />
                  <span>
                    <strong className="text-amber-300 font-medium">{sessionCharacterIds.length}</strong> de <strong className="text-slate-200">{aliveCharacters.length}</strong> navegantes embarcados na mesa de hoje
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEmbarkAll}
                    className="px-3 py-1.5 rounded-md border border-slate-700/60 bg-slate-900/60 hover:border-amber-600/40 text-slate-300 hover:text-amber-200 text-xs font-sans transition-colors cursor-pointer"
                  >
                    Embarcar Todos
                  </button>
                  <button
                    type="button"
                    onClick={handleDisembarkAll}
                    className="px-3 py-1.5 rounded-md border border-slate-800 bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 text-xs font-sans transition-colors cursor-pointer"
                  >
                    Desembarcar Todos
                  </button>
                </div>
              </div>
            )}

            {/* Se Não Há Personagens: Empty State Nobre (Skyrim/Elden Ring) */}
            {aliveCharacters.length === 0 ? (
              <div className="py-20 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full border border-amber-700/30 bg-slate-900/40 flex items-center justify-center text-amber-400/60">
                  <Compass className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-lg font-serif font-bold text-amber-200/90">
                    Nenhum navegante inscrito neste cais
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Forje o primeiro herói para guiar o leme pelas correntes de éter, canalizar essências e desvendar os mistérios do vácuo.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Forjar Primeiro Navegante</span>
                </button>
              </div>
            ) : (
              /* Grid de Placas dos Personagens (Elden Ring / BG3 Character Plaques) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aliveCharacters.map((char) => {
                  const isEmbarked = sessionCharacterIds.includes(char.id);
                  const isActive = activeCharacter?.id === char.id;

                  return (
                    <div
                      key={char.id}
                      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#0c1018] to-[#07090f] ${
                        isEmbarked
                          ? 'border-amber-500/60 shadow-[0_4px_25px_rgba(212,175,55,0.12)]'
                          : 'border-slate-800/80 hover:border-amber-700/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                      }`}
                    >
                      {/* Badge Discreta de Status no Canto */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                        {isEmbarked && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-amber-950/80 text-amber-300 border border-amber-600/40">
                            <Check className="w-3 h-3 text-amber-400" /> Na Sessão
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-slate-800 text-slate-200 border border-slate-700">
                            Ficha Ativa
                          </span>
                        )}
                      </div>

                      <div className="p-5 space-y-4">
                        {/* Avatar & Identificação */}
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-xl border border-amber-700/30 overflow-hidden bg-slate-900 flex-shrink-0 shadow-md">
                            <img
                              src={char.avatarUrl || './art/journey.webp'}
                              alt={char.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 border border-amber-400/10 rounded-xl pointer-events-none" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-200 transition-colors truncate">
                              {char.name}
                            </h3>
                            <p className="text-xs text-amber-400/80 truncate">
                              {char.title}
                            </p>
                            <span className="inline-block mt-1 text-[11px] text-slate-400 font-sans">
                              {char.lineage}
                            </span>
                          </div>
                        </div>

                        {/* Citação do Herói */}
                        {char.quote && (
                          <blockquote className="text-xs text-slate-300/90 italic line-clamp-2 border-l border-amber-700/40 pl-3 font-reading">
                            {char.quote}
                          </blockquote>
                        )}

                        {/* Atributos Vitais Táteis (BG3 Clean Metrics) */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center font-sans">
                          <div className="py-1.5 px-2 rounded-lg bg-slate-900/60 border border-slate-800">
                            <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider block">Vida</span>
                            <span className="text-xs font-semibold text-slate-100">{char.pv.current}/{char.pv.max}</span>
                          </div>
                          <div className="py-1.5 px-2 rounded-lg bg-slate-900/60 border border-slate-800">
                            <span className="text-[10px] font-medium text-sky-400 uppercase tracking-wider block">Psique</span>
                            <span className="text-xs font-semibold text-slate-100">{char.psique.current}/{char.psique.max}</span>
                          </div>
                          <div className="py-1.5 px-2 rounded-lg bg-slate-900/60 border border-slate-800">
                            <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider block">Éter</span>
                            <span className="text-xs font-semibold text-slate-100">{char.essencias.current}/{char.essencias.max}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ações da Placa */}
                      <div className="px-4 py-3 bg-[#080b11] border-t border-slate-800/80 flex items-center justify-between gap-2">
                        {/* Toggle de Embarque */}
                        <button
                          onClick={() => handleToggleSession(char.id)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isEmbarked
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-600/40 hover:bg-amber-900/60'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                          }`}
                        >
                          <Anchor className="w-3.5 h-3.5 text-amber-400/80" />
                          <span>{isEmbarked ? 'Desembarcar' : 'Embarcar'}</span>
                        </button>

                        {/* Abrir Ficha */}
                        <button
                          onClick={() => {
                            onSelectCharacter(char);
                            onOpenSheet(char);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-amber-200 hover:text-amber-100 border border-amber-700/30 text-xs font-sans font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                          title="Abrir Ficha Completa"
                        >
                          <Scroll className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ficha</span>
                        </button>

                        {/* Mover ao Memorial */}
                        <button
                          onClick={() => handleMarkFallen(char.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Mover ao Memorial dos Caídos"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SESSÃO DA MESA (Apenas quando a aba de sessão é selecionada) */}
        {activeTab === 'session' && (
          <div className="h-full overflow-y-auto pr-1 animate-fadeIn">
            <ActiveSessionDrawer
              currentUser={currentUser}
              allCharacters={characters}
              sessionCharacterIds={sessionCharacterIds}
              onToggleCharacterInSession={handleToggleSession}
              onOpenSheet={onOpenSheet}
              onQuickUpdatePv={handleQuickUpdatePv}
            />
          </div>
        )}

        {/* TAB 3: BIBLIOTECA (Split-View com altura flexível automática) */}
        {activeTab === 'library' && (
          <div className="w-full h-full flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl animate-fadeIn">
            <FirecastLibraryPanel
              currentUser={currentUser}
              onOpenCharacterSheet={async (nameOrId) => {
                let found = characters.find(
                  (c) => c.id === nameOrId || c.name.toLowerCase() === nameOrId.toLowerCase()
                );
                if (!found) {
                  found = await getOrCreateLibraryCharacter({
                    name: nameOrId,
                    userId: currentUser?.uid,
                    playerName: currentUser?.displayName || 'Mestre Augusta',
                  });
                }
                if (found) onOpenSheet(found);
              }}
            />
          </div>
        )}

        {/* TAB 4: MEMORIAL DOS CAÍDOS */}
        {activeTab === 'fallen' && (
          <div className="h-full overflow-y-auto pr-1 space-y-4">
            {fallenCharacters.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border border-stone-800 bg-stone-950/50 flex items-center justify-center text-stone-500">
                  <Flame className="w-7 h-7" />
                </div>
                <h3 className="text-base font-serif text-stone-300">
                  O memorial permanece em silêncio
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Nenhum navegante tombou no vácuo até agora. Que as asas do éter continuem a proteger sua tripulação.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {fallenCharacters.map((char) => (
                  <div
                    key={char.id}
                    className="relative rounded-2xl border border-stone-800 bg-[#090b10] grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl border border-stone-700 overflow-hidden bg-stone-900 flex-shrink-0">
                          <img
                            src={char.avatarUrl || './art/journey.webp'}
                            alt={char.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-bold text-stone-200">
                            {char.name}
                          </h3>
                          <p className="text-xs text-stone-400">
                            {char.title}
                          </p>
                          <span className="inline-block mt-1 text-[10px] text-red-400 font-sans uppercase">
                            Tombou nos Céus
                          </span>
                        </div>
                      </div>

                      {char.quote && (
                        <blockquote className="text-xs text-stone-400 italic line-clamp-2 border-l border-stone-700 pl-3">
                          {char.quote}
                        </blockquote>
                      )}
                    </div>

                    <div className="p-3 bg-stone-950/90 border-t border-stone-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenSheet(char)}
                        className="flex-1 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-sans transition-colors border border-stone-700/60"
                      >
                        Ver Registro
                      </button>
                      <button
                        onClick={() => handleRevive(char)}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-amber-950/60 text-amber-300 text-xs font-sans transition-colors border border-amber-700/30"
                        title="Ressuscitar Herói"
                      >
                        Reviver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 5. MODAL DE FORJAR NAVEGANTE (Limpo, Estilo Ficha Skyrim / BG3)             */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0c1018] border border-amber-600/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header do Modal */}
            <div className="px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/30 to-transparent flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-amber-200">
                  Forjar Novo Navegante
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inscreva uma nova alma nos céus partidos
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-sans">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome do Navegante *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Kael D. Ventus, Lirael..."
                  className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Título / Epíteto
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex: O Corsário Renegado"
                    className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Linhagem / Povo
                  </label>
                  <input
                    type="text"
                    value={lineage}
                    onChange={(e) => setLineage(e.target.value)}
                    placeholder="ex: Humano dos Céus"
                    className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                  Citação Marcante
                </label>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="ex: 'O horizonte aguarda quem não teme o vácuo.'"
                  className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Escolha do Retrato */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Retrato do Herói
                </label>

                {/* Upload de Imagem */}
                <label
                  htmlFor="hangar-avatar-file-input"
                  className="flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-amber-200 text-xs cursor-pointer transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enviar Imagem do Dispositivo</span>
                </label>
                <input
                  id="hangar-avatar-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const res = ev.target?.result as string;
                      if (res) setAvatarUrl(res);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />

                {/* Presets de Retratos */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {PRESET_AVATARS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${
                        avatarUrl === preset.url
                          ? 'border-amber-400 ring-2 ring-amber-400/30 scale-102'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Botões do Rodapé */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-medium text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  {isSubmitting ? 'Gravando...' : 'Forjar Navegante'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
