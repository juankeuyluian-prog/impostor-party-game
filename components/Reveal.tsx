import React, { useState } from 'react';

interface RevealProps {
  player: string;
  isImpostor: boolean;
  secretWord: string;
  hintWord: string;
  isRevealed: boolean;
  onToggleReveal: () => void;
  onNext: () => void;
  isLastPlayer: boolean;
  onBack: () => void;
  onGenerateHint: () => Promise<string>;
  onHintGenerated: (hint: string) => void;
}

const Reveal: React.FC<RevealProps> = ({ 
  player, 
  isImpostor, 
  secretWord, 
  hintWord,
  isRevealed, 
  onToggleReveal, 
  onNext,
  isLastPlayer,
  onBack,
  onGenerateHint,
  onHintGenerated
}) => {
  const [loadingHint, setLoadingHint] = useState(false);

  const handleHint = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hintWord || loadingHint) return;
    setLoadingHint(true);
    const h = await onGenerateHint();
    onHintGenerated(h);
    setLoadingHint(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between h-[92vh] py-6 animate-in fade-in duration-500 relative">
      <div className="w-full max-w-sm flex justify-between items-center px-6 z-20">
        <button onClick={onBack} className="p-3 text-slate-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg></button>
        <div className="text-center">
            <span className="text-[8px] font-black tracking-[0.4em] text-slate-500 block">TURNO DE</span>
            <h2 className="text-2xl font-black text-white tracking-tighter">{player}</h2>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center p-6 z-10 perspective-1000">
        <div 
          onClick={!isRevealed ? onToggleReveal : undefined}
          className={`relative w-full max-w-[320px] aspect-[3/4.5] transition-all duration-[700ms] preserve-3d cursor-pointer rounded-[3rem] ${
            isRevealed ? 'rotate-y-180 scale-105' : 'shadow-2xl hover:scale-[1.02]'
          }`}
          style={{
             boxShadow: isRevealed 
               ? (isImpostor ? '0 30px 60px -10px rgba(239, 68, 68, 0.4)' : '0 30px 60px -10px rgba(34, 211, 238, 0.4)')
               : '0 20px 40px -10px rgba(0,0,0,0.5)'
          }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-slate-900/90 rounded-[3rem] border border-white/10 p-10 backdrop-blur-xl">
            <div className="w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center border-2 border-dashed border-slate-800 mb-8">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <p className="text-white text-xl font-black uppercase tracking-widest text-center">TOCAR PARA<br/>REVELAR</p>
          </div>

          {/* BACK */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-slate-950 rounded-[3rem] border border-white/10 p-10 flex flex-col items-center justify-between text-center transition-all duration-700`}>
            <div className={`w-full h-full flex flex-col items-center justify-between transition-opacity duration-300 delay-300 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
              <div className="space-y-2 mt-4">
                <span className={`text-[10px] font-black tracking-[0.5em] ${isImpostor ? 'text-red-500' : 'text-cyan-500'}`}>TU ROL ES:</span>
                <h4 className="text-5xl font-black text-white tracking-tighter">{isImpostor ? 'IMPOSTOR' : 'NPC'}</h4>
              </div>

              <div className={`w-full p-8 rounded-[2rem] border transition-all ${isImpostor ? 'bg-red-500/5 border-red-500/20' : 'bg-cyan-500/5 border-cyan-500/20'}`}>
                <p className="text-[8px] font-black text-slate-500 tracking-[0.3em] mb-4">{isImpostor ? 'PISTA DE LA PALABRA:' : 'LA PALABRA ES:'}</p>
                <div className="flex flex-col items-center justify-center gap-4">
                  {isImpostor ? (
                    hintWord ? (
                      <span className="text-2xl font-black text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-in zoom-in">{hintWord}</span>
                    ) : (
                      <button onClick={handleHint} className="btn-press py-3 px-6 bg-red-600 rounded-2xl text-[10px] font-black tracking-widest text-white shadow-lg">
                        {loadingHint ? 'GENERANDO...' : 'VER PISTA'}
                      </button>
                    )
                  ) : (
                    <span className="text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{secretWord}</span>
                  )}
                </div>
              </div>

              <p className="text-slate-600 text-[9px] font-bold tracking-widest uppercase italic">{isImpostor ? 'Cuidá tu secreto...' : 'No seas obvio...'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm px-6 z-20">
        {isRevealed ? (
          <button onClick={onNext} className="btn-press w-full py-6 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-[2.5rem] font-black text-white shadow-xl flex items-center justify-center gap-4 text-lg">
            {isLastPlayer ? '¡A JUGAR!' : 'SIGUIENTE'}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        ) : (
          <div className="h-20"></div>
        )}
      </div>

      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Reveal;