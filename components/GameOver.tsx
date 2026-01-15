import React, { useState } from 'react';

interface GameOverProps {
  impostorName: string;
  secretWord: string;
  currentRound: number;
  totalRounds: number;
  onNextRound: () => void;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ 
  impostorName, 
  secretWord, 
  currentRound, 
  totalRounds, 
  onNextRound, 
  onRestart 
}) => {
  const [showImpostor, setShowImpostor] = useState(false);

  const isLastRound = currentRound >= totalRounds;

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[90vh] py-4 animate-in fade-in duration-700 relative">
      
      {/* Ambient Background Glow - Redish Vignette */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000 bg-red-950/20 opacity-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] blur-[160px] opacity-20 bg-red-600"></div>
      </div>

      {/* Header */}
      <div className="w-full max-w-sm flex justify-between items-center z-20 px-6 shrink-0 opacity-60">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Partida Finalizada</span>
        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Ronda {currentRound} de {totalRounds}</span>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 w-full flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-[340px] aspect-[3/4.5] bg-slate-950/40 rounded-[3rem] border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          {/* Checkmark Icon */}
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2 mb-10">
            <h2 className="text-4xl font-black text-white leading-none uppercase tracking-tight">
              ¡RONDA<br/>TERMINADA!
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] opacity-80">
              ¿QUIÉN MINTIÓ DESCARADAMENTE?
            </p>
          </div>

          {!showImpostor ? (
            <button 
              onClick={() => setShowImpostor(true)}
              className="w-full py-12 bg-slate-900/60 border-2 border-dashed border-slate-700 rounded-[2.5rem] text-slate-500 font-black uppercase tracking-[0.2em] hover:border-cyan-500/30 hover:text-cyan-400 transition-all active:scale-95 shadow-xl"
            >
              <span className="block text-[10px] opacity-60 mb-1">¿Ya votaron?</span>
              REVELAR
            </button>
          ) : (
            <div className="w-full animate-in zoom-in duration-500">
              <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-6 shadow-2xl">
                <p className="text-red-500 text-[9px] font-black uppercase tracking-[0.3em] mb-4">El impostor era...</p>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-6 truncate">{impostorName}</h3>
                
                <div className="h-px w-full bg-white/5 mb-6"></div>
                
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">La palabra era</p>
                <p className="text-emerald-400 text-2xl font-black uppercase tracking-tight">{secretWord}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="w-full max-w-sm px-6 shrink-0 z-20 pb-4">
        {showImpostor ? (
          <button 
            onClick={isLastRound ? onRestart : onNextRound}
            className="w-full py-5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-500 rounded-2xl font-black text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all text-lg uppercase tracking-widest"
          >
            {isLastRound ? 'NUEVA PARTIDA' : 'SIGUIENTE RONDA'}
          </button>
        ) : (
          <div className="h-[68px]"></div>
        )}
        
        {isLastRound && showImpostor && (
          <button 
            onClick={onRestart}
            className="w-full mt-4 text-slate-600 hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-colors py-2 opacity-50 hover:opacity-100"
          >
            VOLVER AL INICIO
          </button>
        )}
      </div>
    </div>
  );
};

export default GameOver;