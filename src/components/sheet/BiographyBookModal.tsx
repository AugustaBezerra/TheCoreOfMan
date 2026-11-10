import React, { useState } from 'react';
import { X, BookOpen, Edit3, Save, Check } from 'lucide-react';

interface BiographyBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
  biography: string;
  onSaveBiography: (newBio: string) => void;
}

export const BiographyBookModal: React.FC<BiographyBookModalProps> = ({
  isOpen,
  onClose,
  characterName,
  biography,
  onSaveBiography,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(biography);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveBiography(bioText);
    setIsEditing(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[88vh] flex flex-col rounded-3xl overflow-hidden border-4 border-[#8c6d3b] shadow-[0_0_80px_rgba(0,0,0,0.95)] bg-[#0a0f1d]">
        
        {/* Top Ornate Bar */}
        <div className="relative z-20 flex items-center justify-between px-6 py-3.5 bg-slate-950/90 border-b border-amber-500/30">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400/80 block">
                Crônicas e Origem do Navegante
              </span>
              <h3 className="text-lg md:text-xl font-serif font-bold text-amber-100">
                {characterName} &bull; Biografia Sagrada
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {savedAlert && (
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Salvo no Grimório!</span>
              </span>
            )}

            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-black text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar História</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/50 hover:bg-slate-800 text-amber-200 text-xs font-serif font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Escrever / Editar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Parchment Sheet Background */}
        <div 
          className="absolute inset-0 top-16 bg-cover bg-center pointer-events-none opacity-90"
          style={{ backgroundImage: `url('./art/parchment-center.webp')` }}
        />

        {/* Soft Warm Shield for Legibility */}
        <div className="absolute inset-3 top-20 bg-[#fbf4e4]/95 rounded-2xl pointer-events-none border border-[#8c6d3b]/40 shadow-inner" />

        {/* Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-8 sm:px-16 md:px-24 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header Ornament */}
            <div className="text-center mb-6">
              <span className="text-xs font-serif tracking-[0.45em] uppercase text-amber-950 font-black block mb-1">
                Memorial do Personagem
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#5c1818] mb-3">
                Memórias e Origens
              </h2>
              <div className="flex justify-center">
                <img
                  src="./art/divider.webp"
                  alt="Divider"
                  className="max-w-[260px] md:max-w-sm h-auto object-contain opacity-90 drop-shadow-sm"
                />
              </div>
            </div>

            {/* Read View vs Edit View */}
            {isEditing ? (
              <div className="space-y-4">
                <p className="text-xs font-sans font-semibold text-stone-700">
                  Escreva aqui a trajetória do seu personagem, seus votos, traumas do vácuo e laços com a tripulação:
                </p>
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={16}
                  className="w-full p-6 rounded-2xl bg-[#fffdfa]/95 border-2 border-[#8c6d3b]/50 text-stone-950 font-reading text-lg leading-relaxed shadow-inner focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/30 resize-y"
                  placeholder="No início dos Céus Partidos..."
                />
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => {
                      setBioText(biography);
                      setIsEditing(false);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-stone-400 text-stone-700 hover:bg-stone-200 text-xs font-serif font-bold uppercase cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-black text-xs tracking-wider uppercase shadow-lg cursor-pointer"
                  >
                    Salvar no Livro
                  </button>
                </div>
              </div>
            ) : (
              <div className="parchment-reader text-stone-950 leading-relaxed font-normal whitespace-pre-line text-lg md:text-xl">
                {bioText.trim() ? (
                  bioText
                ) : (
                  <p className="italic text-stone-600 text-center py-12">
                    Nenhuma crônica registrada ainda. Clique em "Escrever / Editar" para narrar a lenda deste Navegante.
                  </p>
                )}
              </div>
            )}

            {/* Footer Signature */}
            <div className="mt-12 pt-6 border-t-2 border-amber-900/20 text-center flex flex-col items-center">
              <img
                src="./art/emblem.webp"
                alt="Emblem"
                className="w-12 h-12 object-contain opacity-80 mb-2"
              />
              <span className="text-xs font-serif font-bold tracking-widest uppercase text-stone-700">
                The Core of Man &bull; Registro dos Céus Partidos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
