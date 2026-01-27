
export enum GamePhase {
  HOME = 'HOME',
  ADD_PLAYERS = 'ADD_PLAYERS',
  ADD_WORDS = 'ADD_WORDS',
  REVEAL = 'REVEAL',
  GAME_OVER = 'GAME_OVER'
}

export interface GameState {
  players: string[];
  words: string[];
  usedWords: string[];
  secretWord: string;
  hintWord: string;
  impostorIndices: number[];
  impostorCount: number;
  currentPlayerIndex: number;
  isRevealed: boolean;
  phase: GamePhase;
  totalRounds: number;
  currentRound: number;
  useHints: boolean;
}
