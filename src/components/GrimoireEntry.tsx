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
          filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.9)',
        }}
      />

      {/* Atmospheric Vignette & Contrast Darkening */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-black/40 to-[#05070d]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/45 to-[#05070d]/95 pointer-events-none" />

      {/* Interactive Particle Starfield */}
      <StarfieldCanvas density={70} speedFactor={0.4} />

      {/* Top Bar: Universe Logo & Playlist Music Player */}
      <header className="relative z-30 w-full max-w-7xl px-4 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 bg-slate-950/70 border border-amber-500/30 rounded-2xl px-4 py-2 backdrop-blur-md shadow-lg">
          <img 
            src="./art/emblem.webp" 
            alt="Core Emblem" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.9)] animate-spin-slow"
          />
          <div>
            <span className="text-[10px] md:text-xs tracking-[0.3em] font-serif text-amber-300 font-bold block uppercase drop-shadow">
              Manual do Jogador
            </span>
            <span className="text-sm md:text-base font-bold font-serif text-gold-gradient tracking-widest block drop-shadow">
              THE CORE OF MAN
            </span>
          </div>
        </div>

        {/* Music Player Widget */}
        <MusicPlayerWidget />
      </header>

      {/* Central Content: Book Interaction Area with Enhanced Contrast Container */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl my-auto">
        <div className="bg-slate-950/75 border border-amber-500/40 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col items-center">
          
          {/* Core Emblem Floating with Transparent Alpha and Glow */}
          <div 
            className="relative cursor-pointer group mb-4"
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glowing Aura Rings */}
            <div className="absolute -inset-4 rounded-full bg-sky-500/25 blur-xl animate-pulse group-hover:bg-amber-500/40 transition-all duration-500" />
            <div className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping opacity-30" />
            
            <img 
              src="./art/emblem.webp" 
              alt="Emblema dos Céus Partidos" 
              className="relative w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.9)] group-hover:drop-shadow-[0_0_35px_rgba(212,175,55,1)] group-hover:scale-105 transition-all duration-500"
            />
          </div>

          {/* Subtitle - Large & High Contrast */}
          <span className="text-sm md:text-base tracking-[0.3em] font-serif uppercase text-amber-300 font-extrabold mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            A Era dos Céus Partidos
          </span>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-wider text-gold-gradient drop-shadow-[0_4px_16px_rgba(0,0,0,1)] mb-4">
            THE CORE OF MAN
          </h1>

          {/* Lore Quote with High Contrast & Large Legible Typography */}
          <div className="bg-black/70 border border-amber-500/40 rounded-2xl px-6 py-4 max-w-2xl mb-8 shadow-2xl">
            <p className="text-base md:text-lg text-amber-50 font-reading font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              "O grimório ancestral repousa em silêncio sobre o pedestal de bronze. Suas páginas guardam os segredos esquecidos de um mundo que ruiu."
            </p>
          </div>

          {/* The Main Action Button: LEIA-ME */}
          <button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden rounded-full font-serif text-lg md:text-xl tracking-[0.2em] font-black text-amber-100 uppercase transition-all duration-300 bg-gradient-to-r from-amber-800 via-slate-900 to-amber-900 border-2 border-amber-400 shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:shadow-[0_0_60px_rgba(56,189,248,0.9)] hover:border-sky-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Button Shine Sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <BookOpen className="w-6 h-6 mr-3 text-amber-300 group-hover:text-sky-200 transition-colors animate-pulse" />
            <span className="text-gold-glow font-black">LEIA-ME &bull; ABRIR O GRIMÓRIO</span>
            <Sparkles className="w-6 h-6 ml-3 text-sky-300 group-hover:text-amber-200 transition-colors animate-pulse" />
          </button>

          {/* High Contrast Helper Pill */}
          <div className="mt-5 px-6 py-2 rounded-full bg-black/80 border border-amber-400/60 shadow-lg">
            <span className="text-xs md:text-sm font-sans font-bold text-amber-300 tracking-wider uppercase">
              Clique para romper o selo e entrar no universo
            </span>
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full py-4 text-center text-xs md:text-sm text-amber-300 font-mono font-semibold tracking-wider drop-shadow">
        <span>SISTEMA DE RPG AUTORAL &bull; VERSÃO 2.0 &bull; CRIAÇÃO AUGUSTA BEZERRA</span>
      </footer>
    </div>
  );
};
