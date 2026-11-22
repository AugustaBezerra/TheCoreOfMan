import React, { useState, useEffect } from 'react';
import { Character, SharedMediaItem, UserProfile } from '../../types/character';
import { 
  subscribePlayerCharacters, 
  getLocalSharedMedia, 
  createSharedMediaItem,
  updateSharedMediaItem,
  deleteSharedMediaItem,
  toggleMediaSecretStatus,
  getOrCreateLibraryCharacter,
  saveCharacter
} from '../../services/characterService';
import { DiceRollerModal } from '../dice/DiceRollerModal';
import { SecretGrimoireModal } from './SecretGrimoireModal';
import { FirecastLibraryPanel } from '../firecast/FirecastLibraryPanel';
import {
  Crown,
  BookOpen,
  Dices,
  Plus,
  ArrowLeft,
  Users,
  UserMinus,
  FileText,
  Compass,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  X,
  Heart,
  Sparkles,
  Layers,
  Check,
  FolderTree,
  Minus,
  AlertCircle
} from 'lucide-react';

interface GameMasterDashboardProps {
  currentUser: UserProfile | null;
  onOpenSheet: (char: Character) => void;
  onBackToHangar: () => void;
}

const MEDIA_PRESETS = [
  { label: 'Carta Náutica', url: './art/parchment-center.webp', icon: '🗺️' },
  { label: 'Cidadela Flutuante', url: './art/banner-top.webp', icon: '🏰' },
  { label: 'Arquivo Astral', url: './art/library.webp', icon: '📖' },
  { label: 'Pergaminho de Pistas', url: './art/page-bg.webp', icon: '📜' },
  { label: 'Astrolábio Celestial', url: './art/radial-compass.webp', icon: '🧭' },
  { label: 'Besta do Vácuo', url: './art/journey.webp', icon: '🐉' },
  { label: 'Cerne / Emblema', url: './art/emblem.webp', icon: '💎' },
  { label: 'Grimório Selado', url: './art/book-closed.webp', icon: '📕' },
];

