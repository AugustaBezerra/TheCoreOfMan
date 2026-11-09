import React, { useState } from 'react';
import { GrimoireEntry } from './components/GrimoireEntry';
import { DimensionDiveTransition } from './components/DimensionDiveTransition';
import { CosmicUniverseExplorer } from './components/CosmicUniverseExplorer';

export type ScreenState = 'grimoire' | 'transition' | 'universe';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('grimoire');

  const handleOpenBook = () => {
    setScreen('transition');
  };

  const handleTransitionFinish = () => {
    setScreen('universe');
  };

  const handleReturnToGrimoire = () => {
    setScreen('grimoire');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#05070d] text-slate-100">
      {screen === 'grimoire' && (
        <GrimoireEntry onOpenBook={handleOpenBook} />
      )}

      {screen === 'transition' && (
        <DimensionDiveTransition onFinish={handleTransitionFinish} />
      )}

      {screen === 'universe' && (
        <CosmicUniverseExplorer onReturnToGrimoire={handleReturnToGrimoire} />
      )}
    </div>
  );
};

export default App;
