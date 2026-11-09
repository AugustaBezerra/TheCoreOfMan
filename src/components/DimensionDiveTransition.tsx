import React, { useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { BookPortalComposition } from './BookPortalComposition';
import { FastForward } from 'lucide-react';

interface DimensionDiveTransitionProps {
  onFinish: () => void;
}

export const DimensionDiveTransition: React.FC<DimensionDiveTransitionProps> = ({ onFinish }) => {
  const playerRef = React.useRef<PlayerRef>(null);

  useEffect(() => {
    // Fallback timer: 4.2 seconds just in case player event doesn't fire
    const timer = setTimeout(() => {
      onFinish();
    }, 4200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d]">
      <Player
        ref={playerRef}
        component={BookPortalComposition}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
        autoPlay
        controls={false}
        loop={false}
        onEnded={onFinish}
      />

      {/* Skip button for user convenience */}
      <button
        onClick={onFinish}
        className="absolute bottom-8 right-8 z-50 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-200 text-xs font-serif tracking-widest uppercase hover:bg-slate-800 hover:border-amber-300 hover:text-white transition-all backdrop-blur-md shadow-2xl group cursor-pointer"
      >
        <span>Pular Travessia</span>
        <FastForward className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Vignette Shadow Frame */}
      <div className="absolute inset-0 border-[16px] border-black/40 pointer-events-none z-40" />
    </div>
  );
};
