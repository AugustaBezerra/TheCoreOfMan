import React, { useState, useEffect } from 'react';
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
  Check,
  Upload,
  X,
  Crown
} from 'lucide-react';
import { Character, CharacterAttributes } from '../../types/character';
import { normalizeCharacter } from '../../services/characterService';
import { DiceRollerModal } from '../dice/DiceRollerModal';
import { BiographyBookModal } from './BiographyBookModal';

interface CharacterSheetViewProps {
  character: Character;
  onSaveCharacter: (updatedChar: Character) => Promise<void>;
  onBackToCompass?: () => void;
  onBack?: () => void;
  backLabel?: string;
  isGmView?: boolean;
  initialTab?: 'atributos' | 'habilidades' | 'inventario' | 'diario';
}

const SKILL_LABELS: Record<string, string> = {
  // Força
  atletismo: 'Atletismo',
  brutalidade: 'Brutalidade',
  luta: 'Luta',
  // Vigor
  constituicao: 'Constituição',
  recuperacao: 'Recuperação',
  tolerancia: 'Tolerância',
  // Destreza
  acrobacia: 'Acrobacia',
  furtividade: 'Furtividade',
  mira: 'Mira',
  // Carisma
  animais: 'Animais',
  labia: 'Lábia',
  teatralidade: 'Teatralidade',
  // Conhecimento
  historia: 'História',
  mito: 'Mito',
  raciocinio: 'Raciocínio',
  oficio: 'Ofício',
  // Inteligência
  intuicao: 'Intuição',
  percepcao: 'Percepção',
  sobrevivencia: 'Sobrevivência',
  // Força de Vontade
  mente: 'Mente',
  alma: 'Alma',
  corpo: 'Corpo',
  essencia: 'Essência',
};

const ATTR_CONFIG: Array<{
  key: keyof CharacterAttributes;
  label: string;
  category: string;
  desc: string;
}> = [
  { 
    key: 'forca', 
    label: 'FORÇA', 
    category: 'Físico',
    desc: 'Potência muscular pura, devastação física e capacidade de carga', 
  },
  { 
    key: 'vigor', 
    label: 'VIGOR', 
    category: 'Físico',
    desc: 'Resiliência biológica, saúde de ferro, fôlego e tolerância a traumas', 
  },
  { 
    key: 'destreza', 
    label: 'DESTREZA', 
    category: 'Físico',
    desc: 'Coordenação motora, velocidade de reflexos, equilíbrio e pontaria', 
  },
  { 
    key: 'carisma', 
    label: 'CARISMA', 
    category: 'Mental & Social',
    desc: 'Presença e magnetismo, liderança, diplomacia, lábia e empatia animal', 
  },
  { 
    key: 'conhecimento', 
    label: 'CONHECIMENTO', 
    category: 'Mental & Social',
    desc: 'Erudição acadêmica, história, mitologia arcana, lógica e ofícios', 
  },
  { 
    key: 'inteligencia', 
    label: 'INTELIGÊNCIA', 
    category: 'Mental & Social',
    desc: 'Agudeza sensorial, instinto prático, intuição e sobrevivência', 
  },
  { 
    key: 'forcaDeVontade', 
    label: 'FORÇA DE VONTADE', 
    category: 'Atributo Especial do Cerne',
    desc: 'Combustível da alma, armadura contra a loucura e canal da Essência', 
  },
];

