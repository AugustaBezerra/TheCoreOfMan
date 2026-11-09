import React, { useEffect, useState } from 'react';
import { music } from '../utils/musicPlayer';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc3 } from 'lucide-react';

export const MusicPlayerWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = music.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const state = music.getState();

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-slate-900/80 border border-amber-500/30 rounded-full px-3 py-1.5 backdrop-blur-md shadow-lg">
        <button
          onClick={() => music.togglePlay()}
          className="p-1 rounded-full text-amber-300 hover:text-white transition-colors cursor-pointer"
          title={state.isPlaying ? 'Pausar Trilha' : 'Tocar Trilha Sonora'}
        >
          {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="hidden sm:flex flex-col text-left max-w-[140px] truncate">
          <span className="text-[10px] text-amber-200 font-serif truncate font-bold leading-tight">
            {state.currentTrack.title}
          </span>
          <span className="text-[8px] text-slate-400 font-mono leading-tight">Trilha Oficial</span>
        </div>

        <button
          onClick={() => music.nextTrack()}
          className="p-1 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
          title="Próxima Faixa"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 bg-slate-950/85 border border-amber-500/40 rounded-full px-4 py-2 backdrop-blur-lg shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      {/* Vinyl Disc Icon with Rotation */}
      <div className="relative flex items-center justify-center">
        <Disc3
          className={`w-6 h-6 text-amber-400 ${
            state.isPlaying ? 'animate-spin-slow' : 'opacity-60'
          }`}
        />
        {state.isPlaying && (
          <span className="absolute w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        )}
      </div>

      {/* Track Info */}
      <div className="flex flex-col text-left max-w-[150px] md:max-w-[180px]">
        <span className="text-xs text-amber-100 font-serif truncate font-bold drop-shadow">
          {state.currentTrack.title}
        </span>
        <span className="text-[10px] text-amber-400/80 font-mono flex items-center space-x-1">
          {state.isPlaying ? (
            <>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Tocando Ciclo ({state.currentTrackIdx + 1}/4)</span>
            </>
          ) : (
            <span>Música Pausada</span>
          )}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-1 border-l border-amber-500/20 pl-2">
        <button
          onClick={() => music.prevTrack()}
          className="p-1.5 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
          title="Faixa Anterior"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={() => music.togglePlay()}
          className="p-2 rounded-full bg-amber-600/30 border border-amber-500/50 text-amber-200 hover:text-white hover:bg-amber-600/50 transition-all cursor-pointer shadow-md"
          title={state.isPlaying ? 'Pausar Música' : 'Tocar Música'}
        >
          {state.isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 text-amber-300" />
          )}
        </button>

        <button
          onClick={() => music.nextTrack()}
          className="p-1.5 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
          title="Próxima Faixa"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Mute / Max Volume toggle */}
      <button
        onClick={() => music.setVolume(state.volume > 0 ? 0 : 0.45)}
        className="p-1.5 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer border-l border-amber-500/20 pl-2"
        title={state.volume > 0 ? 'Mutar' : 'Desmutar'}
      >
        {state.volume > 0 ? (
          <Volume2 className="w-4 h-4 text-amber-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-red-400" />
        )}
      </button>
    </div>
  );
};
