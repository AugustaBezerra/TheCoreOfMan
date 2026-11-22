import { FirecastItem, ActiveSessionParticipant } from '../types/firecast';
import { Character } from '../types/character';

const FIRECAST_STORAGE_KEY = 'core_of_man_firecast_library';
const SESSION_PARTICIPANTS_KEY = 'core_of_man_active_session';

// Pastas e Itens padrão inspirados diretamente no Firecast da Mestre Augusta
export const DEFAULT_FIRECAST_ITEMS: FirecastItem[] = [
  {
    id: 'folder_master_notes',
    parentId: null,
    name: 'Anotações do mestre',
    type: 'directory',
    isVisibleToPlayers: false, // Cadeado Vermelho! Segredo absoluto da Mestre
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'doc_master_secrets',
    parentId: 'folder_master_notes',
    name: 'Segredos da Trama & NPCs Ocultos',
    type: 'document',
    isVisibleToPlayers: false,
    documentContent: '<h2 style="color: #fb923c; font-size: 1.6em; font-weight: 800; margin-bottom: 8px;">Notas Secretas da Mestre Augusta</h2><p style="color: #f1f5f9; line-height: 1.7; font-size: 1.1em;">Notas secretas sobre as correntes do Éter e os verdadeiros planos das facções.</p>',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder_core_01',
    parentId: null,
    name: 'Core 01',
    type: 'directory',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'doc_informacoes_01',
    parentId: 'folder_core_01',
    name: '01 - Informações (The Core of Man)',
    type: 'document',
    isVisibleToPlayers: true,
    documentContent: `<div style="text-align: center; margin-bottom: 24px;">
  <img src="./art/banner-top.webp" alt="Banner dos Céus" style="max-width: 100%; width: 100%; max-height: 420px; object-fit: cover; border-radius: 14px; border: 2px solid #f59e0b; box-shadow: 0 12px 35px rgba(0,0,0,0.8); display: block;" />
</div>
<h2 style="color: #fb923c; font-size: 1.8em; font-weight: 900; margin-top: 20px; margin-bottom: 8px;">Informações</h2>
<h3 style="color: #38bdf8; font-size: 1.4em; font-weight: bold; margin-top: 14px; margin-bottom: 8px;">Ficha</h3>
<p style="font-size: 1.1em; line-height: 1.7; color: #f1f5f9;">
  Fiquem à vontade para utilizar qualquer material <b>oficial</b> para a criação da ficha de seu personagem. A criação segue as diretrizes do Cerne e o equilíbrio entre luz e sombra nos Céus Partidos.
</p>
<hr style="border: none; border-top: 1px solid #475569; margin: 24px 0;" />
<div style="text-align: center; margin: 24px auto; padding: 18px 20px; border-top: 2px solid #64748b; border-bottom: 2px solid #64748b; font-style: italic; color: #f8fafc; font-size: 1.2em; background: rgba(0,0,0,0.3); border-radius: 12px;">
  <p style="margin: 0; font-weight: bold; color: #fef08a;">"Para cada vida salva, outra se inclina à morte. A balança está sempre de pé."</p>
  <span style="font-size: 0.9em; color: #94a3b8; display: block; margin-top: 8px;">Inscrição no interior da loja Ash & Root</span>
</div>
<h3 style="color: #38bdf8; font-size: 1.4em; font-weight: bold; margin-top: 20px; margin-bottom: 8px;">Avisos Sobre a Campanha</h3>
<p style="font-size: 1.1em; line-height: 1.7; color: #f1f5f9;">
  O foco do cenário é a exploração das ilhas suspensas pelo éter. As escolhas da tripulação determinam o destino das almas e quais reinos escaparão do abismo.
</p>`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'doc_ash_and_root',
    parentId: 'folder_core_01',
    name: 'Ash & Root',
    type: 'document',
    isVisibleToPlayers: true,
    documentContent: `<div style="text-align: center; margin-bottom: 20px;">
  <h1 style="color: #ffffff; font-size: 2.2em; font-weight: 900; margin-bottom: 12px; letter-spacing: 0.05em;">The Core of Man</h1>
  <hr style="border: none; border-top: 1px solid #64748b; margin: 16px 0;" />
  <div style="margin: 20px 0; font-style: italic; font-size: 1.2em; color: #f8fafc; line-height: 1.6;">
    <p style="margin: 0; font-weight: bold;">"Para cada vida salva, outra se inclina à morte.<br>A balança está sempre de pé."</p>
    <p style="margin-top: 8px; font-size: 0.95em; color: #cbd5e1;">Inscrição no interior da loja Ash & Root</p>
  </div>
  <hr style="border: none; border-top: 1px solid #64748b; margin: 16px 0;" />
  <div style="margin: 24px auto;">
    <img src="./art/journey.webp" alt="Marie Doro Ashcombe" style="max-width: 400px; width: 100%; border-radius: 12px; border: 2px solid #f59e0b; box-shadow: 0 10px 30px rgba(0,0,0,0.8); display: block; margin: 0 auto;" />
    <p style="font-weight: bold; font-size: 1.25em; color: #ffffff; margin-top: 12px;">Marie Doro Ashcombe</p>
  </div>
  <hr style="border: none; border-top: 1px solid #64748b; margin: 16px 0;" />
</div>`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item_mapa_rotas',
    parentId: 'folder_core_01',
    name: 'Mapa das Rotas de Éter',
    type: 'grid',
    isVisibleToPlayers: true,
    gridData: {
      mapUrl: './art/parchment-center.webp',
      notes: 'Correntes de vento estáveis entre as ilhas de quartzo. Perigo de tempestade de éter e piratas latonitas ao sul.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item_doc_diretrizes',
    parentId: 'folder_core_01',
    name: 'Diretrizes da Sessão & Missão',
    type: 'document',
    isVisibleToPlayers: true,
    documentContent: 'Objetivos Principais da Expedição:\n1. Navegar pelas correntes de latonita até o arquipélago esquecido.\n2. Evitar os corsários do Consórcio Pálido e manter sigilo.\n3. Recuperar a relíquia do Cerne antes da tempestade cataclísmica.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder_fichas',
    parentId: null,
    name: 'Ficha',
    type: 'directory',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item_ficha_valerius',
    parentId: 'folder_fichas',
    name: 'Valerius Thorne',
    type: 'character',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item_ficha_kaelen',
    parentId: 'folder_fichas',
    name: 'Kaelen Voss',
    type: 'character',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder_npcs',
    parentId: null,
    name: 'NPCs & Contatos',
    type: 'directory',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'npc_jasmine_thorne',
    parentId: 'folder_npcs',
    name: 'Jasmine Thorne',
    type: 'npc',
    isVisibleToPlayers: true,
    npcData: {
      avatarUrl: './art/journey.webp',
      title: 'Matriarca dos Céus • Luzitana',
      description: 'Líder respeitada da Casa Thorne. Conhecida por sua diplomacia inabalável e visão tática nos céus.',
      faction: 'Casa Thorne',
      isVisibleToPlayers: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'npc_secret_informant',
    parentId: 'folder_npcs',
    name: 'O Corvo de Latonita (Espião do Vácuo)',
    type: 'npc',
    isVisibleToPlayers: false, // Invisível para jogadores!
    npcData: {
      avatarUrl: './art/emblem.webp',
      title: 'Informante Clandestino',
      description: 'Opera nas sombras dos arquipélagos, vendendo segredos para quem pagar em cristais de éter.',
      faction: 'Consórcio Pálido',
      isSecretLore: 'Na verdade é um agente duplo contratado pela Duquesa.',
      isVisibleToPlayers: false, // Quando false: jogadores NÃO veem o nome nem a foto!
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder_rastro_cinzas',
    parentId: null,
    name: 'O Rastro das Cinzas',
    type: 'directory',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder_scars_speak',
    parentId: null,
    name: 'Scars That Speak',
    type: 'directory',
    isVisibleToPlayers: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getLibraryItems(): FirecastItem[] {
  try {
    const raw = localStorage.getItem(FIRECAST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FIRECAST_STORAGE_KEY, JSON.stringify(DEFAULT_FIRECAST_ITEMS));
      return DEFAULT_FIRECAST_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    localStorage.setItem(FIRECAST_STORAGE_KEY, JSON.stringify(DEFAULT_FIRECAST_ITEMS));
    return DEFAULT_FIRECAST_ITEMS;
  } catch {
    return DEFAULT_FIRECAST_ITEMS;
  }
}

export function moveLibraryItem(itemId: string, newParentId: string | null): boolean {
  if (itemId === newParentId) return false;
  const current = getLibraryItems();
  const targetItem = current.find((i) => i.id === itemId);
  if (!targetItem) return false;

  // Se estiver movendo uma pasta, evitar ciclos (não pode mover para si mesma ou suas subpastas)
  if (targetItem.type === 'directory' && newParentId !== null) {
    let curr: string | null = newParentId;
    while (curr) {
      if (curr === itemId) {
        return false;
      }
      const parent = current.find((i) => i.id === curr);
      curr = parent ? parent.parentId : null;
    }
  }

  targetItem.parentId = newParentId;
  targetItem.updatedAt = new Date().toISOString();
  saveLibraryItems(current);
  return true;
}

export function saveLibraryItems(items: FirecastItem[]): void {
  try {
    localStorage.setItem(FIRECAST_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('firecast_library_updated', { detail: items }));
  } catch (err) {
    console.error('Erro ao salvar biblioteca do Firecast:', err);
  }
}

export function createLibraryItem(params: {
  parentId: string | null;
  name: string;
  type: FirecastItem['type'];
  isVisibleToPlayers: boolean;
  characterId?: string;
  npcData?: FirecastItem['npcData'];
  gridData?: FirecastItem['gridData'];
  documentContent?: string;
}): FirecastItem {
  const current = getLibraryItems();
  const newItem: FirecastItem = {
    id: 'fc_item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    parentId: params.parentId,
    name: params.name.trim(),
    type: params.type,
    isVisibleToPlayers: params.isVisibleToPlayers,
    characterId: params.characterId,
    npcData: params.npcData ? { ...params.npcData } : (params.type === 'npc' ? {
      isVisibleToPlayers: params.isVisibleToPlayers,
      avatarUrl: './art/journey.webp',
      title: 'NPC dos Céus',
      description: 'Personagem do mundo de CORE.',
    } : undefined),
    gridData: params.gridData,
    documentContent: params.documentContent || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [...current, newItem];
  saveLibraryItems(updated);
  return newItem;
}

export function updateLibraryItem(
  id: string, 
  updates: Partial<Omit<FirecastItem, 'id' | 'createdAt'>>
): FirecastItem | null {
  const current = getLibraryItems();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updatedItem: FirecastItem = {
    ...current[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  current[index] = updatedItem;
  saveLibraryItems(current);
  return updatedItem;
}

export function deleteLibraryItem(id: string): void {
  const current = getLibraryItems();
  // Se for diretório, deletar também todos os descendentes recursivamente
  const idsToDelete = new Set<string>([id]);
  
  let addedNew = true;
  while (addedNew) {
    addedNew = false;
    current.forEach((item) => {
      if (item.parentId && idsToDelete.has(item.parentId) && !idsToDelete.has(item.id)) {
        idsToDelete.add(item.id);
        addedNew = true;
      }
    });
  }

  const filtered = current.filter((item) => !idsToDelete.has(item.id));
  saveLibraryItems(filtered);
}

export function toggleItemVisibility(id: string): boolean {
  const current = getLibraryItems();
  const item = current.find((i) => i.id === id);
  if (!item) return false;

  const newVis = !item.isVisibleToPlayers;
  item.isVisibleToPlayers = newVis;
  if (item.npcData) {
    item.npcData.isVisibleToPlayers = newVis;
  }
  item.updatedAt = new Date().toISOString();
  saveLibraryItems(current);
  return newVis;
}

// Alternar visibilidade específica de um NPC
export function toggleNpcVisibility(id: string): boolean {
  const current = getLibraryItems();
  const item = current.find((i) => i.id === id);
  if (!item) return false;

  const currentVis = item.npcData ? item.npcData.isVisibleToPlayers : item.isVisibleToPlayers;
  const newVis = !currentVis;

  item.isVisibleToPlayers = newVis;
  if (item.npcData) {
    item.npcData.isVisibleToPlayers = newVis;
  }
  item.updatedAt = new Date().toISOString();
  saveLibraryItems(current);
  return newVis;
}

// Gerenciamento da Sessão Ativa de Jogadores
export function getActiveSessionParticipants(allCharacters: Character[]): ActiveSessionParticipant[] {
  try {
    const raw = localStorage.getItem(SESSION_PARTICIPANTS_KEY);
    const savedActiveIds: string[] = raw ? JSON.parse(raw) : [];

    // Mapeia personagens e usuários
    return allCharacters.map((char) => ({
      userId: char.userId,
      username: char.playerName,
      displayName: char.name,
      photoURL: char.avatarUrl,
      role: 'player',
      characterId: char.id,
      isInCurrentSession: savedActiveIds.includes(char.id),
      isOnline: true,
    }));
  } catch {
    return allCharacters.map((char) => ({
      userId: char.userId,
      username: char.playerName,
      displayName: char.name,
      photoURL: char.avatarUrl,
      role: 'player',
      characterId: char.id,
      isInCurrentSession: true,
      isOnline: true,
    }));
  }
}

export function toggleParticipantInSession(characterId: string, currentSessionIds: string[]): string[] {
  let updated: string[];
  if (currentSessionIds.includes(characterId)) {
    updated = currentSessionIds.filter((id) => id !== characterId);
  } else {
    updated = [...currentSessionIds, characterId];
  }
  try {
    localStorage.setItem(SESSION_PARTICIPANTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('core_session_participants_changed', { detail: updated }));
  } catch (err) {
    console.error('Erro ao salvar participantes da sessão:', err);
  }
  return updated;
}
