import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  where,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Character, CharacterAttributes, SharedMediaItem } from '../types/character';

const CHARACTERS_STORAGE_KEY = 'core_of_man_characters';
const MEDIA_STORAGE_KEY = 'core_of_man_shared_media';

// Default Attributes for CORE
export function getDefaultCoreAttributes(): CharacterAttributes {
  return {
    forca: {
      value: 12,
      pericias: {
        atletismo: 2,
        luta: 1,
        potencia: 1,
      },
    },
    agilidade: {
      value: 14,
      pericias: {
        acrobacia: 2,
        furtividade: 3,
        pontaria: 2,
        pilotagem: 3, // Pilotagem Aérea
      },
    },
    vigor: {
      value: 13,
      pericias: {
        resistencia: 2,
        fortitude: 1,
        sobrevivencia: 2,
      },
    },
    intelecto: {
      value: 16,
      pericias: {
        engenhariaEter: 3,
        medicina: 1,
        misticismo: 2,
        historia: 2,
      },
    },
    percepcao: {
      value: 15,
      pericias: {
        investigacao: 3,
        intuicao: 2,
        prontidao: 3,
      },
    },
    presenca: {
      value: 14,
      pericias: {
        diplomacia: 2,
        enganacao: 1,
        intimidacao: 2,
        vontade: 3,
      },
    },
  };
}

// Default initial characters (Empty by default - characters are created by logged-in users)
export function getInitialDemoCharacters(): Character[] {
  return [];
}

// Get all characters from localStorage
function getLocalCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(CHARACTERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge any stale demo character
      const sanitized = parsed.filter((c) => c.id !== 'char_theron_001');
      if (sanitized.length !== parsed.length) {
        localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(sanitized));
      }
      return sanitized;
    }
    return [];
  } catch {
    return [];
  }
}

// Save characters to localStorage
function saveLocalCharacters(chars: Character[]) {
  localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(chars));
}

// Realtime subscription for a player's characters
export function subscribePlayerCharacters(userId: string, callback: (chars: Character[]) => void) {
  if (!userId || userId === 'guest') {
    callback([]);
    return () => {};
  }

  // Initial local response
  const localAll = getLocalCharacters();
  const playerLocal = userId === 'all' ? localAll : localAll.filter((c) => c.userId === userId);
  callback(playerLocal);

  // Firestore Realtime Listener
  try {
    const colRef = collection(db, 'characters');
    const q = userId === 'all' ? colRef : query(colRef, where('userId', '==', userId));
    
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreChars: Character[] = [];
        snapshot.forEach((d) => firestoreChars.push(d.data() as Character));
        // Merge with local
        callback(firestoreChars);
      }
    }, (err) => {
      console.warn('Firestore subscription fallback to local:', err);
    });
  } catch (err) {
    console.warn('Realtime subscription not available, using offline cache:', err);
    return () => {};
  }
}

// Save or Update a character
export async function saveCharacter(character: Character): Promise<void> {
  character.updatedAt = new Date().toISOString();

  // 1. Local storage immediate update
  const local = getLocalCharacters();
  const idx = local.findIndex((c) => c.id === character.id);
  if (idx >= 0) {
    local[idx] = character;
  } else {
    local.push(character);
  }
  saveLocalCharacters(local);

  // 2. Firestore Sync
  try {
    const docRef = doc(db, 'characters', character.id);
    await setDoc(docRef, character, { merge: true });
  } catch (err) {
    console.warn('Firestore character save offline:', err);
  }
}

// Create new character
export async function createNewCharacter(params: {
  userId: string;
  playerName: string;
  name: string;
  title: string;
  lineage: string;
  avatarUrl?: string;
  quote?: string;
}): Promise<Character> {
  const newChar: Character = {
    id: 'char_' + Date.now(),
    userId: params.userId,
    playerName: params.playerName,
    name: params.name || 'Novo Navegante',
    title: params.title || 'Explorador dos Céus',
    lineage: params.lineage || 'Humano',
    avatarUrl: params.avatarUrl || './art/journey.webp',
    quote: params.quote || '"Nas alturas do abismo, cada escolha ecoa no infinito."',
    status: 'alive',
    pv: { current: 50, max: 50 },
    ca: 14,
    psique: { current: 40, max: 40 },
    si: { current: 20, max: 20 },
    essencias: { current: 10, max: 10 },
    attributes: getDefaultCoreAttributes(),
    habilidadesNotas: '• Anote aqui seus Dons do Cerne, rituais arcanos e peculiaridades do seu Fardo.',
    biografia: 'Escreva aqui a história de origem do seu personagem, suas motivações e seus laços nos Céus Partidos.',
    inventario: '• Traje de vôo padrão\n• Bússola simples\n• Cantil de água\n• Ração de viagem (5 dias)',
    diario: 'Primeiro dia de anotações no diário de bordo...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await saveCharacter(newChar);
  return newChar;
}

// Archive character as Fallen (Memorial) or Delete
export async function archiveOrDeleteCharacter(characterId: string, action: 'fallen' | 'delete'): Promise<void> {
  const local = getLocalCharacters();
  if (action === 'delete') {
    const filtered = local.filter((c) => c.id !== characterId);
    saveLocalCharacters(filtered);
    try {
      await deleteDoc(doc(db, 'characters', characterId));
    } catch (e) {
      console.warn('Firestore delete error:', e);
    }
  } else {
    const target = local.find((c) => c.id === characterId);
    if (target) {
      target.status = 'fallen';
      target.updatedAt = new Date().toISOString();
      saveLocalCharacters(local);
      try {
        await updateDoc(doc(db, 'characters', characterId), { status: 'fallen' });
      } catch (e) {
        console.warn('Firestore status update error:', e);
      }
    }
  }
}

// Initial Shared Media Library for Game Master
export function getInitialSharedMedia(): SharedMediaItem[] {
  return [
    {
      id: 'media_cidade_01',
      title: 'Aethelgard - A Grande Cidadela Flutuante',
      description: 'Capital dos Céus Centrais ancorada sobre turbinas de éter.',
      imageUrl: './art/journey.webp',
      category: 'cidade',
      isSecret: false,
    },
    {
      id: 'media_mapa_01',
      title: 'Carta Náutica das Correntes do Vácuo',
      description: 'Rotas de navegação seguras entre os arquipélagos do norte.',
      imageUrl: './art/parchment-center.webp',
      category: 'mapa',
      isSecret: false,
    },
    {
      id: 'media_ruinas_01',
      title: 'O Arquivo Astral Esquecido',
      description: 'Biblioteca ancestral descoberta flutuando à deriva.',
      imageUrl: './art/library.webp',
      category: 'cenario',
      isSecret: false,
    },
    {
      id: 'media_secret_01',
      title: 'O Pacto Sombrio dos Black Walkers',
      description: 'Documento confidencial sobre a origem da Doença do Não Homem.',
      imageUrl: './art/page-bg.webp',
      category: 'handout',
      isSecret: true, // Visível apenas para a Mestre!
    },
  ];
}

export function getLocalSharedMedia(): SharedMediaItem[] {
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSharedMedia();
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialSharedMedia();
  }
}

export function toggleMediaSecretStatus(mediaId: string): SharedMediaItem[] {
  const items = getLocalSharedMedia();
  const target = items.find((m) => m.id === mediaId);
  if (target) {
    target.isSecret = !target.isSecret;
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
  }
  return items;
}
