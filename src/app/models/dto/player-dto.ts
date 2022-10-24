export interface PlayerDto {
  id: number;
  currentName: string;
  originalName: string;
  castleLevel: number;
  frontRow: {
    id: number;
    name: string;
  };
  backRow: {
    id: number;
    name: string;
  };
}
