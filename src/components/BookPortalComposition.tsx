import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

export const BookPortalComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Total composition: 285 frames (~9.5 seconds at 30 FPS)
  // Stage 1: Closed Book Awakening (0 -> 75 frames / ~2.5s)
  // Stage 2: Book Opening & Radiant Mana Eruption (60 -> 155 frames / ~3.1s)
  // Stage 3: Hyperspace Flight across Golden Citadel (140 -> 230 frames / ~3.0s)
  // Stage 4: Arrival in the Deep Universe (215 -> 285 frames / ~2.3s)

  // 1. Closed Book Opacity & Subtle Drift
  const closedBookOpacity = interpolate(frame, [0, 55, 75], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const closedBookScale = interpolate(frame, [0, 75], [1, 1.15], {
    extrapolateRight: 'clamp',
  });

  // Astrological Seal on the Closed Book (Transparent Alpha)
  const sealRotation = interpolate(frame, [0, 75], [0, 180]);
  const sealScale = interpolate(frame, [0, 50, 75], [1, 1.25, 0], {
    extrapolateRight: 'clamp',
  });
  const sealGlow = interpolate(frame, [0, 55, 75], [15, 60, 100]);

  // 2. Open Book Opacity & Zoom into Pages
  const openBookOpacity = interpolate(frame, [55, 75, 145, 165], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const openBookScale = interpolate(frame, [65, 160], [1.02, 2.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lightAuraOpacity = interpolate(frame, [65, 110, 150, 165], [0, 0.7, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Golden Citadel Sky-Islands Warp Layer
  const journeyOpacity = interpolate(frame, [145, 165, 215, 235], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const journeyScale = interpolate(frame, [150, 235], [1.25, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Universe Destination Opacity & Settling Pan
  const universeOpacity = interpolate(frame, [215, 240, 285], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const universeScale = interpolate(frame, [220, 285], [1.1, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Optical Portal Light Flash
  const flashOpacity = interpolate(frame, [135, 155, 175], [0, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-[#05070d] overflow-hidden select-none">
      {/* 1. Closed Book Layer */}
      <AbsoluteFill
        style={{
          opacity: closedBookOpacity,
          transform: `scale(${closedBookScale})`,
        }}
      >
        <img
          src="./art/book-closed.webp"
          alt="Grimório no Pedestal"
          className="w-full h-full object-cover object-center"
        />
        {/* Glowing Awakening Seal with clean alpha */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="./art/emblem.webp"
            alt="Selo Despertando"
            style={{
              width: '280px',
              height: '280px',
              transform: `rotate(${sealRotation}deg) scale(${sealScale})`,
              filter: `drop-shadow(0 0 ${sealGlow}px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 35px rgba(212, 175, 55, 0.8))`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* 2. Open Book Layer (Portal of Light) */}
      <AbsoluteFill
        style={{
          opacity: openBookOpacity,
          transform: `scale(${openBookScale})`,
          transformOrigin: '50% 62%',
        }}
      >
        <img
          src="./art/book-open.webp"
          alt="Grimório Aberto"
          className="w-full h-full object-cover object-center"
        />
        {/* Ethereal Volumetric Light Cone Rising from Pages */}
        <div
          className="absolute inset-0 bg-radial-gradient from-amber-100/95 via-sky-300/40 to-transparent pointer-events-none"
          style={{
            opacity: lightAuraOpacity,
            mixBlendMode: 'screen',
          }}
        />
      </AbsoluteFill>

      {/* 3. Golden Citadel Sky-Islands Warp Layer */}
      <AbsoluteFill
        style={{
          opacity: journeyOpacity,
          transform: `scale(${journeyScale})`,
        }}
      >
        <img
          src="./art/journey.webp"
          alt="Cidadela Dourada e Ilhas Flutuantes"
          className="w-full h-full object-cover object-center"
        />
      </AbsoluteFill>

      {/* 4. Deep Universe Destination Layer */}
      <AbsoluteFill
        style={{
          opacity: universeOpacity,
          transform: `scale(${universeScale})`,
        }}
      >
        <img
          src="./art/universe.webp"
          alt="O Universo dos Céus Partidos"
          className="w-full h-full object-cover object-center"
        />
      </AbsoluteFill>

      {/* Portal Flash Surge */}
      <AbsoluteFill
        className="bg-gradient-to-t from-sky-200 via-amber-100 to-white pointer-events-none"
        style={{
          opacity: flashOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Elevated High-Contrast Caption Banner (Positioned above bottom bezel with dark glass pill) */}
      <AbsoluteFill className="flex flex-col items-center justify-end pb-28 md:pb-36 pointer-events-none px-6">
        
        {/* Stage 1 Caption */}
        {frame >= 10 && frame < 65 && (
          <div
            className="bg-slate-950/85 border-2 border-amber-400/60 rounded-2xl px-8 py-4 shadow-[0_0_40px_rgba(0,0,0,0.95)] backdrop-blur-md text-center max-w-2xl"
            style={{
              opacity: interpolate(frame, [15, 30, 50, 65], [0, 1, 1, 0]),
            }}
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-amber-300 font-bold block mb-1 drop-shadow">
              Despertando o Grimório
            </span>
            <p className="text-xl md:text-3xl font-serif font-bold text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] italic">
              "O selo milenar do Verbo reage ao seu toque..."
            </p>
          </div>
        )}

        {/* Stage 2 Caption */}
        {frame >= 70 && frame < 145 && (
          <div
            className="bg-slate-950/85 border-2 border-sky-400/60 rounded-2xl px-8 py-4 shadow-[0_0_40px_rgba(0,0,0,0.95)] backdrop-blur-md text-center max-w-2xl"
            style={{
              opacity: interpolate(frame, [75, 95, 125, 145], [0, 1, 1, 0]),
            }}
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-sky-300 font-bold block mb-1 drop-shadow">
              Ruptura do Véu
            </span>
            <p className="text-xl md:text-3xl font-serif font-bold text-sky-50 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] italic">
              "As páginas se abrem como um portal entre mundos..."
            </p>
          </div>
        )}

        {/* Stage 3 Caption */}
        {frame >= 150 && frame < 225 && (
          <div
            className="bg-slate-950/85 border-2 border-amber-400/60 rounded-2xl px-8 py-4 shadow-[0_0_40px_rgba(0,0,0,0.95)] backdrop-blur-md text-center max-w-2xl"
            style={{
              opacity: interpolate(frame, [155, 175, 205, 225], [0, 1, 1, 0]),
            }}
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-amber-300 font-bold block mb-1 drop-shadow">
              A Travessia dos Céus
            </span>
            <p className="text-xl md:text-3xl font-serif font-bold text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] italic">
              "Cruzando o mar de nuvens e as cidades suspensas..."
            </p>
          </div>
        )}

        {/* Stage 4 Caption */}
        {frame >= 230 && (
          <div
            className="bg-slate-950/90 border-2 border-amber-400/80 rounded-2xl px-8 py-5 shadow-[0_0_50px_rgba(212,175,55,0.5)] backdrop-blur-md text-center max-w-2xl"
            style={{
              opacity: interpolate(frame, [230, 250], [0, 1]),
            }}
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-amber-300 font-bold block mb-1 drop-shadow">
              Destino Alcançado
            </span>
            <p className="text-2xl md:text-4xl font-serif font-black tracking-wider text-gold-gradient drop-shadow-[0_4px_15px_rgba(0,0,0,1)] uppercase">
              Bem-vindo aos Céus Partidos
            </p>
          </div>
        )}

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
