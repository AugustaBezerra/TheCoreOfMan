export interface CharacterAttributes {
  forca: {
    value: number;
    pericias: {
      atletismo: number;
      luta: number;
      potencia: number;
    };
  };
  agilidade: {
    value: number;
    pericias: {
      acrobacia: number;
      furtividade: number;
      pontaria: number;
      pilotagem: number;
    };
  };
  vigor: {
    value: number;
    pericias: {
      resistencia: number;
      fortitude: number;
      sobrevivencia: number;
    };
  };
  intelecto: {
    value: number;
    pericias: {
      engenhariaEter: number;
      medicina: number;
      misticismo: number;
      historia: number;
    };
  };
  percepcao: {
    value: number;
    pericias: {
      investigacao: number;
      intuicao: number;
      prontidao: number;
    };
  };
  presenca: {
    value: number;
    pericias: {
      diplomacia: number;
      enganacao: number;
      intimidacao: number;
      vontade: number;
    };
  };
}

export interface Character {
  id: string;
  userId: string;
  playerName: string;
  name: string;
  title: string;
  lineage: string;
  avatarUrl: string;
  quote: string;
  status: 'alive' | 'fallen'; // Vivo ou Caído no Vácuo (Memorial)
  
  // Status Vitais
  pv: { current: number; max: number }; // Pontos de Vida
  ca: number; // Classe de Armadura
  psique: { current: number; max: number }; // Sanidade
  si: { current: number; max: number }; // Sistema Imune
  essencias: { current: number; max: number }; // Éter / Essências (+/- interativo)

  // Atributos & Perícias Oficiais de CORE
  attributes: CharacterAttributes;

  // Habilidades, Dons e Maldições (Área livre para o jogador personalizar)
  habilidadesNotas: string;

  // Biografia em folha de livro grande
  biografia: string;

  // Inventário & Carga
  inventario: string;

  // Diário de Bordo pessoal
  diario: string;

  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  photoURL?: string;
  role: 'gm' | 'player';
}

export interface CampaignSession {
  id: string;
  name: string;
  isActive: boolean;
  activeCharacterIds: string[];
  recentEvents: Array<{
    id: string;
    text: string;
    type: 'roll' | 'damage' | 'heal' | 'system';
    timestamp: string;
  }>;
  initiative: Array<{
    id: string;
    name: string;
    value: number;
    isNpc?: boolean;
  }>;
}

export interface SharedMediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'mapa' | 'criatura' | 'cidade' | 'artefato' | 'cenario' | 'handout';
  isSecret: boolean; // Se false: visível a todos os jogadores!
}
