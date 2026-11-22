export type FirecastItemType = 'directory' | 'character' | 'grid' | 'npc' | 'document';

export interface FirecastNPCData {
  avatarUrl?: string;
  title?: string;
  description?: string;
  faction?: string;
  isSecretLore?: string;
  // Regra da Mestre Augusta: quando invisível, jogadores não podem ver nome nem foto!
  isVisibleToPlayers: boolean;
}

export interface FirecastGridData {
  mapUrl?: string;
  gridSize?: number;
  width?: number;
  height?: number;
  notes?: string;
  tokens?: Array<{
    id: string;
    name: string;
    x: number;
    y: number;
    avatarUrl?: string;
    isEnemy?: boolean;
  }>;
}

export interface FirecastItem {
  id: string;
  parentId: string | null; // null se estiver na raiz da biblioteca
  name: string;
  type: FirecastItemType;
  isVisibleToPlayers: boolean; // false = Cadeado Vermelho (Apenas Mestre)
  characterId?: string; // Vinculado a uma ficha existente
  npcData?: FirecastNPCData;
  gridData?: FirecastGridData;
  documentContent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveSessionParticipant {
  userId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  role: 'gm' | 'player';
  characterId?: string;
  isInCurrentSession: boolean; // Se está presente na sessão de hoje
  isOnline: boolean;
}
