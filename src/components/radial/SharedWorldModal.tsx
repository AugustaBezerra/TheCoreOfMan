import React, { useState, useEffect } from 'react';
import { SharedMediaItem, UserProfile } from '../../types/character';
import { getLocalSharedMedia } from '../../services/characterService';

interface SharedWorldModalProps {
  type: 'maps' | 'bestiary' | 'npcs';
  isOpen: boolean;
  currentUser: UserProfile | null;
  onClose: () => void;
}

export const SharedWorldModal: React.FC<SharedWorldModalProps> = ({
  type,
  isOpen,
  currentUser,
  onClose,
}) => {
  const [items, setItems] = useState<SharedMediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<SharedMediaItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      const all = getLocalSharedMedia();
      setItems(all);
      // Select first item by default if available
      const filtered = all.filter((m) => {
        if (!currentUser || currentUser.role !== 'gm') {
          if (m.isSecret) return false;
        }
        if (type === 'maps') return m.category === 'mapa';
        if (type === 'bestiary') return m.category === 'criatura';
        if (type === 'npcs') return m.category === 'cidade' || m.category === 'handout';
        return true;
      });
      if (filtered.length > 0) {
        setSelectedItem(filtered[0]);
      } else {
        setSelectedItem(null);
      }
    }
  }, [isOpen, type, currentUser]);

  if (!isOpen) return null;

  const isGm = currentUser?.role === 'gm';

  const relevantItems = items.filter((m) => {
    // If not GM, don't show secret items
    if (!isGm && m.isSecret) return false;

    if (type === 'maps' && m.category !== 'mapa') return false;
    if (type === 'bestiary' && m.category !== 'criatura') return false;
    if (type === 'npcs' && m.category !== 'cidade' && m.category !== 'handout') return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
    }
    return true;
  });

  const getTitle = () => {
    if (type === 'maps') return '🗺️ Cartografia dos Céus Partidos';
    if (type === 'bestiary') return '🐉 Bestiário dos Céus & Abismo';
    return '🤝 Pessoas, Cidades & Alianças';
  };

  const getSubtitle = () => {
    if (type === 'maps') return 'Rotas celestes, arquipélagos flutuantes e correntes de éter reveladas';
    if (type === 'bestiary') return 'Feras do vácuo, anomalias e abominações registradas';
    return 'Aliados, capitães renegados e postos comerciais encontrados na jornada';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0c1017] border-2 border-amber-600/50 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-stone-950 via-[#141b27] to-stone-950 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 tracking-wide">
              {getTitle()}
            </h2>
            <p className="text-xs text-amber-400/70 font-sans mt-0.5">
              {getSubtitle()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-amber-500/30 text-amber-300 hover:text-amber-100 hover:bg-amber-950/60 flex items-center justify-center text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Coluna Esquerda: Lista de Itens */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-amber-900/30 bg-[#080b10] flex flex-col">
            
            {/* Search Bar */}
            <div className="p-3 border-b border-stone-800">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou pista..."
                className="w-full px-3 py-2 bg-stone-900/90 border border-stone-700 rounded-xl text-xs text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {relevantItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500 font-serif">
                  Nenhum registro revelado pela Mestre até o momento.
                </div>
              ) : (
                relevantItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30 shadow-md'
                          : 'border-stone-800 bg-stone-900/40 hover:border-amber-600/40 hover:bg-stone-900/70'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg border border-amber-500/30 overflow-hidden bg-stone-950 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-xs font-serif font-bold truncate ${
                          isSelected ? 'text-amber-200' : 'text-stone-200'
                        }`}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-stone-400 truncate mt-0.5">
                          {item.description}
                        </p>
                        {item.isSecret && (
                          <span className="inline-block mt-1 text-[9px] text-red-400 uppercase font-bold">
                            🔒 Segredo
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>

          {/* Coluna Direita: Detalhe do Item Selecionado */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {selectedItem ? (
              <div className="space-y-6">
                
                {/* Imagem com Borda Dourada e Moldura */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-stone-950 max-h-[420px] flex items-center justify-center">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-auto max-h-[420px] object-contain"
                  />
                  {selectedItem.isSecret && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-950/90 border border-red-500 text-red-200 text-xs font-serif font-bold uppercase shadow">
                      Segredo da Mestre
                    </div>
                  )}
                </div>

                {/* Título e Descrição */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-amber-200">
                    {selectedItem.title}
                  </h3>
                  <div className="p-4 rounded-xl border border-amber-900/30 bg-stone-950/60 text-stone-200 font-serif leading-relaxed text-sm whitespace-pre-wrap">
                    {selectedItem.description}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-3">
                <div className="text-4xl text-stone-700">📜</div>
                <p className="text-sm font-serif">Selecione um registro na lista lateral para inspecionar</p>
              </div>
            )}

            {/* Footer com Dica de Roleplay */}
            <div className="pt-4 border-t border-amber-900/30 flex items-center justify-between text-xs text-amber-400/60 font-serif">
              <span>Registrado no Astrolábio de CORE</span>
              <span>A Era dos Céus Partidos</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
