import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BOOK_CHAPTERS, 
  Chapter 
} from '../data/bookChapters';
import { 
  ArrowLeft, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Dices, 
  UserCheck, 
  Flame, 
  Shield, 
  Swords, 
  Users, 
  Scroll, 
  TrendingUp
} from 'lucide-react';
import { StarfieldCanvas } from './StarfieldCanvas';
import { MusicPlayerWidget } from './MusicPlayerWidget';
import { UserProfile } from '../types/character';

interface CosmicUniverseExplorerProps {
  onReturnToGrimoire: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onOpenHangar?: () => void;
}

export const CosmicUniverseExplorer: React.FC<CosmicUniverseExplorerProps> = ({
  onReturnToGrimoire,
  currentUser,
  onOpenAuth,
  onOpenHangar,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [backgroundScene, setBackgroundScene] = useState<'universe' | 'library' | 'citadel'>('universe');

  // Map icon names to Lucide components
  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5" />,
    Dices: <Dices className="w-5 h-5" />,
    UserCheck: <UserCheck className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Swords: <Swords className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    Scroll: <Scroll className="w-5 h-5 text-amber-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
  };

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return BOOK_CHAPTERS;
    const q = searchQuery.toLowerCase();
    return BOOK_CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.contentHtml.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const [scrollPercent, setScrollPercent] = useState(0);
  const readerScrollRef = useRef<HTMLDivElement>(null);

  // Scroll immediately to the top whenever selectedChapter changes
  useEffect(() => {
    if (readerScrollRef.current) {
      readerScrollRef.current.scrollTop = 0;
    }
  }, [selectedChapter?.id]);

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setScrollPercent(0);
    if (readerScrollRef.current) {
      readerScrollRef.current.scrollTop = 0;
    }
  };

  const handleNextChapter = () => {
    if (!selectedChapter) return;
    const nextIdx = (selectedChapter.id % BOOK_CHAPTERS.length) + 1;
    const nextChap = BOOK_CHAPTERS.find((c) => c.id === nextIdx);
    if (nextChap) {
      setSelectedChapter(nextChap);
      setScrollPercent(0);
      if (readerScrollRef.current) {
        readerScrollRef.current.scrollTop = 0;
      }
    }
  };

  const handlePrevChapter = () => {
    if (!selectedChapter) return;
    const prevIdx = selectedChapter.id === 1 ? BOOK_CHAPTERS.length : selectedChapter.id - 1;
    const prevChap = BOOK_CHAPTERS.find((c) => c.id === prevIdx);
    if (prevChap) {
      setSelectedChapter(prevChap);
      setScrollPercent(0);
      if (readerScrollRef.current) {
        readerScrollRef.current.scrollTop = 0;
      }
    }
  };

  const handleReaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollPercent(scrollTop / maxScroll);
    }
  };

  const getBackgroundUrl = () => {
    switch (backgroundScene) {
      case 'library':
        return './art/library.webp';
      case 'citadel':
        return './art/journey.webp';
      case 'universe':
      default:
        return './art/universe.webp';
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d] flex flex-col justify-between text-slate-100">
      {/* Background Environment Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${getBackgroundUrl()}')`,
          filter: selectedChapter ? 'brightness(0.3) blur(4px)' : 'brightness(0.85)',
        }}
      />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-[#05070d]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#05070d]/90 pointer-events-none" />

      {/* Starfield Particles */}
      <StarfieldCanvas density={selectedChapter ? 30 : 90} speedFactor={0.3} />

      {/* Top Header Bar */}
      <header className="relative z-30 w-full px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-amber-500/20 bg-slate-950/75 backdrop-blur-md">
        {/* Left: Return Button and Login Button */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={onReturnToGrimoire}
            className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200 hover:text-white hover:bg-amber-900/60 transition-all font-serif text-xs md:text-sm tracking-wider shadow-lg group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Fechar e Voltar ao Livro</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          {/* Botão de Entrar ao lado de Fechar e Voltar ao Livro */}
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 md:space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-amber-950/50 border border-amber-500/50 text-amber-200 hover:text-amber-100 hover:bg-amber-900/70 hover:border-amber-400 transition-all font-serif text-xs md:text-sm tracking-wider shadow-lg cursor-pointer"
              title={currentUser ? "Meu Perfil" : "Entrar no Sistema"}
            >
              <span>{currentUser ? '👤' : '🔑'}</span>
              <span>{currentUser ? currentUser.displayName : 'Entrar'}</span>
            </button>
          )}

          {/* Se logado, atalho para o Hangar */}
          {currentUser && onOpenHangar && (
            <button
              onClick={onOpenHangar}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 md:py-2 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-amber-200 hover:border-amber-500/40 text-xs md:text-sm font-serif transition-all cursor-pointer"
              title="Acessar Hangar de Navegantes"
            >
              <span>⚙️</span>
              <span>Hangar</span>
            </button>
          )}
        </div>

        {/* Center: Title & Emblem */}
        <div className="hidden lg:flex items-center space-x-3 text-center">
          <img
            src="./art/emblem.webp"
            alt="Core Emblem"
            className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]"
          />
          <div>
            <span className="text-[10px] font-serif tracking-[0.3em] uppercase text-amber-300/80 block">
              Universo dos Céus Partidos
            </span>
            <span className="text-sm font-bold font-serif text-gold-gradient tracking-widest block">
              CÓDICE DO NAVEGANTE
            </span>
          </div>
        </div>

        {/* Right Controls: Scene Switcher & Music Player Widget */}
        <div className="flex items-center space-x-3">
          {/* Scene Switcher */}
          <div className="hidden md:flex items-center bg-slate-900/80 rounded-lg p-1 border border-amber-500/30 text-xs font-serif">
            <button
              onClick={() => setBackgroundScene('universe')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                backgroundScene === 'universe' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Universo
            </button>
            <button
              onClick={() => setBackgroundScene('library')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                backgroundScene === 'library' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Biblioteca
            </button>
            <button
              onClick={() => setBackgroundScene('citadel')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                backgroundScene === 'citadel' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Cidadela
            </button>
          </div>

          {/* Music Player Widget with Tracks */}
          <MusicPlayerWidget compact={false} />
        </div>
      </header>

      {/* Main Area: Grid of Chapters OR Parchment Reader */}
      <main className="relative z-20 flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col items-center">
        {!selectedChapter ? (
          /* =========================================================================
             MODE A: CHAPTER CATALOG / CODEX GRID
             ========================================================================= */
          <div className="w-full max-w-6xl">
            {/* Banner & Search */}
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-amber-100 flex items-center space-x-2.5 drop-shadow">
                  <BookOpen className="w-7 h-7 text-amber-400" />
                  <span>Compêndio de Regras e Ambientação</span>
                </h2>
                <p className="text-sm md:text-base text-amber-200 font-semibold drop-shadow mt-1.5">
                  Selecione um capítulo celestial para desvendar suas leis, sistemas e mistérios.
                </p>
              </div>

              {/* Search Bar with high contrast */}
              <div className="relative w-full md:w-88">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar Dons, Fardos, Regras..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border-2 border-amber-500/50 rounded-full text-sm font-serif font-medium text-amber-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-md shadow-lg"
                />
              </div>
            </div>

            {/* Chapters Grid with High Contrast Typography */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between backdrop-blur-xl overflow-hidden shadow-xl ${
                    chapter.id === 9
                      ? 'bg-gradient-to-br from-amber-950/90 via-slate-950/95 to-red-950/90 border-amber-400 shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:border-amber-300 hover:scale-[1.02]'
                      : 'bg-slate-950/90 border-amber-500/40 hover:border-amber-400 hover:bg-slate-900/95 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]'
                  }`}
                >
                  {/* Subtle Corner Ornament Glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/20 transition-colors" />

                  <div>
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono text-xs font-black text-amber-300 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/50 shadow">
                          {chapter.roman}
                        </span>
                        <div className="text-amber-300 group-hover:text-amber-100 transition-colors">
                          {iconMap[chapter.iconName] || <BookOpen className="w-5 h-5" />}
                        </div>
                      </div>

                      {chapter.id === 9 && (
                        <span className="text-[11px] font-mono font-black tracking-wider uppercase text-amber-200 bg-amber-900/90 px-2.5 py-1 rounded-full border border-amber-400 shadow-md animate-pulse">
                          Integral &bull; Níveis 0-5
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-black text-xl md:text-2xl text-amber-100 group-hover:text-gold-gradient transition-colors mb-1.5 drop-shadow">
                      {chapter.title}
                    </h3>

                    <h4 className="text-xs md:text-sm text-amber-300 font-serif font-bold tracking-wide mb-3">
                      {chapter.subtitle}
                    </h4>

                    <p className="text-sm md:text-base text-slate-100 font-reading leading-relaxed line-clamp-3 font-normal drop-shadow-sm">
                      {chapter.summary}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="mt-5 pt-3.5 border-t border-amber-500/30 flex items-center justify-between text-sm font-serif font-bold text-amber-300 group-hover:text-white transition-colors">
                    <span>Abrir Pergaminho</span>
                    <span className="group-hover:translate-x-1.5 transition-transform text-base">&rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* =========================================================================
             MODE B: PARCHMENT CHAPTER VIEWER WITH KINETIC GEARS & SAFE MARGINS
             ========================================================================= */
          <div className="relative w-full max-w-5xl h-full flex flex-col my-auto pb-4">
            {/* Top Reader Actions Bar */}
            <div className="flex items-center justify-between mb-3 px-2">
              <button
                onClick={() => setSelectedChapter(null)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 text-amber-200 hover:text-white hover:bg-slate-800 text-sm font-serif font-bold tracking-wider shadow-lg cursor-pointer transition-all hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Códice</span>
              </button>

              {/* Prev / Next Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevChapter}
                  className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 text-amber-200 hover:text-white text-xs md:text-sm font-serif font-semibold tracking-wider cursor-pointer transition-all hover:bg-slate-800"
                  title="Capítulo Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="text-sm font-mono text-amber-300 font-bold px-3 py-1 rounded-lg bg-black/60 border border-amber-500/30">
                  {selectedChapter.roman} / X
                </span>
                <button
                  onClick={handleNextChapter}
                  className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 text-amber-200 hover:text-white text-xs md:text-sm font-serif font-semibold tracking-wider cursor-pointer transition-all hover:bg-slate-800"
                  title="Próximo Capítulo"
                >
                  <span className="hidden sm:inline">Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="p-2 rounded-xl bg-slate-900/90 border border-red-500/50 text-red-300 hover:text-white hover:bg-red-950/80 cursor-pointer transition-colors"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* The Parchment Sheet with Animated Gear Pillars */}
            <div className="relative flex-1 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] border-4 border-[#8c6d3b] overflow-hidden flex flex-col text-stone-950 font-reading bg-[#0a0f1d]">
              
              {/* Central Parchment Texture (Clean center, no sidebars baked in) */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
                style={{ backgroundImage: `url('./art/parchment-center.webp')` }}
              />

              {/* Inner Warm Parchment Readability Shield */}
              <div className="absolute inset-2 md:inset-4 bg-[#fbf4e4]/95 rounded-xl pointer-events-none border border-[#8c6d3b]/40 shadow-inner" />

              {/* LEFT MOVING GEAR PILLAR (Rolls up/down with scroll) */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 overflow-hidden pointer-events-none z-20 border-r border-[#8c6d3b]/50 shadow-[4px_0_15px_rgba(0,0,0,0.35)]">
                <div 
                  className="w-full h-[160%] bg-cover bg-top transition-transform duration-75 ease-out"
                  style={{
                    backgroundImage: `url('./art/border-left.webp')`,
                    transform: `translateY(-${scrollPercent * 180}px)`,
                  }}
                />
              </div>

              {/* RIGHT MOVING GEAR PILLAR (Rolls up/down with scroll) */}
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 overflow-hidden pointer-events-none z-20 border-l border-[#8c6d3b]/50 shadow-[-4px_0_15px_rgba(0,0,0,0.35)]">
                <div 
                  className="w-full h-[160%] bg-cover bg-top transition-transform duration-75 ease-out"
                  style={{
                    backgroundImage: `url('./art/border-right.webp')`,
                    transform: `translateY(-${scrollPercent * 180}px)`,
                  }}
                />
              </div>

              {/* Top Astrolabes Rotating with Scroll */}
              <div 
                className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 pointer-events-none z-30 transition-transform duration-75 ease-out opacity-90"
                style={{ transform: `rotate(${scrollPercent * 360}deg)` }}
              >
                <img src="./art/emblem.webp" alt="Engrenagem Astrolábio" className="w-full h-full object-contain drop-shadow" />
              </div>
              <div 
                className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 pointer-events-none z-30 transition-transform duration-75 ease-out opacity-90"
                style={{ transform: `rotate(-${scrollPercent * 360}deg)` }}
              >
                <img src="./art/emblem.webp" alt="Engrenagem Astrolábio" className="w-full h-full object-contain drop-shadow" />
              </div>

              {/* Scrollable Chapter Content with GENEROUS SAFE MARGINS */}
              <div 
                ref={readerScrollRef}
                onScroll={handleReaderScroll}
                className="relative z-10 flex-1 overflow-y-auto px-16 sm:px-24 md:px-32 lg:px-40 py-10"
              >
                <div className="max-w-2xl lg:max-w-3xl mx-auto">
                  {/* Chapter Heading Banner */}
                  <div className="text-center mb-8">
                    <span className="text-xs md:text-sm font-serif tracking-[0.45em] uppercase text-amber-950 font-black block mb-2">
                      Capítulo {selectedChapter.roman}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif font-black text-[#5c1818] tracking-wide mb-2 drop-shadow-sm">
                      {selectedChapter.title}
                    </h1>
                    <h2 className="text-base md:text-xl font-serif italic text-stone-900 font-bold mb-6">
                      {selectedChapter.subtitle}
                    </h2>

                    {/* Celestial Golden Divider Art */}
                    <div className="flex justify-center my-4">
                      <img
                        src="./art/divider.webp"
                        alt="Divisor Celestial"
                        className="max-w-[280px] md:max-w-md h-auto object-contain opacity-95 drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Chapter HTML Body with High-Contrast Dark Ink & Reader Typography */}
                  <div
                    className="parchment-reader leading-relaxed font-normal"
                    dangerouslySetInnerHTML={{ __html: selectedChapter.contentHtml }}
                  />

                  {/* Bottom Divider and Signature */}
                  <div className="mt-16 pt-8 border-t-2 border-amber-900/30 text-center flex flex-col items-center">
                    <img
                      src="./art/emblem.webp"
                      alt="Emblem Signature"
                      className="w-16 h-16 object-contain opacity-90 drop-shadow mb-3"
                    />
                    <span className="text-sm font-serif font-bold tracking-widest uppercase text-stone-800">
                      The Core of Man &bull; A Era dos Céus Partidos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full px-6 py-3 border-t border-amber-500/20 bg-slate-950/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-2 mb-1 sm:mb-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTAL CÓSMICO SINTONIZADO</span>
        </div>
        <span>10 CAPÍTULOS INTEGRADOS &bull; DONS DO CERNE & FARDOS DO VERBO COMPLETOS</span>
        <button
          onClick={onReturnToGrimoire}
          className="hover:text-amber-300 transition-colors underline font-serif cursor-pointer"
        >
          Retornar ao Grimório
        </button>
      </footer>
    </div>
  );
};
