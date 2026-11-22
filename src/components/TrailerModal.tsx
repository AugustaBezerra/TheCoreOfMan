import React, { useState, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { 
  MareDeOuroTrailerComposition, 
  MusicOption,
  MareDeOuroTrailerProps 
} from './MareDeOuroTrailerComposition';
import { 
  X, 
  Volume2, 
  Music, 
  Subtitles, 
  Clapperboard, 
  Sparkles
} from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [selectedMusic, setSelectedMusic] = useState<MusicOption>('black_sails');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.50);
  const [voiceVolume, setVoiceVolume] = useState(1.20);

  if (!isOpen) return null;

  const musicTracks: { id: MusicOption; label: string; desc: string; tag: string }[] = [
    {
      id: 'black_sails',
      label: 'Black Sails Clang',
      desc: 'Dark Nautical Noir • Batidas de ferro e correntes • Clima sério e imersivo',
      tag: '⭐ Recomendada',
    },
    {
      id: 'pirate_adventure',
      label: 'Pirate Adventure',
      desc: 'Capa-e-Espada • Violinos rápidos • Clima de perseguição e ação marítima',
      tag: 'Ação Ágil',
    },
    {
      id: 'reign_of_darkness',
      label: 'Reign of Darkness',
      desc: 'Gótico e Solene • Sinos e órgão dramático • Clima de tragédia e confronto',
      tag: 'Solene / Épico',
    },
  ];

  const trailerProps: MareDeOuroTrailerProps = {
    selectedMusic,
    musicVolume,
    voiceVolume,
    showSubtitles,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-950 border border-amber-500/40 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                  Teaser Trailer • One-Shot 1939
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  Remotion 4K/1080p
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-serif font-black text-gold-gradient tracking-wide">
                Maré de Ouro e Pólvora
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Remotion Player Container */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center border-b border-amber-500/20">
          <Player
            ref={playerRef}
            component={MareDeOuroTrailerComposition}
            inputProps={trailerProps}
            durationInFrames={2070}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            autoPlay
            loop={false}
          />
        </div>

        {/* Music Selector & Audio Controls */}
        <div className="p-4 md:p-6 bg-slate-950/90 flex flex-col gap-4">
          
          {/* Track Switcher */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5 font-bold">
                <Music className="w-4 h-4" /> Escolha a Trilha de Fundo para Testar:
              </span>
              <span className="text-[11px] text-slate-400 font-sans">
                (A troca é imediata — aperte o play para escutar)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {musicTracks.map((track) => {
                const isSelected = selectedMusic === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedMusic(track.id)}
                    className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-serif text-sm font-bold ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                        {track.label}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950 font-bold' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {track.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans line-clamp-2">
                      {track.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Subtitles Toggle & Volume Balancer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-4">
              {/* Subtitles Button */}
              <button
                onClick={() => setShowSubtitles((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                  showSubtitles
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/50'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" />
                <span>Legendas: {showSubtitles ? 'ATIVADAS' : 'DESATIVADAS'}</span>
              </button>

              {/* Ducking Info Pill */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-300/80 font-sans">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ducking inteligente ativo (a música baixa quando você fala)</span>
              </div>
            </div>

            {/* Volume Mix Sliders */}
            <div className="flex items-center gap-6">
              {/* Voice Volume */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-mono text-slate-400 uppercase">Voz:</span>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.05"
                  value={voiceVolume}
                  onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                  className="w-20 accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-amber-300 w-8">
                  {Math.round(voiceVolume * 100)}%
                </span>
              </div>

              {/* Music Volume */}
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-mono text-slate-400 uppercase">Trilha:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-20 accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-amber-300 w-8">
                  {Math.round(musicVolume * 100)}%
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
