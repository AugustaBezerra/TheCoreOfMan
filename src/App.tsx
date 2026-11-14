import React, { useState, useEffect } from 'react';
import { GrimoireEntry } from './components/GrimoireEntry';
import { DimensionDiveTransition } from './components/DimensionDiveTransition';
import { CosmicUniverseExplorer } from './components/CosmicUniverseExplorer';
import { CharacterSheetView } from './components/sheet/CharacterSheetView';
import { CharacterHangar } from './components/hangar/CharacterHangar';
import { GameMasterDashboard } from './components/gm/GameMasterDashboard';
import { RadialCompassMenu, RadialAction } from './components/radial/RadialCompassMenu';
import { SharedWorldModal } from './components/radial/SharedWorldModal';
import { AuthModal } from './components/auth/AuthModal';
import { DiceRollerModal } from './components/dice/DiceRollerModal';
import { Character, UserProfile } from './types/character';
import { onAuthUserChange } from './services/authService';
import { 
  saveCharacter, 
  subscribePlayerCharacters 
} from './services/characterService';

export type ScreenState = 'grimoire' | 'transition' | 'universe' | 'hangar' | 'sheet' | 'gm';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('grimoire');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [sheetTab, setSheetTab] = useState<'atributos' | 'habilidades' | 'inventario' | 'diario'>('atributos');

  // Modals state
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDiceOpen, setIsDiceOpen] = useState(false);
  const [sharedWorldType, setSharedWorldType] = useState<'maps' | 'bestiary' | 'npcs' | null>(null);

  // Initialize Auth
  useEffect(() => {
    const unsubAuth = onAuthUserChange((user) => {
      setCurrentUser(user);
    });

    return () => {
      if (typeof unsubAuth === 'function') unsubAuth();
    };
  }, []);

  // Subscribe to characters only when authenticated
  useEffect(() => {
    if (!currentUser) {
      setActiveCharacter(null);
      return;
    }

    const unsubChars = subscribePlayerCharacters(currentUser.uid, (chars) => {
      if (chars.length > 0) {
        setActiveCharacter((prev) => (prev && chars.some((c) => c.id === prev.id) ? prev : chars[0]));
      } else {
        setActiveCharacter(null);
      }
    });

    return () => {
      if (typeof unsubChars === 'function') unsubChars();
    };
  }, [currentUser]);

  // Keyboard shortcut: TAB toggles Radial Compass ONLY when logged in and in game view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept copy/paste or combinations with Ctrl, Meta, Alt
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Don't trigger if user is not logged in or viewing books/grimoire
      if (!currentUser) return;
      if (screen === 'grimoire' || screen === 'transition' || screen === 'universe') return;

      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        setIsRadialOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, currentUser]);

  // Handle action from Radial Compass Menu
  const handleRadialAction = (action: RadialAction) => {
    setIsRadialOpen(false);

    switch (action) {
      case 'sheet':
        setSheetTab('atributos');
        setScreen('sheet');
        break;
      case 'inventory':
        setSheetTab('inventario');
        setScreen('sheet');
        break;
      case 'journal':
        setSheetTab('diario');
        setScreen('sheet');
        break;
      case 'library':
        setScreen('universe');
        break;
      case 'maps':
        setSharedWorldType('maps');
        break;
      case 'bestiary':
        setSharedWorldType('bestiary');
        break;
      case 'npcs':
        setSharedWorldType('npcs');
        break;
      case 'hangar':
        setScreen('hangar');
        break;
    }
  };

  const handleOpenSheetForChar = (char: Character) => {
    setActiveCharacter(char);
    setSheetTab('atributos');
    setScreen('sheet');
  };

  const handleSaveCharacter = async (char: Character) => {
    await saveCharacter(char);
    setActiveCharacter(char);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d] text-slate-100 flex flex-col">
      
      {/* GLOBAL TOP NAV BAR (Hidden on Grimoire / Transition / Universe) */}
      {screen !== 'grimoire' && screen !== 'transition' && screen !== 'universe' && (
        <header className="relative z-40 w-full px-4 py-2.5 flex items-center justify-between border-b border-amber-500/20 bg-[#070a12]/90 backdrop-blur-md">
          
          {/* Left: Quick screen jumps */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsRadialOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
              title="Abrir Astrolábio Celestial (TAB)"
            >
              <span>🧭</span>
              <span className="hidden sm:inline">Astrolábio</span>
            </button>

            <button
              onClick={() => setScreen('hangar')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-serif transition-colors ${
                screen === 'hangar'
                  ? 'border-amber-400 bg-amber-950/40 text-amber-200 font-bold'
                  : 'border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              ⚙️ Hangar
            </button>

            <button
              onClick={() => setScreen('universe')}
              className="px-3 py-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-serif transition-colors"
            >
              📖 Livro (10 Capítulos)
            </button>

            {currentUser?.role === 'gm' && (
              <button
                onClick={() => setScreen('gm')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-serif font-bold transition-all ${
                  screen === 'gm'
                    ? 'border-purple-400 bg-purple-900/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'border-purple-900/60 text-purple-400 hover:text-purple-200'
                }`}
              >
                👑 Trono da Mestre
              </button>
            )}
          </div>

          {/* Right: Active Character badge, D20 roller, and User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {activeCharacter && screen !== 'sheet' && (
              <button
                onClick={() => handleOpenSheetForChar(activeCharacter)}
                className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-xl border border-amber-600/30 bg-stone-900/80 hover:bg-stone-800 text-xs font-serif text-amber-200 transition-colors"
                title="Abrir Ficha de Navegante"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-400">
                  <img src={activeCharacter.avatarUrl || './art/journey.webp'} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold">{activeCharacter.name}</span>
                <span className="text-[10px] text-red-400">PV {activeCharacter.pv.current}/{activeCharacter.pv.max}</span>
              </button>
            )}

            <button
              onClick={() => setIsDiceOpen(true)}
              className="px-2.5 py-1.5 rounded-lg border border-sky-500/40 bg-sky-950/40 hover:bg-sky-900/60 text-sky-200 text-xs font-serif font-bold transition-colors flex items-center space-x-1"
              title="Rolar Dados Celestiais (D20, D6, D100...)"
            >
              <span>🎲</span>
              <span className="hidden sm:inline">D20</span>
            </button>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-stone-900/90 hover:bg-stone-800 text-xs font-serif text-amber-200 hover:text-white transition-all shadow"
            >
              <div className="w-5 h-5 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : '👤'}
              </div>
              <span className="max-w-[100px] truncate">
                {currentUser ? currentUser.displayName : 'Entrar'}
              </span>
            </button>
          </div>

        </header>
      )}

      {/* MAIN SCREEN VIEWS */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* VIEW 1: GRIMOIRE ENTRY */}
        {screen === 'grimoire' && (
          <GrimoireEntry onOpenBook={() => setScreen('transition')} />
        )}

        {/* VIEW 2: DIMENSION DIVE TRANSITION */}
        {screen === 'transition' && (
          <DimensionDiveTransition onFinish={() => setScreen('universe')} />
        )}

        {/* VIEW 3: 10 CHAPTERS BOOK READER */}
        {screen === 'universe' && (
          <CosmicUniverseExplorer 
            onReturnToGrimoire={() => setScreen('grimoire')}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenHangar={() => setScreen('hangar')}
          />
        )}

        {/* VIEW 4: CHARACTER HANGAR */}
        {screen === 'hangar' && (
          <CharacterHangar
            currentUser={currentUser}
            activeCharacter={activeCharacter}
            onSelectCharacter={(char) => {
              setActiveCharacter(char);
              setIsRadialOpen(true);
            }}
            onOpenSheet={(char) => handleOpenSheetForChar(char)}
            onOpenGmScreen={() => setScreen('gm')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* VIEW 5: FULL CHARACTER SHEET */}
        {screen === 'sheet' && activeCharacter && (
          <div className="h-full overflow-y-auto p-4 sm:p-6 bg-[#07090e]">
            <CharacterSheetView
              character={activeCharacter}
              initialTab={sheetTab}
              onSaveCharacter={handleSaveCharacter}
              onBackToCompass={() => setIsRadialOpen(true)}
              isGmView={currentUser?.role === 'gm'}
            />
          </div>
        )}

        {/* VIEW 6: GAME MASTER DASHBOARD */}
        {screen === 'gm' && (
          <div className="h-full overflow-y-auto">
            <GameMasterDashboard
              currentUser={currentUser}
              onOpenSheet={(char) => handleOpenSheetForChar(char)}
              onBackToHangar={() => setScreen('hangar')}
            />
          </div>
        )}

      </div>

      {/* FLOATING ACTION PILL FOR RADIAL COMPASS (Only when logged in) */}
      {currentUser && screen !== 'grimoire' && screen !== 'transition' && !isRadialOpen && (
        <button
          onClick={() => setIsRadialOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full border-2 border-amber-400 bg-stone-950/95 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all group cursor-pointer"
          title="Abrir Astrolábio Celestial (TAB)"
        >
          <span className="group-hover:rotate-45 transition-transform duration-300">🧭</span>
        </button>
      )}

      {/* RADIAL COMPASS MENU MODAL */}
      <RadialCompassMenu
        isOpen={isRadialOpen}
        activeCharacter={activeCharacter}
        onSelectAction={handleRadialAction}
        onClose={() => setIsRadialOpen(false)}
      />

      {/* SHARED WORLD MODAL (Maps, Bestiary, NPCs) */}
      {sharedWorldType && (
        <SharedWorldModal
          type={sharedWorldType}
          isOpen={true}
          currentUser={currentUser}
          onClose={() => setSharedWorldType(null)}
        />
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        currentUser={currentUser}
        onClose={() => setIsAuthOpen(false)}
        onUserChange={(user) => setCurrentUser(user)}
      />

      {/* QUICK DICE ROLLER MODAL */}
      <DiceRollerModal
        isOpen={isDiceOpen}
        onClose={() => setIsDiceOpen(false)}
        rollReason="Rolagem Rápida de Resolução"
      />

    </div>
  );
};

export default App;
