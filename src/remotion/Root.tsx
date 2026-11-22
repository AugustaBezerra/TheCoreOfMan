import React from 'react';
import { Composition, registerRoot } from 'remotion';
import '../styles/index.css';
import { MareDeOuroTrailerComposition } from '../components/MareDeOuroTrailerComposition';
import { BookPortalComposition } from '../components/BookPortalComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Transição Original do Livro */}
      <Composition
        id="BookPortal"
        component={BookPortalComposition}
        durationInFrames={285}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Teaser Maré de Ouro e Pólvora - Versão 1: Black Sails (Recomendada) */}
      <Composition
        id="MareDeOuro-BlackSails"
        component={MareDeOuroTrailerComposition}
        durationInFrames={2070}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          selectedMusic: 'black_sails' as const,
          musicVolume: 0.55,
          voiceVolume: 1.25,
          showSubtitles: true,
        }}
      />

      {/* 3. Teaser Maré de Ouro e Pólvora - Versão 2: Pirate Adventure */}
      <Composition
        id="MareDeOuro-PirateAdventure"
        component={MareDeOuroTrailerComposition}
        durationInFrames={2070}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          selectedMusic: 'pirate_adventure' as const,
          musicVolume: 0.55,
          voiceVolume: 1.25,
          showSubtitles: true,
        }}
      />

      {/* 4. Teaser Maré de Ouro e Pólvora - Versão 3: Reign of Darkness */}
      <Composition
        id="MareDeOuro-ReignOfDarkness"
        component={MareDeOuroTrailerComposition}
        durationInFrames={2070}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          selectedMusic: 'reign_of_darkness' as const,
          musicVolume: 0.55,
          voiceVolume: 1.25,
          showSubtitles: true,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
