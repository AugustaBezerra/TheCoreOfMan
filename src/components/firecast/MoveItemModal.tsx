import React, { useState } from 'react';
import { FirecastItem } from '../../types/firecast';
import { Folder, FolderOpen, ArrowRight, X, Check, Shield } from 'lucide-react';

interface MoveItemModalProps {
  isOpen: boolean;
  item: FirecastItem | null;
  allItems: FirecastItem[];
  onClose: () => void;
  onConfirmMove: (itemId: string, targetFolderId: string | null) => void;
}

export const MoveItemModal: React.FC<MoveItemModalProps> = ({
  isOpen,
  item,
  allItems,
  onClose,
  onConfirmMove,
}) => {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  // Filtrar todas as pastas existentes
  const folders = allItems.filter((i) => i.type === 'directory');

  // Se o item a ser movido for um diretório, ele não pode ser movido para si mesmo nem para suas subpastas
  const getDescendantFolderIds = (folderId: string): Set<string> => {
    const descendants = new Set<string>([folderId]);
    let added = true;
    while (added) {
      added = false;
      allItems.forEach((it) => {
        if (it.type === 'directory' && it.parentId && descendants.has(it.parentId) && !descendants.has(it.id)) {
          descendants.add(it.id);
          added = true;
        }
      });
    }
    return descendants;
  };

  const forbiddenIds = item.type === 'directory' ? getDescendantFolderIds(item.id) : new Set<string>();

  const handleSelect = (folderId: string | null) => {
    if (folderId && forbiddenIds.has(folderId)) return;
    setSelectedParentId(folderId);
  };

  const handleConfirm = () => {
    onConfirmMove(item.id, selectedParentId);
    onClose();
  };

  // Encontrar o nome da pasta atual
  const currentParent = allItems.find((f) => f.id === item.parentId);
  const currentParentName = currentParent ? currentParent.name : 'Raiz da Biblioteca';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-md bg-[#0c1018] border border-amber-600/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-amber-950/30 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Folder className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-amber-200">
                Mover {item.type === 'directory' ? 'Pasta' : 'Arquivo'}
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
                {item.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center text-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo: Seleção de Destino */}
        <div className="p-5 space-y-4">
          <div className="text-xs text-slate-400">
            Local atual: <span className="text-amber-300 font-medium">{currentParentName}</span>
          </div>

          <div className="text-xs font-serif text-slate-300 uppercase tracking-wider">
            Escolha a pasta de destino:
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1 p-1 border border-slate-800 rounded-xl bg-slate-950/60">
            {/* Opção 1: Raiz da Biblioteca */}
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                selectedParentId === null
                  ? 'bg-amber-950/50 border border-amber-500/50 text-amber-200 font-semibold'
                  : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-amber-500" />
                <span>Raiz da Biblioteca (Nível Principal)</span>
              </div>
              {selectedParentId === null && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* Pastas existentes */}
            {folders.map((folder) => {
              const isForbidden = forbiddenIds.has(folder.id);
              const isCurrent = folder.id === item.parentId;
              const isSelected = selectedParentId === folder.id;

              return (
                <button
                  key={folder.id}
                  type="button"
                  disabled={isForbidden}
                  onClick={() => handleSelect(folder.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors ${
                    isForbidden
                      ? 'opacity-30 cursor-not-allowed text-slate-600'
                      : isSelected
                      ? 'bg-amber-950/50 border border-amber-500/50 text-amber-200 font-semibold cursor-pointer'
                      : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Folder className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{folder.name}</span>
                    {isCurrent && (
                      <span className="text-[10px] text-slate-500 font-mono">(atual)</span>
                    )}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rodapé com botões de ação */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#090b12] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-medium text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Mover Aqui</span>
          </button>
        </div>

      </div>
    </div>
  );
};
