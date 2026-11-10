import React, { useState } from 'react';
import { X, Sparkles, RefreshCw } from 'lucide-react';

interface DiceRollerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBonus?: number;
  bonus?: number;
  rollReason?: string;
  label?: string;
}

export const DiceRollerModal: React.FC<DiceRollerModalProps> = ({
  isOpen,
  onClose,
  initialBonus = 0,
  bonus: propBonus,
  rollReason = 'Teste de Resolução',
  label,
}) => {
  const activeBonus = propBonus !== undefined ? propBonus : initialBonus;
  const activeReason = label || rollReason;
  const [selectedDie, setSelectedDie] = useState<number>(20);
  const [bonus, setBonus] = useState<number>(activeBonus);
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<{ raw: number; total: number; isCrit: boolean; isFumble: boolean } | null>(null);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const handleRoll = (dieFaces = selectedDie) => {
    setIsRolling(true);
    setRotation((prev) => prev + 720 + Math.floor(Math.random() * 360));

    setTimeout(() => {
      const raw = Math.floor(Math.random() * dieFaces) + 1;
      const total = raw + bonus;
      const isCrit = dieFaces === 20 && raw === 20;
      const isFumble = dieFaces === 20 && raw === 1;

      setLastRoll({ raw, total, isCrit, isFumble });
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-950/95 border-2 border-amber-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] text-center text-slate-100 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-amber-300 mb-1">
          Bandeja de Rolagem Arcana
        </span>
        <h3 className="text-2xl font-serif font-black text-amber-100 mb-4 drop-shadow">
          {activeReason}
        </h3>

        {/* Dice Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {[4, 6, 8, 10, 12, 20, 100].map((faces) => (
            <button
              key={faces}
              onClick={() => {
                setSelectedDie(faces);
                handleRoll(faces);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedDie === faces
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105'
                  : 'bg-slate-900 border border-amber-500/30 text-amber-200 hover:bg-slate-800'
              }`}
            >
              d{faces}
            </button>
          ))}
        </div>

        {/* Central 3D Die Visualizer */}
        <div className="relative my-4 flex items-center justify-center w-40 h-40">
          <div
            className={`w-36 h-36 rounded-3xl bg-gradient-to-br from-amber-700 via-slate-900 to-amber-900 border-4 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-transform duration-500 ${
              isRolling ? 'scale-90 animate-spin' : 'scale-100'
            }`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Inner Ring */}
            <div className="w-28 h-28 rounded-2xl border border-amber-400/50 flex flex-col items-center justify-center bg-black/40">
              <span className="text-xs font-mono font-bold text-amber-300/80">
                d{selectedDie}
              </span>
              <span className="text-4xl font-serif font-black text-gold-gradient drop-shadow">
                {isRolling ? '?' : lastRoll ? lastRoll.raw : selectedDie}
              </span>
            </div>
          </div>
        </div>

        {/* Result Message */}
        {lastRoll && !isRolling && (
          <div className="mt-2 mb-4">
            {lastRoll.isCrit && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-400 text-emerald-200 text-xs font-mono font-black tracking-wider uppercase shadow-lg animate-pulse">
                🌟 Sucesso Crítico!
              </span>
            )}
            {lastRoll.isFumble && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-950/90 border border-red-500 text-red-200 text-xs font-mono font-black tracking-wider uppercase shadow-lg animate-pulse">
                💀 Falha Crítica!
              </span>
            )}
            <div className="text-xl font-serif font-bold text-amber-100 mt-2">
              Resultado: <span className="text-white font-black">{lastRoll.raw}</span>
              {bonus !== 0 && (
                <span className="text-amber-300">
                  {' '}
                  {bonus >= 0 ? `+ ${bonus}` : `- ${Math.abs(bonus)}`} ={' '}
                  <span className="text-2xl text-amber-400 font-black">{lastRoll.total}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bonus Modifier Controls */}
        <div className="flex items-center space-x-3 my-4 bg-slate-900/90 border border-amber-500/40 px-4 py-2 rounded-2xl shadow-inner">
          <span className="text-xs font-serif font-bold text-amber-300 uppercase">Modificador:</span>
          <button
            onClick={() => setBonus((b) => b - 1)}
            className="w-7 h-7 rounded-lg bg-slate-800 text-amber-200 hover:text-white font-bold cursor-pointer"
          >
            -
          </button>
          <span className="text-sm font-mono font-bold text-white min-w-[24px]">
            {bonus >= 0 ? `+${bonus}` : bonus}
          </span>
          <button
            onClick={() => setBonus((b) => b + 1)}
            className="w-7 h-7 rounded-lg bg-slate-800 text-amber-200 hover:text-white font-bold cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Roll Action Button */}
        <button
          onClick={() => handleRoll()}
          disabled={isRolling}
          className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-amber-700 via-slate-900 to-amber-700 border-2 border-amber-400 text-amber-100 font-serif font-black tracking-widest text-base uppercase hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-5 h-5 text-amber-300 ${isRolling ? 'animate-spin' : ''}`} />
          <span>{isRolling ? 'Rolando...' : 'Lançar Dados'}</span>
          <Sparkles className="w-5 h-5 text-sky-300" />
        </button>
      </div>
    </div>
  );
};
