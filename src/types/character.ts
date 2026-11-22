export interface CharacterAttributes {
  forca: {
    value: number;
    pericias: {
      atletismo: number;
      brutalidade: number;
      luta: number;
    };
  };
  vigor: {
    value: number;
    pericias: {
      constituicao: number;
      recuperacao: number;
      tolerancia: number;
    };
  };
  destreza: {
    value: number;
    pericias: {
      acrobacia: number;
      furtividade: number;
      mira: number;
    };
  };
  carisma: {
    value: number;
    pericias: {
      animais: number;
      labia: number;
      teatralidade: number;
    };
  };
  conhecimento: {
    value: number;
    pericias: {
      historia: number;
      mito: number;
      raciocinio: number;
      oficio: number;
    };
  };
  inteligencia: {
    value: number;
    pericias: {
      intuicao: number;
      percepcao: number;
      sobrevivencia: number;
    };
  };
  forcaDeVontade: {
    value: number;
    pericias: {
      mente: number;
      alma: number;
      corpo: number;
      essencia: number;
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
  content?: string; // Texto completo, história, pistas e notas da Mestre
}
