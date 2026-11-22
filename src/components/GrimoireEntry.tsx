import React, { useState } from 'react';
import { Sparkles, BookOpen, Clapperboard } from 'lucide-react';
import { StarfieldCanvas } from './StarfieldCanvas';
import { MusicPlayerWidget } from './MusicPlayerWidget';
import { TrailerModal } from './TrailerModal';
import { music } from '../utils/musicPlayer';

interface GrimoireEntryProps {
  onOpenBook: () => void;
}

export const GrimoireEntry: React.FC<GrimoireEntryProps> = ({ onOpenBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleOpen = () => {
    if (!music.getState().isPlaying) {
      music.play();
    }
    onOpenBook();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d] flex flex-col items-center justify-between select-none">
      {/* Background Image: The Enchanted Grimoire on Celestial Pedestal */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-100 hover:scale-105"
        style={{
          backgroundImage: `url('./art/book-closed.webp')`,
          filter: isHovered ? 'brightness(1.08) contrast(1.03)' : 'brightness(0.85)',
        }}
      />

      {/* Atmospheric Vignette & Contrast Darkening (Skyrim/Elden Ring Cinematic Lighting) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-black/30 to-[#05070d]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#05070d]/90 pointer-events-none" />

      {/* Interactive Particle Starfield */}
      <StarfieldCanvas density={70} speedFactor={0.4} />

      {/* Top Bar: Universe Logo & Playlist Music Player */}
      <header className="relative z-30 w-full max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800/80 rounded-xl px-3.5 py-1.5 backdrop-blur-md shadow-sm">
          <img 
            src="./art/emblem.webp" 
            alt="Core Emblem" 
            className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] animate-spin-slow"
          />
          <div>
            <span className="text-[10px] tracking-[0.25em] font-sans text-slate-400 block uppercase font-medium">
              Manual do Jogador
            </span>
            <span className="text-xs md:text-sm font-bold font-serif text-gold-gradient tracking-widest block">
              THE CORE OF MAN
            </span>
          </div>
        </div>

        {/* Music Player Widget */}
        <MusicPlayerWidget />
      </header>

      {/* Central Content: Free-breathing cinematic layout without containerite */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl my-auto">
        {/* Core Emblem Floating with Soft Aura */}
        <div 
          className="relative cursor-pointer group mb-3"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -inset-3 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/25 transition-all duration-500" />
          <img 
            src="./art/emblem.webp" 
            alt="Emblema dos Céus Partidos" 
            className="relative w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Subtitle */}
        <span className="text-xs md:text-sm tracking-[0.3em] font-serif uppercase text-amber-300/90 font-semibold mb-2 drop-shadow-sm">
          A Era dos Céus Partidos
        </span>
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-wider text-gold-gradient drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-3">
          THE CORE OF MAN
        </h1>

        {/* Skyrim Runed Divider */}
        <div className="flex items-center justify-center my-3 space-x-4 opacity-50">
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent to-amber-500/60" />
          <span className="text-amber-400 text-xs font-serif tracking-[0.3em]">✦</span>
          <div className="h-[1px] w-28 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        {/* Lore Quote with High Contrast & Pure Legible Typography (Inter) */}
        <p className="text-base md:text-lg text-slate-200 font-sans font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-xl mb-7 tracking-wide">
          &ldquo;O grimório ancestral repousa em silêncio sobre o pedestal de bronze. Suas páginas guardam os segredos esquecidos de um mundo que ruiu.&rdquo;
        </p>

        {/* Actions Cluster */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Primary Action Button (Metal Nobre Ouro Velho) */}
          <button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center px-8 py-3 rounded-xl font-sans text-sm md:text-base font-semibold tracking-wider text-slate-950 uppercase transition-all duration-200 bg-gradient-to-b from-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.98] shadow-lg shadow-amber-950/40 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 mr-2.5 text-slate-950 group-hover:scale-105 transition-transform" />
            <span>Abrir o Grimório</span>
          </button>

          {/* Secondary Action: Teaser Trailer Button (No emojis, sleek slate/bronze) */}
          <button
            onClick={() => setIsTrailerOpen(true)}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-amber-100 hover:border-amber-500/40 font-sans text-xs md:text-sm font-medium transition-all cursor-pointer shadow-sm"
          >
            <Clapperboard className="w-4 h-4 text-amber-400" />
            <span>Assistir Teaser (1939)</span>
          </button>
        </div>
      </main>

      {/* Trailer Modal (Remotion Video Player) */}
      <TrailerModal 
        isOpen={isTrailerOpen} 
        onClose={() => setIsTrailerOpen(false)} 
      />

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full py-3 text-center text-xs text-slate-400 font-sans tracking-widest drop-shadow-sm">
        <span>SISTEMA DE RPG AUTORAL &bull; VERSÃO 2.0 &bull; CRIAÇÃO AUGUSTA BEZERRA</span>
      </footer>
    </div>
  );
};
