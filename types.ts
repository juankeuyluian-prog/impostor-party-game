
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
  secretWord: string;
  impostorIndex: number;
  currentPlayerIndex: number;
  isRevealed: boolean;
  phase: GamePhase;
}
