import React, { useState } from 'react';
import { GamePhase, GameState } from './types.ts';
import Home from './components/Home.tsx';
import AddPlayers from './components/AddPlayers.tsx';
import AddWords from './components/AddWords.tsx';
import Reveal from './components/Reveal.tsx';
import GameOver from './components/GameOver.tsx';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    words: [],
    usedWords: [],
    secretWord: '',
    hintWord: '',
    impostorIndex: -1,
    currentPlayerIndex: 0,
    isRevealed: false,
    phase: GamePhase.HOME,
    totalRounds: 1,
    currentRound: 1,
    useHints: true
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSwitchingPlayer, setIsSwitchingPlayer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const transitionTo = (newPhase: GamePhase) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState(prev => ({ ...prev, phase: newPhase }));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 450);
  };

  const generateAIHint = async (word: string): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres un asistente para el juego 'El Impostor'. Genera una pista MUY BREVE (máximo 3 palabras) para el impostor basada en la palabra secreta: "${word}". La pista debe ser conceptual y sutil, no debe rimar ni ser obvia. Responde SOLO con la pista. Ejemplo: Palabra 'Asado' -> Pista 'Ritual con fuego'.`,
      });
      return response.text?.trim() || 'Sin pista disponible';
    } catch (error) {
      console.error("Error generating hint:", error);
      return "Pista no disponible";
    }
  };

  const createGame = () => {
    transitionTo(GamePhase.ADD_PLAYERS);
  };

  const handlePlayersConfirmed = (players: string[]) => {
    setGameState(prev => ({ ...prev, players }));
    transitionTo(GamePhase.ADD_WORDS);
  };

  const handleBack = () => {
    const prevPhases: Record<string, GamePhase> = {
      [GamePhase.ADD_PLAYERS]: GamePhase.HOME,
      [GamePhase.ADD_WORDS]: GamePhase.ADD_PLAYERS,
      [GamePhase.REVEAL]: GamePhase.ADD_WORDS,
    };
    const target = prevPhases[gameState.phase];
    if (target) transitionTo(target);
  };

  const handleEndRound = () => {
    transitionTo(GamePhase.GAME_OVER);
  };

  const selectNewSecretWord = (availableWords: string[]) => {
    const rawWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    return { secret: rawWord.trim(), rawWord: rawWord.trim() };
  };

  const startGame = async (words: string[], rounds: number, useHints: boolean) => {
    setIsGenerating(true);
    const { secret, rawWord } = selectNewSecretWord(words);
    const randomImpostor = Math.floor(Math.random() * gameState.players.length);
    
    // El hint ahora se cargará bajo demanda en Reveal para mejor UX
    setGameState(prev => ({
      ...prev,
      words,
      usedWords: [rawWord],
      secretWord: secret,
      hintWord: '', // Reiniciar pista
      impostorIndex: randomImpostor,
      currentPlayerIndex: 0,
      isRevealed: false,
      totalRounds: rounds,
      currentRound: 1,
      useHints
    }));
    
    // Pequeño delay artificial para que el usuario sienta la "preparación" del juego
    setTimeout(() => {
      setIsGenerating(false);
      transitionTo(GamePhase.REVEAL);
    }, 1200);
  };

  const nextRound = async () => {
    setIsGenerating(true);
    const availableWords = gameState.words.filter(w => !gameState.usedWords.includes(w));
    const pool = availableWords.length > 0 ? availableWords : gameState.words;
    
    const { secret, rawWord } = selectNewSecretWord(pool);
    const randomImpostor = Math.floor(Math.random() * gameState.players.length);

    setGameState(prev => ({
      ...prev,
      usedWords: availableWords.length > 0 ? [...prev.usedWords, rawWord] : [rawWord],
      secretWord: secret,
      hintWord: '', // Reiniciar pista
      impostorIndex: randomImpostor,
      currentPlayerIndex: 0,
      isRevealed: false,
      currentRound: prev.currentRound + 1
    }));

    setTimeout(() => {
      setIsGenerating(false);
      transitionTo(GamePhase.REVEAL);
    }, 1200);
  };

  const nextReveal = () => {
    if (gameState.currentPlayerIndex + 1 < gameState.players.length) {
      setGameState(prev => ({ ...prev, isRevealed: false }));
      setIsSwitchingPlayer(true);
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentPlayerIndex: prev.currentPlayerIndex + 1,
          hintWord: '' // Limpiar pista para el siguiente jugador por seguridad
        }));
        setIsSwitchingPlayer(false);
      }, 700);
    } else {
      transitionTo(GamePhase.GAME_OVER);
    }
  };

  const toggleReveal = () => {
    if (isSwitchingPlayer || isGenerating) return;
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
      impostorIndex: -1,
      currentPlayerIndex: 0,
      isRevealed: false,
      phase: GamePhase.HOME,
      totalRounds: 1,
      currentRound: 1,
      useHints: true
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500">
           <div className="relative flex items-center justify-center scale-125">
             <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] animate-pulse"></div>
             <div className="relative z-10 p-8 bg-slate-900/40 rounded-[2.5rem] border border-cyan-500/20 shadow-2xl">
                <svg className="w-24 h-24 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" className="opacity-10" />
                  <path d="M9.5 3C7.567 3 6 4.567 6 6.5C6 7.218 6.216 7.884 6.586 8.44C5.074 8.89 4 10.316 4 12C4 13.684 5.074 15.11 6.586 15.56C6.216 16.116 6 16.782 6 17.5C6 19.433 7.567 21 9.5 21C10.604 21 11.583 20.487 12.214 19.687C12.845 20.487 13.824 21 14.928 21C16.861 21 18.428 19.433 18.428 17.5C18.428 16.782 18.212 16.116 17.842 15.56C19.354 15.11 20.428 13.684 20.428 12C20.428 10.316 19.354 8.89 17.842 8.44C18.212 7.884 18.428 7.218 18.428 6.5C18.428 4.567 16.861 3 14.928 3C13.824 3 12.845 3.513 12.214 4.313C11.583 3.513 10.604 3 9.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-brain-float drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </svg>
             </div>
           </div>
           <div className="text-center space-y-3">
             <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.6em] animate-pulse">PREPARANDO EL JUEGO</p>
             <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Barajando mentiras...</p>
           </div>
        </div>
      )}

      <div className={`w-full max-w-lg transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) flex flex-col justify-center min-h-0 ${
        isTransitioning 
        ? 'opacity-0 translate-x-12 blur-sm scale-95' 
        : 'opacity-100 translate-x-0 blur-0 scale-100'
      }`}>
        {gameState.phase === GamePhase.HOME && (
          <Home onCreate={createGame} />
        )}

        {gameState.phase === GamePhase.ADD_PLAYERS && (
          <AddPlayers 
            onConfirm={handlePlayersConfirmed} 
            onBack={handleBack}
            initialPlayers={gameState.players} 
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
            isImpostor={gameState.currentPlayerIndex === gameState.impostorIndex}
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
            onGenerateHint={() => generateAIHint(gameState.secretWord)}
            onHintGenerated={updateHint}
          />
        )}

        {gameState.phase === GamePhase.GAME_OVER && (
          <GameOver 
            impostorName={gameState.players[gameState.impostorIndex]} 
            secretWord={gameState.secretWord}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onNextRound={nextRound}
            onRestart={restart} 
          />
        )}
      </div>

      <style>{`
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