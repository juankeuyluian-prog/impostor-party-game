import React, { useState } from 'react';

interface GameOverProps {
  impostorNames: string[];
  secretWord: string;
  currentRound: number;
  totalRounds: number;
  onNextRound: () => void;
  onRestart: () => void;
  onRestartSamePlayers: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ 
  impostorNames, 
  secretWord, 
  currentRound, 
  totalRounds, 
  onNextRound, 
  onRestart,
  onRestartSamePlayers
}) => {
  const [showImpostor, setShowImpostor] = useState(false);

  const isLastRound = currentRound >= totalRounds;

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[92vh] py-6 animate-in fade-in duration-700 relative">
      
      {/* Ambient Background Glow - Redish Vignette */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000 bg-red-950/20 opacity-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] blur-[180px] opacity-30 bg-red-600"></div>
      </div>

      {/* Header */}
      <div className="w-full max-w-lg flex justify-between items-center z-20 px-8 shrink-0 opacity-60">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Partida Finalizada</span>
        <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Ronda {currentRound} de {totalRounds}</span>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 w-full flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-[360px] aspect-[3/4.7] bg-slate-950/60 rounded-[3.5rem] border border-white/10 p-10 flex flex-col items-center justify-center text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-md">
          
          <div className="scanline"></div>

          {/* Checkmark Icon */}
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-[1.75rem] flex items-center justify-center mb-10 shadow-inner group">
            <svg className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-3 mb-12 relative z-10">
            <h2 className="text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter">
              ¡RONDA<br/><span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-400 to-white">TERMINADA!</span>
            </h2>
            <p className="text-slate-500 text-[12px] font-black uppercase tracking-[0.25em] opacity-80">
              ¿QUIÉN MINTIÓ DESCARADAMENTE?
            </p>
          </div>

          {!showImpostor ? (
            <button 
              onClick={() => setShowImpostor(true)}
              className="w-full py-16 bg-slate-900/60 border-2 border-dashed border-slate-700 rounded-[3rem] text-slate-500 font-black uppercase tracking-[0.3em] hover:border-cyan-500/40 hover:text-cyan-400 transition-all active:scale-95 shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="block text-[11px] opacity-50 mb-2 relative z-10">¿Ya votaron?</span>
              <span className="text-2xl relative z-10">REVELAR</span>
            </button>
          ) : (
            <div className="w-full animate-in zoom-in duration-500 relative z-10">
              <div className="bg-slate-900/80 border border-white/10 rounded-[3rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-red-500/30 rounded-full"></div>
                
                <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-5">
                  {impostorNames.length > 1 ? 'Los impostores eran...' : 'El impostor era...'}
                </p>
                <div className="space-y-2 mb-8">
                  {impostorNames.map((name, idx) => (
                    <h3 key={idx} className="text-4xl font-black text-white uppercase tracking-tighter truncate leading-none drop-shadow-lg">
                      {name}
                    </h3>
                  ))}
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
                
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3">La palabra era</p>
                <div className="relative inline-block">
                    <div className="absolute inset-0 blur-2xl bg-emerald-500/20 animate-pulse"></div>
                    <p className="text-emerald-400 text-3xl font-black uppercase tracking-tight relative z-10">{secretWord}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="w-full max-w-sm px-8 shrink-0 z-20 pb-6 space-y-4">
        {showImpostor && (
          <div className="animate-in slide-in-from-bottom-6 duration-500 flex flex-col gap-4">
            <button 
              onClick={isLastRound ? onRestartSamePlayers : onNextRound}
              className="w-full py-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-500 rounded-[2rem] font-black text-slate-950 shadow-[0_20px_50px_rgba(16,185,129,0.4)] active:scale-95 transition-all text-xl uppercase tracking-widest flex items-center justify-center gap-4 group border-b-[6px] border-emerald-700"
            >
              {isLastRound ? (
                <>
                  <svg className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  REPETIR GRUPO
                </>
              ) : (
                  <>
                    SIGUIENTE RONDA
                    <svg className="w-7 h-7 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
              )}
            </button>

            {isLastRound && (
              <button 
                onClick={onRestart}
                className="w-full py-5 bg-slate-900/80 border border-white/10 rounded-[2rem] font-black text-slate-400 hover:text-white hover:bg-slate-800 transition-all active:scale-95 text-sm uppercase tracking-[0.4em] backdrop-blur-md"
              >
                NUEVA PARTIDA
              </button>
            )}
          </div>
        )}
        
        {!showImpostor && <div className="h-[84px]"></div>}
      </div>
    </div>
  );
};

export default GameOver;