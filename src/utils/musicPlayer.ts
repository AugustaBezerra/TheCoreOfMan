export interface Track {
  title: string;
  artist: string;
  url: string;
}

export const PLAYLIST: Track[] = [
  {
    title: 'Down by the River',
    artist: 'Trilha Sonora dos Céus',
    url: './music/AudioCleaner_Download_Down by the River.mp3',
  },
  {
    title: 'I Want to Live',
    artist: 'Trilha Sonora dos Céus',
    url: './music/AudioCleaner_Download_I Want to Live.mp3',
  },
  {
    title: 'I Want to Live (Instrumental)',
    artist: 'Trilha Sonora dos Céus',
    url: './music/AudioCleaner_Download_I Want to Live (Instrumental Version).mp3',
  },
  {
    title: 'The Power (Orchestral)',
    artist: 'Trilha Sonora dos Céus',
    url: './music/AudioCleaner_Download_The Power (Orchestral Version).mp3',
  },
  {
    title: 'Who Are You',
    artist: 'Trilha Sonora dos Céus',
    url: './music/AudioCleaner_Download_Who Are You.mp3',
  },
];

class MusicController {
  private audio: HTMLAudioElement | null = null;
  private currentTrackIdx: number = 0;
  private isPlaying: boolean = false;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.volume = 0.45;

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Erro ao carregar faixa de áudio:', e);
      });
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: PLAYLIST[this.currentTrackIdx],
      currentTrackIdx: this.currentTrackIdx,
      volume: this.audio ? this.audio.volume : 0.45,
    };
  }

  public play() {
    if (!this.audio) return;
    if (!this.audio.src || !this.audio.src.includes(encodeURI(PLAYLIST[this.currentTrackIdx].url))) {
      this.audio.src = PLAYLIST[this.currentTrackIdx].url;
    }
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.notify();
      })
      .catch((err) => {
        console.warn('Autoplay bloqueado pelo navegador, aguardando clique do usuário:', err);
      });
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % PLAYLIST.length;
    if (this.audio) {
      this.audio.src = PLAYLIST[this.currentTrackIdx].url;
      if (this.isPlaying) {
        this.audio.play().catch(() => {});
      }
    }
    this.notify();
  }

  public prevTrack() {
    this.currentTrackIdx =
      this.currentTrackIdx === 0 ? PLAYLIST.length - 1 : this.currentTrackIdx - 1;
    if (this.audio) {
      this.audio.src = PLAYLIST[this.currentTrackIdx].url;
      if (this.isPlaying) {
        this.audio.play().catch(() => {});
      }
    }
    this.notify();
  }

  public setVolume(vol: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, vol));
    }
    this.notify();
  }
}

export const music = new MusicController();
