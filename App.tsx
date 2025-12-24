
import React, { useState } from 'react';
import { GamePhase, GameState } from './types.ts';
import Home from './components/Home.tsx';
import AddPlayers from './components/AddPlayers.tsx';
import AddWords from './components/AddWords.tsx';
import Reveal from './components/Reveal.tsx';
import GameOver from './components/GameOver.tsx';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    words: [],
    secretWord: '',
    impostorIndex: -1,
    currentPlayerIndex: 0,
    isRevealed: false,
    phase: GamePhase.HOME
  });

  const createGame = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.ADD_PLAYERS }));
  };

  const handlePlayersConfirmed = (players: string[]) => {
    setGameState(prev => ({ 
      ...prev, 
      players, 
      phase: GamePhase.ADD_WORDS 
    }));
  };

  const startGame = (words: string[]) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomImpostor = Math.floor(Math.random() * gameState.players.length);
    
    setGameState(prev => ({
      ...prev,
      words,
      secretWord: randomWord,
      impostorIndex: randomImpostor,
      currentPlayerIndex: 0,
      isRevealed: false,
      phase: GamePhase.REVEAL
    }));
  };

  const nextReveal = () => {
    if (gameState.currentPlayerIndex + 1 < gameState.players.length) {
      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1,
        isRevealed: false
      }));
    } else {
      setGameState(prev => ({ ...prev, phase: GamePhase.GAME_OVER }));
    }
  };

  const toggleReveal = () => {
    setGameState(prev => ({ ...prev, isRevealed: !prev.isRevealed }));
  };

  const restart = () => {
    setGameState({
      players: [],
      words: [],
      secretWord: '',
      impostorIndex: -1,
      currentPlayerIndex: 0,
      isRevealed: false,
      phase: GamePhase.HOME
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-lg transition-all duration-500 my-auto">
        {gameState.phase === GamePhase.HOME && (
          <Home onCreate={createGame} />
        )}

        {gameState.phase === GamePhase.ADD_PLAYERS && (
          <AddPlayers 
            onConfirm={handlePlayersConfirmed} 
            initialPlayers={gameState.players} 
          />
        )}

        {gameState.phase === GamePhase.ADD_WORDS && (
          <AddWords 
            playerCount={gameState.players.length}
            onStart={startGame}
          />
        )}

        {gameState.phase === GamePhase.REVEAL && (
          <Reveal 
            player={gameState.players[gameState.currentPlayerIndex]}
            isImpostor={gameState.currentPlayerIndex === gameState.impostorIndex}
            secretWord={gameState.secretWord}
            isRevealed={gameState.isRevealed}
            onToggleReveal={toggleReveal}
            onNext={nextReveal}
            isLastPlayer={gameState.currentPlayerIndex === gameState.players.length - 1}
          />
        )}

        {gameState.phase === GamePhase.GAME_OVER && (
          <GameOver onRestart={restart} />
        )}
      </div>
    </div>
  );
};

export default App;
