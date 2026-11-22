import React, { useState, useEffect, useRef } from 'react';
import { FirecastItem, FirecastItemType } from '../../types/firecast';
import { 
  getLibraryItems, 
  createLibraryItem, 
  deleteLibraryItem, 
  toggleItemVisibility,
  updateLibraryItem,
  moveLibraryItem
} from '../../services/firecastLibraryService';
import { NewItemModal } from './NewItemModal';
import { ItemContextMenu } from './ItemContextMenu';
import { MoveItemModal } from './MoveItemModal';
import { getOrCreateLibraryCharacter, getLocalCharacters } from '../../services/characterService';
import { UserProfile } from '../../types/character';
import { 
  Search, 
  Plus, 
  Folder, 
  FolderOpen, 
  FileText, 
  Users, 
  Grid, 
  Lock, 
  Eye, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Bold, 
  Italic, 
  Underline, 
  Save, 
  Check, 
  X, 
  Image as ImageIcon, 
  Quote, 
  ChevronRight, 
  ChevronDown, 
  Scroll, 
  BookOpen,
  Upload,
  FolderInput,
  FolderPlus
} from 'lucide-react';

interface FirecastLibraryPanelProps {
  currentUser: UserProfile | null;
  onOpenCharacterSheet?: (charNameOrId: string) => void;
  onOpenGridMap?: (gridItem: FirecastItem) => void;
  onOpenDocument?: (docItem: FirecastItem) => void;
}

const COLOR_PALETTE = [
  { name: 'Ciano Éter', hex: '#38bdf8' },
  { name: 'Coral Laranja', hex: '#fb923c' },
  { name: 'Dourado Cerne', hex: '#f59e0b' },
  { name: 'Branco Puro', hex: '#ffffff' },
  { name: 'Esmeralda', hex: '#34d399' },
  { name: 'Púrpura Místico', hex: '#c084fc' },
  { name: 'Carmesim', hex: '#f87171' },
  { name: 'Prata Éter', hex: '#cbd5e1' },
];

const NPC_AVATAR_PRESETS = [
  { label: 'Navegante', url: './art/journey.webp' },
  { label: 'Emblema Real', url: './art/emblem.webp' },
  { label: 'Nobreza / Rainha', url: './art/banner-top.webp' },
  { label: 'Arquivo / Erudito', url: './art/library.webp' },
  { label: 'Místico / Astrolábio', url: './art/radial-compass.webp' },
  { label: 'Pergaminho Antigo', url: './art/page-bg.webp' },
];

const MAP_PRESETS = [
  { label: 'Carta Náutica', url: './art/parchment-center.webp' },
  { label: 'Cidadela Flutuante', url: './art/banner-top.webp' },
  { label: 'Arquivo Astral', url: './art/library.webp' },
  { label: 'Astrolábio Celestial', url: './art/radial-compass.webp' },
  { label: 'Besta do Vácuo', url: './art/journey.webp' },
  { label: 'Pergaminho de Pistas', url: './art/page-bg.webp' },
];

