import React, { useState, useMemo } from 'react';
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
  TrendingUp, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import { StarfieldCanvas } from './StarfieldCanvas';
import { sound } from '../utils/audio';

interface CosmicUniverseExplorerProps {
  onReturnToGrimoire: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CosmicUniverseExplorer: React.FC<CosmicUniverseExplorerProps> = ({
  onReturnToGrimoire,
  soundEnabled,
  onToggleSound,
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

  const handleSelectChapter = (chapter: Chapter) => {
    sound.playPageTurn();
    setSelectedChapter(chapter);
  };

  const handleNextChapter = () => {
    if (!selectedChapter) return;
    const nextIdx = (selectedChapter.id % BOOK_CHAPTERS.length) + 1;
    const nextChap = BOOK_CHAPTERS.find((c) => c.id === nextIdx);
    if (nextChap) {
      sound.playPageTurn();
      setSelectedChapter(nextChap);
    }
  };

  const handlePrevChapter = () => {
    if (!selectedChapter) return;
    const prevIdx = selectedChapter.id === 1 ? BOOK_CHAPTERS.length : selectedChapter.id - 1;
    const prevChap = BOOK_CHAPTERS.find((c) => c.id === prevIdx);
    if (prevChap) {
      sound.playPageTurn();
      setSelectedChapter(prevChap);
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
      <header className="relative z-30 w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-amber-500/20 bg-slate-950/70 backdrop-blur-md">
        {/* Return Button */}
        <button
          onClick={onReturnToGrimoire}
          className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200 hover:text-white hover:bg-amber-900/60 transition-all font-serif text-xs md:text-sm tracking-wider shadow-lg group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Fechar e Voltar ao Livro</span>
          <span className="sm:hidden">Voltar</span>
        </button>

        {/* Center Title & Emblem */}
        <div className="flex items-center space-x-3 text-center">
          <img
            src="./art/emblem.webp"
            alt="Core Emblem"
            className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]"
          />
          <div>
            <span className="text-[10px] md:text-xs font-serif tracking-[0.3em] uppercase text-amber-300/80 block">
              Universo dos Céus Partidos
            </span>
            <span className="text-sm md:text-base font-bold font-serif text-gold-gradient tracking-widest block">
              CÓDICE DO NAVEGANTE
            </span>
          </div>
        </div>

        {/* Controls: Scene Switcher & Audio */}
        <div className="flex items-center space-x-2">
          {/* Scene Switcher Dropdown */}
          <div className="hidden md:flex items-center bg-slate-900/80 rounded-lg p-1 border border-amber-500/30 text-xs font-serif">
            <button
              onClick={() => setBackgroundScene('universe')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundScene === 'universe' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Universo
            </button>
            <button
              onClick={() => setBackgroundScene('library')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundScene === 'library' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Biblioteca
            </button>
            <button
              onClick={() => setBackgroundScene('citadel')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundScene === 'citadel' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Cidadela
            </button>
          </div>

          <button
            onClick={onToggleSound}
            className="p-2 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 transition-all"
            title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Efeitos Sonoros'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
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
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-100 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  <span>Compêndio de Regras e Ambientação</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-400 font-reading mt-1">
                  Selecione um capítulo celestial para desvendar suas leis, sistemas e mistérios.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar Dons, Fardos, Regras..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-amber-500/40 rounded-full text-xs font-serif text-amber-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 backdrop-blur-md"
                />
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter)}
                  className={`group relative p-5 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col justify-between backdrop-blur-md overflow-hidden ${
                    chapter.id === 9
                      ? 'bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-red-950/80 border-amber-500/80 shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:border-amber-300 hover:scale-[1.02]'
                      : 'bg-slate-950/70 border-amber-500/30 hover:border-amber-400/80 hover:bg-slate-900/80 hover:scale-[1.02]'
                  }`}
                >
                  {/* Subtle Corner Ornament Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                  <div>
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-amber-400/80 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                          {chapter.roman}
                        </span>
                        <div className="text-amber-300 group-hover:text-amber-100 transition-colors">
                          {iconMap[chapter.iconName] || <BookOpen className="w-5 h-5" />}
                        </div>
                      </div>

                      {chapter.id === 9 && (
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-300 bg-amber-900/80 px-2 py-0.5 rounded-full border border-amber-500/60 animate-pulse">
                          Integral &bull; Níveis 0-5
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-amber-100 group-hover:text-gold-gradient transition-colors mb-1">
                      {chapter.title}
                    </h3>

                    <h4 className="text-xs text-amber-300/70 font-serif italic mb-3">
                      {chapter.subtitle}
                    </h4>

                    <p className="text-xs text-slate-300/80 font-reading leading-relaxed line-clamp-3">
                      {chapter.summary}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs font-serif text-amber-400 group-hover:text-amber-200">
                    <span>Abrir Pergaminho</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* =========================================================================
             MODE B: PARCHMENT CHAPTER VIEWER
             ========================================================================= */
          <div className="relative w-full max-w-4xl h-full flex flex-col my-auto pb-4">
            {/* Top Reader Actions Bar */}
            <div className="flex items-center justify-between mb-3 px-2">
              <button
                onClick={() => setSelectedChapter(null)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/40 text-amber-200 hover:text-white hover:bg-slate-800 text-xs font-serif tracking-wider shadow-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao Códice</span>
              </button>

              {/* Prev / Next Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevChapter}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/40 text-amber-200 hover:text-white text-xs font-serif tracking-wider"
                  title="Capítulo Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="text-xs font-mono text-amber-300 font-bold px-2">
                  {selectedChapter.roman} / X
                </span>
                <button
                  onClick={handleNextChapter}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/40 text-amber-200 hover:text-white text-xs font-serif tracking-wider"
                  title="Próximo Capítulo"
                >
                  <span className="hidden sm:inline">Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="p-1.5 rounded-lg bg-slate-900/90 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-950/80"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Parchment Sheet */}
            <div className="relative flex-1 bg-[#f7eedb] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] border-4 border-[#8c6d3b] overflow-hidden flex flex-col text-stone-900 font-reading">
              {/* Parchment Inner Border Frame */}
              <div className="absolute inset-2 md:inset-4 border border-[#8c6d3b]/40 rounded-xl pointer-events-none" />

              {/* Scrollable Chapter Content */}
              <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-14 py-8">
                {/* Chapter Heading Banner */}
                <div className="text-center mb-6">
                  <span className="text-xs font-serif tracking-[0.4em] uppercase text-amber-900 font-bold block mb-1">
                    Capítulo {selectedChapter.roman}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5c1818] tracking-wide mb-1">
                    {selectedChapter.title}
                  </h1>
                  <h2 className="text-sm md:text-base font-serif italic text-stone-700 mb-4">
                    {selectedChapter.subtitle}
                  </h2>

                  {/* Celestial Golden Divider Art */}
                  <div className="flex justify-center my-3">
                    <img
                      src="./art/divider.webp"
                      alt="Divider"
                      className="max-w-[280px] md:max-w-md h-auto object-contain opacity-90 drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Chapter HTML Body */}
                <div
                  className="prose prose-stone max-w-none text-stone-900 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedChapter.contentHtml }}
                />

                {/* Bottom Divider and Signature */}
                <div className="mt-12 pt-6 border-t border-amber-900/20 text-center flex flex-col items-center">
                  <img
                    src="./art/emblem.webp"
                    alt="Emblem Signature"
                    className="w-12 h-12 object-contain opacity-80 mb-2"
                  />
                  <span className="text-xs font-serif tracking-widest uppercase text-stone-600">
                    The Core of Man &bull; A Era dos Céus Partidos
                  </span>
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
          className="hover:text-amber-300 transition-colors underline font-serif"
        >
          Retornar ao Grimório
        </button>
      </footer>
    </div>
  );
};
