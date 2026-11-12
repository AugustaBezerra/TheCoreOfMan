import React, { useState, useEffect } from 'react';
import { Character, SharedMediaItem, UserProfile } from '../../types/character';
import { 
  subscribePlayerCharacters, 
  getLocalSharedMedia, 
  toggleMediaSecretStatus 
} from '../../services/characterService';
import { DiceRollerModal } from '../dice/DiceRollerModal';
import { SecretGrimoireModal } from './SecretGrimoireModal';

interface GameMasterDashboardProps {
  currentUser: UserProfile | null;
  onOpenSheet: (char: Character) => void;
  onBackToHangar: () => void;
}

export const GameMasterDashboard: React.FC<GameMasterDashboardProps> = ({
  currentUser,
  onOpenSheet,
  onBackToHangar,
}) => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [sessionCharacterIds, setSessionCharacterIds] = useState<string[]>([]);
  const [mediaList, setMediaList] = useState<SharedMediaItem[]>([]);
  const [mediaTab, setMediaTab] = useState<'all' | 'public' | 'secret'>('all');
  
  // Quick dice roller state
  const [showDiceModal, setShowDiceModal] = useState(false);
  const [showGrimoireModal, setShowGrimoireModal] = useState(false);
  const [diceRollInfo, setDiceRollInfo] = useState<{ label: string; bonus: number }>({
    label: 'Rolagem da Mestre',
    bonus: 0,
  });

  // New Media Modal State
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaDescription, setNewMediaDescription] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<SharedMediaItem['category']>('mapa');
  const [newMediaImageUrl, setNewMediaImageUrl] = useState('./art/parchment-center.webp');
  const [newMediaIsSecret, setNewMediaIsSecret] = useState(false);

  useEffect(() => {
    const unsub = subscribePlayerCharacters('all', (chars) => {
      setAllCharacters(chars);
      // Auto-include alive characters initially if session empty
      setSessionCharacterIds((prev) => {
        if (prev.length === 0) {
          return chars.filter((c) => c.status === 'alive').map((c) => c.id);
        }
        return prev;
      });
    });

    setMediaList(getLocalSharedMedia());

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const sessionCharacters = allCharacters.filter((c) => sessionCharacterIds.includes(c.id));
  const benchedCharacters = allCharacters.filter((c) => !sessionCharacterIds.includes(c.id) && c.status === 'alive');

  const removeFromSession = (charId: string) => {
    setSessionCharacterIds((prev) => prev.filter((id) => id !== charId));
  };

  const addToSession = (charId: string) => {
    setSessionCharacterIds((prev) => [...prev, charId]);
  };

  const handleToggleSecret = (mediaId: string) => {
    const updated = toggleMediaSecretStatus(mediaId);
    setMediaList([...updated]);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle.trim()) return;

    const newItem: SharedMediaItem = {
      id: 'media_' + Date.now(),
      title: newMediaTitle,
      description: newMediaDescription,
      imageUrl: newMediaImageUrl,
      category: newMediaCategory,
      isSecret: newMediaIsSecret,
    };

    const updated = [newItem, ...mediaList];
    setMediaList(updated);
    localStorage.setItem('core_of_man_shared_media', JSON.stringify(updated));
    setShowAddMediaModal(false);
    setNewMediaTitle('');
    setNewMediaDescription('');
  };

  const openMasterRoll = (label: string, bonus = 0) => {
    setDiceRollInfo({ label, bonus });
    setShowDiceModal(true);
  };

  const filteredMedia = mediaList.filter((m) => {
    if (mediaTab === 'public') return !m.isSecret;
    if (mediaTab === 'secret') return m.isSecret;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-stone-100 p-4 sm:p-8 font-sans selection:bg-purple-500 selection:text-black">
      
      {/* Top Banner de Comando da Mestre */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="relative rounded-3xl border-2 border-purple-500/40 bg-gradient-to-r from-stone-950 via-[#130d1d] to-stone-950 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-purple-400 bg-purple-950/80 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center text-3xl">
                👑
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-purple-200 tracking-wide">
                    Trono da Mestre • {currentUser?.displayName || 'Augusta'}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-purple-900 text-purple-200 border border-purple-400/40 shadow">
                    Sessão Ativa
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Gerenciamento tático de personagens, revelação de mapas em tempo real e testes rápidos.
                </p>
              </div>
            </div>

            {/* Ações da Mestre */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowGrimoireModal(true)}
                className="px-4 py-2.5 rounded-xl border border-purple-400 bg-gradient-to-r from-purple-900 to-indigo-950 hover:from-purple-850 hover:to-indigo-900 text-purple-100 font-serif font-bold text-xs tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                title="Abrir o Livro Secreto da Mestre com as 4 Armadas Piratas e Cidades Invisíveis"
              >
                <span>📖</span> Grimório da Mestre (Segredos)
              </button>

              <button
                onClick={() => openMasterRoll('Teste de Vontade do Vácuo', 0)}
                className="px-4 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 font-serif font-bold text-xs tracking-wider transition-all flex items-center gap-2 shadow"
              >
                <span>🎲</span> Rolar D20
              </button>

              <button
                onClick={() => setShowAddMediaModal(true)}
                className="px-4 py-2.5 rounded-xl border border-amber-500/50 bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 font-serif font-bold text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <span>🗺️</span> Revelar Novo Recurso
              </button>

              <button
                onClick={onBackToHangar}
                className="px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-300 text-xs font-serif tracking-wider transition-all"
              >
                ⚙️ Hangar
              </button>
            </div>

          </div>
        </div>

        {/* SEÇÃO 1: MESA ATIVA DE JOGADORES (Sem Roda, Visão Tática Clara) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-serif font-bold text-purple-200 flex items-center gap-2">
                <span>👥</span> Navegantes Presentes na Sessão ({sessionCharacters.length})
              </h2>
              <span className="text-xs text-stone-400">
                (Controle quem está na mesa para aventuras solo ou em grupo)
              </span>
            </div>

            {/* Seletor para adicionar herói banqueta à sessão */}
            {benchedCharacters.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-serif">Banqueta:</span>
                {benchedCharacters.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => addToSession(b.id)}
                    className="px-3 py-1 rounded-lg border border-amber-600/40 bg-stone-900 hover:bg-amber-950 text-amber-200 text-xs font-serif flex items-center gap-1 transition-all"
                    title={`Puxar ${b.name} para a sessão`}
                  >
                    <span>➕</span> {b.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {sessionCharacters.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-stone-800 bg-stone-950/30 text-stone-500 text-sm font-serif">
              Nenhum personagem adicionado à sessão ativa. Adicione navegantes usando os botões da banqueta acima.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionCharacters.map((char) => (
                <div
                  key={char.id}
                  className="relative rounded-2xl border-2 border-purple-500/30 bg-[#0e121a] hover:border-purple-400/60 transition-all p-5 shadow-xl flex flex-col justify-between space-y-4"
                >
                  {/* Top: Foto, Nome do Herói + Nome Real do Jogador */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl border border-purple-400/50 overflow-hidden bg-stone-900 flex-shrink-0 shadow">
                        <img src={char.avatarUrl || './art/journey.webp'} alt={char.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-amber-100 text-base leading-tight">
                          {char.name}
                        </h3>
                        <p className="text-xs text-purple-300 font-serif font-semibold">
                          Jogador: <span className="text-stone-200">{char.playerName || 'Sérgio'}</span>
                        </p>
                        <span className="inline-block mt-0.5 text-[10px] text-stone-400">
                          {char.lineage} • {char.title}
                        </span>
                      </div>
                    </div>

                    {/* Botão de Remover da Sessão Atual */}
                    <button
                      onClick={() => removeFromSession(char.id)}
                      className="w-7 h-7 rounded-lg border border-red-500/30 bg-red-950/40 hover:bg-red-900/60 text-red-300 flex items-center justify-center text-xs transition-colors"
                      title="Retirar da sessão atual (não deleta o personagem)"
                    >
                      ➖
                    </button>
                  </div>

                  {/* Barras de Status Vitais em Tempo Real */}
                  <div className="space-y-2 pt-2 border-t border-stone-800/80">
                    <div>
                      <div className="flex justify-between text-[11px] font-serif mb-0.5">
                        <span className="text-red-300">Pontos de Vida (PV)</span>
                        <span className="text-red-200 font-bold">{char.pv.current} / {char.pv.max}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-900 border border-red-900/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all"
                          style={{ width: `${Math.min(100, (char.pv.current / char.pv.max) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-serif mb-0.5">
                        <span className="text-blue-300">Psique / Sanidade</span>
                        <span className="text-blue-200 font-bold">{char.psique.current} / {char.psique.max}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-900 border border-blue-900/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all"
                          style={{ width: `${Math.min(100, (char.psique.current / char.psique.max) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-serif mb-0.5">
                        <span className="text-amber-300">Essências de Éter</span>
                        <span className="text-amber-200 font-bold">{char.essencias.current} / {char.essencias.max}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-900 border border-amber-900/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all"
                          style={{ width: `${Math.min(100, (char.essencias.current / char.essencias.max) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ações da Mestre sobre a Ficha */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onOpenSheet(char)}
                      className="flex-1 py-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs font-serif font-bold transition-all text-center"
                    >
                      📜 Inspecionar Ficha
                    </button>
                    <button
                      onClick={() => openMasterRoll(`Teste Oculto (${char.name})`, 2)}
                      className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-serif transition-colors"
                      title="Rolar teste secreto da Mestre para este jogador"
                    >
                      🎲 Teste
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEÇÃO 2: BIBLIOTECA DE MÍDIA & MAPAS (Público vs Segredo da Mestre) */}
        <div className="space-y-4 pt-4 border-t border-purple-900/30">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
                <span>🗺️</span> Biblioteca de Mapas, Criaturas & Revelações
              </h2>
              <p className="text-xs text-stone-400">
                Itens marcados como secretos são visíveis apenas para você. Clique em "Revelar" para enviar para a tela dos jogadores.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => setMediaTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                  mediaTab === 'all' ? 'bg-purple-900/60 text-purple-200 font-bold' : 'text-stone-400'
                }`}
              >
                Todos ({mediaList.length})
              </button>
              <button
                onClick={() => setMediaTab('public')}
                className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                  mediaTab === 'public' ? 'bg-emerald-900/60 text-emerald-200 font-bold' : 'text-stone-400'
                }`}
              >
                👁️ Revelados ({mediaList.filter((m) => !m.isSecret).length})
              </button>
              <button
                onClick={() => setMediaTab('secret')}
                className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                  mediaTab === 'secret' ? 'bg-red-900/60 text-red-200 font-bold' : 'text-stone-400'
                }`}
              >
                🔒 Segredos ({mediaList.filter((m) => m.isSecret).length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-2xl border-2 overflow-hidden flex flex-col justify-between transition-all ${
                  item.isSecret
                    ? 'border-red-900/50 bg-[#140b0f]'
                    : 'border-emerald-600/40 bg-[#0b1411]'
                }`}
              >
                {/* Imagem do Card */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-serif font-bold uppercase tracking-wider backdrop-blur-md bg-stone-950/80 border border-stone-700">
                    {item.category}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-stone-100 text-sm leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Botão de Revelação */}
                <div className="p-3 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between">
                  <span className={`text-[11px] font-serif font-bold ${
                    item.isSecret ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {item.isSecret ? '🔒 Segredo da Mestre' : '👁️ Visível aos Jogadores'}
                  </span>

                  <button
                    onClick={() => handleToggleSecret(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
                      item.isSecret
                        ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/50'
                        : 'bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/50'
                    }`}
                  >
                    {item.isSecret ? 'Revelar' : 'Ocultar'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* MODAL: ADICIONAR NOVO MAPA / RECURSO */}
      {showAddMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e121a] border-2 border-purple-500/60 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden">
            <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/50 to-stone-900 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-purple-200">
                ✨ Adicionar Novo Mapa ou Documento
              </h3>
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="w-8 h-8 rounded-full border border-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-serif text-purple-300 uppercase mb-1">
                  Título do Recurso *
                </label>
                <input
                  type="text"
                  required
                  value={newMediaTitle}
                  onChange={(e) => setNewMediaTitle(e.target.value)}
                  placeholder="ex: Mapa das Ilhas de Quartzo"
                  className="w-full px-4 py-2 bg-stone-900 border border-purple-600/40 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-purple-300 uppercase mb-1">
                  Categoria
                </label>
                <select
                  value={newMediaCategory}
                  onChange={(e) => setNewMediaCategory(e.target.value as any)}
                  className="w-full px-4 py-2 bg-stone-900 border border-purple-600/40 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-purple-400"
                >
                  <option value="mapa">🗺️ Mapa Náutico</option>
                  <option value="criatura">🐉 Criatura / Besta</option>
                  <option value="cidade">🏰 Cidade / Posto Avançado</option>
                  <option value="artefato">💎 Artefato do Cerne</option>
                  <option value="handout">📜 Documento / Pista</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif text-purple-300 uppercase mb-1">
                  URL da Imagem ou Caminho
                </label>
                <input
                  type="text"
                  value={newMediaImageUrl}
                  onChange={(e) => setNewMediaImageUrl(e.target.value)}
                  placeholder="./art/parchment-center.webp"
                  className="w-full px-4 py-2 bg-stone-900 border border-purple-600/40 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-purple-300 uppercase mb-1">
                  Descrição ou Pistas
                </label>
                <textarea
                  rows={3}
                  value={newMediaDescription}
                  onChange={(e) => setNewMediaDescription(e.target.value)}
                  placeholder="Informações que o grupo saberá ao examinar este mapa..."
                  className="w-full px-4 py-2 bg-stone-900 border border-purple-600/40 rounded-lg text-stone-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800">
                <input
                  type="checkbox"
                  id="secretCheckbox"
                  checked={newMediaIsSecret}
                  onChange={(e) => setNewMediaIsSecret(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded bg-stone-950 border-stone-700"
                />
                <label htmlFor="secretCheckbox" className="text-xs font-serif text-stone-300 cursor-pointer">
                  Manter oculto inicialmente como <strong>Segredo da Mestre</strong> (revelar mais tarde)
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMediaModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-serif"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-purple-100 font-serif font-bold text-xs uppercase tracking-wider"
                >
                  Salvar na Biblioteca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROLADOR D20 DA MESTRE */}
      <DiceRollerModal
        isOpen={showDiceModal}
        onClose={() => setShowDiceModal(false)}
        label={diceRollInfo.label}
        bonus={diceRollInfo.bonus}
      />

      {/* GRIMÓRIO SECRETO DA MESTRE */}
      <SecretGrimoireModal
        isOpen={showGrimoireModal}
        onClose={() => setShowGrimoireModal(false)}
        onRollDice={(label, bonus) => openMasterRoll(label, bonus)}
      />

    </div>
  );
};