export const FirecastLibraryPanel: React.FC<FirecastLibraryPanelProps> = ({
  currentUser,
  onOpenCharacterSheet,
  onOpenGridMap,
  onOpenDocument,
}) => {
  const [items, setItems] = useState<FirecastItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    folder_npcs: true,
    folder_master_notes: true,
    folder_fichas: true,
    folder_core_01: true,
  });

  // Modal Novo Item
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeParentFolder, setActiveParentFolder] = useState<FirecastItem | null>(null);

  // Modal Mover Item
  const [movingItem, setMovingItem] = useState<FirecastItem | null>(null);

  // Menu de Contexto
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    item: FirecastItem;
  } | null>(null);

  // Abas abertas no painel central (Split View)
  const [openDocIds, setOpenDocIds] = useState<string[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Estado do documento ativo
  const [currentDocName, setCurrentDocName] = useState('');
  const [isDocVisible, setIsDocVisible] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textContent, setTextContent] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Estado da pasta ativa
  const [folderName, setFolderName] = useState('');
  const [folderIsVisible, setFolderIsVisible] = useState(true);
  const [folderSaveSuccess, setFolderSaveSuccess] = useState(false);

  // Estado do NPC ativo
  const [npcName, setNpcName] = useState('');
  const [npcTitle, setNpcTitle] = useState('');
  const [npcFaction, setNpcFaction] = useState('');
  const [npcAvatarUrl, setNpcAvatarUrl] = useState('./art/journey.webp');
  const [npcDescription, setNpcDescription] = useState('');
  const [npcSecretLore, setNpcSecretLore] = useState('');
  const [npcIsVisible, setNpcIsVisible] = useState(true);
  const [showNpcAvatarTray, setShowNpcAvatarTray] = useState(false);
  const [npcSaveSuccess, setNpcSaveSuccess] = useState(false);

  // Estado do Mapa/Grid ativo
  const [gridName, setGridName] = useState('');
  const [gridMapUrl, setGridMapUrl] = useState('./art/parchment-center.webp');
  const [gridNotes, setGridNotes] = useState('');
  const [gridIsVisible, setGridIsVisible] = useState(true);
  const [gridSaveSuccess, setGridSaveSuccess] = useState(false);
  const [showGridPresetTray, setShowGridPresetTray] = useState(false);

  const isGM = currentUser?.role === 'gm';

  const reload = () => {
    const list = getLibraryItems();
    setItems(list);
  };

  useEffect(() => {
    reload();
    const handleUpdate = () => reload();
    window.addEventListener('firecast_library_updated', handleUpdate);
    return () => window.removeEventListener('firecast_library_updated', handleUpdate);
  }, []);

  // Item ativo no centro
  const activeItem = items.find((i) => i.id === activeItemId) || null;

  // Carregar conteúdo quando o activeItem mudar
  useEffect(() => {
    if (!activeItem) return;

    if (activeItem.type === 'directory') {
      setFolderName(activeItem.name || '');
      setFolderIsVisible(activeItem.isVisibleToPlayers ?? true);
      setFolderSaveSuccess(false);
    } else if (activeItem.type === 'document') {
      setCurrentDocName(activeItem.name || '');
      setIsDocVisible(activeItem.isVisibleToPlayers ?? false);
      const raw = activeItem.documentContent || '';
      setTextContent(raw);
      if (editorRef.current) {
        if (raw.includes('<p>') || raw.includes('<div>') || raw.includes('<h')) {
          editorRef.current.innerHTML = raw;
        } else if (raw.trim()) {
          editorRef.current.innerHTML = raw
            .split('\n\n')
            .map((p) => `<p style="margin-bottom: 12px; font-size: 1.05em; line-height: 1.7;">${p.replace(/\n/g, '<br>')}</p>`)
            .join('');
        } else {
          editorRef.current.innerHTML = '<p style="color: #64748b; font-style: italic;">Clique aqui para começar a redigir o documento...</p>';
        }
      }
    } else if (activeItem.type === 'npc') {
      setNpcName(activeItem.name || '');
      setNpcTitle(activeItem.npcData?.title || '');
      setNpcFaction(activeItem.npcData?.faction || '');
      setNpcAvatarUrl(activeItem.npcData?.avatarUrl || './art/journey.webp');
      setNpcDescription(activeItem.npcData?.description || '');
      setNpcSecretLore(activeItem.npcData?.isSecretLore || '');
      setNpcIsVisible(activeItem.npcData?.isVisibleToPlayers ?? activeItem.isVisibleToPlayers);
      setShowNpcAvatarTray(false);
      setNpcSaveSuccess(false);
    } else if (activeItem.type === 'grid') {
      setGridName(activeItem.name || '');
      setGridMapUrl(activeItem.gridData?.mapUrl || './art/parchment-center.webp');
      setGridNotes(activeItem.gridData?.notes || '');
      setGridIsVisible(activeItem.isVisibleToPlayers ?? true);
      setShowGridPresetTray(false);
      setGridSaveSuccess(false);
    }
  }, [activeItemId]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleSelectItem = (item: FirecastItem) => {
    setActiveItemId(item.id);

    if (item.type === 'directory') {
      // Abre a pasta na árvore e carrega o painel de gestão da pasta no centro
      setExpandedFolders((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
      return;
    }

    // Se for documento, abre ou foca na aba
    if (item.type === 'document') {
      if (!openDocIds.includes(item.id)) {
        setOpenDocIds((prev) => [...prev, item.id]);
      }
    }
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openDocIds.filter((id) => id !== tabId);
    setOpenDocIds(remaining);
    if (activeItemId === tabId) {
      setActiveItemId(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleCreateNew = (data: {
    name: string;
    type: FirecastItemType;
    isVisibleToPlayers: boolean;
  }) => {
    const created = createLibraryItem({
      parentId: activeParentFolder ? activeParentFolder.id : null,
      name: data.name,
      type: data.type,
      isVisibleToPlayers: data.isVisibleToPlayers,
    });
    if (activeParentFolder) {
      setExpandedFolders((prev) => ({ ...prev, [activeParentFolder.id]: true }));
    }
    reload();
    if (created) {
      setActiveItemId(created.id);
      if (created.type === 'document') {
        setOpenDocIds((prev) => [...prev, created.id]);
      }
    }
  };

  // Salvar Pasta (Renomear / Mudar Visibilidade)
  const handleSaveActiveFolder = () => {
    if (!activeItem || activeItem.type !== 'directory') return;
    updateLibraryItem(activeItem.id, {
      name: folderName.trim() || activeItem.name,
      isVisibleToPlayers: folderIsVisible,
    });
    reload();
    setFolderSaveSuccess(true);
    setTimeout(() => setFolderSaveSuccess(false), 2000);
  };

  // Salvar Documento
  const handleSaveActiveDoc = () => {
    if (!activeItem || activeItem.type !== 'document') return;
    const contentHtml = isTextMode 
      ? textContent 
      : (editorRef.current ? editorRef.current.innerHTML : activeItem.documentContent || '');

    updateLibraryItem(activeItem.id, {
      name: currentDocName.trim() || activeItem.name,
      documentContent: contentHtml,
      isVisibleToPlayers: isDocVisible,
    });
    reload();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Salvar NPC
  const handleSaveNpc = () => {
    if (!activeItem || activeItem.type !== 'npc') return;
    updateLibraryItem(activeItem.id, {
      name: npcName.trim() || activeItem.name,
      isVisibleToPlayers: npcIsVisible,
      npcData: {
        avatarUrl: npcAvatarUrl,
        title: npcTitle.trim(),
        faction: npcFaction.trim(),
        description: npcDescription.trim(),
        isSecretLore: npcSecretLore.trim(),
        isVisibleToPlayers: npcIsVisible,
      },
    });
    reload();
    setNpcSaveSuccess(true);
    setTimeout(() => setNpcSaveSuccess(false), 2000);
  };

  // Salvar Mapa
  const handleSaveGrid = () => {
    if (!activeItem || activeItem.type !== 'grid') return;
    updateLibraryItem(activeItem.id, {
      name: gridName.trim() || activeItem.name,
      isVisibleToPlayers: gridIsVisible,
      gridData: {
        ...(activeItem.gridData || {}),
        mapUrl: gridMapUrl,
        notes: gridNotes.trim(),
      },
    });
    reload();
    setGridSaveSuccess(true);
    setTimeout(() => setGridSaveSuccess(false), 2000);
  };

  // Mover Item para Outra Pasta
  const handleConfirmMoveItem = (itemId: string, targetFolderId: string | null) => {
    const success = moveLibraryItem(itemId, targetFolderId);
    if (success) {
      if (targetFolderId) {
        setExpandedFolders((prev) => ({ ...prev, [targetFolderId]: true }));
      }
      reload();
    } else {
      alert('Não é possível mover uma pasta para dentro de si mesma ou de suas subpastas.');
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (!isGM) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInsertHeading = (colorHex: string, label: string) => {
    const html = `<h2 style="color: ${colorHex}; font-size: 1.45em; font-weight: 700; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">${label}</h2><p><br></p>`;
    executeCommand('insertHTML', html);
  };

  const handleInsertQuote = () => {
    const html = `
      <div style="margin: 20px 0; padding: 14px 18px; border-left: 3px solid #d4af37; background: rgba(0,0,0,0.3); border-radius: 8px; font-style: italic; color: #f1f5f9;">
        <p style="margin: 0; color: #fde68a;">"Citação marcante..."</p>
      </div>
      <p><br></p>
    `;
    executeCommand('insertHTML', html);
  };

  const handleInsertDivider = () => {
    const html = `
      <div style="display: flex; align-items: center; justify-content: center; margin: 24px 0; opacity: 0.5;">
        <div style="height: 1px; flex: 1; background: linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent);"></div>
        <span style="color: #f59e0b; padding: 0 12px; font-size: 11px;">✦</span>
        <div style="height: 1px; flex: 1; background: linear-gradient(to left, transparent, rgba(212,175,55,0.4), transparent);"></div>
      </div>
      <p><br></p>
    `;
    executeCommand('insertHTML', html);
  };

  const handleInsertImagePrompt = () => {
    const url = window.prompt('URL da imagem a ser inserida:', './art/parchment-center.webp');
    if (url && url.trim()) {
      const html = `
        <div style="text-align: center; margin: 20px auto;">
          <img src="${url.trim()}" alt="Ilustração" style="max-width: 100%; max-height: 400px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.3); box-shadow: 0 8px 30px rgba(0,0,0,0.8); display: inline-block;" />
        </div>
        <p><br></p>
      `;
      executeCommand('insertHTML', html);
    }
  };

  const handleOpenCharacter = async (item: FirecastItem) => {
    try {
      const char = await getOrCreateLibraryCharacter({
        characterId: item.characterId,
        name: item.name,
        userId: currentUser?.uid,
        playerName: currentUser?.displayName || 'Mestre Augusta',
      });
      if (onOpenCharacterSheet) {
        onOpenCharacterSheet(char.id);
      }
    } catch (err) {
      console.error('Erro ao abrir ficha do personagem:', err);
      if (onOpenCharacterSheet) {
        onOpenCharacterSheet(item.name);
      }
    }
  };

  const handleOpenContextMenu = (e: React.MouseEvent, item: FirecastItem) => {
    if (!isGM) return;
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleRename = (item: FirecastItem) => {
    const newName = window.prompt(`Novo nome para "${item.name}":`, item.name);
    if (newName && newName.trim() && newName.trim() !== item.name) {
      updateLibraryItem(item.id, { name: newName.trim() });
      reload();
    }
  };

  const handleDelete = (item: FirecastItem) => {
    const isFolder = item.type === 'directory';
    const message = isFolder
      ? `Deseja realmente excluir permanentemente a pasta "${item.name}" e todo o seu conteúdo interno?`
      : `Deseja realmente excluir permanentemente "${item.name}"?`;

    const confirmed = window.confirm(message);
    if (confirmed) {
      deleteLibraryItem(item.id);
      if (activeItemId === item.id) setActiveItemId(null);
      setOpenDocIds((prev) => prev.filter((id) => id !== item.id));
      reload();
    }
  };

  const handleToggleVis = (item: FirecastItem) => {
    toggleItemVisibility(item.id);
    reload();
  };

  // Filtragem
  const filterItem = (item: FirecastItem): boolean => {
    if (!isGM && !item.isVisibleToPlayers) return false;
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Renderizador de Linha da Árvore
  const renderItemRow = (item: FirecastItem, depth = 0) => {
    if (!filterItem(item)) return null;

    const isFolder = item.type === 'directory';
    const isExpanded = !!expandedFolders[item.id];
    const isNpc = item.type === 'npc';
    const npcVis = item.npcData?.isVisibleToPlayers ?? item.isVisibleToPlayers;
    const isSecret = !item.isVisibleToPlayers || (isNpc && !npcVis);
    const isSelected = activeItemId === item.id;

    const displayName = (!isGM && isNpc && !npcVis) ? '??? (Oculto)' : item.name;

    return (
      <div key={item.id} className="select-none">
        <div
          onContextMenu={(e) => handleOpenContextMenu(e, item)}
          onClick={() => handleSelectItem(item)}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
          className={`group flex items-center justify-between py-2 px-2.5 rounded-lg cursor-pointer transition-all duration-150 border text-xs sm:text-sm ${
            isSelected
              ? 'bg-amber-950/40 border-amber-600/40 text-amber-200 font-medium'
              : isSecret && isGM
              ? 'border-transparent text-slate-300 hover:bg-red-950/20 hover:text-red-200'
              : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
          }`}
        >
          {/* Lado Esquerdo: Ícone + Título */}
          <div className="flex items-center gap-2 truncate min-w-0">
            {isFolder && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(item.id);
                }}
                className="text-slate-500 group-hover:text-amber-400 w-3.5 text-center flex items-center justify-center"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            )}

            <div className="flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:text-amber-400">
              {isFolder ? (
                isExpanded ? <FolderOpen className="w-4 h-4 text-amber-500/80" /> : <Folder className="w-4 h-4 text-amber-600/70" />
              ) : item.type === 'npc' ? (
                <Users className="w-4 h-4 text-sky-400/80" />
              ) : item.type === 'character' ? (
                <Scroll className="w-4 h-4 text-emerald-400/80" />
              ) : item.type === 'grid' ? (
                <Grid className="w-4 h-4 text-purple-400/80" />
              ) : (
                <FileText className="w-4 h-4 text-amber-300/70" />
              )}
            </div>

            <span className="truncate">
              {displayName}
            </span>

            {isSecret && isGM && (
              <Lock className="w-3 h-3 text-red-400/80 flex-shrink-0 ml-0.5" title="Oculto para jogadores" />
            )}
          </div>

          {/* Lado Direito: Ações rápidas da Mestre */}
          {isGM && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1">
              {/* Botão Mover Rápido */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMovingItem(item);
                }}
                className="p-1 rounded text-slate-400 hover:text-amber-300 transition-colors"
                title="Mover para outra pasta"
              >
                <FolderInput className="w-3 h-3" />
              </button>

              {/* Botão Alternar Visibilidade */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleVis(item);
                }}
                className="p-1 rounded text-slate-400 hover:text-amber-300 transition-colors"
                title={isSecret ? 'Tornar Público' : 'Tornar Secreto'}
              >
                {isSecret ? <Lock className="w-3 h-3 text-red-400" /> : <Eye className="w-3 h-3 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={(e) => handleOpenContextMenu(e, item)}
                className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
              >
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Filhos de pasta expandida */}
        {isFolder && isExpanded && (
          <div className="border-l border-slate-800/80 ml-4 my-0.5 space-y-0.5">
            {items
              .filter((child) => child.parentId === item.id)
              .map((child) => renderItemRow(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootItems = items.filter((item) => item.parentId === null);

  // Documentos abertos nas abas do centro
  const openDocs = openDocIds
    .map((id) => items.find((d) => d.id === id))
    .filter((d): d is FirecastItem => Boolean(d));

  // Itens filhos da pasta ativa (se for diretório)
  const activeFolderChildren = activeItem?.type === 'directory'
    ? items.filter((child) => child.parentId === activeItem.id)
    : [];

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#080b12] text-slate-200 font-sans select-none overflow-hidden rounded-2xl border border-slate-800/80 shadow-2xl">
      
      {/* ========================================================================= */}
      {/* 1. SIDEBAR DA ESQUERDA: ÁRVORE DE PASTAS & ARQUIVOS                       */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-80 lg:w-84 flex flex-col border-r border-slate-800/80 bg-[#0a0d16] flex-shrink-0">
        
        {/* Topo da Sidebar: Busca & Botão Novo */}
        <div className="p-3 border-b border-slate-800/80 bg-[#0d101a] flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar arquivos..."
              className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isGM && (
            <button
              onClick={() => {
                setActiveParentFolder(null);
                setIsNewModalOpen(true);
              }}
              className="p-1.5 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-sm transition-all flex items-center justify-center cursor-pointer"
              title="Criar novo arquivo ou pasta"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Árvore de Itens */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {rootItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              Nenhum item na biblioteca.
            </div>
          ) : (
            rootItems.map((root) => renderItemRow(root, 0))
          )}
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-2.5 border-t border-slate-800/80 bg-[#090b12] text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono">{items.length} itens no Códice</span>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">/des</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">/sorte</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. PAINEL CENTRAL (O MEIO): LEITOR E EDITOR INTEGRADO                    */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col bg-[#07090e] overflow-hidden">
        
        {/* Caso Nenhum Arquivo Aberto: Tela de Espera Limpa */}
        {!activeItem ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl border border-amber-700/30 bg-slate-900/50 flex items-center justify-center text-amber-400/60 shadow-inner">
              <BookOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="max-w-sm space-y-1">
              <h3 className="text-base font-serif font-bold text-amber-200/90">
                Biblioteca dos Céus Partidos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Selecione qualquer documento, pasta, NPC ou mapa na árvore à esquerda para gerenciar, ler ou editar diretamente aqui no centro.
              </p>
            </div>

            {isGM && (
              <button
                onClick={() => {
                  setActiveParentFolder(null);
                  setIsNewModalOpen(true);
                }}
                className="mt-2 px-4 py-2 rounded-lg border border-amber-600/40 bg-slate-900/80 hover:bg-slate-800 text-amber-300 text-xs font-sans transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Criar Novo Item</span>
              </button>
            )}
          </div>
        ) : activeItem.type === 'directory' ? (
          /* ========================================================================= */
          /* CASO 0: PAINEL DE GESTÃO E EDIÇÃO DE PASTA (ex: Pasta "Chin")             */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Header da Pasta */}
            <div className="p-3.5 bg-[#0d101a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-serif text-slate-400 uppercase tracking-widest">
                  Gestão da Pasta
                </span>
              </div>

              {isGM && (
                <div className="flex items-center gap-2">
                  {/* Visibilidade da Pasta */}
                  <button
                    type="button"
                    onClick={() => setFolderIsVisible(!folderIsVisible)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer ${
                      folderIsVisible
                        ? 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                        : 'border-red-700/60 bg-red-950/40 text-red-300 hover:bg-red-900/40'
                    }`}
                  >
                    {folderIsVisible ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{folderIsVisible ? 'Pública' : 'Secreta'}</span>
                  </button>

                  {/* Mover Pasta */}
                  <button
                    type="button"
                    onClick={() => setMovingItem(activeItem)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Mover esta pasta para outro local"
                  >
                    <FolderInput className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mover</span>
                  </button>

                  {/* Salvar Pasta */}
                  <button
                    type="button"
                    onClick={handleSaveActiveFolder}
                    className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      folderSaveSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
                    }`}
                  >
                    {folderSaveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{folderSaveSuccess ? 'Salvo!' : 'Salvar Pasta'}</span>
                  </button>

                  {/* Excluir Pasta */}
                  <button
                    type="button"
                    onClick={() => handleDelete(activeItem)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 transition-colors cursor-pointer"
                    title="Excluir esta pasta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Conteúdo da Pasta */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#090c14]">
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Nome da Pasta Editável */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-slate-400">
                    Nome da Pasta
                  </label>
                  {isGM ? (
                    <input
                      type="text"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      placeholder="Nome da Pasta..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xl font-serif font-bold text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  ) : (
                    <h2 className="text-2xl font-serif font-bold text-amber-100">{folderName}</h2>
                  )}
                </div>

                {/* Lista de Itens Contidos Nesta Pasta */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif uppercase tracking-wider text-slate-300">
                      Arquivos e Subpastas ({activeFolderChildren.length})
                    </span>

                    {isGM && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveParentFolder(activeItem);
                          setIsNewModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 text-xs font-sans flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Novo Item nesta Pasta</span>
                      </button>
                    )}
                  </div>

                  {activeFolderChildren.length === 0 ? (
                    <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/20 text-xs text-slate-500 space-y-2">
                      <p>Esta pasta está vazia.</p>
                      {isGM && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveParentFolder(activeItem);
                            setIsNewModalOpen(true);
                          }}
                          className="text-amber-400 hover:underline"
                        >
                          Clique aqui para adicionar o primeiro arquivo ou subpasta
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {activeFolderChildren.map((child) => (
                        <div
                          key={child.id}
                          onClick={() => handleSelectItem(child)}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-xs sm:text-sm cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <span className="text-slate-400 group-hover:text-amber-400">
                              {child.type === 'directory' ? <Folder className="w-4 h-4 text-amber-500" /> :
                               child.type === 'npc' ? <Users className="w-4 h-4 text-sky-400" /> :
                               child.type === 'character' ? <Scroll className="w-4 h-4 text-emerald-400" /> :
                               child.type === 'grid' ? <Grid className="w-4 h-4 text-purple-400" /> :
                               <FileText className="w-4 h-4 text-amber-300" />}
                            </span>
                            <span className="truncate text-slate-200 font-medium group-hover:text-amber-100">
                              {child.name}
                            </span>
                            {!child.isVisibleToPlayers && isGM && (
                              <Lock className="w-3 h-3 text-red-400" title="Oculto para jogadores" />
                            )}
                          </div>

                          {isGM && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMovingItem(child);
                                }}
                                className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-amber-300"
                                title="Mover este item"
                              >
                                <FolderInput className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(child);
                                }}
                                className="p-1.5 rounded hover:bg-red-950 text-slate-400 hover:text-red-400"
                                title="Excluir este item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        ) : activeItem.type === 'document' ? (
          /* ========================================================================= */
          /* CASO 1: EDITOR DE DOCUMENTO INTEGRADO NO MEIO                            */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Abas dos Documentos Abertos no Topo */}
            <div className="flex items-center bg-[#0a0d16] border-b border-slate-800 px-2 pt-1.5 gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
              {openDocs.map((doc) => {
                const isActive = doc.id === activeItemId;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setActiveItemId(doc.id)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-sans cursor-pointer transition-all border-t border-x ${
                      isActive
                        ? 'bg-[#0e121c] text-amber-200 border-amber-600/40 border-b-transparent shadow-sm'
                        : 'bg-[#090b12] text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    {!doc.isVisibleToPlayers && isGM && <Lock className="w-2.5 h-2.5 text-red-400" />}
                    <span className="truncate max-w-[140px]">{doc.name}</span>
                    <button
                      type="button"
                      onClick={(e) => handleCloseTab(doc.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Barra de Ações do Documento (Título, Salvar, Status, Mover) */}
            <div className="p-3 bg-[#0d101a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <FileText className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                {isGM ? (
                  <input
                    type="text"
                    value={currentDocName}
                    onChange={(e) => setCurrentDocName(e.target.value)}
                    className="bg-transparent text-sm sm:text-base font-serif font-bold text-amber-100 focus:outline-none focus:border-b focus:border-amber-500 w-full"
                    placeholder="Nome do Documento..."
                  />
                ) : (
                  <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 truncate">
                    {activeItem.name}
                  </h2>
                )}
              </div>

              {isGM && (
                <div className="flex items-center gap-2">
                  {/* Mover Arquivo */}
                  <button
                    type="button"
                    onClick={() => setMovingItem(activeItem)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Mover este documento para outra pasta"
                  >
                    <FolderInput className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mover</span>
                  </button>

                  {/* Alternar Visibilidade */}
                  <button
                    type="button"
                    onClick={() => setIsDocVisible(!isDocVisible)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isDocVisible
                        ? 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                        : 'border-red-700/60 bg-red-950/40 text-red-300 hover:bg-red-900/40'
                    }`}
                  >
                    {isDocVisible ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{isDocVisible ? 'Público' : 'Secreto'}</span>
                  </button>

                  {/* Salvar */}
                  <button
                    type="button"
                    onClick={handleSaveActiveDoc}
                    className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      saveSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
                    }`}
                  >
                    {saveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{saveSuccess ? 'Salvo!' : 'Salvar'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Barra de Formatação */}
            {isGM && (
              <div className="px-3 py-1.5 bg-[#0a0d16] border-b border-slate-800/80 flex flex-wrap items-center gap-1 text-slate-300 flex-shrink-0 text-xs">
                <button
                  type="button"
                  onClick={() => executeCommand('bold')}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-200 transition-colors"
                  title="Negrito"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('italic')}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-200 transition-colors"
                  title="Itálico"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('underline')}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-200 transition-colors"
                  title="Sublinhado"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-slate-800 mx-1" />

                <button
                  type="button"
                  onClick={() => handleInsertHeading('#fb923c', 'Título Coral')}
                  className="px-2 py-1 rounded hover:bg-slate-800 text-[11px] text-orange-400 font-bold"
                >
                  H1 Coral
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertHeading('#38bdf8', 'Subtítulo Ciano')}
                  className="px-2 py-1 rounded hover:bg-slate-800 text-[11px] text-sky-400 font-bold"
                >
                  H2 Ciano
                </button>
                <button
                  type="button"
                  onClick={handleInsertQuote}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-300"
                  title="Citação"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleInsertDivider}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-300 text-[11px] font-mono"
                  title="Divisor Rúnico"
                >
                  ──✦──
                </button>
                <button
                  type="button"
                  onClick={handleInsertImagePrompt}
                  className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-300"
                  title="Inserir Imagem"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-slate-800 mx-1" />

                <div className="flex items-center gap-1">
                  {COLOR_PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => executeCommand('foreColor', c.hex)}
                      className="w-3.5 h-3.5 rounded-full border border-slate-700 hover:scale-125 transition-transform"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Área de Leitura e Edição */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#090c14]">
              <div
                ref={editorRef}
                contentEditable={isGM}
                suppressContentEditableWarning
                className="min-h-full max-w-3xl mx-auto focus:outline-none text-slate-100 text-sm sm:text-base leading-relaxed font-sans selection:bg-amber-500/30"
              />
            </div>

          </div>
        ) : activeItem.type === 'npc' ? (
          /* ========================================================================= */
          /* CASO 2: FICHA E EDIÇÃO DE NPC TOTALMENTE INTEGRADA NO MEIO (SEM MODAL!)    */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Header de Ações do NPC */}
            <div className="p-3.5 bg-[#0d101a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-serif text-slate-400 uppercase tracking-widest">
                  Ficha do Habitante / NPC
                </span>
              </div>

              {isGM && (
                <div className="flex items-center gap-2">
                  {/* Mover NPC */}
                  <button
                    type="button"
                    onClick={() => setMovingItem(activeItem)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Mover este NPC para outra pasta"
                  >
                    <FolderInput className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mover</span>
                  </button>

                  {/* Visibilidade do NPC */}
                  <button
                    type="button"
                    onClick={() => setNpcIsVisible(!npcIsVisible)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer ${
                      npcIsVisible
                        ? 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                        : 'border-red-700/60 bg-red-950/40 text-red-300 hover:bg-red-900/40'
                    }`}
                  >
                    {npcIsVisible ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{npcIsVisible ? 'Público na Mesa' : 'Oculto (Secreto)'}</span>
                  </button>

                  {/* Salvar NPC */}
                  <button
                    type="button"
                    onClick={handleSaveNpc}
                    className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      npcSaveSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
                    }`}
                  >
                    {npcSaveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{npcSaveSuccess ? 'Salvo!' : 'Salvar NPC'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Conteúdo do NPC (Edição Direta e Fluida) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#090c14]">
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Bloco Superior: Retrato + Identidade */}
                <div className="flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
                  
                  {/* Retrato com gatilho de troca rápida */}
                  <div className="relative group flex-shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-amber-600/40 overflow-hidden bg-slate-900 shadow-md">
                      <img
                        src={npcAvatarUrl}
                        alt={npcName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isGM && (
                      <button
                        type="button"
                        onClick={() => setShowNpcAvatarTray(!showNpcAvatarTray)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex flex-col items-center justify-center text-[10px] text-amber-200 font-sans cursor-pointer gap-1"
                        title="Trocar retrato do NPC"
                      >
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>Trocar Foto</span>
                      </button>
                    )}
                  </div>

                  {/* Identidade: Nome, Título e Facção */}
                  <div className="flex-1 w-full space-y-3">
                    {/* Nome do NPC */}
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest text-slate-400 mb-1">
                        Nome do Personagem
                      </label>
                      {isGM ? (
                        <input
                          type="text"
                          value={npcName}
                          onChange={(e) => setNpcName(e.target.value)}
                          placeholder="Nome do NPC..."
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-lg sm:text-xl font-serif font-bold text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      ) : (
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                          {npcName}
                        </h2>
                      )}
                    </div>

                    {/* Título & Facção */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-widest text-slate-400 mb-1">
                          Título ou Ocupação
                        </label>
                        {isGM ? (
                          <input
                            type="text"
                            value={npcTitle}
                            onChange={(e) => setNpcTitle(e.target.value)}
                            placeholder="ex: Matriarca dos Céus..."
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-amber-300 focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        ) : (
                          <p className="text-sm text-amber-300 font-medium">{npcTitle || '—'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-widest text-slate-400 mb-1">
                          Facção ou Aliança
                        </label>
                        {isGM ? (
                          <input
                            type="text"
                            value={npcFaction}
                            onChange={(e) => setNpcFaction(e.target.value)}
                            placeholder="ex: Casa Thorne, Piratas de Éter..."
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        ) : (
                          <p className="text-sm text-slate-300">{npcFaction || 'Neutro'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bandeja de Escolha de Retrato */}
                {showNpcAvatarTray && isGM && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-600/30 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif text-amber-200">Escolha um Retrato ou Envie um Arquivo:</span>
                      <button
                        type="button"
                        onClick={() => setShowNpcAvatarTray(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ✕ Fechar
                      </button>
                    </div>

                    <label
                      htmlFor="npc-avatar-upload"
                      className="flex items-center justify-center space-x-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-200 text-xs cursor-pointer transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Enviar Imagem do Computador ou Celular</span>
                    </label>
                    <input
                      id="npc-avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const res = ev.target?.result as string;
                          if (res) {
                            setNpcAvatarUrl(res);
                            setShowNpcAvatarTray(false);
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />

                    <div className="grid grid-cols-6 gap-2 pt-1">
                      {NPC_AVATAR_PRESETS.map((p) => (
                        <button
                          key={p.url}
                          type="button"
                          onClick={() => {
                            setNpcAvatarUrl(p.url);
                            setShowNpcAvatarTray(false);
                          }}
                          className={`relative rounded-lg overflow-hidden aspect-square border transition-all ${
                            npcAvatarUrl === p.url
                              ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                              : 'border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* História & Descrição Pública */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-400">
                    História & Descrição do Personagem
                  </label>
                  {isGM ? (
                    <textarea
                      rows={5}
                      value={npcDescription}
                      onChange={(e) => setNpcDescription(e.target.value)}
                      placeholder="Descreva quem é este habitante, sua personalidade, conexões com os heróis e histórico..."
                      className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 focus:border-amber-500/80 text-sm text-slate-200 leading-relaxed focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                      {npcDescription || 'Nenhuma história detalhada registrada para este habitante.'}
                    </div>
                  )}
                </div>

                {/* Bloco de Segredos da Mestre (Apenas Mestre) */}
                {isGM && (
                  <div className="space-y-2 p-4 rounded-xl border border-red-900/40 bg-red-950/15">
                    <div className="flex items-center gap-2 text-xs font-serif font-bold text-red-300 uppercase tracking-wider">
                      <Lock className="w-3.5 h-3.5 text-red-400" />
                      <span>Segredos da Trama & Fraquezas (Apenas a Mestre Vê)</span>
                    </div>
                    <textarea
                      rows={4}
                      value={npcSecretLore}
                      onChange={(e) => setNpcSecretLore(e.target.value)}
                      placeholder="Anotações secretas sobre este NPC: fraquezas ocultas, lealdades ocultas, pistas que ele esconde, itens mágicos em sua posse..."
                      className="w-full p-3 rounded-lg bg-slate-950/80 border border-red-900/50 focus:border-red-500 text-xs sm:text-sm text-red-100 leading-relaxed focus:outline-none transition-colors placeholder-red-900/60"
                    />
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : activeItem.type === 'grid' ? (
          /* ========================================================================= */
          /* CASO 3: MAPA TÁTICO INTEGRADO NO MEIO (SEM MODAL!)                       */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Header de Ações do Mapa */}
            <div className="p-3.5 bg-[#0d101a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-serif text-slate-400 uppercase tracking-widest">
                  Carta Náutica / Mapa Tático
                </span>
              </div>

              {isGM && (
                <div className="flex items-center gap-2">
                  {/* Mover Mapa */}
                  <button
                    type="button"
                    onClick={() => setMovingItem(activeItem)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Mover este mapa para outra pasta"
                  >
                    <FolderInput className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mover</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGridIsVisible(!gridIsVisible)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-colors flex items-center gap-1.5 cursor-pointer ${
                      gridIsVisible
                        ? 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                        : 'border-red-700/60 bg-red-950/40 text-red-300 hover:bg-red-900/40'
                    }`}
                  >
                    {gridIsVisible ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{gridIsVisible ? 'Público' : 'Secreto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveGrid}
                    className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      gridSaveSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950'
                    }`}
                  >
                    {gridSaveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{gridSaveSuccess ? 'Salvo!' : 'Salvar Mapa'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Visualizador & Configuração do Mapa */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#090c14]">
              <div className="max-w-3xl mx-auto space-y-5">
                
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-slate-400 mb-1">
                    Nome da Região ou Cenário
                  </label>
                  {isGM ? (
                    <input
                      type="text"
                      value={gridName}
                      onChange={(e) => setGridName(e.target.value)}
                      placeholder="Nome do Mapa..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-lg sm:text-xl font-serif font-bold text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">{gridName}</h2>
                  )}
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl group max-h-[440px] flex items-center justify-center">
                  <img
                    src={gridMapUrl}
                    alt={gridName}
                    className="w-full h-full object-contain max-h-[440px]"
                  />
                  {isGM && (
                    <button
                      type="button"
                      onClick={() => setShowGridPresetTray(!showGridPresetTray)}
                      className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-amber-300 border border-amber-500/40 text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Alterar Imagem do Mapa</span>
                    </button>
                  )}
                </div>

                {showGridPresetTray && isGM && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-600/30 space-y-3 animate-fadeIn">
                    <span className="text-xs font-serif text-amber-200 block">Escolha uma Ilustração de Mapa:</span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {MAP_PRESETS.map((p) => (
                        <button
                          key={p.url}
                          type="button"
                          onClick={() => {
                            setGridMapUrl(p.url);
                            setShowGridPresetTray(false);
                          }}
                          className={`relative rounded-lg overflow-hidden aspect-video border transition-all ${
                            gridMapUrl === p.url
                              ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                              : 'border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-400">
                    Anotações Táticas & Perigos do Cenário
                  </label>
                  {isGM ? (
                    <textarea
                      rows={4}
                      value={gridNotes}
                      onChange={(e) => setGridNotes(e.target.value)}
                      placeholder="Obstáculos, coberturas, condições climáticas de éter e monstros à espreita..."
                      className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 focus:border-amber-500/80 text-sm text-slate-200 leading-relaxed focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                      {gridNotes || 'Nenhuma anotação tática registrada para este mapa.'}
                    </p>
                  )}
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* CASO 4: FICHA DE PERSONAGEM NO CENTRO                                    */
          /* ========================================================================= */
          (() => {
            const charObj = getLocalCharacters().find(
              (c) => c.name.toLowerCase() === activeItem.name.toLowerCase()
            );
            const avatar = charObj?.avatarUrl || './art/journey.webp';
            return (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="relative w-24 h-24 rounded-2xl border border-amber-500/40 overflow-hidden bg-slate-950 shadow-md">
                  <img src={avatar} alt={activeItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-slate-100">
                    {activeItem.name}
                  </h3>
                  <p className="text-sm text-slate-300 font-sans">
                    Ficha de Navegante registrada no Códice
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenCharacter(activeItem)}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:brightness-110 active:scale-[0.98] text-slate-950 font-sans font-medium text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Scroll className="w-4 h-4" />
                    <span>Abrir Ficha Completa</span>
                  </button>
                  {isGM && (
                    <button
                      type="button"
                      onClick={() => setMovingItem(activeItem)}
                      className="px-4 py-2.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-200 text-sm font-sans font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <FolderInput className="w-4 h-4 text-amber-400" />
                      <span>Mover Ficha</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()
        )}

      </main>

      {/* Modal Novo Item (apenas para escolher Nome, Tipo e Pasta) */}
      <NewItemModal
        isOpen={isNewModalOpen}
        parentFolderName={activeParentFolder ? activeParentFolder.name : null}
        onClose={() => {
          setIsNewModalOpen(false);
          setActiveParentFolder(null);
        }}
        onCreate={handleCreateNew}
      />

      {/* Modal Mover Item / Subpasta */}
      <MoveItemModal
        isOpen={!!movingItem}
        item={movingItem}
        allItems={items}
        onClose={() => setMovingItem(null)}
        onConfirmMove={handleConfirmMoveItem}
      />

      {/* Menu de Contexto Flutuante */}
      {contextMenu && (
        <ItemContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          onClose={() => setContextMenu(null)}
          onEditItem={(item) => handleSelectItem(item)}
          onMoveItem={(item) => setMovingItem(item)}
          onCreateNewUnder={(parent) => {
            setActiveParentFolder(parent);
            setIsNewModalOpen(true);
          }}
          onToggleVisibility={handleToggleVis}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
};
