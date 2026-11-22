import React, { useState } from 'react';
import { FirecastItemType } from '../../types/firecast';

interface NewItemModalProps {
  isOpen: boolean;
  parentFolderName?: string | null;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    type: FirecastItemType;
    isVisibleToPlayers: boolean;
  }) => void;
}

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  parentFolderName,
  onClose,
  onCreate,
}) => {
  const [selectedType, setSelectedType] = useState<FirecastItemType>('directory');
  const [name, setName] = useState('');
  const [isVisibleToPlayers, setIsVisibleToPlayers] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      type: selectedType,
      isVisibleToPlayers,
    });

    setName('');
    setSelectedType('directory');
    setIsVisibleToPlayers(true);
    onClose();
  };

  const TYPES: Array<{
    id: FirecastItemType;
    label: string;
    icon: string;
    description: string;
  }> = [
    {
      id: 'character',
      label: 'Ficha',
      icon: '🛡️',
      description: 'Ficha de Herói ou Aventureiro',
    },
    {
      id: 'document',
      label: 'Anotação',
      icon: '📜',
      description: 'Notas, pistas e regras da sessão',
    },
    {
      id: 'npc',
      label: 'NPC',
      icon: '👤',
      description: 'Aliado, vilão ou contato',
    },
    {
      id: 'grid',
      label: 'Mapa',
      icon: '🗺️',
      description: 'Carta náutica ou mapa tático',
    },
    {
      id: 'directory',
      label: 'Pasta',
      icon: '📁',
      description: 'Diretório para organizar',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border-2 border-amber-500 bg-[#161720] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] text-stone-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-stone-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-200">
              Novo item da Biblioteca
            </h2>
            {parentFolderName && (
              <p className="text-base text-amber-300 font-bold mt-1">
                Criando dentro de: <strong className="text-white underline">📁 {parentFolderName}</strong>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center text-2xl font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipos Selecionáveis em Cartões Grandes (Estilo Firecast) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {TYPES.map((t) => {
              const isSelected = selectedType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedType(t.id)}
                  className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-red-500 bg-red-950/50 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-105'
                      : 'border-stone-700 bg-[#1e202a] text-stone-200 hover:border-amber-400 hover:bg-[#252838]'
                  }`}
                >
                  {/* Ícone de Seleção Marcado no Canto Superior Direito */}
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-xs text-white font-black shadow">
                      ✓
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl mb-1.5 drop-shadow">{t.icon}</span>
                  <span className="text-sm sm:text-base font-bold text-center leading-tight">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Campo Nome */}
          <div>
            <label className="block text-base font-bold text-stone-200 uppercase tracking-wider mb-2">
              Nome do Item
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                selectedType === 'directory' 
                  ? 'Ex: Pasta de Mapas...' 
                  : selectedType === 'document'
                  ? 'Ex: Pistas dos Arquipélagos de Éter...'
                  : selectedType === 'npc'
                  ? 'Ex: Capitão Silas...'
                  : selectedType === 'character'
                  ? 'Ex: Aventureiro Thorne...'
                  : 'Ex: Mapa Tático do Vácuo...'
              }
              className="w-full px-5 py-3.5 rounded-xl border-2 border-stone-600 bg-[#0c0d14] text-white text-lg font-bold placeholder-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
            />
          </div>

          {/* Checkbox: Visível a todos (Regra da Mestre Augusta) */}
          <div className="flex items-start gap-4 p-4 rounded-2xl border-2 border-stone-800 bg-[#0f1017]">
            <input
              type="checkbox"
              id="visibleToAll"
              checked={isVisibleToPlayers}
              onChange={(e) => setIsVisibleToPlayers(e.target.checked)}
              className="w-6 h-6 mt-1 rounded border-stone-600 text-red-600 focus:ring-red-500 bg-stone-900 cursor-pointer accent-red-600 flex-shrink-0"
            />
            <label htmlFor="visibleToAll" className="cursor-pointer select-none">
              <span className="font-bold text-base sm:text-lg text-white block">
                Visível a todos os jogadores
              </span>
              <span className="text-sm sm:text-base font-bold block mt-1">
                {isVisibleToPlayers ? (
                  <span className="text-emerald-300">
                    👁️ Visível: Jogadores verão este item na biblioteca Firecast.
                  </span>
                ) : (
                  <span className="text-red-300">
                    🔒 Cadeado Vermelho: Oculto para jogadores! Ficará visível exclusivamente para você (Mestre).
                  </span>
                )}
              </span>
            </label>
          </div>

          {/* Botões Criar (Vermelho Firecast) e Cancelar */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t-2 border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-base font-bold tracking-wider transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="px-8 py-3 rounded-xl border-2 border-red-500 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-base uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Criar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
