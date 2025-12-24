
import React from 'react';

interface RevealProps {
  player: string;
  isImpostor: boolean;
  secretWord: string;
  isRevealed: boolean;
  onToggleReveal: () => void;
  onNext: () => void;
  isLastPlayer: boolean;
}

const Reveal: React.FC<RevealProps> = ({ 
  player, 
  isImpostor, 
  secretWord, 
  isRevealed, 
  onToggleReveal, 
  onNext,
  isLastPlayer 
}) => {
  return (
    <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 space-y-10 animate-in fade-in zoom-in duration-500 min-h-[60vh] sm:min-h-[500px] flex flex-col justify-between shadow-2xl overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${isRevealed ? (isImpostor ? 'bg-red-500' : 'bg-emerald-400') : 'bg-cyan-500'} opacity-50`}></div>

      <div className="space-y-2 text-center pt-4">
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black">Vista Privada Para</p>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-lg">{player}</h2>
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        {!isRevealed ? (
          <div className="text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-10 animate-pulse"></div>
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-slate-900/60 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700 relative">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-[200px] mx-auto leading-relaxed">
              Pasa el dispositivo a <span className="text-cyan-400 font-black">{player}</span> y toca abajo.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 w-full">
            {isImpostor ? (
              <div className="space-y-6">
                <div className="bg-red-500/10 w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-red-500/30 shadow-2xl shadow-red-500/10">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-red-500 text-2xl sm:text-3xl font-black uppercase tracking-widest italic opacity-80">ERES EL</h3>
                  <h4 className="text-6xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none">IMPOSTOR</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest">Mézclate. Que no te atrapen.</p>
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.4em]">Identificación Secreta</p>
                <div className="bg-emerald-500/5 border-2 border-emerald-500/20 px-4 py-8 sm:py-12 rounded-[3rem] shadow-2xl shadow-emerald-500/5 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                   <span className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-cyan-400 to-blue-500 tracking-tighter relative">
                    {secretWord.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-emerald-500/20">ROL: CIUDADANO</span>
                  <p className="text-slate-500 text-xs font-medium italic">Tú conoces la palabra. Busca al traidor.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-5 pb-2">
        {!isRevealed ? (
          <button 
            onClick={onToggleReveal}
            className="w-full py-6 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl font-black text-slate-950 shadow-2xl shadow-cyan-500/20 active:scale-95 transition-all text-xl uppercase tracking-widest border-b-4 border-black/20"
          >
            Revelar Mi Rol
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="w-full py-6 bg-white rounded-3xl font-black text-slate-950 shadow-2xl active:scale-95 transition-all text-xl uppercase tracking-widest flex items-center justify-center gap-3 border-b-4 border-slate-300"
          >
            {isLastPlayer ? 'FINALIZAR' : 'SIGUIENTE JUGADOR'}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
        <div className="flex items-center justify-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
           <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em]">Modo Privacidad Activado</p>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Reveal;