export const CharacterSheetView: React.FC<CharacterSheetViewProps> = ({
  character,
  onSaveCharacter,
  onBackToCompass,
  onBack,
  backLabel,
  isGmView = false,
  initialTab = 'atributos',
}) => {
  const [charData, setCharData] = useState<Character>(() => normalizeCharacter(character));
  const [activeTab, setActiveTab] = useState<'atributos' | 'habilidades' | 'inventario' | 'diario'>(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sincronizar dados caso o personagem externo mude
  useEffect(() => {
    setCharData(normalizeCharacter(character));
  }, [character]);

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

  // Adjust Attribute value (+/-)
  const updateAttributeValue = (attrKey: keyof CharacterAttributes, delta: number) => {
    setCharData((prev) => {
      const currentVal = prev.attributes[attrKey].value;
      const nextVal = Math.max(1, currentVal + delta);
      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attrKey]: {
            ...prev.attributes[attrKey],
            value: nextVal,
          },
        },
      };
    });
  };

  // Adjust Skill rank (+/-)
  const updateSkillValue = (attrKey: keyof CharacterAttributes, skillName: string, delta: number) => {
    setCharData((prev) => {
      const currentSkills = prev.attributes[attrKey].pericias as Record<string, number>;
      const currentVal = currentSkills[skillName] ?? 0;
      const nextVal = Math.max(0, currentVal + delta);
      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attrKey]: {
            ...prev.attributes[attrKey],
            pericias: {
              ...currentSkills,
              [skillName]: nextVal,
            },
          },
        },
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

  const handleSaveBio = async (newBio: string) => {
    const updated: Character = { ...charData, biografia: newBio };
    setCharData(updated);
    await onSaveCharacter(updated);
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Sheet Header (Ações Limpas e Nobres) */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={onBack || onBackToCompass}
            className="px-3.5 py-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-300 hover:text-slate-100 text-xs sm:text-sm font-sans font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>{backLabel || (isGmView ? 'Voltar para a Biblioteca' : 'Voltar para o Hangar')}</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {isGmView && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase tracking-wider bg-amber-950/40 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Visão da Mestre</span>
              </span>
            )}

            {savedSuccess && (
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Ficha Sincronizada!</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => handleTriggerRoll('Teste de Resolução de Sorte (D20 Puro)', 0)}
              className="px-3.5 py-2 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-200 text-xs sm:text-sm font-sans font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Rolar D20 puro sem bônus"
            >
              <Dices className="w-4 h-4 text-amber-400" />
              <span>Rolar D20</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:brightness-110 active:scale-[0.98] text-slate-950 font-sans font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : 'Salvar Ficha'}</span>
            </button>
          </div>
        </header>

        {/* Painel Superior: Retrato + Identidade + Módulos Vitais */}
        <section className="rounded-2xl border border-slate-800/90 bg-[#0c1019] p-5 sm:p-7 shadow-lg space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Coluna 1: Retrato & Identidade do Navegante (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 flex flex-col items-center text-center space-y-4">
              
              {/* Retrato Nobre com Moldura de Bronze */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 shadow-md group flex-shrink-0">
                <img
                  src={charData.avatarUrl || './art/journey.webp'}
                  alt={charData.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  type="button"
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  className="absolute bottom-2 right-2 p-2 rounded-lg bg-slate-950/90 border border-slate-700 hover:border-amber-500/60 text-amber-300 hover:text-amber-100 cursor-pointer shadow-sm transition-colors"
                  title="Alterar Retrato"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* Nome & Título do Personagem */}
              <div className="w-full space-y-1">
                <input
                  type="text"
                  value={charData.name}
                  onChange={(e) => setCharData({ ...charData, name: e.target.value })}
                  className="w-full text-center text-2xl sm:text-3xl font-serif font-bold text-slate-100 tracking-wide bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors"
                  placeholder="Nome do Personagem"
                />
                <input
                  type="text"
                  value={charData.title}
                  onChange={(e) => setCharData({ ...charData, title: e.target.value })}
                  className="w-full text-center text-xs sm:text-sm font-sans text-amber-300/80 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors"
                  placeholder="Título / Ocupação"
                />
              </div>

              {/* Linhagem & Jogador */}
              <div className="w-full pt-3 border-t border-slate-800 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400 font-sans uppercase tracking-wider text-[11px]">Linhagem:</span>
                  <input
                    type="text"
                    value={charData.lineage}
                    onChange={(e) => setCharData({ ...charData, lineage: e.target.value })}
                    className="text-right bg-transparent text-slate-200 font-medium focus:outline-none focus:border-b border-amber-500/50"
                  />
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400 font-sans uppercase tracking-wider text-[11px]">Jogador:</span>
                  <span className="text-amber-200/90 font-medium">{charData.playerName || 'Navegante'}</span>
                </div>
              </div>

              {/* Lema / Citação (EB Garamond) */}
              <div className="w-full p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <textarea
                  value={charData.quote}
                  onChange={(e) => setCharData({ ...charData, quote: e.target.value })}
                  rows={2}
                  className="w-full text-center text-sm font-reading italic text-amber-200/90 bg-transparent resize-none focus:outline-none leading-relaxed"
                  placeholder="Citação ou lema do herói..."
                />
              </div>

              {/* Botão de Abrir Crônicas & Biografia */}
              <button
                type="button"
                onClick={() => setBioModalOpen(true)}
                className="w-full py-2.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-850 hover:border-amber-500/40 text-slate-200 text-xs sm:text-sm font-sans font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
              >
                <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Crônicas & Biografia</span>
              </button>
            </div>

            {/* Coluna 2: Status Vitais & Essências (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Módulos Vitais Táteis (Paleta Nobre Skyrim/Elden Ring - Fim do Arco-Íris) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                
                {/* 1. Vida (PV) */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4 flex flex-col items-center justify-between text-center space-y-2 hover:border-amber-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-slate-300">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
                    <span>Vida (PV)</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-100 my-1">
                    {charData.pv.current} <span className="text-xs text-slate-400 font-normal">/ {charData.pv.max}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateVital('pv', -1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-rose-500/50 hover:bg-rose-950/40 text-slate-300 hover:text-rose-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Diminuir PV (-1)"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateVital('pv', 1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Aumentar PV (+1)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Armadura (CA) */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4 flex flex-col items-center justify-between text-center space-y-2 hover:border-amber-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-slate-300">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Armadura (CA)</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-100 my-1">
                    {charData.ca}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCharData({ ...charData, ca: Math.max(0, charData.ca - 1) })}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Diminuir CA (-1)"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCharData({ ...charData, ca: charData.ca + 1 })}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Aumentar CA (+1)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. Psique (Sanidade) */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4 flex flex-col items-center justify-between text-center space-y-2 hover:border-amber-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-slate-300">
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span>Psique</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-100 my-1">
                    {charData.psique.current} <span className="text-xs text-slate-400 font-normal">/ {charData.psique.max}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateVital('psique', -1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Diminuir Psique (-1)"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateVital('psique', 1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Aumentar Psique (+1)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4. Imunidade (SI) */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4 flex flex-col items-center justify-between text-center space-y-2 hover:border-amber-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-slate-300">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span>Imunidade</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-100 my-1">
                    {charData.si.current} <span className="text-xs text-slate-400 font-normal">/ {charData.si.max}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateVital('si', -1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Diminuir Imunidade (-1)"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateVital('si', 1)}
                      className="w-7 h-7 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                      title="Aumentar Imunidade (+1)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Medidor de Essências & Éter Arcano (Sóbrio & Elegante) */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-950/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-sm flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-amber-200">
                      Essências & Éter Arcano
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                      Pontos de mana e canalização de milagres e dons do Cerne.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateVital('essencias', -1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-amber-200 text-sm font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                    title="Gastar Essência (-1)"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="px-4 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-center min-w-[90px]">
                    <span className="text-2xl font-mono font-bold text-amber-300">
                      {charData.essencias.current}
                    </span>
                    <span className="text-xs font-mono text-slate-400"> / {charData.essencias.max}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => updateVital('essencias', 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-amber-200 text-sm font-bold flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                    title="Recuperar Essência (+1)"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Divisor Rúnico Estilo Skyrim */}
              <div className="flex items-center justify-center my-2 space-x-4 opacity-40">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>

              {/* Abas Estilo Baldur's Gate 3 (Sublinhado Elegante) */}
              <nav className="flex flex-wrap gap-6 border-b border-slate-800 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('atributos')}
                  className={`pb-2.5 text-sm font-sans transition-colors cursor-pointer ${
                    activeTab === 'atributos'
                      ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 font-medium'
                  }`}
                >
                  Atributos & Perícias
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('habilidades')}
                  className={`pb-2.5 text-sm font-sans transition-colors cursor-pointer ${
                    activeTab === 'habilidades'
                      ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 font-medium'
                  }`}
                >
                  Habilidades & Dons
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventario')}
                  className={`pb-2.5 text-sm font-sans transition-colors cursor-pointer ${
                    activeTab === 'inventario'
                      ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 font-medium'
                  }`}
                >
                  Inventário & Carga
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('diario')}
                  className={`pb-2.5 text-sm font-sans transition-colors cursor-pointer ${
                    activeTab === 'diario'
                      ? 'font-semibold text-amber-200 border-b-2 border-amber-500 shadow-[0_4px_12px_-2px_rgba(212,175,55,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 font-medium'
                  }`}
                >
                  Diário de Bordo
                </button>
              </nav>

            </div>
          </div>
        </section>

        {/* TAB 1: OS 7 ATRIBUTOS & PERÍCIAS (Monocromia Nobre + Alto Contraste) */}
        {activeTab === 'atributos' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex flex-wrap items-center justify-between gap-2 shadow-sm">
              <span>✦ Use <strong>[-]</strong> ou <strong>[+]</strong> para distribuir pontos no Atributo e em suas Perícias associadas.</span>
              <span className="text-amber-300 font-medium">✦ Clique em <strong>Rolar D20</strong> para lançar o teste com a soma direta (Atributo + Perícia).</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ATTR_CONFIG.map(({ key, label, category, desc }) => {
                const attrObj = charData.attributes[key] || { value: 2, pericias: {} };
                const attrVal = attrObj.value ?? 2;
                const attrValStr = attrVal >= 0 ? `+${attrVal}` : `${attrVal}`;

                return (
                  <div 
                    key={key} 
                    className="rounded-xl border border-slate-800/90 bg-[#0c1019] hover:border-amber-500/30 transition-all p-5 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Header do Atributo */}
                      <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800">
                            {category}
                          </span>
                          <h3 className="font-serif font-bold text-xl text-slate-100 tracking-wide mt-1">
                            {label}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {desc}
                          </p>
                        </div>

                        {/* Modificador Ouro Velho */}
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-sm font-mono font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30">
                            {attrValStr}
                          </span>
                        </div>
                      </div>

                      {/* Controle de Pontos do Atributo (+/-) e Rolagem Pura */}
                      <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5 my-3.5 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-sans uppercase font-medium">Pontos:</span>
                          <button
                            type="button"
                            onClick={() => updateAttributeValue(key, -1)}
                            className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                            title={`Diminuir ${label} (-1)`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-base font-mono font-bold text-slate-100 min-w-[20px] text-center">
                            {attrVal}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateAttributeValue(key, 1)}
                            className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                            title={`Aumentar ${label} (+1)`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Botão Rolar Atributo Puro */}
                        <button
                          type="button"
                          onClick={() => handleTriggerRoll(`Teste Puro de ${label} (${attrValStr})`, attrVal)}
                          className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 hover:border-amber-500/40 border border-slate-700 text-slate-200 text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                          title={`Rolar D20 puro de ${label} com bônus de ${attrValStr}`}
                        >
                          <Dices className="w-3.5 h-3.5 text-amber-400" />
                          <span>D20 ({attrValStr})</span>
                        </button>
                      </div>

                      {/* Lista de Perícias Associadas */}
                      <div className="space-y-2.5">
                        <span className="text-[11px] font-sans font-semibold tracking-wider text-slate-400 uppercase block mb-1">
                          Perícias Treinadas ({label}):
                        </span>

                        {Object.entries(attrObj.pericias || {}).map(([skillKey, skillVal]) => {
                          const skillDisplayName = SKILL_LABELS[skillKey] || skillKey;
                          const totalSkillBonus = attrVal + skillVal;
                          const totalBonusStr = totalSkillBonus >= 0 ? `+${totalSkillBonus}` : `${totalSkillBonus}`;

                          return (
                            <div
                              key={skillKey}
                              className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/30 space-y-2 transition-all shadow-sm"
                            >
                              {/* Nome da Perícia + Total */}
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-sans font-semibold text-slate-100">
                                  {skillDisplayName}
                                </span>
                                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30">
                                  Total {totalBonusStr}
                                </span>
                              </div>

                              <div className="text-[11px] text-slate-400 font-sans">
                                {label} (+{attrVal}) + Graduação (+{skillVal})
                              </div>

                              {/* Controles de Graduação e Botão de Rolar */}
                              <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-800/80">
                                <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800">
                                  <span className="text-[10px] font-sans uppercase font-medium text-slate-400">Grad:</span>
                                  <button
                                    type="button"
                                    onClick={() => updateSkillValue(key, skillKey, -1)}
                                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                                    title={`Diminuir graduação de ${skillDisplayName} (-1)`}
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-amber-300 min-w-[18px] text-center">
                                    +{skillVal}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateSkillValue(key, skillKey, 1)}
                                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                                    title={`Aumentar graduação de ${skillDisplayName} (+1)`}
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleTriggerRoll(
                                    `Perícia: ${skillDisplayName} (${label} +${attrVal} + Grad +${skillVal} = Total ${totalBonusStr})`,
                                    totalSkillBonus
                                  )}
                                  className="flex-1 py-1 px-2.5 rounded-md bg-slate-900 hover:bg-slate-850 hover:border-amber-500/40 border border-slate-700 text-slate-200 hover:text-amber-200 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                                  title={`Rolar D20 de ${skillDisplayName}: +${totalSkillBonus}`}
                                >
                                  <Dices className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Rolar ({totalBonusStr})</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: HABILIDADES, DONS & MALDIÇÕES */}
        {activeTab === 'habilidades' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm leading-relaxed">
              Escreva e organize abaixo seus <strong>Dons do Cerne</strong> (ex: Caminhante, Predecessor), <strong>Fardos do Verbo</strong> (ex: Doença da Fera, Crispo) e <strong>Habilidades Táticas de Combate</strong>:
            </div>
            <textarea
              value={charData.habilidadesNotas}
              onChange={(e) => setCharData({ ...charData, habilidadesNotas: e.target.value })}
              rows={14}
              className="w-full p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 font-reading text-base leading-relaxed focus:outline-none focus:border-amber-500/40 shadow-inner"
              placeholder="• Don do Cerne: Caminhante (Nível 2)..."
            />
          </div>
        )}

        {/* TAB 3: INVENTÁRIO & CARGA */}
        {activeTab === 'inventario' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm leading-relaxed">
              Gerencie suas armas de éter, trajes de voo, cristais condutores, relíquias e cargas transportadas a bordo:
            </div>
            <textarea
              value={charData.inventario}
              onChange={(e) => setCharData({ ...charData, inventario: e.target.value })}
              rows={14}
              className="w-full p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 font-reading text-base leading-relaxed focus:outline-none focus:border-amber-500/40 shadow-inner"
              placeholder="• 1x Sabre de Éter Cristalino..."
            />
          </div>
        )}

        {/* TAB 4: DIÁRIO DE BORDO */}
        {activeTab === 'diario' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm leading-relaxed">
              Memórias pessoais da jornada, pistas descobertas nos céus partidos e anotações secretas de viagem:
            </div>
            <textarea
              value={charData.diario}
              onChange={(e) => setCharData({ ...charData, diario: e.target.value })}
              rows={16}
              className="w-full p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-amber-100 font-reading text-base leading-relaxed focus:outline-none focus:border-amber-500/40 shadow-inner"
              placeholder="Entrada 1: Partimos do porto flutuante de Aethelgard ao raiar das correntes de éter..."
            />
          </div>
        )}

      </div>

      {/* Modal de Escolha e Upload de Retrato */}
      {isEditingAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn font-sans">
          <div className="relative w-full max-w-xl bg-[#0c1019] border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex flex-col space-y-5 max-h-[90vh] overflow-y-auto text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-amber-300 flex-shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-100">
                    Retrato do Navegante
                  </h3>
                  <p className="text-xs text-slate-300">
                    Faça upload, cole uma URL ou selecione uma ilustração clássica.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAvatar(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-500/40 flex-shrink-0 bg-slate-950">
                <img
                  src={charData.avatarUrl || './art/journey.webp'}
                  alt="Pré-visualização"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Pré-visualização Ativa
                </span>
                <p className="leading-relaxed">
                  A imagem será redimensionada e ajustada automaticamente mantendo a proporção ideal.
                </p>
              </div>
            </div>

            {/* Opção 1: Upload de Arquivo Local */}
            <div className="space-y-1.5">
              <span className="text-xs font-sans font-semibold text-amber-200 block">
                1. Enviar do seu dispositivo (Computador / Celular):
              </span>
              <label
                htmlFor="avatar-file-upload-sheet"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-200 text-sm font-sans font-medium cursor-pointer transition-all shadow-sm"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Escolher Arquivo de Imagem</span>
              </label>
              <input
                id="avatar-file-upload-sheet"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const res = ev.target?.result as string;
                    if (res) {
                      setCharData((prev) => ({ ...prev, avatarUrl: res }));
                    }
                  };
                  reader.readAsDataURL(file);
                }}
                className="hidden"
              />
            </div>

            {/* Opção 2: URL Direta */}
            <div className="space-y-1.5">
              <span className="text-xs font-sans font-semibold text-amber-200 block">
                2. Ou cole o link da imagem (URL da Web):
              </span>
              <input
                type="text"
                value={charData.avatarUrl}
                onChange={(e) => setCharData({ ...charData, avatarUrl: e.target.value })}
                placeholder="https://exemplo.com/sua-imagem.png"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Opção 3: Galeria do Cerne */}
            <div className="space-y-1.5">
              <span className="text-xs font-sans font-semibold text-amber-200 block">
                3. Ou escolha da Galeria do Cerne:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {[
                  { url: './art/journey.webp', label: 'Caminhante' },
                  { url: './art/citadel.webp', label: 'Cidadela' },
                  { url: './art/astral_library.webp', label: 'Biblioteca' },
                  { url: './art/celestial_grimoire.webp', label: 'Grimório' },
                  { url: './art/mechanism.webp', label: 'Mecanismo' },
                  { url: './art/emblem.webp', label: 'Selo' },
                ].map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setCharData({ ...charData, avatarUrl: preset.url })}
                    className={`relative rounded-lg overflow-hidden aspect-square border transition-all cursor-pointer ${
                      charData.avatarUrl === preset.url
                        ? 'border-amber-400 ring-2 ring-amber-500/30 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditingAvatar(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-sans font-medium text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                Concluir e Salvar Retrato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dice Roller Modal com Modificador Pré-Carregado */}
      <DiceRollerModal
        isOpen={diceModalOpen}
        onClose={() => setDiceModalOpen(false)}
        initialBonus={diceRollBonus}
        bonus={diceRollBonus}
        rollReason={diceRollReason}
      />

      {/* Biography Book Modal com Salvamento Persistente */}
      <BiographyBookModal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        characterName={charData.name}
        biography={charData.biografia}
        onSaveBiography={handleSaveBio}
      />
    </div>
  );
};
