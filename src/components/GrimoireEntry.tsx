import React, { useState } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { StarfieldCanvas } from './StarfieldCanvas';
import { MusicPlayerWidget } from './MusicPlayerWidget';
import { music } from '../utils/musicPlayer';

interface GrimoireEntryProps {
  onOpenBook: () => void;
}

export const GrimoireEntry: React.FC<GrimoireEntryProps> = ({ onOpenBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    // Start soundtrack on player interaction if not already playing
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
          filter: isHovered ? 'brightness(1.15) contrast(1.05)' : 'brightness(0.95)',
        }}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-[#05070d]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-[#05070d]/90 pointer-events-none" />

      {/* Interactive Particle Starfield */}
      <StarfieldCanvas density={70} speedFactor={0.4} />

      {/* Top Bar: Universe Logo & Playlist Music Player */}
      <header className="relative z-20 w-full max-w-7xl px-4 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="./art/emblem.webp" 
            alt="Core Emblem" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] animate-spin-slow"
          />
          <div>
            <span className="text-[10px] md:text-xs tracking-[0.3em] font-serif text-amber-200/80 block uppercase">Manual do Jogador</span>
            <span className="text-sm md:text-base font-bold font-serif text-gold-gradient tracking-widest block">THE CORE OF MAN</span>
          </div>
        </div>

        {/* Music Player Widget */}
        <MusicPlayerWidget />
      </header>

      {/* Central Content: Book Interaction Area */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl my-auto">
        {/* Core Emblem Floating */}
        <div 
          className="relative cursor-pointer group mb-6"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-6 rounded-full bg-sky-500/20 blur-xl animate-pulse group-hover:bg-amber-500/30 transition-all duration-500" />
          <div className="absolute -inset-2 rounded-full border border-amber-400/40 animate-ping opacity-25" />
          
          <img 
            src="./art/emblem.webp" 
            alt="Emblema dos Céus Partidos" 
            className="relative w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.8)] group-hover:drop-shadow-[0_0_35px_rgba(212,175,55,1)] group-hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* Titles */}
        <h2 className="text-xs md:text-sm tracking-[0.4em] font-serif uppercase text-amber-300/90 mb-2 drop-shadow">
          A Era dos Céus Partidos
        </h2>
        
        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-wider text-gold-gradient drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-4">
          THE CORE OF MAN
        </h1>

        <p className="text-xs md:text-base text-slate-300/90 font-reading max-w-xl mb-8 leading-relaxed italic drop-shadow">
          "O grimório ancestral repousa em silêncio sobre o pedestal de bronze. Suas páginas guardam os segredos esquecidos de um mundo que ruiu."
        </p>

        {/* The Main Action Button: LEIA-ME */}
        <button
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full font-serif text-base tracking-[0.2em] font-bold text-amber-100 uppercase transition-all duration-300 bg-gradient-to-r from-amber-900/80 via-slate-900/90 to-amber-950/80 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] hover:border-sky-400 hover:scale-105 backdrop-blur-md active:scale-95 cursor-pointer"
        >
          {/* Button Shine Sweep */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <BookOpen className="w-5 h-5 mr-3 text-amber-400 group-hover:text-sky-300 transition-colors animate-pulse" />
          <span className="text-gold-glow">LEIA-ME &bull; ABRIR O GRIMÓRIO</span>
          <Sparkles className="w-5 h-5 ml-3 text-sky-400 group-hover:text-amber-300 transition-colors animate-pulse" />
        </button>

        <span className="text-[11px] font-mono text-amber-400/60 mt-3 tracking-widest uppercase">
          Clique para romper o selo e entrar no universo
        </span>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-slate-500 font-mono tracking-wider">
        <span>SISTEMA DE RPG AUTORAL &bull; VERSÃO 2.0 &bull; CRIAÇÃO AUGUSTA BEZERRA</span>
      </footer>
    </div>
  );
};
