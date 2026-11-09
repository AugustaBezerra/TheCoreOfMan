import React, { useState } from 'react';
import { GrimoireEntry } from './components/GrimoireEntry';
import { DimensionDiveTransition } from './components/DimensionDiveTransition';
import { CosmicUniverseExplorer } from './components/CosmicUniverseExplorer';
import { sound } from './utils/audio';

export type ScreenState = 'grimoire' | 'transition' | 'universe';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('grimoire');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const handleOpenBook = () => {
    setScreen('transition');
  };

  const handleTransitionFinish = () => {
    setScreen('universe');
  };

  const handleReturnToGrimoire = () => {
    sound.playPageTurn();
    setScreen('grimoire');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#05070d] text-slate-100">
      {screen === 'grimoire' && (
        <GrimoireEntry
          onOpenBook={handleOpenBook}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {screen === 'transition' && (
        <DimensionDiveTransition onFinish={handleTransitionFinish} />
      )}

      {screen === 'universe' && (
        <CosmicUniverseExplorer
          onReturnToGrimoire={handleReturnToGrimoire}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
    </div>
  );
};

export default App;
