import React from 'react';
import { 
  AbsoluteFill, 
  interpolate, 
  useCurrentFrame, 
  Audio, 
  Sequence,
  staticFile 
} from 'remotion';

export type MusicOption = 'black_sails' | 'pirate_adventure' | 'reign_of_darkness';

export interface MareDeOuroTrailerProps {
  selectedMusic?: MusicOption;
  musicVolume?: number;
  voiceVolume?: number;
  showSubtitles?: boolean;
}

export const MareDeOuroTrailerComposition: React.FC<MareDeOuroTrailerProps> = ({
  selectedMusic = 'black_sails',
  musicVolume = 0.50,
  voiceVolume = 1.2,
  showSubtitles = true,
}) => {
  const frame = useCurrentFrame();

  // Total duration: 2070 frames (~69 seconds at 30 fps)
  // Scene 1: 0 - 480 (16.0s) - Rio Harbor in the Mist, 1939
  // Scene 2: 480 - 910 (14.3s) - Moonlit Raiders Approaching the Fortress
  // Scene 3: 910 - 1205 (9.8s) - Stormy Moonlit Pirate Rogue
  // Scene 4: 1205 - 1500 (9.8s) - Rainy Moonlit Fortress Officer
  // Scene 5: 1500 - 1860 (12.0s) - Nightfall Harbor Battle
  // Title Card: 1860 - 2070 (7.0s) - Emblem & Dramatic Title Reveal

  // 1. Ken Burns Animations per Scene
  const s1Scale = interpolate(frame, [0, 480], [1.0, 1.14], { extrapolateRight: 'clamp' });
  const s1Y = interpolate(frame, [0, 480], [0, -30], { extrapolateRight: 'clamp' });

  const s2Scale = interpolate(frame, [480, 910], [1.04, 1.16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2X = interpolate(frame, [480, 910], [-20, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s3Scale = interpolate(frame, [910, 1205], [1.02, 1.18], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Y = interpolate(frame, [910, 1205], [15, -15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s4Scale = interpolate(frame, [1205, 1500], [1.12, 1.03], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s4Y = interpolate(frame, [1205, 1500], [25, -10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s5Scale = interpolate(frame, [1500, 1860], [1.02, 1.18], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Cannon shake tremor at specific bursts
  const isCannonPulse = (frame >= 1530 && frame <= 1545) || 
                        (frame >= 1610 && frame <= 1625) || 
                        (frame >= 1700 && frame <= 1715) || 
                        (frame >= 1780 && frame <= 1795);
  const shakeX = isCannonPulse ? Math.sin(frame * 2.5) * 6 : 0;
  const shakeY = isCannonPulse ? Math.cos(frame * 2.5) * 6 : 0;
  const cannonFlashOpacity = isCannonPulse ? 0.35 : 0;

  // Final Title Reveal (1860 -> 2070)
  const titleOpacity = interpolate(frame, [1860, 1895, 2045, 2070], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(frame, [1860, 2070], [0.96, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const emblemGlow = interpolate(frame, [1860, 1930, 2020], [25, 60, 35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Background Music Ducking: drops when voice speaks, swells in transitions
  const getMusicVolume = (f: number) => {
    if (f < 450) return interpolate(f, [0, 25, 420, 460], [0, 0.08, 0.08, 0.35], { extrapolateLeft: 'clamp' });
    if (f >= 450 && f < 510) return interpolate(f, [450, 480, 510], [0.35, 0.40, 0.08]);
    if (f >= 510 && f < 880) return 0.08;
    if (f >= 880 && f < 930) return interpolate(f, [880, 905, 930], [0.08, 0.38, 0.08]);
    if (f >= 930 && f < 1180) return 0.08;
    if (f >= 1180 && f < 1225) return interpolate(f, [1180, 1202, 1225], [0.08, 0.38, 0.08]);
    if (f >= 1225 && f < 1475) return 0.08;
    if (f >= 1475 && f < 1520) return interpolate(f, [1475, 1500, 1520], [0.08, 0.48, 0.16]);
    if (f >= 1520 && f < 1850) return 0.16;
    if (f >= 1850 && f < 2030) return interpolate(f, [1850, 1910, 2030], [0.25, 0.55, 0.55]);
    return interpolate(f, [2030, 2070], [0.55, 0]);
  };

  const currentMusicVolume = getMusicVolume(frame) * musicVolume;

  const musicFileMap: Record<MusicOption, string> = {
    black_sails: staticFile('oneshots/mare-de-ouro-e-polvora/music_black_sails.mp3'),
    pirate_adventure: staticFile('oneshots/mare-de-ouro-e-polvora/music_pirate_adventure.mp3'),
    reign_of_darkness: staticFile('oneshots/mare-de-ouro-e-polvora/music_reign_of_darkness.mp3'),
  };

  return (
    <AbsoluteFill className="bg-black select-none overflow-hidden font-sans">
      {/* ======================================================== */}
      {/* AUDIO TRACKS (MP3 Universais)                            */}
      {/* ======================================================== */}
      {/* 1. Trilha de Fundo */}
      <Audio 
        src={musicFileMap[selectedMusic]}
        volume={() => currentMusicVolume}
        startFrom={0}
      />

      {/* 2. Voz Cena 1 (Porto e Café) */}
      <Sequence from={15} durationInFrames={465}>
        <Audio 
          src={staticFile('oneshots/mare-de-ouro-e-polvora/voice1.mp3')} 
          volume={voiceVolume} 
        />
      </Sequence>

      {/* 3. Voz Cena 2 (Aproximação Pirata) */}
      <Sequence from={495} durationInFrames={415}>
        <Audio 
          src={staticFile('oneshots/mare-de-ouro-e-polvora/voice2.mp3')} 
          volume={voiceVolume} 
        />
      </Sequence>

      {/* 4. Voz Cena 3 (O Pirata) */}
      <Sequence from={920} durationInFrames={285}>
        <Audio 
          src={staticFile('oneshots/mare-de-ouro-e-polvora/voice3.mp3')} 
          volume={voiceVolume} 
        />
      </Sequence>

      {/* 5. Voz Cena 4 (O Marinheiro) */}
      <Sequence from={1215} durationInFrames={285}>
        <Audio 
          src={staticFile('oneshots/mare-de-ouro-e-polvora/voice4.mp3')} 
          volume={voiceVolume} 
        />
      </Sequence>

      {/* 6. Voz Cena 5 (Batalha e Frases Finais) */}
      <Sequence from={1510} durationInFrames={500}>
        <Audio 
          src={staticFile('oneshots/mare-de-ouro-e-polvora/voice5.mp3')} 
          volume={voiceVolume} 
        />
      </Sequence>

      {/* ======================================================== */}
      {/* VISUAL SCENES                                            */}
      {/* ======================================================== */}

      {/* CENA 1: Rio Harbor in the Mist, 1939 */}
      <Sequence from={0} durationInFrames={495}>
        <AbsoluteFill 
          style={{
            transform: `scale(${s1Scale}) translateY(${s1Y}px)`,
            opacity: interpolate(frame, [0, 20, 465, 495], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <img 
            src={staticFile('oneshots/mare-de-ouro-e-polvora/scene1_harbor.png')}
            alt="Porto enevoado 1939"
            className="w-full h-full object-cover"
          />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 2: Moonlit Raiders Approaching the Fortress */}
      <Sequence from={480} durationInFrames={445}>
        <AbsoluteFill 
          style={{
            transform: `scale(${s2Scale}) translateX(${s2X}px)`,
            opacity: interpolate(frame, [480, 505, 895, 925], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <img 
            src={staticFile('oneshots/mare-de-ouro-e-polvora/scene2_raiders.png')}
            alt="Invasores na Maré Noturna"
            className="w-full h-full object-cover"
          />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 3: Stormy Moonlit Pirate Rogue */}
      <Sequence from={910} durationInFrames={310}>
        <AbsoluteFill 
          style={{
            transform: `scale(${s3Scale}) translateY(${s3Y}px)`,
            opacity: interpolate(frame, [910, 930, 1190, 1220], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <img 
            src={staticFile('oneshots/mare-de-ouro-e-polvora/scene3_pirate.png')}
            alt="Corsário Pirata Mercenário"
            className="w-full h-full object-cover"
          />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 4: Rainy Moonlit Fortress Officer */}
      <Sequence from={1205} durationInFrames={310}>
        <AbsoluteFill 
          style={{
            transform: `scale(${s4Scale}) translateY(${s4Y}px)`,
            opacity: interpolate(frame, [1205, 1225, 1485, 1515], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <img 
            src={staticFile('oneshots/mare-de-ouro-e-polvora/scene4_officer.png')}
            alt="Oficial da Armada Brasileira"
            className="w-full h-full object-cover"
          />
        </AbsoluteFill>
      </Sequence>

      {/* CENA 5: Nightfall Harbor Battle */}
      <Sequence from={1500} durationInFrames={370}>
        <AbsoluteFill 
          style={{
            transform: `scale(${s5Scale}) translate(${shakeX}px, ${shakeY}px)`,
            opacity: interpolate(frame, [1500, 1520, 1840, 1870], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <img 
            src={staticFile('oneshots/mare-de-ouro-e-polvora/scene5_battle.png')}
            alt="Batalha no Porto e Canhões"
            className="w-full h-full object-cover"
          />
          {/* Muzzle Flash Overlay */}
          <div 
            className="absolute inset-0 bg-amber-500 pointer-events-none mix-blend-screen transition-opacity duration-75"
            style={{ opacity: cannonFlashOpacity }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ======================================================== */}
      {/* FINAL TITLE CARD COM ALTA ACESSIBILIDADE E LETRA GRANDE  */}
      {/* ======================================================== */}
      <Sequence from={1850} durationInFrames={220}>
        <AbsoluteFill 
          style={{ 
            opacity: titleOpacity,
            backgroundColor: '#05070d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            zIndex: 30,
          }}
        >
          <div 
            style={{ 
              transform: `scale(${titleScale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 1200,
            }}
          >
            {/* The Core Emblem */}
            <img 
              src={staticFile('art/emblem.webp')}
              alt="Selo de Core"
              style={{
                width: 150,
                height: 150,
                objectFit: 'contain',
                marginBottom: 18,
                filter: `drop-shadow(0 0 ${emblemGlow}px rgba(245,158,11,1)) drop-shadow(0 0 40px rgba(56,189,248,0.8))`,
              }}
            />

            {/* Subtítulo Superior: Sans-serif, Grande e Nítido */}
            <span style={{ color: '#fbbf24', letterSpacing: 5, fontSize: 18, textTransform: 'uppercase', fontWeight: 900, textShadow: '0 2px 8px black', marginBottom: 10, display: 'block' }}>
              THE CORE OF MAN &bull; A ERA DOS CÉUS PARTIDOS
            </span>

            {/* Título Principal: Gigante, Alto Contraste, Sem Serrilhado */}
            <h1 style={{ fontSize: 68, fontWeight: 900, color: '#fcd34d', textShadow: '0 6px 24px black', margin: '0 0 16px 0', lineHeight: 1.15, textTransform: 'none' }}>
              Maré de Ouro e Pólvora
            </h1>

            <div style={{ width: 260, height: 4, backgroundColor: '#f59e0b', borderRadius: 9999, margin: '8px 0 16px 0', boxShadow: '0 0 15px rgba(245,158,11,0.8)' }} />

            {/* Frase Final de Efeito: Letra Grande e Clara */}
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)', border: '2px solid rgba(245, 158, 11, 0.8)', borderRadius: 18, padding: '16px 36px', marginTop: 12, boxShadow: '0 0 35px rgba(0,0,0,0.9)', maxWidth: 1050 }}>
              <p style={{ fontSize: 28, color: '#ffffff', fontWeight: 800, lineHeight: 1.4, margin: 0, textShadow: '0 3px 6px black' }}>
                "O oceano não se importa com quem está certo... De que lado você estará?"
              </p>
            </div>

            {/* Badge de Informação: Grande e Legível */}
            <div style={{ marginTop: 24, padding: '10px 32px', borderRadius: 9999, border: '2px solid #f59e0b', backgroundColor: 'rgba(0, 0, 0, 0.9)', color: '#fcd34d', fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 900, boxShadow: '0 0 25px rgba(0,0,0,0.9)' }}>
              AVENTURA ONE-SHOT &bull; 1939 LITORAL BRASILEIRO
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ======================================================== */}
      {/* MOLDURA E BARRAS CINEMATOGRÁFICAS                        */}
      {/* ======================================================== */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/75 pointer-events-none z-40" />

      {/* Barra Superior */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black z-50 border-b-2 border-amber-500/30 flex items-center px-8 justify-between">
        <span className="text-sm font-black tracking-widest text-amber-300 uppercase">
          THE CORE OF MAN &bull; TEASER ONE-SHOT
        </span>
        <span className="text-sm font-black tracking-widest text-amber-300 uppercase">
          1939 &bull; BRASIL
        </span>
      </div>
      {/* Barra Inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-50 border-t-2 border-amber-500/30" />

      {/* ======================================================== */}
      {/* LEGENDAS DE ALTA ACESSIBILIDADE (LETRA GRANDE, SANS-SERIF) */}
      {/* ======================================================== */}
      {showSubtitles && (
        <div 
          style={{
            position: 'absolute',
            bottom: 75,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 24,
            paddingRight: 24,
            pointerEvents: 'none',
            zIndex: 60,
          }}
        >
          {/* Cena 1 Legenda (20 -> 480) */}
          {frame >= 20 && frame < 480 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #f59e0b',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [20, 35, 465, 480], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                LITORAL BRASILEIRO &bull; 1939
              </span>
              <p style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "1939. Sob o nevoeiro denso da Mata Atlântica, o litoral brasileiro guarda o ouro verde... toneladas de café e especiarias prontas para zarpar."
              </p>
            </div>
          )}

          {/* Cena 2 Legenda (495 -> 910) */}
          {frame >= 495 && frame < 910 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #f59e0b',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [495, 510, 895, 910], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#f87171', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                A INVASÃO CORSÁRIA
              </span>
              <p style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "Mas esta noite, a maré traz sombras. Corsários sem bandeiras foram pagos para sangrar o porto... e eles não pretendem deixar testemunhas."
              </p>
            </div>
          )}

          {/* Cena 3 Legenda (920 -> 1205) */}
          {frame >= 920 && frame < 1205 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #f59e0b',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [920, 935, 1190, 1205], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                O BANDO PIRATA
              </span>
              <p style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "Para os invasores, a recompensa vale qualquer risco. O cheiro da pólvora é a única lei que conhecem."
              </p>
            </div>
          )}

          {/* Cena 4 Legenda (1215 -> 1500) */}
          {frame >= 1215 && frame < 1500 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #38bdf8',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [1215, 1230, 1485, 1500], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#38bdf8', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                A LINHA DA ARMADA
              </span>
              <p style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "Para os homens da Armada, defender o cais é uma questão de honra. Nenhuma saca sairá destas águas sem sangue."
              </p>
            </div>
          )}

          {/* Cena 5 Legenda - Parte 1: O Confronto (1515 -> 1845) */}
          {frame >= 1515 && frame < 1845 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #f59e0b',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [1515, 1530, 1830, 1845], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                O CONFRONTO &bull; Maré de Ouro e Pólvora
              </span>
              <p style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "Mas no fim, o oceano não se importa com quem está certo... E, quando os canhões começarem a disparar, talvez não exista mais espaço para arrependimentos."
              </p>
            </div>
          )}

          {/* Cena 5 Legenda - Parte 2: O Gancho Final (1855 -> 2050) */}
          {frame >= 1855 && frame < 2050 && (
            <div 
              style={{
                backgroundColor: 'rgba(5, 7, 13, 0.95)',
                border: '3px solid #f59e0b',
                borderRadius: 20,
                padding: '16px 36px',
                maxWidth: 1150,
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.95)',
                opacity: interpolate(frame, [1855, 1870, 2030, 2050], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <span style={{ color: '#fbbf24', fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 6, textShadow: '0 2px 4px black' }}>
                O DESTINO DA MARÉ
              </span>
              <p style={{ color: '#ffffff', fontSize: 32, fontWeight: 900, lineHeight: 1.35, margin: 0, textShadow: '0 2px 6px black' }}>
                "E você... De que lado você estará?"
              </p>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
