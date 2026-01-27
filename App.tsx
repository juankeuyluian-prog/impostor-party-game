import React, { useState } from 'react';
import { GamePhase, GameState } from './types.ts';
import Home from './components/Home.tsx';
import AddPlayers from './components/AddPlayers.tsx';
import AddWords from './components/AddWords.tsx';
import Reveal from './components/Reveal.tsx';
import GameOver from './components/GameOver.tsx';
import { WORD_HINTS, GENERIC_HINTS } from './constants.ts';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    words: [],
    usedWords: [],
    secretWord: '',
    hintWord: '',
    impostorIndices: [],
    impostorCount: 1,
    currentPlayerIndex: 0,
    isRevealed: false,
    phase: GamePhase.HOME,
    totalRounds: 1,
    currentRound: 1,
    useHints: true
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [isGenerating, setIsGenerating] = useState(false);

  const transitionTo = (newPhase: GamePhase, direction: 'forward' | 'backward' = 'forward') => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    // Tiempo de salida: 350ms (ligeramente más corto que la duración de la transición para solapar)
    setTimeout(() => {
      setIsRepositioning(true);
      setGameState(prev => ({ ...prev, phase: newPhase }));
      
      // Tiempo de preparación en el "backstage"
      setTimeout(() => {
        setIsTransitioning(false);
        setIsRepositioning(false);
      }, 40);
    }, 350);
  };

  const getLocalHint = (word: string): string => {
    const normalizedWord = word.trim();
    if (WORD_HINTS[normalizedWord]) return WORD_HINTS[normalizedWord];
    return GENERIC_HINTS[Math.floor(Math.random() * GENERIC_HINTS.length)];
  };

  const createGame = () => transitionTo(GamePhase.ADD_PLAYERS, 'forward');

  const handlePlayersConfirmed = (players: string[], impostorCount: number) => {
    setGameState(prev => ({ ...prev, players, impostorCount }));
    transitionTo(GamePhase.ADD_WORDS, 'forward');
  };

  const handleBack = () => {
    const prevPhases: Record<string, GamePhase> = {
      [GamePhase.ADD_PLAYERS]: GamePhase.HOME,
      [GamePhase.ADD_WORDS]: GamePhase.ADD_PLAYERS,
      [GamePhase.REVEAL]: GamePhase.ADD_WORDS,
    };
    const target = prevPhases[gameState.phase];
    if (target) transitionTo(target, 'backward');
  };

  const handleEndRound = () => transitionTo(GamePhase.GAME_OVER, 'forward');

  const selectNewSecretWord = (availableWords: string[]) => {
    const rawWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    return { secret: rawWord.trim(), rawWord: rawWord.trim() };
  };

  const pickImpostors = (count: number, totalPlayers: number): number[] => {
    const indices = Array.from({ length: totalPlayers }, (_, i) => i);
    return indices.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const startGame = async (words: string[], rounds: number, useHints: boolean) => {
    setIsGenerating(true);
    const { secret, rawWord } = selectNewSecretWord(words);
    const impostors = pickImpostors(gameState.impostorCount, gameState.players.length);
    
    setGameState(prev => ({
      ...prev,
      words,
      usedWords: [rawWord],
      secretWord: secret,
      hintWord: '', 
      impostorIndices: impostors,
      currentPlayerIndex: 0,
      isRevealed: false,
      totalRounds: rounds,
      currentRound: 1,
      useHints
    }));
    
    setTimeout(() => {
      setIsGenerating(false);
      transitionTo(GamePhase.REVEAL, 'forward');
    }, 600);
  };

  const nextRound = async () => {
    setIsGenerating(true);
    const availableWords = gameState.words.filter(w => !gameState.usedWords.includes(w));
    const pool = availableWords.length > 0 ? availableWords : gameState.words;
    
    const { secret, rawWord } = selectNewSecretWord(pool);
    const impostors = pickImpostors(gameState.impostorCount, gameState.players.length);

    setGameState(prev => ({
      ...prev,
      usedWords: availableWords.length > 0 ? [...prev.usedWords, rawWord] : [rawWord],
      secretWord: secret,
      hintWord: '', 
      impostorIndices: impostors,
      currentPlayerIndex: 0,
      isRevealed: false,
      currentRound: prev.currentRound + 1
    }));

    setTimeout(() => {
      setIsGenerating(false);
      transitionTo(GamePhase.REVEAL, 'forward');
    }, 600);
  };

  const nextReveal = () => {
    if (gameState.currentPlayerIndex + 1 < gameState.players.length) {
      setGameState(prev => ({ ...prev, isRevealed: false }));
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentPlayerIndex: prev.currentPlayerIndex + 1,
          hintWord: '' 
        }));
      }, 500);
    } else {
      transitionTo(GamePhase.GAME_OVER, 'forward');
    }
  };

  const toggleReveal = () => {
    if (isGenerating) return;
    setGameState(prev => ({ ...prev, isRevealed: !prev.isRevealed }));
  };

  const updateHint = (hint: string) => {
    setGameState(prev => ({ ...prev, hintWord: hint }));
  };

  const restart = () => {
    setGameState({
      players: [],
      words: [],
      usedWords: [],
      secretWord: '',
      hintWord: '',
      impostorIndices: [],
      impostorCount: 1,
      currentPlayerIndex: 0,
      isRevealed: false,
      phase: GamePhase.HOME,
      totalRounds: 1,
      currentRound: 1,
      useHints: true
    });
    transitionTo(GamePhase.HOME, 'backward');
  };

  const handleRestartSamePlayers = () => {
    setGameState(prev => ({
      ...prev,
      words: [],
      usedWords: [],
      secretWord: '',
      hintWord: '',
      impostorIndices: [],
      currentPlayerIndex: 0,
      isRevealed: false,
      currentRound: 1,
      totalRounds: 1,
    }));
    transitionTo(GamePhase.ADD_WORDS, 'backward');
  };

  const getTransitionClasses = () => {
    // Estado de REPOSICIÓN (Justo antes de entrar a la pantalla)
    if (isRepositioning) {
      return transitionDirection === 'forward' 
        ? 'opacity-0 translate-x-24 scale-[1.05] blur-2xl rotate-y-3' 
        : 'opacity-0 -translate-x-24 scale-[1.05] blur-2xl -rotate-y-3';
    }
    // Estado de TRANSICIÓN (Saliendo de la pantalla)
    if (isTransitioning) {
      return transitionDirection === 'forward'
        ? 'opacity-0 -translate-x-24 scale-90 blur-2xl -rotate-y-3'
        : 'opacity-0 translate-x-24 scale-90 blur-2xl rotate-y-3';
    }
    // Estado ESTABLE
    return 'opacity-100 translate-x-0 scale-100 blur-0 rotate-y-0';
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden perspective-2000">
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-300">
           <div className="relative flex items-center justify-center scale-125">
             <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] animate-pulse"></div>
             <div className="relative z-10 p-8 bg-slate-900/40 rounded-[2.5rem] border border-cyan-500/20 shadow-2xl">
                <svg className="w-24 h-24 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" className="opacity-10" />
                  <path d="M9.5 3C7.567 3 6 4.567 6 6.5C6 7.218 6.216 7.884 6.586 8.44C5.074 8.89 4 10.316 4 12C4 13.684 5.074 15.11 6.586 15.56C6.216 16.116 6 16.782 6 17.5C6 19.433 7.567 21 9.5 21C10.604 21 11.583 20.487 12.214 19.687C12.845 20.487 13.824 21 14.928 21C16.861 21 18.428 19.433 18.428 17.5C18.428 16.782 18.212 16.116 17.842 15.56C19.354 15.11 20.428 13.684 20.428 12C20.428 10.316 19.354 8.89 17.842 8.44C18.212 7.884 18.428 7.218 18.428 6.5C18.428 4.567 16.861 3 14.928 3C13.824 3 12.845 3.513 12.214 4.313C11.583 3.513 10.604 3 9.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-brain-float drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </svg>
             </div>
           </div>
           <div className="text-center space-y-3">
             <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.6em] animate-pulse">PREPARANDO</p>
             <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Barajando mentiras...</p>
           </div>
        </div>
      )}

      <div className={`w-full max-w-lg transition-all duration-[450ms] cubic-bezier(0.23, 1, 0.32, 1) flex flex-col justify-center min-h-0 ${getTransitionClasses()}`}>
        {gameState.phase === GamePhase.HOME && (
          <Home onCreate={createGame} />
        )}

        {gameState.phase === GamePhase.ADD_PLAYERS && (
          <AddPlayers 
            onConfirm={handlePlayersConfirmed} 
            onBack={handleBack}
            initialPlayers={gameState.players} 
            initialImpostorCount={gameState.impostorCount}
          />
        )}

        {gameState.phase === GamePhase.ADD_WORDS && (
          <AddWords 
            playerCount={gameState.players.length}
            onStart={startGame}
            onBack={handleBack}
            initialUseHints={gameState.useHints}
          />
        )}

        {gameState.phase === GamePhase.REVEAL && (
          <Reveal 
            player={gameState.players[gameState.currentPlayerIndex]}
            isImpostor={gameState.impostorIndices.includes(gameState.currentPlayerIndex)}
            secretWord={gameState.secretWord}
            hintWord={gameState.hintWord}
            isRevealed={gameState.isRevealed}
            onToggleReveal={toggleReveal}
            onNext={nextReveal}
            isLastPlayer={gameState.currentPlayerIndex === gameState.players.length - 1}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onBack={handleBack}
            onEndRound={handleEndRound}
            useHints={gameState.useHints}
            onGenerateHint={() => Promise.resolve(getLocalHint(gameState.secretWord))}
            onHintGenerated={updateHint}
          />
        )}

        {gameState.phase === GamePhase.GAME_OVER && (
          <GameOver 
            impostorNames={gameState.impostorIndices.map(idx => gameState.players[idx])} 
            secretWord={gameState.secretWord}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onNextRound={nextRound}
            onRestart={restart} 
            onRestartSamePlayers={handleRestartSamePlayers}
          />
        )}
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .rotate-y-3 { transform: rotateY(3deg); }
        .-rotate-y-3 { transform: rotateY(-3deg); }
        .cubic-bezier\\(0\\.23\\, 1\\, 0\\.32\\, 1\\) { transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1); }

        @keyframes brain-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-brain-float {
          animation: brain-float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;