export const GameMasterDashboard: React.FC<GameMasterDashboardProps> = ({
  currentUser,
  onOpenSheet,
  onBackToHangar,
}) => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [sessionCharacterIds, setSessionCharacterIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('core_of_man_active_session');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeMainTab, setActiveMainTab] = useState<'cards' | 'firecast'>('cards');
  const [mediaList, setMediaList] = useState<SharedMediaItem[]>([]);
  const [mediaTab, setMediaTab] = useState<'all' | 'public' | 'secret'>('all');
  
  // Modais de Dados e Grimório
  const [showDiceModal, setShowDiceModal] = useState(false);
  const [showGrimoireModal, setShowGrimoireModal] = useState(false);
  const [diceRollInfo, setDiceRollInfo] = useState<{ label: string; bonus: number }>({
    label: 'Rolagem da Mestre',
    bonus: 0,
  });

  // Modal: Inserir Novo Recurso
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<SharedMediaItem['category']>('mapa');
  const [newImageUrl, setNewImageUrl] = useState('./art/parchment-center.webp');
  const [newIsSecret, setNewIsSecret] = useState(false);

  // Modal: Editar Recurso Existente
  const [editingItem, setEditingItem] = useState<SharedMediaItem | null>(null);

  // Modal: Visualizar Recurso Completo
  const [viewingItem, setViewingItem] = useState<SharedMediaItem | null>(null);

  useEffect(() => {
    const unsub = subscribePlayerCharacters('all', (chars) => {
      setAllCharacters(chars);
      // Auto-incluir personagens vivos caso a sessão esteja vazia
      setSessionCharacterIds((prev) => {
        if (prev.length === 0 && chars.length > 0) {
          const alive = chars.filter((c) => c.status === 'alive').map((c) => c.id);
          localStorage.setItem('core_of_man_active_session', JSON.stringify(alive));
          return alive;
        }
        return prev;
      });
    });

    setMediaList(getLocalSharedMedia());

    const handleMediaUpdated = () => {
      setMediaList(getLocalSharedMedia());
    };
    window.addEventListener('core_shared_media_updated', handleMediaUpdated);

    return () => {
      if (typeof unsub === 'function') unsub();
      window.removeEventListener('core_shared_media_updated', handleMediaUpdated);
    };
  }, []);

  const sessionCharacters = allCharacters.filter((c) => sessionCharacterIds.includes(c.id));
  const benchedCharacters = allCharacters.filter((c) => !sessionCharacterIds.includes(c.id) && c.status === 'alive');

  const updateSessionStorage = (newIds: string[]) => {
    setSessionCharacterIds(newIds);
    localStorage.setItem('core_of_man_active_session', JSON.stringify(newIds));
    window.dispatchEvent(new CustomEvent('core_session_participants_changed', { detail: newIds }));
  };

  const removeFromSession = (charId: string) => {
    updateSessionStorage(sessionCharacterIds.filter((id) => id !== charId));
  };

  const addToSession = (charId: string) => {
    if (!sessionCharacterIds.includes(charId)) {
      updateSessionStorage([...sessionCharacterIds, charId]);
    }
  };

  const handleQuickPv = (charId: string, delta: number) => {
    const target = allCharacters.find((c) => c.id === charId);
    if (!target) return;
    const currentPv = target.pv.current;
    const maxPv = target.pv.max;
    const nextPv = Math.max(0, Math.min(maxPv, currentPv + delta));
    const updated = {
      ...target,
      pv: { ...target.pv, current: nextPv }
    };
    saveCharacter(updated);
  };

  const handleQuickEssencias = (charId: string, delta: number) => {
    const target = allCharacters.find((c) => c.id === charId);
    if (!target) return;
    const currentEss = target.essencias?.current ?? 4;
    const maxEss = target.essencias?.max ?? 6;
    const nextEss = Math.max(0, Math.min(maxEss, currentEss + delta));
    const updated = {
      ...target,
      essencias: { current: nextEss, max: maxEss }
    };
    saveCharacter(updated);
  };

  const handleToggleSecret = (mediaId: string) => {
    const updated = toggleMediaSecretStatus(mediaId);
    setMediaList([...updated]);
    if (viewingItem && viewingItem.id === mediaId) {
      setViewingItem({ ...viewingItem, isSecret: !viewingItem.isSecret });
    }
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createSharedMediaItem({
      title: newTitle.trim(),
      description: newDescription.trim(),
      content: newContent.trim(),
      imageUrl: newImageUrl || './art/parchment-center.webp',
      category: newCategory,
      isSecret: newIsSecret,
    });

    setMediaList(getLocalSharedMedia());
    setShowAddMediaModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewContent('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;

    updateSharedMediaItem(editingItem);
    setMediaList(getLocalSharedMedia());
    setEditingItem(null);
    if (viewingItem && viewingItem.id === editingItem.id) {
      setViewingItem(editingItem);
    }
  };

  const handleDelete = (item: SharedMediaItem) => {
    const confirmed = window.confirm(`Deseja realmente excluir o recurso "${item.title}"?`);
    if (confirmed) {
      deleteSharedMediaItem(item.id);
      setMediaList(getLocalSharedMedia());
      if (editingItem?.id === item.id) setEditingItem(null);
      if (viewingItem?.id === item.id) setViewingItem(null);
    }
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
    <div className="min-h-screen bg-[#06080e] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Painel Nobre de Comando da Mestre (Elden Ring / Skyrim Screen) */}
        <header className="rounded-2xl border border-slate-800/90 bg-[#0c1019] p-6 sm:p-7 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-center justify-center text-amber-300 shadow-sm flex-shrink-0">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 tracking-wide">
                    Trono da Mestre <span className="text-amber-300/80 font-normal">| {currentUser?.displayName || 'Augusta'}</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-widest bg-slate-900 text-amber-300/90 border border-amber-500/30 shadow-sm">
                    Sessão Ativa
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                  Gestão tática da mesa, controle de fardos e revelação diegética de mapas e segredos.
                </p>
              </div>
            </div>

            {/* Ações Rápidas no Topo (Sem poluição de IA) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowGrimoireModal(true)}
                className="px-3.5 py-2 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-200 text-xs font-sans font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                title="Abrir o Grimório Secreto da Mestre"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Grimório Secreto</span>
              </button>

              <button
                type="button"
                onClick={() => openMasterRoll('Teste de Vontade do Vácuo', 0)}
                className="px-3.5 py-2 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-200 text-xs font-sans font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Dices className="w-4 h-4 text-amber-400" />
                <span>Rolar D20</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNewTitle('');
                  setNewDescription('');
                  setNewContent('');
                  setNewImageUrl('./art/parchment-center.webp');
                  setNewCategory('mapa');
                  setNewIsSecret(false);
                  setShowAddMediaModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-medium text-xs font-sans flex items-center gap-2 shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Arquivo</span>
              </button>

              <button
                type="button"
                onClick={onBackToHangar}
                className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Hangar</span>
              </button>
            </div>

          </div>
        </header>

        {/* Divisor Rúnico Estilo Skyrim */}
        <div className="flex items-center justify-center my-6 space-x-4 opacity-40">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* SEÇÃO 1: MESA ATIVA DE JOGADORES (BG3 Tactical Control) */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 flex items-center gap-2.5">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Navegantes na Mesa</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-900 text-amber-300/90 border border-slate-800">
                {sessionCharacters.length} {sessionCharacters.length === 1 ? 'ativo' : 'ativos'}
              </span>
            </div>

            {/* Banco de Heróis na Reserva */}
            {benchedCharacters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider">
                  Puxar da Reserva:
                </span>
                {benchedCharacters.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => addToSession(b.id)}
                    className="px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/80 hover:border-amber-500/40 hover:text-amber-200 text-slate-300 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={`Puxar ${b.name} para a mesa`}
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>{b.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {sessionCharacters.length === 0 ? (
            <div className="p-10 text-center rounded-xl border border-dashed border-slate-800 bg-[#0c1019]/40 text-slate-400 text-sm space-y-3">
              <p>Nenhum personagem adicionado à sessão ativa no momento.</p>
              {allCharacters.length > 0 && (
                <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                  {allCharacters.filter((c) => c.status !== 'fallen').map((char) => (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => addToSession(char.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-amber-500/40 text-slate-200 text-xs font-medium cursor-pointer transition-colors"
                    >
                      + Incluir {char.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sessionCharacters.map((char) => (
                <div
                  key={char.id}
                  className="rounded-xl border border-slate-800/90 bg-[#0c1019] hover:border-amber-500/30 transition-all p-4 shadow-sm flex flex-col justify-between space-y-4"
                >
                  {/* Foto, Nome do Herói + Jogador */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative w-16 h-16 min-w-16 min-h-16 rounded-xl border border-amber-500/30 overflow-hidden bg-slate-950 flex-shrink-0 shadow-sm">
                        <img 
                          src={char.avatarUrl || './art/journey.webp'} 
                          alt={char.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif font-bold text-slate-100 text-base leading-tight truncate">
                          {char.name}
                        </h3>
                        <p className="text-sm text-slate-300 mt-0.5 truncate">
                          {char.lineage} • {char.title}
                        </p>
                        <span className="inline-block text-xs text-amber-300 font-mono mt-0.5 truncate max-w-full">
                          Jogador: {char.playerName || 'Navegante'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromSession(char.id)}
                      className="w-7 h-7 rounded-md border border-slate-800 bg-slate-950/60 hover:bg-rose-950/30 hover:border-rose-900/50 hover:text-rose-300 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="Retirar da sessão atual"
                    >
                      <UserMinus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Barras de Status Vitais com Controle Direto da Mestre */}
                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    {/* Pontos de Vida (PV) */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-sans mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-400 font-medium flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-rose-500" />
                            PV
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleQuickPv(char.id, -1)}
                              className="w-5 h-5 rounded bg-slate-900 hover:bg-rose-950 text-slate-200 hover:text-rose-300 border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                              title="Dano -1 PV"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickPv(char.id, 1)}
                              className="w-5 h-5 rounded bg-slate-900 hover:bg-emerald-950 text-slate-200 hover:text-emerald-300 border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                              title="Cura +1 PV"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <span className="text-slate-100 font-mono font-medium">{char.pv.current} / {char.pv.max}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-800 to-rose-600 transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, (char.pv.current / char.pv.max) * 100))}%` }}
                        />
                      </div>
                    </div>

                    {/* Essências de Éter */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-sans mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sky-400 font-medium flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                            Éter
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleQuickEssencias(char.id, -1)}
                              className="w-5 h-5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-sky-300 border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                              title="-1 Essência"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickEssencias(char.id, 1)}
                              className="w-5 h-5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-sky-300 border border-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                              title="+1 Essência"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <span className="text-slate-100 font-mono font-medium">
                          {char.essencias?.current ?? 4} / {char.essencias?.max ?? 6}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-700 to-amber-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, ((char.essencias?.current ?? 4) / (char.essencias?.max ?? 6)) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ações da Ficha */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSheet(char)}
                      className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-slate-200 text-xs font-sans font-medium transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspecionar Ficha</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openMasterRoll(`Teste da Mestre (${char.name})`, 2)}
                      className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 text-xs font-sans transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      title="Rolar teste secreto da Mestre para este personagem"
                    >
                      <Dices className="w-3.5 h-3.5 text-slate-400" />
                      <span>Teste</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Divisor Rúnico Estilo Skyrim */}
        <div className="flex items-center justify-center my-6 space-x-4 opacity-40">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* SEÇÃO 2: RECURSOS, ARQUIVOS & MAPAS (ESTILO BG3 ABAS) */}
        <section className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Biblioteca de Arquivos, Mapas & Segredos</span>
                </h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-900 text-amber-300/90 border border-slate-800">
                  {mediaList.length} itens
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 font-sans">
                Controle arquivos compartilhados com os jogadores, mapas em tempo real e segredos ocultos da trama.
              </p>
            </div>

            {/* Alternador de Abas Estilo Baldur's Gate 3 (Sublinhado sem botões pílula neon) */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveMainTab('cards')}
                className={`relative pb-1.5 text-sm font-sans transition-colors cursor-pointer ${
                  activeMainTab === 'cards' 
                    ? 'font-semibold text-amber-200 border-b-2 border-amber-500' 
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                Mídias & Mapas ({mediaList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('firecast')}
                className={`relative pb-1.5 text-sm font-sans transition-colors cursor-pointer ${
                  activeMainTab === 'firecast' 
                    ? 'font-semibold text-amber-200 border-b-2 border-amber-500' 
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                Árvore Firecast (Split-View)
              </button>
            </div>
          </div>

          {/* ABA 1: VISUALIZAÇÃO EM CARDS */}
          {activeMainTab === 'cards' && (
            <div className="space-y-5">
              
              {/* Filtros Rápidos Monocromáticos */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setMediaTab('all')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      mediaTab === 'all' 
                        ? 'bg-amber-600/90 text-slate-950 font-medium shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Todos ({mediaList.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTab('public')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      mediaTab === 'public' 
                        ? 'bg-amber-600/90 text-slate-950 font-medium shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Revelados ({mediaList.filter((m) => !m.isSecret).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTab('secret')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      mediaTab === 'secret' 
                        ? 'bg-amber-600/90 text-slate-950 font-medium shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Segredos ({mediaList.filter((m) => m.isSecret).length})
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-sans">
                  Clique no card para inspecionar ou no lápis para editar.
                </span>
              </div>

              {filteredMedia.length === 0 ? (
                <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#0c1019]/40 text-slate-400 text-sm font-sans space-y-2">
                  <p>Nenhum recurso encontrado nesta categoria.</p>
                  <p className="text-xs text-slate-500">
                    Use o botão "Novo Arquivo" acima para forjar um mapa, criatura ou pista secreta.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-xl border border-slate-800/90 bg-[#0c1019] hover:border-amber-500/30 overflow-hidden flex flex-col justify-between transition-all shadow-sm"
                    >
                      {/* Imagem do Card com Clique para Inspecionar */}
                      <div 
                        onClick={() => setViewingItem(item)}
                        className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider backdrop-blur-md bg-slate-950/80 border border-slate-800 text-slate-300">
                          {item.category}
                        </div>

                        {/* Indicador de Cadeado se Secreto */}
                        {item.isSecret ? (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-800/60 text-[10px] font-sans flex items-center gap-1 shadow-sm">
                            <Lock className="w-3 h-3" />
                            <span>Segredo</span>
                          </div>
                        ) : (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-emerald-400 border border-emerald-900/40 text-[10px] font-sans flex items-center gap-1 shadow-sm">
                            <Eye className="w-3 h-3" />
                            <span>Revelado</span>
                          </div>
                        )}
                      </div>

                      {/* Conteúdo com Clique para Abrir */}
                      <div 
                        onClick={() => setViewingItem(item)}
                        className="p-3.5 space-y-1.5 cursor-pointer flex-1"
                      >
                        <h4 className="font-serif font-bold text-slate-100 text-sm leading-snug group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {item.description || 'Sem descrição resumida.'}
                        </p>
                        {item.content && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/80 font-mono mt-1">
                            <FileText className="w-3 h-3" />
                            Contém notas estendidas
                          </span>
                        )}
                      </div>

                      {/* Barra de Ações Rápidas: Editar, Revelar/Ocultar e Excluir */}
                      <div className="p-2.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* Botão Editar */}
                          <button
                            type="button"
                            onClick={() => setEditingItem({ ...item })}
                            className="px-2.5 py-1 rounded-md border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors flex items-center gap-1 cursor-pointer"
                            title="Editar este arquivo"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Editar</span>
                          </button>

                          {/* Botão Excluir */}
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="p-1 rounded-md border border-slate-800 hover:border-rose-900/60 hover:bg-rose-950/30 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Excluir este arquivo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Botão Revelar / Ocultar */}
                        <button
                          type="button"
                          onClick={() => handleToggleSecret(item.id)}
                          className={`px-2.5 py-1 rounded-md text-xs font-sans transition-colors cursor-pointer flex items-center gap-1 ${
                            item.isSecret
                              ? 'bg-slate-900 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700/60'
                              : 'bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60'
                          }`}
                          title={item.isSecret ? 'Tornar visível para os jogadores' : 'Ocultar dos jogadores'}
                        >
                          {item.isSecret ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Revelar</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                              <span>Ocultar</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA 2: VISUALIZAÇÃO EM ÁRVORE FIRECAST COM SPLIT-VIEW */}
          {activeMainTab === 'firecast' && (
            <div className="min-h-[750px] rounded-2xl overflow-hidden border border-slate-800 bg-[#06080e] shadow-xl">
              <FirecastLibraryPanel
                currentUser={currentUser}
                onOpenCharacterSheet={async (nameOrId) => {
                  let found = allCharacters.find(
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

        </section>

      </div>

      {/* MODAL: INSERIR NOVO ARQUIVO / MAPA */}
      {showAddMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0c1019] border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Inserir Novo Arquivo na Mesa</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMediaModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Título e Categoria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Título do Arquivo *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="ex: Carta Náutica do Vácuo"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500/60 cursor-pointer"
                  >
                    <option value="mapa">Mapa Náutico</option>
                    <option value="criatura">Criatura / Besta</option>
                    <option value="cidade">Cidade / Posto Avançado</option>
                    <option value="cenario">Cenário / Região</option>
                    <option value="artefato">Artefato do Cerne</option>
                    <option value="handout">Documento / Pista Secreta</option>
                  </select>
                </div>
              </div>

              {/* Seletor Rápido de Ilustrações */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Escolha uma Ilustração (ou insira uma URL)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MEDIA_PRESETS.map((p) => {
                    const isSelected = newImageUrl === p.url;
                    return (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => setNewImageUrl(p.url)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'border-amber-500/80 bg-amber-950/30 text-amber-200'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-base">{p.icon}</span>
                        <span className="text-xs font-sans truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="./art/parchment-center.webp ou https://..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-amber-500/60 font-mono"
                  />
                </div>
              </div>

              {/* Resumo / Descrição Curta */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Resumo / Descrição Curta
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="ex: Rotas de navegação seguras entre os arquipélagos do norte."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              {/* Texto Completo / Pistas / Lore */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Conteúdo Completo, Notas & Lore (Opcional)
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escreva aqui a descrição detalhada, anotações de mestre ou pistas da trama..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm leading-relaxed placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-sans"
                />
              </div>

              {/* Checkbox: Segredo vs Visível */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <input
                  type="checkbox"
                  id="newSecretCheckbox"
                  checked={newIsSecret}
                  onChange={(e) => setNewIsSecret(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 bg-slate-900 cursor-pointer accent-amber-500 flex-shrink-0"
                />
                <label htmlFor="newSecretCheckbox" className="text-slate-200 cursor-pointer select-none">
                  <span className="font-sans font-medium text-xs text-slate-100 block">
                    {newIsSecret ? 'Segredo da Mestre (Oculto aos Jogadores)' : 'Visível aos Jogadores'}
                  </span>
                  <span className="text-slate-400 text-xs block mt-0.5">
                    {newIsSecret
                      ? 'Permanecerá secreto até você clicar em "Revelar" na lista.'
                      : 'Ficará visível imediatamente para os navegantes que acessarem o Astrolábio ou a Biblioteca.'}
                  </span>
                </label>
              </div>

              {/* Botões do Formulário */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMediaModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-sans transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-5 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-medium text-xs font-sans shadow-md hover:brightness-110 active:scale-[0.98] disabled:opacity-40 transition-all cursor-pointer"
                >
                  Salvar na Biblioteca
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR ARQUIVO EXISTENTE */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0c1019] border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Editar Arquivo: {editingItem.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Título do Arquivo *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500/60 cursor-pointer"
                  >
                    <option value="mapa">Mapa Náutico</option>
                    <option value="criatura">Criatura / Besta</option>
                    <option value="cidade">Cidade / Posto Avançado</option>
                    <option value="cenario">Cenário / Região</option>
                    <option value="artefato">Artefato do Cerne</option>
                    <option value="handout">Documento / Pista Secreta</option>
                  </select>
                </div>
              </div>

              {/* Seletor de Presets para Imagem */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Alterar Ilustração
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MEDIA_PRESETS.map((p) => {
                    const isSelected = editingItem.imageUrl === p.url;
                    return (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, imageUrl: p.url })}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'border-amber-500/80 bg-amber-950/30 text-amber-200'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-base">{p.icon}</span>
                        <span className="text-xs font-sans truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <input
                    type="text"
                    value={editingItem.imageUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    placeholder="URL ou caminho da imagem..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-amber-500/60 font-mono"
                  />
                </div>
              </div>

              {/* Descrição Curta */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Resumo / Descrição Curta
                </label>
                <input
                  type="text"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-500/60"
                />
              </div>

              {/* Conteúdo Completo */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Conteúdo Completo, Notas & Segredos
                </label>
                <textarea
                  rows={4}
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  placeholder="Escreva aqui a descrição detalhada, lore, pistas ou mistérios deste arquivo..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm leading-relaxed focus:outline-none focus:border-amber-500/60 font-sans"
                />
              </div>

              {/* Visibilidade */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <input
                  type="checkbox"
                  id="editSecretCheckbox"
                  checked={editingItem.isSecret}
                  onChange={(e) => setEditingItem({ ...editingItem, isSecret: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 bg-slate-900 cursor-pointer accent-amber-500 flex-shrink-0"
                />
                <label htmlFor="editSecretCheckbox" className="text-slate-200 cursor-pointer select-none">
                  <span className="font-sans font-medium text-xs text-slate-100 block">
                    {editingItem.isSecret ? 'Segredo da Mestre (Oculto aos Jogadores)' : 'Visível aos Jogadores'}
                  </span>
                </label>
              </div>

              {/* Ações */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleDelete(editingItem)}
                  className="px-3.5 py-2 rounded-lg border border-rose-900/40 bg-rose-950/30 hover:bg-rose-950 text-rose-300 text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir Arquivo</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-sans transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-medium text-xs font-sans shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: VISUALIZAR ARQUIVO COMPLETO */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0c1019] border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-900 text-amber-300 border border-slate-800">
                  {viewingItem.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-slate-100">
                  {viewingItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto font-sans">
              {/* Imagem em tamanho de destaque */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-sm">
                <img src={viewingItem.imageUrl} alt={viewingItem.title} className="w-full h-full object-cover" />
                {viewingItem.isSecret && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-rose-950/90 text-rose-300 border border-rose-800/60 text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Segredo da Mestre</span>
                  </div>
                )}
              </div>

              {/* Resumo */}
              {viewingItem.description && (
                <div className="p-4 rounded-xl border border-amber-900/20 bg-slate-950/60 text-slate-200 text-sm leading-relaxed italic">
                  "{viewingItem.description}"
                </div>
              )}

              {/* Texto Completo / Lore */}
              {viewingItem.content ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Anotações & Lore Estendida
                  </h4>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                    {viewingItem.content}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-sans">
                  Nenhum texto estendido adicionado a este arquivo.
                </p>
              )}
            </div>

            {/* Ações do Rodapé do Modal */}
            <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleToggleSecret(viewingItem.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewingItem.isSecret
                    ? 'bg-slate-900 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700/60'
                    : 'bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60'
                }`}
              >
                {viewingItem.isSecret ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Revelar para Jogadores</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                    <span>Ocultar dos Jogadores</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = { ...viewingItem };
                    setViewingItem(null);
                    setEditingItem(toEdit);
                  }}
                  className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Editar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewingItem(null)}
                  className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

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
