import React, { useState, useEffect } from 'react';
import { FirecastItem } from '../../types/firecast';
import { Upload } from 'lucide-react';

interface NpcEditorModalProps {
  isOpen: boolean;
  item: FirecastItem | null;
  isGM: boolean;
  onClose: () => void;
  onSave: (updated: Partial<FirecastItem>) => void;
}

const NPC_AVATAR_PRESETS = [
  { label: 'Navegante', url: './art/journey.webp', icon: '👤' },
  { label: 'Emblema Real', url: './art/emblem.webp', icon: '💎' },
  { label: 'Nobreza / Rainha', url: './art/banner-top.webp', icon: '👑' },
  { label: 'Arquivo / Erudito', url: './art/library.webp', icon: '📜' },
  { label: 'Místico / Astrolábio', url: './art/radial-compass.webp', icon: '🧭' },
  { label: 'Pergaminho Antigo', url: './art/page-bg.webp', icon: '📄' },
];

export const NpcEditorModal: React.FC<NpcEditorModalProps> = ({
  isOpen,
  item,
  isGM,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [faction, setFaction] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('./art/journey.webp');
  const [description, setDescription] = useState('');
  const [isSecretLore, setIsSecretLore] = useState('');
  const [isVisibleToPlayers, setIsVisibleToPlayers] = useState(true);

  useEffect(() => {
    if (item && item.type === 'npc') {
      setName(item.name || '');
      setTitle(item.npcData?.title || '');
      setFaction(item.npcData?.faction || '');
      setAvatarUrl(item.npcData?.avatarUrl || './art/journey.webp');
      setDescription(item.npcData?.description || '');
      setIsSecretLore(item.npcData?.isSecretLore || '');
      setIsVisibleToPlayers(item.npcData?.isVisibleToPlayers ?? item.isVisibleToPlayers);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      isVisibleToPlayers,
      npcData: {
        avatarUrl,
        title: title.trim(),
        faction: faction.trim(),
        description: description.trim(),
        isSecretLore: isSecretLore.trim(),
        isVisibleToPlayers,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0f111a] border-2 border-amber-500 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.4)] overflow-hidden my-6 text-stone-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 border-b-2 border-stone-800 bg-gradient-to-r from-amber-950/80 to-[#141624] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👤</span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-200">
                {isGM ? 'Editar Dados do NPC' : 'Ficha de Contato do NPC'}
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
          
          {/* Nome e Título */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
                Nome do NPC *
              </label>
              <input
                type="text"
                required
                disabled={!isGM}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Jasmine Thorne"
                className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-lg font-bold placeholder-stone-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
                Título ou Ocupação
              </label>
              <input
                type="text"
                disabled={!isGM}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Matriarca dos Céus • Luzitana"
                className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-base sm:text-lg font-bold placeholder-stone-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Facção */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Facção ou Aliança
            </label>
            <input
              type="text"
              disabled={!isGM}
              value={faction}
              onChange={(e) => setFaction(e.target.value)}
              placeholder="Ex: Casa Thorne, Consórcio Pálido, Guardiões de Latonita..."
              className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-base sm:text-lg font-bold placeholder-stone-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Seletor de Avatar / Ilustração */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Foto / Ilustração do NPC
            </label>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-2xl border-2 border-amber-400 overflow-hidden bg-stone-900 shadow-xl flex-shrink-0">
                <img 
                  src={avatarUrl} 
                  alt="" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { (e.target as HTMLImageElement).src = './art/journey.webp'; }}
                />
              </div>
              
              {isGM && (
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-2">
                    {NPC_AVATAR_PRESETS.map((p) => (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => setAvatarUrl(p.url)}
                        className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2 cursor-pointer transition-all ${
                          avatarUrl === p.url
                            ? 'border-amber-400 bg-amber-950/80 text-white ring-2 ring-amber-400 font-bold'
                            : 'border-stone-800 bg-stone-900 text-stone-300 hover:text-white hover:border-stone-600'
                        }`}
                      >
                        <span className="text-xl">{p.icon}</span>
                        <span className="text-xs sm:text-sm font-bold truncate">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isGM && (
              <div className="space-y-2">
                <label
                  htmlFor="npc-avatar-file-upload"
                  className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500 text-amber-200 text-xs font-serif font-bold cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>📁 Enviar Imagem do Computador / Celular</span>
                </label>
                <input
                  id="npc-avatar-file-upload"
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

                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Ou cole a URL da imagem: https://... ou ./art/..."
                  className="w-full px-4 py-2 bg-[#0a0b12] border border-stone-700 rounded-xl text-stone-300 text-xs font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            )}
          </div>

          {/* Descrição Pública */}
          <div>
            <label className="block text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide mb-2">
              Descrição Geral do NPC
            </label>
            <textarea
              rows={4}
              disabled={!isGM}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a aparência, postura, personalidade e histórico público deste personagem..."
              className="w-full px-5 py-3.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-base sm:text-lg leading-relaxed placeholder-stone-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Segredo da Mestre (Apenas Mestre vê e edita) */}
          {isGM && (
            <div className="p-5 rounded-2xl border-2 border-purple-500/70 bg-purple-950/30 shadow-lg space-y-2">
              <label className="block text-base sm:text-lg font-black text-purple-200 uppercase tracking-wide flex items-center gap-2">
                <span>👑</span> Segredo Exclusivo da Mestre
              </label>
              <p className="text-sm font-semibold text-purple-300">
                Informações confidenciais da trama, fraquezas, intenções secretas ou estatísticas de combate. Jogadores nunca verão este bloco.
              </p>
              <textarea
                rows={3}
                value={isSecretLore}
                onChange={(e) => setIsSecretLore(e.target.value)}
                placeholder="Ex: Na verdade é uma agente infiltrada que responde diretamente à coroa secreta..."
                className="w-full px-5 py-3 bg-[#0c0915] border-2 border-purple-500/50 focus:border-purple-300 rounded-xl text-purple-100 text-base sm:text-lg leading-relaxed placeholder-purple-400/50 focus:outline-none"
              />
            </div>
          )}

          {/* Interruptor de Visibilidade (Regra da Mestre Augusta) */}
          {isGM && (
            <div className="p-5 rounded-2xl border-2 border-stone-800 bg-[#0a0b12]">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="npcVisibilityToggle"
                  checked={isVisibleToPlayers}
                  onChange={(e) => setIsVisibleToPlayers(e.target.checked)}
                  className="w-7 h-7 mt-1 rounded border-stone-600 text-emerald-500 focus:ring-emerald-400 bg-stone-900 cursor-pointer accent-emerald-500 flex-shrink-0"
                />
                <label htmlFor="npcVisibilityToggle" className="cursor-pointer select-none">
                  <span className={`text-lg sm:text-xl font-black block ${
                    isVisibleToPlayers ? 'text-emerald-300' : 'text-red-400'
                  }`}>
                    {isVisibleToPlayers ? '👁️ Visível para os Jogadores' : '🔒 Oculto com Cadeado Vermelho'}
                  </span>
                  <span className="text-stone-300 text-base font-bold block mt-1">
                    {isVisibleToPlayers
                      ? '✓ Jogadores podem ver o nome e a foto deste NPC na biblioteca.'
                      : '🔒 Regra Ativa: Jogadores NÃO veem o nome nem a foto! Ficará totalmente invisível.'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Botões do Rodapé */}
          <div className="pt-4 border-t-2 border-stone-800 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl border-2 border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 text-base font-bold cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            {isGM && (
              <button
                type="submit"
                disabled={!name.trim()}
                className="px-8 py-3.5 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-lg uppercase tracking-wider shadow-xl disabled:opacity-40 cursor-pointer transition-all active:scale-95"
              >
                Salvar Alterações
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
