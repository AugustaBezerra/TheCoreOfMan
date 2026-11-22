import React, { useEffect, useRef } from 'react';
import { FirecastItem } from '../../types/firecast';
import { 
  Edit3, 
  FolderPlus, 
  Lock, 
  Eye, 
  Trash2, 
  FolderInput, 
  Tag, 
  Folder, 
  FileText, 
  Users, 
  Grid, 
  Scroll 
} from 'lucide-react';

interface ItemContextMenuProps {
  x: number;
  y: number;
  item: FirecastItem;
  onClose: () => void;
  onEditItem: (item: FirecastItem) => void;
  onCreateNewUnder: (parentItem: FirecastItem) => void;
  onToggleVisibility: (item: FirecastItem) => void;
  onRename: (item: FirecastItem) => void;
  onDelete: (item: FirecastItem) => void;
  onMoveItem?: (item: FirecastItem) => void;
}

export const ItemContextMenu: React.FC<ItemContextMenuProps> = ({
  x,
  y,
  item,
  onClose,
  onEditItem,
  onCreateNewUnder,
  onToggleVisibility,
  onRename,
  onDelete,
  onMoveItem,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Posicionamento seguro dentro da janela
  const style: React.CSSProperties = {
    top: Math.min(y, window.innerHeight - 320),
    left: Math.min(x, window.innerWidth - 300),
  };

  const isNpc = item.type === 'npc';
  const isVisible = isNpc 
    ? (item.npcData ? item.npcData.isVisibleToPlayers : item.isVisibleToPlayers)
    : item.isVisibleToPlayers;

  return (
    <div
      ref={menuRef}
      style={style}
      className="fixed z-50 w-64 rounded-xl border border-slate-700/80 bg-[#0c1018] shadow-[0_12px_40px_rgba(0,0,0,0.95)] py-1.5 text-slate-200 animate-fadeIn font-sans select-none"
    >
      {/* Header do Menu */}
      <div className="px-3.5 py-2 text-xs font-serif font-bold text-amber-200 border-b border-slate-800 flex items-center gap-2 truncate">
        {item.type === 'directory' ? (
          <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
        ) : item.type === 'npc' ? (
          <Users className="w-4 h-4 text-sky-400 flex-shrink-0" />
        ) : item.type === 'character' ? (
          <Scroll className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        ) : item.type === 'grid' ? (
          <Grid className="w-4 h-4 text-purple-400 flex-shrink-0" />
        ) : (
          <FileText className="w-4 h-4 text-amber-300 flex-shrink-0" />
        )}
        <span className="truncate">{item.name}</span>
      </div>

      <div className="py-1">
        {/* Opção: Editar / Abrir no Centro */}
        <button
          onClick={() => {
            onEditItem(item);
            onClose();
          }}
          className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-amber-200 flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {item.type === 'character' ? 'Abrir Ficha' :
             item.type === 'directory' ? 'Gerenciar Pasta' : 'Editar no Centro'}
          </span>
        </button>

        {/* Opção: Mover para outra Pasta */}
        {onMoveItem && (
          <button
            onClick={() => {
              onMoveItem(item);
              onClose();
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-amber-200 flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
          >
            <FolderInput className="w-3.5 h-3.5 text-slate-400" />
            <span>Mover para...</span>
          </button>
        )}

        {/* Opção se for Pasta: Criar Novo Item Aqui */}
        {item.type === 'directory' && (
          <button
            onClick={() => {
              onCreateNewUnder(item);
              onClose();
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-white flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Novo item nesta pasta</span>
          </button>
        )}

        {/* Alternar Visibilidade */}
        <button
          onClick={() => {
            onToggleVisibility(item);
            onClose();
          }}
          className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
        >
          {isVisible ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
          <span className={isVisible ? 'text-amber-300' : 'text-emerald-300 font-semibold'}>
            {isVisible ? 'Tornar Secreto (🔒)' : 'Tornar Público (👁️)'}
          </span>
        </button>

        {/* Renomear rápido */}
        <button
          onClick={() => {
            onRename(item);
            onClose();
          }}
          className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-white flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
        >
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Renomear</span>
        </button>
      </div>

      <div className="border-t border-slate-800/80 my-1" />

      {/* Excluir */}
      <button
        onClick={() => {
          onDelete(item);
          onClose();
        }}
        className="w-full text-left px-3.5 py-2 hover:bg-red-950/60 text-red-400 hover:text-red-200 flex items-center gap-2.5 transition-colors text-xs font-medium cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5 text-red-400" />
        <span>Excluir {item.type === 'directory' ? 'Pasta' : 'Item'}</span>
      </button>
    </div>
  );
};
