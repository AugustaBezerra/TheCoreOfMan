import React, { useState, useEffect } from 'react';
import { FirecastItem } from '../../types/firecast';

interface GridMapEditorModalProps {
  isOpen: boolean;
  item: FirecastItem | null;
  isGM: boolean;
  onClose: () => void;
  onSave: (updated: Partial<FirecastItem>) => void;
  onOpenGridMap?: (gridItem: FirecastItem) => void;
}

const MAP_PRESETS = [
  { label: 'Carta Náutica', url: './art/parchment-center.webp', icon: '🗺️' },
  { label: 'Cidadela Flutuante', url: './art/banner-top.webp', icon: '🏰' },
  { label: 'Arquivo Astral', url: './art/library.webp', icon: '📖' },
  { label: 'Astrolábio Celestial', url: './art/radial-compass.webp', icon: '🧭' },
  { label: 'Besta do Vácuo', url: './art/journey.webp', icon: '🐉' },
  { label: 'Cerne / Emblema', url: './art/emblem.webp', icon: '💎' },
  { label: 'Pergaminho de Pistas', url: './art/page-bg.webp', icon: '📜' },
  { label: 'Grimório Selado', url: './art/book-closed.webp', icon: '📕' },
];

export const GridMapEditorModal: React.FC<GridMapEditorModalProps> = ({
  isOpen,
  item,
  isGM,
  onClose,
  onSave,
  onOpenGridMap,
}) => {
  const [name, setName] = useState('');
  const [mapUrl, setMapUrl] = useState('./art/parchment-center.webp');
  const [notes, setNotes] = useState('');
  const [isVisibleToPlayers, setIsVisibleToPlayers] = useState(true);

  useEffect(() => {
    if (item && item.type === 'grid') {
      setName(item.name || '');
      setMapUrl(item.gridData?.mapUrl || './art/parchment-center.webp');
      setNotes(item.gridData?.notes || '');
      setIsVisibleToPlayers(item.isVisibleToPlayers ?? true);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      isVisibleToPlayers,
      gridData: {
        ...(item.gridData || {}),
        mapUrl,
        notes: notes.trim(),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0f111a] border-2 border-amber-500 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.4)] overflow-hidden my-6 text-stone-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 border-b-2 border-stone-800 bg-gradient-to-r from-amber-950/80 to-[#141624] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">▦</span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-200">
                {isGM ? 'Editar Mapa & Cenário Tático' : 'Visualização do Mapa'}
              </h3>
              <p className="text-base text-amber-300 font-bold mt-0.5">
                {name || item.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center text-2xl font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Formulário com tipografia grande e acessível */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Nome do Mapa */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Nome do Mapa *
            </label>
            <input
              type="text"
              required
              disabled={!isGM}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mapa das Rotas de Éter, Posto de Latonita..."
              className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-lg font-bold placeholder-stone-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Pré-visualização da Imagem do Mapa */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Ilustração do Mapa
            </label>
            
            <div className="w-full h-52 sm:h-64 rounded-2xl border-2 border-amber-400 overflow-hidden bg-stone-950 shadow-xl mb-4 relative group">
              <img 
                src={mapUrl} 
                alt="Mapa Tático" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = './art/parchment-center.webp'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-amber-200 text-sm font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur border border-amber-500/30">
                  {name || 'Mapa Atual'}
                </span>
              </div>
            </div>

            {/* Presets de Imagem */}
            {isGM && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-300 uppercase">
                  Escolha um tema ou digite o link abaixo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {MAP_PRESETS.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setMapUrl(p.url)}
                      className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2 cursor-pointer transition-all ${
                        mapUrl === p.url
                          ? 'border-amber-400 bg-amber-950/80 text-white ring-2 ring-amber-400 font-bold'
                          : 'border-stone-800 bg-stone-900 text-stone-300 hover:text-white hover:border-stone-600'
                      }`}
                    >
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-xs sm:text-sm font-bold truncate">{p.label}</span>
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="URL ou caminho: ./art/parchment-center.webp ou https://..."
                  className="w-full px-4 py-2.5 bg-[#0a0b12] border border-stone-700 rounded-xl text-stone-300 text-sm font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            )}
          </div>

          {/* Notas Táticas da Mestre */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Notas Táticas da Mestre (Clima, Obstáculos, Encontros)
            </label>
            <textarea
              rows={4}
              disabled={!isGM}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descreva correntes de vento, ilhas flutuantes perigosas, armadilhas, ou posições de monstros..."
              className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-base sm:text-lg leading-relaxed placeholder-stone-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Interruptor de Visibilidade */}
          {isGM && (
            <div className="p-5 rounded-2xl border-2 border-stone-800 bg-[#0a0b12]">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="gridVisibilityToggle"
                  checked={isVisibleToPlayers}
                  onChange={(e) => setIsVisibleToPlayers(e.target.checked)}
                  className="w-7 h-7 mt-1 rounded border-stone-600 text-emerald-500 focus:ring-emerald-400 bg-stone-900 cursor-pointer accent-emerald-500 flex-shrink-0"
                />
                <label htmlFor="gridVisibilityToggle" className="cursor-pointer select-none">
                  <span className={`text-lg sm:text-xl font-black block ${
                    isVisibleToPlayers ? 'text-emerald-300' : 'text-red-400'
                  }`}>
                    {isVisibleToPlayers ? '👁️ Visível aos Jogadores' : '🔒 Oculto dos Jogadores (Cadeado Vermelho)'}
                  </span>
                  <span className="text-stone-300 text-base font-bold block mt-1">
                    {isVisibleToPlayers
                      ? '✓ Jogadores podem abrir e inspecionar este mapa na biblioteca.'
                      : '🔒 Confidencial: Apenas a Mestre pode ver e abrir este mapa.'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Botões do Rodapé */}
          <div className="pt-4 border-t-2 border-stone-800 flex flex-wrap items-center justify-between gap-4">
            {onOpenGridMap ? (
              <button
                type="button"
                onClick={() => {
                  onOpenGridMap(item);
                  onClose();
                }}
                className="px-5 py-3 rounded-xl border-2 border-sky-400 bg-sky-950/70 hover:bg-sky-900 text-sky-200 font-bold text-base flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>🗺️</span> Abrir no Tabuleiro Tático
              </button>
            ) : <div />}

            <div className="flex items-center gap-4 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 rounded-xl border-2 border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 text-base font-bold cursor-pointer transition-colors"
              >
                Fechar
              </button>
              {isGM && (
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="px-8 py-3.5 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-lg uppercase tracking-wider shadow-xl disabled:opacity-40 cursor-pointer transition-all active:scale-95"
                >
                  Salvar Mapa
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
