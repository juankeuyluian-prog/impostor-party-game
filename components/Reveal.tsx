
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
    <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 space-y-8 animate-in fade-in zoom-in duration-500 min-h-[70vh] sm:min-h-[550px] flex flex-col justify-between shadow-2xl overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${isRevealed ? (isImpostor ? 'bg-red-500' : 'bg-emerald-400') : 'bg-cyan-500'} opacity-50 transition-colors duration-500`}></div>

      <div className="space-y-2 text-center pt-2">
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black opacity-80">Vista Privada Para</p>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-xl truncate px-2">{player}</h2>
      </div>

      <div className="flex-1 flex items-center justify-center py-6 sm:py-8">
        {!isRevealed ? (
          <div className="text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-10 animate-subtle-pulse"></div>
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-slate-900/60 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700 relative group-hover:border-cyan-500 transition-colors">
                <svg className="w-14 h-14 sm:w-20 sm:h-20 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-semibold max-w-[220px] mx-auto leading-relaxed">
              Pasa el dispositivo a <span className="text-cyan-400 font-black">{player}</span> y toca abajo.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500 w-full px-2">
            {isImpostor ? (
              <div className="space-y-6">
                <div className="bg-red-500/10 w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-red-500/30 shadow-2xl shadow-red-500/10 animate-bounce-short">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-red-500 text-2xl sm:text-3xl font-black uppercase tracking-widest italic opacity-80">ERES EL</h3>
                  <h4 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none break-words">IMPOSTOR</h4>
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Sé discreto. Mézclate.</p>
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.4em] opacity-60">Tu Palabra Secreta</p>
                <div className="bg-emerald-500/5 border-2 border-emerald-500/10 px-4 py-8 sm:py-14 rounded-[3rem] shadow-2xl shadow-emerald-500/5 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                   <span className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-cyan-400 to-blue-500 tracking-tighter relative break-words text-center px-4 leading-[1.1]">
                    {secretWord.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-emerald-500/20">CIUDADANO</span>
                  <p className="text-slate-500 text-[11px] font-bold italic opacity-80">Conoces el secreto. Busca al traidor.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4">
        {!isRevealed ? (
          <button 
            onClick={onToggleReveal}
            className="w-full py-6 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-[1.5rem] font-black text-slate-950 shadow-2xl shadow-cyan-500/20 active:scale-95 transition-all text-lg sm:text-xl uppercase tracking-widest border-b-4 border-black/20"
          >
            Revelar Mi Rol
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="w-full py-6 bg-white rounded-[1.5rem] font-black text-slate-950 shadow-2xl active:scale-95 transition-all text-lg sm:text-xl uppercase tracking-widest flex items-center justify-center gap-3 border-b-4 border-slate-300"
          >
            {isLastPlayer ? 'FINALIZAR' : 'SIGUIENTE'}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
        <div className="flex items-center justify-center gap-2 opacity-50">
           <div className="w-1 h-1 rounded-full bg-slate-700"></div>
           <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em]">Modo Privado</p>
           <div className="w-1 h-1 rounded-full bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Reveal;