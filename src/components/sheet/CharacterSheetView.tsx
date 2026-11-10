import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  Eye, 
  Activity, 
  Sparkles, 
  Dices, 
  BookOpen, 
  Save, 
  ArrowLeft, 
  Edit, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { Character } from '../../types/character';
import { DiceRollerModal } from '../dice/DiceRollerModal';
import { BiographyBookModal } from './BiographyBookModal';

interface CharacterSheetViewProps {
  character: Character;
  onSaveCharacter: (updatedChar: Character) => Promise<void>;
  onBackToCompass: () => void;
  isGmView?: boolean;
  initialTab?: 'atributos' | 'habilidades' | 'inventario' | 'diario';
}

export const CharacterSheetView: React.FC<CharacterSheetViewProps> = ({
  character,
  onSaveCharacter,
  onBackToCompass,
  isGmView = false,
  initialTab = 'atributos',
}) => {
  const [charData, setCharData] = useState<Character>(character);
  const [activeTab, setActiveTab] = useState<'atributos' | 'habilidades' | 'inventario' | 'diario'>(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Modals state
  const [diceModalOpen, setDiceModalOpen] = useState(false);
  const [diceRollBonus, setDiceRollBonus] = useState(0);
  const [diceRollReason, setDiceRollReason] = useState('Teste de Resolução D20');
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Quick stat adjusters
  const updateVital = (stat: 'pv' | 'psique' | 'si' | 'essencias', delta: number) => {
    setCharData((prev) => {
      const currentVal = prev[stat].current;
      const maxVal = prev[stat].max;
      const nextVal = Math.max(0, Math.min(maxVal, currentVal + delta));
      return {
        ...prev,
        [stat]: { ...prev[stat], current: nextVal },
      };
    });
  };

  const handleTriggerRoll = (name: string, bonusValue: number) => {
    setDiceRollReason(name);
    setDiceRollBonus(bonusValue);
    setDiceModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSaveCharacter(charData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="relative w-full max-w-6xl h-full flex flex-col mx-auto pb-6 text-slate-100 select-none">
      {/* Top Sheet Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={onBackToCompass}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 text-amber-200 hover:text-white hover:bg-slate-800 text-sm font-serif font-bold tracking-wider shadow-lg transition-all hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bússola Arcana</span>
        </button>

        <div className="flex items-center space-x-3">
          {isGmView && (
            <span className="px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-500/50 shadow">
              👑 Visão da Mestre
            </span>
          )}
          {savedSuccess && (
            <span className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-mono font-bold shadow-lg animate-pulse">
              <Check className="w-4 h-4" />
              <span>Sincronizado com a Mestre!</span>
            </span>
          )}

          <button
            onClick={() => handleTriggerRoll('Teste Rápido de Sorte', 0)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-sky-400/50 text-sky-200 hover:text-white hover:bg-sky-950/80 text-xs md:text-sm font-serif font-bold tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Dices className="w-4 h-4 text-sky-300" />
            <span>Rolar D20</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-serif font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Ficha'}</span>
          </button>
        </div>
      </div>

      {/* Main Sheet Container */}
      <div className="relative flex-1 bg-slate-950/85 border-2 border-amber-500/40 rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-y-auto">
        
        {/* Top Grid: Portrait & Identity + Vitals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Column 1: Portrait & Core Identity (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/70 border border-amber-500/30 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg">
            {/* Ornate Portrait Frame */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-[0_0_30px_rgba(212,175,55,0.4)] mb-4 group">
              <img
                src={charData.avatarUrl || './art/journey.webp'}
                alt={charData.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                className="absolute bottom-2 right-2 p-2 rounded-xl bg-black/80 border border-amber-400 text-amber-300 hover:text-white cursor-pointer transition-colors"
                title="Mudar Imagem do Personagem"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {isEditingAvatar && (
              <div className="w-full mb-4 p-3 bg-black/80 border border-amber-500/40 rounded-xl flex flex-col space-y-2">
                <span className="text-[11px] font-mono text-amber-300">URL da Imagem do Personagem:</span>
                <input
                  type="text"
                  value={charData.avatarUrl}
                  onChange={(e) => setCharData({ ...charData, avatarUrl: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-100"
                />
                <button
                  onClick={() => setIsEditingAvatar(false)}
                  className="px-3 py-1 bg-amber-600 text-slate-950 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            )}

            {/* Character Editable Names */}
            <input
              type="text"
              value={charData.name}
              onChange={(e) => setCharData({ ...charData, name: e.target.value })}
              className="w-full text-center text-2xl md:text-3xl font-serif font-black text-gold-gradient tracking-wide bg-transparent border-b border-transparent hover:border-amber-500/40 focus:border-amber-400 focus:outline-none mb-1 drop-shadow"
            />
            <input
              type="text"
              value={charData.title}
              onChange={(e) => setCharData({ ...charData, title: e.target.value })}
              className="w-full text-center text-xs md:text-sm font-serif italic text-amber-300 font-semibold bg-transparent border-b border-transparent hover:border-amber-500/40 focus:border-amber-400 focus:outline-none mb-3"
            />

            {/* Lineage & Player Label */}
            <div className="w-full pt-3 border-t border-amber-500/20 flex flex-col space-y-1 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-amber-400 font-bold">Linhagem:</span>
                <input
                  type="text"
                  value={charData.lineage}
                  onChange={(e) => setCharData({ ...charData, lineage: e.target.value })}
                  className="text-right bg-transparent text-amber-100 font-bold focus:outline-none focus:border-b border-amber-400"
                />
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-amber-400 font-bold">Jogador:</span>
                <span className="text-amber-200 font-bold">{charData.playerName}</span>
              </div>
            </div>

            {/* Quote */}
            <div className="w-full mt-4 p-3 bg-black/50 border border-amber-500/20 rounded-xl">
              <textarea
                value={charData.quote}
                onChange={(e) => setCharData({ ...charData, quote: e.target.value })}
                rows={2}
                className="w-full text-center text-xs font-reading italic text-amber-100/90 bg-transparent resize-none focus:outline-none"
              />
            </div>

            {/* Button to Open Grand Biography Book Modal */}
            <button
              onClick={() => setBioModalOpen(true)}
              className="w-full mt-4 py-3 rounded-xl bg-slate-900 border border-amber-500/50 hover:bg-slate-800 text-amber-200 font-serif font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Abrir Crônicas & Biografia</span>
            </button>
          </div>

          {/* Column 2: Status Vitais & Essências (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            {/* Vitals Bar Modules */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              
              {/* PV (Pontos de Vida) */}
              <div className="bg-slate-900/80 border-2 border-red-500/40 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                <div className="flex items-center space-x-1.5 text-red-400 font-serif font-bold text-xs mb-1">
                  <Heart className="w-4 h-4 fill-red-500" />
                  <span>Vida (PV)</span>
                </div>
                <div className="text-3xl font-mono font-black text-red-200 my-1">
                  {charData.pv.current} <span className="text-sm text-red-400 font-normal">/ {charData.pv.max}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateVital('pv', -1)}
                    className="w-7 h-7 rounded-lg bg-red-950/80 hover:bg-red-800 text-red-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => updateVital('pv', 1)}
                    className="w-7 h-7 rounded-lg bg-red-950/80 hover:bg-red-800 text-red-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CA (Classe de Armadura) */}
              <div className="bg-slate-900/80 border-2 border-sky-500/40 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg">
                <div className="flex items-center space-x-1.5 text-sky-400 font-serif font-bold text-xs mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Armadura (CA)</span>
                </div>
                <div className="text-3xl font-mono font-black text-sky-200 my-1">
                  {charData.ca}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => setCharData({ ...charData, ca: Math.max(0, charData.ca - 1) })}
                    className="w-7 h-7 rounded-lg bg-sky-950/80 hover:bg-sky-800 text-sky-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCharData({ ...charData, ca: charData.ca + 1 })}
                    className="w-7 h-7 rounded-lg bg-sky-950/80 hover:bg-sky-800 text-sky-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Psique (Sanidade) */}
              <div className="bg-slate-900/80 border-2 border-purple-500/40 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg">
                <div className="flex items-center space-x-1.5 text-purple-400 font-serif font-bold text-xs mb-1">
                  <Eye className="w-4 h-4" />
                  <span>Psique (Sanidade)</span>
                </div>
                <div className="text-3xl font-mono font-black text-purple-200 my-1">
                  {charData.psique.current} <span className="text-sm text-purple-400 font-normal">/ {charData.psique.max}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateVital('psique', -1)}
                    className="w-7 h-7 rounded-lg bg-purple-950/80 hover:bg-purple-800 text-purple-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => updateVital('psique', 1)}
                    className="w-7 h-7 rounded-lg bg-purple-950/80 hover:bg-purple-800 text-purple-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SI (Sistema Imune) */}
              <div className="bg-slate-900/80 border-2 border-emerald-500/40 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-serif font-bold text-xs mb-1">
                  <Activity className="w-4 h-4" />
                  <span>Imunidade (SI)</span>
                </div>
                <div className="text-3xl font-mono font-black text-emerald-200 my-1">
                  {charData.si.current} <span className="text-sm text-emerald-400 font-normal">/ {charData.si.max}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateVital('si', -1)}
                    className="w-7 h-7 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => updateVital('si', 1)}
                    className="w-7 h-7 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* O Medidor de Essências / Éter (Estilo Firecast) */}
            <div className="bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-cyan-950/80 border-2 border-amber-400/60 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between shadow-xl">
              <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-serif font-black text-amber-200">
                    Essências & Éter Arcana
                  </h4>
                  <p className="text-xs text-slate-300 font-reading">
                    Pontos de mana e invocação para habilidades e milagres do Cerne
                  </p>
                </div>
              </div>

              {/* Essence Counter with +/- */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateVital('essencias', -1)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-amber-500/40 hover:border-amber-300 text-amber-200 text-lg font-bold flex items-center justify-center hover:bg-slate-800 cursor-pointer shadow-md active:scale-95 transition-all"
                  title="Gastar Essência (-1)"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="text-center px-4 py-1.5 rounded-xl bg-black/60 border border-amber-400/40">
                  <span className="text-3xl md:text-4xl font-mono font-black text-gold-gradient drop-shadow">
                    {charData.essencias.current}
                  </span>
                  <span className="text-sm font-mono text-amber-400 font-bold"> / {charData.essencias.max}</span>
                </div>

                <button
                  onClick={() => updateVital('essencias', 1)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-amber-500/40 hover:border-amber-300 text-amber-200 text-lg font-bold flex items-center justify-center hover:bg-slate-800 cursor-pointer shadow-md active:scale-95 transition-all"
                  title="Recuperar Essência (+1)"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs for Bottom Half */}
            <div className="flex border-b border-amber-500/30 space-x-2 pt-2">
              <button
                onClick={() => setActiveTab('atributos')}
                className={`px-5 py-2.5 rounded-t-xl font-serif text-sm font-bold tracking-wider cursor-pointer transition-all ${
                  activeTab === 'atributos'
                    ? 'bg-amber-600 text-slate-950 shadow-md font-black'
                    : 'text-amber-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                Atributos & Perícias
              </button>
              <button
                onClick={() => setActiveTab('habilidades')}
                className={`px-5 py-2.5 rounded-t-xl font-serif text-sm font-bold tracking-wider cursor-pointer transition-all ${
                  activeTab === 'habilidades'
                    ? 'bg-amber-600 text-slate-950 shadow-md font-black'
                    : 'text-amber-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                Habilidades & Dons
              </button>
              <button
                onClick={() => setActiveTab('inventario')}
                className={`px-5 py-2.5 rounded-t-xl font-serif text-sm font-bold tracking-wider cursor-pointer transition-all ${
                  activeTab === 'inventario'
                    ? 'bg-amber-600 text-slate-950 shadow-md font-black'
                    : 'text-amber-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                Inventário & Carga
              </button>
              <button
                onClick={() => setActiveTab('diario')}
                className={`px-5 py-2.5 rounded-t-xl font-serif text-sm font-bold tracking-wider cursor-pointer transition-all ${
                  activeTab === 'diario'
                    ? 'bg-amber-600 text-slate-950 shadow-md font-black'
                    : 'text-amber-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                Diário de Bordo
              </button>
            </div>

          </div>
        </div>

        {/* Tab 1: Os 6 Atributos e Perícias Autênticas de CORE */}
        {activeTab === 'atributos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Força */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">FORÇA</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Força', Math.floor((charData.attributes.forca.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.forca.value} (+{Math.floor((charData.attributes.forca.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.forca.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.forca.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agilidade */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">AGILIDADE</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Agilidade', Math.floor((charData.attributes.agilidade.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.agilidade.value} (+{Math.floor((charData.attributes.agilidade.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.agilidade.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.agilidade.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vigor */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">VIGOR</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Vigor', Math.floor((charData.attributes.vigor.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.vigor.value} (+{Math.floor((charData.attributes.vigor.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.vigor.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.vigor.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intelecto */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">INTELECTO</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Intelecto', Math.floor((charData.attributes.intelecto.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.intelecto.value} (+{Math.floor((charData.attributes.intelecto.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.intelecto.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.intelecto.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Percepção */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">PERCEPÇÃO</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Percepção', Math.floor((charData.attributes.percepcao.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.percepcao.value} (+{Math.floor((charData.attributes.percepcao.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.percepcao.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.percepcao.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Presença */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-amber-500/20">
                <span className="font-serif font-black text-lg text-amber-200">PRESENÇA</span>
                <button
                  onClick={() => handleTriggerRoll('Teste de Presença', Math.floor((charData.attributes.presenca.value - 10) / 2))}
                  className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 hover:bg-amber-800 text-amber-200 font-mono text-sm font-bold cursor-pointer transition-colors"
                >
                  {charData.attributes.presenca.value} (+{Math.floor((charData.attributes.presenca.value - 10) / 2)})
                </button>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(charData.attributes.presenca.pericias).map(([skill, val]) => (
                  <div
                    key={skill}
                    onClick={() => handleTriggerRoll(`Perícia: ${skill.toUpperCase()}`, val + Math.floor((charData.attributes.presenca.value - 10) / 2))}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 cursor-pointer text-slate-300 hover:text-amber-200 transition-colors"
                  >
                    <span className="capitalize">{skill}</span>
                    <span className="font-bold text-amber-400">+{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Habilidades, Dons e Maldições (Área Livre do Jogador) */}
        {activeTab === 'habilidades' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs font-sans text-amber-200/90 leading-relaxed">
              Escreva e organize abaixo seus <strong>Dons do Cerne</strong> (ex: Caminhante, Predecessor), <strong>Fardos do Verbo</strong> (ex: Doença da Fera, Crispo) e <strong>Habilidades de Combate</strong> livremente:
            </div>
            <textarea
              value={charData.habilidadesNotas}
              onChange={(e) => setCharData({ ...charData, habilidadesNotas: e.target.value })}
              rows={12}
              className="w-full p-5 rounded-2xl bg-black/60 border border-amber-500/40 text-slate-100 font-reading text-base md:text-lg leading-relaxed focus:outline-none focus:border-amber-400 shadow-inner"
              placeholder="• Don do Cerne: Caminhante (Nível 2)..."
            />
          </div>
        )}

        {/* Tab 3: Inventário & Carga */}
        {activeTab === 'inventario' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs font-sans text-slate-300 leading-relaxed">
              Gerencie suas armas de éter, dirigíveis, poções, cristais e cargas transportadas a bordo:
            </div>
            <textarea
              value={charData.inventario}
              onChange={(e) => setCharData({ ...charData, inventario: e.target.value })}
              rows={12}
              className="w-full p-5 rounded-2xl bg-black/60 border border-amber-500/40 text-slate-100 font-reading text-base md:text-lg leading-relaxed focus:outline-none focus:border-amber-400 shadow-inner"
              placeholder="• 1x Sabre de Éter Cristalino..."
            />
          </div>
        )}

        {/* Tab 4: Diário de Bordo Pessoal */}
        {activeTab === 'diario' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs font-sans text-amber-200/90 leading-relaxed">
              Memórias pessoais da jornada, pistas descobertas nos céus partidos e anotações secretas:
            </div>
            <textarea
              value={charData.diario}
              onChange={(e) => setCharData({ ...charData, diario: e.target.value })}
              rows={14}
              className="w-full p-5 rounded-2xl bg-[#090b10] border border-amber-500/40 text-amber-100 font-serif text-base md:text-lg leading-relaxed focus:outline-none focus:border-amber-400 shadow-inner"
              placeholder="Entrada 1: Partimos do porto flutuante de Aethelgard ao raiar das correntes de éter..."
            />
          </div>
        )}

      </div>

      {/* Dice Roller Modal */}
      <DiceRollerModal
        isOpen={diceModalOpen}
        onClose={() => setDiceModalOpen(false)}
        initialBonus={diceRollBonus}
        rollReason={diceRollReason}
      />

      {/* Biography Book Modal */}
      <BiographyBookModal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        characterName={charData.name}
        biography={charData.biografia}
        onSaveBiography={(newBio) => setCharData({ ...charData, biografia: newBio })}
      />
    </div>
  );
};
