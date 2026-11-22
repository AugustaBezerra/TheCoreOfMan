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

// Default Attributes for CORE (Official 7 Attributes of The Core of Man: 1 to 5 scale)
export function getDefaultCoreAttributes(): CharacterAttributes {
  return {
    forca: {
      value: 2,
      pericias: {
        atletismo: 2,
        brutalidade: 1,
        luta: 2,
      },
    },
    vigor: {
      value: 2,
      pericias: {
        constituicao: 2,
        recuperacao: 1,
        tolerancia: 1,
      },
    },
    destreza: {
      value: 3,
      pericias: {
        acrobacia: 2,
        furtividade: 2,
        mira: 2,
      },
    },
    carisma: {
      value: 2,
      pericias: {
        animais: 1,
        labia: 2,
        teatralidade: 1,
      },
    },
    conhecimento: {
      value: 2,
      pericias: {
        historia: 2,
        mito: 1,
        raciocinio: 2,
        oficio: 1,
      },
    },
    inteligencia: {
      value: 2,
      pericias: {
        intuicao: 2,
        percepcao: 2,
        sobrevivencia: 1,
      },
    },
    forcaDeVontade: {
      value: 3,
      pericias: {
        mente: 2,
        alma: 2,
        corpo: 1,
        essencia: 2,
      },
    },
  };
}

// 100% Zeroed Attributes for new characters
export function getZeroedCoreAttributes(): CharacterAttributes {
  return {
    forca: { value: 0, pericias: { atletismo: 0, brutalidade: 0, luta: 0 } },
    vigor: { value: 0, pericias: { constituicao: 0, recuperacao: 0, tolerancia: 0 } },
    destreza: { value: 0, pericias: { acrobacia: 0, furtividade: 0, mira: 0 } },
    carisma: { value: 0, pericias: { animais: 0, labia: 0, teatralidade: 0 } },
    conhecimento: { value: 0, pericias: { historia: 0, mito: 0, raciocinio: 0, oficio: 0 } },
    inteligencia: { value: 0, pericias: { intuicao: 0, percepcao: 0, sobrevivencia: 0 } },
    forcaDeVontade: { value: 0, pericias: { mente: 0, alma: 0, corpo: 0, essencia: 0 } },
  };
}

// Migration helper to ensure legacy characters seamlessly gain the 7 attributes
export function normalizeCharacter(char: any): Character {
  const defaults = getDefaultCoreAttributes();
  const rawAttrs = char?.attributes || {};

  const getAttr = (key: keyof CharacterAttributes, legacyKeys: string[] = []) => {
    const found = rawAttrs[key] || legacyKeys.map((lk) => rawAttrs[lk]).find(Boolean);
    if (found) {
      const rawVal = found.value;
      const val = typeof rawVal === 'number'
        ? (rawVal > 7 ? Math.max(1, Math.round((rawVal - 10) / 2) + 2) : Math.max(1, rawVal))
        : defaults[key].value;
      const pericias = { ...defaults[key].pericias, ...(found.pericias || {}) };
      return { value: val, pericias };
    }
    return defaults[key];
  };

  const attributes: CharacterAttributes = {
    forca: getAttr('forca'),
    vigor: getAttr('vigor'),
    destreza: getAttr('destreza', ['agilidade']),
    carisma: getAttr('carisma', ['presenca']),
    conhecimento: getAttr('conhecimento', ['intelecto']),
    inteligencia: getAttr('inteligencia', ['percepcao']),
    forcaDeVontade: getAttr('forcaDeVontade', ['vontade']),
  };

  return {
    ...char,
    attributes,
    pv: char.pv || { current: 50, max: 50 },
    ca: char.ca ?? 14,
    psique: char.psique || { current: 40, max: 40 },
    si: char.si || { current: 20, max: 20 },
    essencias: char.essencias || { current: 10, max: 10 },
  };
}

// Default initial characters (Empty by default - characters are created by logged-in users)
export function getInitialDemoCharacters(): Character[] {
  return [];
}

// Get all characters from localStorage with automatic schema normalization
export function getLocalCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(CHARACTERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge any stale demo character and normalize schema
      const sanitized = parsed
        .filter((c) => c.id !== 'char_theron_001')
        .map((c) => normalizeCharacter(c));
      return sanitized;
    }
    return [];
  } catch {
    return [];
  }
}

// Get or create a character sheet for a library item
export async function getOrCreateLibraryCharacter(params: {
  characterId?: string;
  name: string;
  userId?: string;
  playerName?: string;
}): Promise<Character> {
  const local = getLocalCharacters();
  const found = local.find(
    (c) => (params.characterId && c.id === params.characterId) ||
           c.name.toLowerCase() === params.name.toLowerCase()
  );
  if (found) return found;

  // Auto-create new character
  const created = await createNewCharacter({
    userId: params.userId || 'guest_user',
    playerName: params.playerName || 'Mestre Augusta',
    name: params.name,
    title: 'Navegante das Correntes de Éter',
    lineage: 'Luzitano',
    avatarUrl: './art/journey.webp',
  });
  return created;
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
        snapshot.forEach((d) => firestoreChars.push(normalizeCharacter(d.data())));
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
    title: params.title || '',
    lineage: params.lineage || '',
    avatarUrl: params.avatarUrl || './art/journey.webp',
    quote: params.quote || '',
    status: 'alive',
    pv: { current: 0, max: 0 },
    ca: 0,
    psique: { current: 0, max: 0 },
    si: { current: 0, max: 0 },
    essencias: { current: 0, max: 0 },
    attributes: getZeroedCoreAttributes(),
    habilidadesNotas: '',
    biografia: '',
    inventario: '',
    diario: '',
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

export function saveLocalSharedMedia(items: SharedMediaItem[]): void {
  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('core_shared_media_updated', { detail: items }));
  } catch (err) {
    console.error('Erro ao salvar recursos da Mestre:', err);
  }
}

export function createSharedMediaItem(item: Omit<SharedMediaItem, 'id'>): SharedMediaItem {
  const current = getLocalSharedMedia();
  const newItem: SharedMediaItem = {
    ...item,
    id: 'media_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
  };
  const updated = [newItem, ...current];
  saveLocalSharedMedia(updated);
  return newItem;
}

export function updateSharedMediaItem(updatedItem: SharedMediaItem): SharedMediaItem[] {
  const current = getLocalSharedMedia();
  const index = current.findIndex((m) => m.id === updatedItem.id);
  if (index !== -1) {
    current[index] = updatedItem;
    saveLocalSharedMedia(current);
  }
  return current;
}

export function deleteSharedMediaItem(mediaId: string): SharedMediaItem[] {
  const current = getLocalSharedMedia();
  const filtered = current.filter((m) => m.id !== mediaId);
  saveLocalSharedMedia(filtered);
  return filtered;
}

export function toggleMediaSecretStatus(mediaId: string): SharedMediaItem[] {
  const items = getLocalSharedMedia();
  const target = items.find((m) => m.id === mediaId);
  if (target) {
    target.isSecret = !target.isSecret;
    saveLocalSharedMedia(items);
  }
  return items;
}

