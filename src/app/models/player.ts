export interface Player {
  id: number;
  originalName: string;
  currentName: string;
  marchSize: number;
  timeZone: number;
  castleLevel: number;
  killCount: number;
  hp: number;
  attack: number;
  frontRow: {
    id: number;
    name: string;
  };
  backRow: {
    id: number;
    name: string;
  };
  ewTeam: {
    id: number;
    name: string;
  };
  meritRank: {
    id: number;
    name: string;
  };
  allianceRank: {
    id: number;
    name: string;
    description: string;
  };
}
