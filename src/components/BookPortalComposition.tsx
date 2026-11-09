import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

export const BookPortalComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Cross fades between the scenes
  // Phase 1: Closed book (0 - 35)
  const closedBookOpacity = interpolate(frame, [25, 40], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Open book with erupting light (25 - 75)
  const openBookOpacity = interpolate(frame, [25, 40, 70, 85], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3: Hyperspace / Citadel flight (70 - 105)
  const journeyOpacity = interpolate(frame, [70, 85, 100, 115], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4: Arrival in the Deep Universe (100 - 120)
  const universeOpacity = interpolate(frame, [100, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Light burst flash at the moment of entering the book portal (around frame 65-80)
  const flashOpacity = interpolate(frame, [60, 75, 90], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Seal rotation and expansion
  const sealRotation = interpolate(frame, [0, 45], [0, 360]);
  const sealScale = interpolate(frame, [0, 30, 45], [1, 1.3, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-[#05070d] overflow-hidden">
      {/* 1. Closed Book Layer */}
      <AbsoluteFill
        style={{
          opacity: closedBookOpacity,
          transform: `scale(${interpolate(frame, [0, 40], [1, 1.25])})`,
        }}
      >
        <img
          src="./art/book-closed.webp"
          alt="Grimoire"
          className="w-full h-full object-cover object-center"
        />
        {/* Pulsing seal breaking */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="./art/emblem.webp"
            alt="Breaking Seal"
            style={{
              width: '260px',
              height: '260px',
              transform: `rotate(${sealRotation}deg) scale(${sealScale})`,
              filter: `drop-shadow(0 0 ${interpolate(frame, [0, 35], [20, 80])}px rgba(56, 189, 248, 0.9))`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* 2. Open Book Layer (Light Portal) */}
      <AbsoluteFill
        style={{
          opacity: openBookOpacity,
          transform: `scale(${interpolate(frame, [30, 85], [1, 3.5])})`,
          transformOrigin: '50% 60%',
        }}
      >
        <img
          src="./art/book-open.webp"
          alt="Open Grimoire Portal"
          className="w-full h-full object-cover object-center"
        />
        {/* Radiant Arcane Light Cone */}
        <div
          className="absolute inset-0 bg-radial-gradient from-amber-200/90 via-sky-400/50 to-transparent pointer-events-none"
          style={{
            opacity: interpolate(frame, [35, 65, 80], [0, 0.8, 1]),
            mixBlendMode: 'screen',
          }}
        />
      </AbsoluteFill>

      {/* 3. Hyperspace Citadel Warp Layer */}
      <AbsoluteFill
        style={{
          opacity: journeyOpacity,
          transform: `scale(${interpolate(frame, [70, 115], [1.4, 1])})`,
        }}
      >
        <img
          src="./art/journey.webp"
          alt="Cosmic Citadel Warp"
          className="w-full h-full object-cover object-center"
        />
      </AbsoluteFill>

      {/* 4. Deep Universe Destination Layer */}
      <AbsoluteFill
        style={{
          opacity: universeOpacity,
          transform: `scale(${interpolate(frame, [100, 120], [1.08, 1])})`,
        }}
      >
        <img
          src="./art/universe.webp"
          alt="The Broken Heavens Universe"
          className="w-full h-full object-cover object-center"
        />
      </AbsoluteFill>

      {/* Optical Transition Flash (White/Gold blinding surge) */}
      <AbsoluteFill
        className="bg-gradient-to-t from-sky-100 via-amber-100 to-white pointer-events-none"
        style={{
          opacity: flashOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Atmospheric Cinematic Text during warp */}
      <AbsoluteFill className="flex flex-col items-center justify-center pointer-events-none">
        {frame > 35 && frame < 85 && (
          <h2
            className="text-4xl md:text-6xl font-serif font-black tracking-[0.3em] uppercase text-amber-100 text-center drop-shadow-[0_0_30px_rgba(212,175,55,1)]"
            style={{
              opacity: interpolate(frame, [40, 55, 75, 85], [0, 1, 1, 0]),
            }}
          >
            Atravessando o Verbo...
          </h2>
        )}
        {frame >= 95 && (
          <h2
            className="text-3xl md:text-5xl font-serif font-bold tracking-[0.25em] uppercase text-sky-200 text-center drop-shadow-[0_0_30px_rgba(56,189,248,1)]"
            style={{
              opacity: interpolate(frame, [95, 110], [0, 1]),
            }}
          >
            Bem-vindo aos Céus Partidos
          </h2>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
