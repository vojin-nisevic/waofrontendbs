export interface PlayerElWarDto {
  id: number;
  currentName: string;
  marchSize: number;
  hp: number;
  attack: number;
  castleLevel: number;
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
}
