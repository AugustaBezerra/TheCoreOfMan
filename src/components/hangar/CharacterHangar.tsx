import React, { useState, useEffect } from 'react';
import { Character, UserProfile } from '../../types/character';
import { 
  subscribePlayerCharacters, 
  createNewCharacter, 
  archiveOrDeleteCharacter,
  saveCharacter
} from '../../services/characterService';

interface CharacterHangarProps {
  currentUser: UserProfile | null;
  activeCharacter: Character | null;
  onSelectCharacter: (char: Character) => void;
  onOpenSheet: (char: Character) => void;
  onOpenGmScreen: () => void;
  onOpenAuth: () => void;
}

export const CharacterHangar: React.FC<CharacterHangarProps> = ({
  currentUser,
  activeCharacter,
  onSelectCharacter,
  onOpenSheet,
  onOpenGmScreen,
  onOpenAuth,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'alive' | 'fallen'>('alive');

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
    await archiveOrDeleteCharacter(char.id, 'delete'); // remove old
    await saveCharacter(revived);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-stone-100 p-4 sm:p-8 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Container Principal */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header do Hangar */}
        <div className="relative rounded-3xl border border-amber-600/30 bg-gradient-to-r from-stone-950 via-[#0e131d] to-stone-950 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Luz de Fundo */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 bg-stone-900 shadow-[0_0_25px_rgba(245,158,11,0.3)] overflow-hidden flex items-center justify-center text-3xl font-serif text-amber-300">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
                ) : (
                  <span>⚙️</span>
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 tracking-wide">
                    Hangar de Navegantes
                  </h1>
                  {currentUser?.role === 'gm' && (
                    <span className="px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      👑 Mestre
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  {currentUser ? (
                    <>Identificado como <strong className="text-amber-300">{currentUser.displayName}</strong> (@{currentUser.username})</>
                  ) : (
                    'Navegador Visitante • Cadastre-se para sincronizar seus heróis nas estrelas'
                  )}
                </p>
              </div>
            </div>

            {/* Ações do Header */}
            <div className="flex flex-wrap items-center gap-3">
              {currentUser?.role === 'gm' && (
                <button
                  onClick={onOpenGmScreen}
                  className="px-5 py-2.5 rounded-xl border border-purple-500/50 bg-gradient-to-r from-purple-950 to-purple-900 hover:from-purple-900 hover:to-purple-800 text-purple-200 font-serif font-bold text-xs tracking-wider shadow-lg shadow-purple-950/50 transition-all flex items-center gap-2"
                >
                  <span>👑</span> Trono da Mestre
                </button>
              )}

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs tracking-wider shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2 uppercase"
              >
                <span>➕</span> Forjar Novo Navegante
              </button>

              <button
                onClick={onOpenAuth}
                className="px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-200 text-xs font-serif tracking-wider transition-all"
              >
                {currentUser ? '👤 Minha Conta' : '🔑 Fazer Login'}
              </button>
            </div>

          </div>
        </div>

        {/* Abas: Navegantes Vivos vs Memorial */}
        <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('alive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-serif font-bold transition-all ${
                activeTab === 'alive'
                  ? 'bg-amber-950/40 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🧭</span>
              <span>Navegantes em Atividade</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-amber-900/40 text-amber-300 border border-amber-700/40">
                {aliveCharacters.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fallen')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-serif font-bold transition-all ${
                activeTab === 'fallen'
                  ? 'bg-stone-900 text-stone-200 border border-stone-600 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <span>🕯️</span>
              <span>Memorial dos Céus Partidos</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-stone-800 text-stone-300">
                {fallenCharacters.length}
              </span>
            </button>
          </div>

          <div className="hidden sm:block text-xs text-stone-500 font-serif">
            {activeTab === 'alive' 
              ? 'Selecione o herói com o qual deseja embarcar nesta sessão'
              : 'Heróis que tombaram na luta pelo Verbo Eterno'}
          </div>
        </div>

        {/* Grid de Personagens Vivos */}
        {activeTab === 'alive' && (
          <div>
            {aliveCharacters.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-amber-900/40 bg-stone-950/40 space-y-4">
                <div className="text-4xl text-amber-500/40">⛵</div>
                <h3 className="text-lg font-serif text-amber-200 font-bold">Nenhum navegante ativo no hangar</h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  Forje o seu primeiro personagem para erguer velas nos céus partidos, manejar essências e enfrentar os segredos do vácuo.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-2.5 rounded-xl border border-amber-400 bg-amber-600 hover:bg-amber-500 text-stone-950 font-serif font-bold text-xs uppercase tracking-wider transition-all"
                >
                  ➕ Forjar Navegante Agora
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aliveCharacters.map((char) => {
                  const isActive = activeCharacter?.id === char.id;
                  return (
                    <div
                      key={char.id}
                      className={`group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                        isActive
                          ? 'border-amber-400 bg-[#121824] shadow-[0_0_35px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50'
                          : 'border-amber-900/40 bg-[#0d1117] hover:border-amber-500/60 hover:bg-[#111722]'
                      }`}
                    >
                      {/* Badge Ativo */}
                      {isActive && (
                        <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-serif font-bold uppercase tracking-wider shadow">
                          Embarcado
                        </div>
                      )}

                      <div className="p-6 space-y-4">
                        
                        {/* Avatar & Header */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl border-2 border-amber-500/50 overflow-hidden shadow-md bg-stone-900 flex-shrink-0">
                            <img
                              src={char.avatarUrl || './art/journey.webp'}
                              alt={char.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-serif font-bold text-amber-100 truncate group-hover:text-amber-300 transition-colors">
                              {char.name}
                            </h3>
                            <p className="text-xs text-amber-400/80 font-serif truncate">
                              {char.title}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 border border-stone-700">
                              {char.lineage}
                            </span>
                          </div>
                        </div>

                        {/* Citação */}
                        {char.quote && (
                          <blockquote className="text-xs text-stone-400 italic line-clamp-2 border-l-2 border-amber-600/40 pl-3">
                            {char.quote}
                          </blockquote>
                        )}

                        {/* Barras de Status Vitais */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-900/30 text-center">
                          <div className="p-2 rounded bg-stone-900/80 border border-red-500/20">
                            <span className="text-[10px] text-red-400 font-serif block">PV</span>
                            <span className="text-xs font-bold text-red-200">{char.pv.current}/{char.pv.max}</span>
                          </div>
                          <div className="p-2 rounded bg-stone-900/80 border border-blue-500/20">
                            <span className="text-[10px] text-blue-400 font-serif block">Psique</span>
                            <span className="text-xs font-bold text-blue-200">{char.psique.current}/{char.psique.max}</span>
                          </div>
                          <div className="p-2 rounded bg-stone-900/80 border border-amber-500/20">
                            <span className="text-[10px] text-amber-400 font-serif block">Éter</span>
                            <span className="text-xs font-bold text-amber-200">{char.essencias.current}/{char.essencias.max}</span>
                          </div>
                        </div>

                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 bg-stone-950/80 border-t border-amber-900/30 flex items-center gap-2">
                        <button
                          onClick={() => onSelectCharacter(char)}
                          className={`flex-1 py-2 rounded-lg font-serif font-bold text-xs uppercase tracking-wider transition-all ${
                            isActive
                              ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                              : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-600/40'
                          }`}
                        >
                          {isActive ? '⚓ Selecionado' : '⚓ Embarcar'}
                        </button>

                        <button
                          onClick={() => onOpenSheet(char)}
                          className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-700 text-xs font-serif transition-colors"
                          title="Abrir Ficha Completa"
                        >
                          📜 Ficha
                        </button>

                        <button
                          onClick={() => handleMarkFallen(char.id)}
                          className="px-2.5 py-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 text-xs transition-colors"
                          title="Tombou em Batalha"
                        >
                          ☠️
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Grid de Personagens Caídos (Memorial) */}
        {activeTab === 'fallen' && (
          <div>
            {fallenCharacters.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-dashed border-stone-800 bg-stone-950/30 space-y-3">
                <div className="text-3xl text-stone-600">🕯️</div>
                <h3 className="text-base font-serif text-stone-300 font-bold">O memorial está em silêncio</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Nenhum navegante tombou no vácuo até agora. Que as asas do éter continuem a proteger sua tripulação.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fallenCharacters.map((char) => (
                  <div
                    key={char.id}
                    className="relative rounded-2xl border border-stone-700/60 bg-[#0a0d13] grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl border border-stone-600 overflow-hidden bg-stone-900 flex-shrink-0">
                          <img
                            src={char.avatarUrl || './art/journey.webp'}
                            alt={char.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-serif font-bold text-stone-200">
                            {char.name}
                          </h3>
                          <p className="text-xs text-stone-400 font-serif">
                            {char.title}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-red-950/80 text-red-300 border border-red-800/40 uppercase font-bold">
                            Tombou nos Céus
                          </span>
                        </div>
                      </div>

                      {char.quote && (
                        <blockquote className="text-xs text-stone-400 italic line-clamp-2 border-l-2 border-stone-600 pl-3">
                          {char.quote}
                        </blockquote>
                      )}
                    </div>

                    <div className="p-4 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenSheet(char)}
                        className="flex-1 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-serif transition-colors border border-stone-700"
                      >
                        📜 Ver Registro Final
                      </button>
                      <button
                        onClick={() => handleRevive(char)}
                        className="px-3 py-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 text-xs font-serif transition-colors border border-amber-600/30"
                        title="Ressuscitar com Milagre da Mestre"
                      >
                        ✨ Reviver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: FORJAR NOVO NAVEGANTE */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e121a] border-2 border-amber-500/60 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden">
            
            <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-stone-900 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-amber-400 bg-amber-950/60 flex items-center justify-center text-amber-300 text-xl">
                  ✨
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-amber-200">
                    Forjar Novo Navegante
                  </h2>
                  <p className="text-xs text-amber-400/70 font-sans">
                    Inscreva uma nova alma nos céus partidos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full border border-stone-700 text-stone-400 hover:text-stone-100 hover:bg-stone-800 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Nome do Navegante *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Kael D. Ventus, Lirael..."
                  className="w-full px-4 py-2.5 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                    Título / Epíteto
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex: O Corsário Renegado"
                    className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                    Linhagem / Origem
                  </label>
                  <input
                    type="text"
                    value={lineage}
                    onChange={(e) => setLineage(e.target.value)}
                    placeholder="ex: Humano, Silvestre..."
                    className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Citação Marcante
                </label>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="ex: 'O horizonte aguarda quem não teme o vácuo.'"
                  className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Escolha do Retrato */}
              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-2">
                  Retrato do Herói
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                        avatarUrl === preset.url
                          ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                          : 'border-stone-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-serif"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40"
                >
                  {isSubmitting ? 'Iniciando...' : '✨ Forjar Navegante'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
