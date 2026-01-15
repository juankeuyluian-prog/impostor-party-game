import React, { useState, useEffect } from 'react';

interface RevealProps {
  player: string;
  isImpostor: boolean;
  secretWord: string;
  hintWord: string;
  isRevealed: boolean;
  onToggleReveal: () => void;
  onNext: () => void;
  isLastPlayer: boolean;
  currentRound: number;
  totalRounds: number;
  onBack: () => void;
  onEndRound: () => void;
  useHints: boolean;
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
  currentRound,
  totalRounds,
  onBack,
  onEndRound,
  useHints,
  onGenerateHint,
  onHintGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleVerPista = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hintWord) return;
    
    setIsGenerating(true);
    const generatedHint = await onGenerateHint();
    onHintGenerated(generatedHint);
    setIsGenerating(false);
  };

  const showHintSection = useHints && isImpostor;

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[90vh] py-4 animate-in fade-in duration-700 relative">
      
      {/* Ambient Background Glow based on role */}
      {isRevealed && (
        <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
          isImpostor ? 'bg-red-950/40 opacity-100' : 'bg-cyan-950/40 opacity-100'
        }`}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] blur-[160px] opacity-30 ${
            isImpostor ? 'bg-red-600' : 'bg-cyan-600'
          }`}></div>
        </div>
      )}

      {/* Simplified Header */}
      <div className="w-full max-w-sm flex justify-between items-center z-20 px-4 shrink-0">
        <button 
          onClick={onBack}
          className="p-2 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{player}</h2>
        <div className="w-10"></div> 
      </div>

      {/* Main Reveal Card */}
      <div className="flex-1 w-full flex items-center justify-center p-4 z-10 perspective-1000">
        <div 
          onClick={!isRevealed ? onToggleReveal : undefined}
          className={`relative w-full max-w-[340px] aspect-[3/4.5] transition-all duration-700 preserve-3d cursor-pointer rounded-[3rem] ${
            isRevealed ? 'rotate-y-180 scale-105' : 'shadow-2xl hover:scale-[1.02]'
          }`}
        >
          {/* FRONT SIDE (Locked) */}
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-slate-900/80 rounded-[3rem] border border-white/10 shadow-inner p-8">
            <div className="w-32 h-32 bg-slate-950 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-700 mb-8">
              <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-white text-xl font-black uppercase tracking-wider mb-2">Tocar para revelar</p>
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">Solo vos debés verlo</p>
          </div>

          {/* BACK SIDE (Revealed Content) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-950 rounded-[3rem] border border-white/10 p-8 shadow-2xl flex flex-col items-center justify-between text-center">
            <div className={`w-full h-full flex flex-col items-center justify-between transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
              
              <div className="flex flex-col items-center mt-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed ${isImpostor ? 'bg-red-500/10 border-red-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
                  {isImpostor ? (
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-1 italic ${isImpostor ? 'text-red-500' : 'text-cyan-500'}`}>
                  SOS EL
                </h3>
                <h4 className={`text-5xl font-black text-white uppercase tracking-tighter leading-none ${isImpostor ? 'glitch-text' : ''}`} data-text="IMPOSTOR">
                  {isImpostor ? 'IMPOSTOR' : 'NPC'}
                </h4>
              </div>

              <div className="w-full px-2">
                <div className={`rounded-[2rem] p-6 border transition-all min-h-[160px] flex flex-col justify-center ${isImpostor ? 'bg-slate-900/60 border-amber-500/20' : 'bg-slate-900/60 border-cyan-500/20'}`}>
                  <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${isImpostor ? 'text-amber-500/80' : 'text-cyan-500/80'}`}>
                    {isImpostor ? 'TU PISTA SALVADORA:' : 'TU PALABRA SECRETA:'}
                  </p>
                  
                  <div className="flex items-center justify-center flex-1">
                    {isImpostor ? (
                      isGenerating ? (
                        <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
                          <div className="relative">
                            <div className="absolute inset-0 bg-amber-500/20 blur-xl animate-pulse rounded-full"></div>
                            <svg className="w-14 h-14 text-amber-500 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.5 3C7.567 3 6 4.567 6 6.5C6 7.218 6.216 7.884 6.586 8.44C5.074 8.89 4 10.316 4 12C4 13.684 5.074 15.11 6.586 15.56C6.216 16.116 6 16.782 6 17.5C6 19.433 7.567 21 9.5 21C10.604 21 11.583 20.487 12.214 19.687C12.845 20.487 13.824 21 14.928 21C16.861 21 18.428 19.433 18.428 17.5C18.428 16.782 18.212 16.116 17.842 15.56C19.354 15.11 20.428 13.684 20.428 12C20.428 10.316 19.354 8.89 17.842 8.44C18.212 7.884 18.428 7.218 18.428 6.5C18.428 4.567 16.861 3 14.928 3C13.824 3 12.845 3.513 12.214 4.313C11.583 3.513 10.604 3 9.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-neural-active" />
                              <circle cx="9.5" cy="7" r="1" fill="currentColor" className="animate-synapse-1" />
                              <circle cx="14.5" cy="17" r="1" fill="currentColor" className="animate-synapse-2" />
                            </svg>
                          </div>
                          <span className="text-[9px] font-black text-amber-500/60 uppercase tracking-[0.4em] animate-pulse">Consultando Red Neuronal</span>
                        </div>
                      ) : hintWord ? (
                        <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight leading-tight uppercase animate-in zoom-in duration-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                          {hintWord}
                        </span>
                      ) : (
                        <button 
                          onClick={handleVerPista}
                          className="px-8 py-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:brightness-110 flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          VER PISTA
                        </button>
                      )
                    ) : (
                      <span className="text-3xl font-black text-cyan-400 tracking-tight leading-tight uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                        {secretWord}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">
                {isImpostor ? 'CARETEALA A MUERTE.' : 'BUSCÁ AL MENTIROSO.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="w-full max-w-sm px-4 shrink-0 z-20">
        {isRevealed ? (
          <button 
            onClick={onNext}
            className="w-full py-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full font-black text-white shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all text-lg uppercase tracking-wider group"
          >
            <span className="ml-4">{isLastPlayer ? '¡A JUGAR!' : 'SIGUIENTE'}</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-1">
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        ) : (
          <button 
            onClick={onToggleReveal}
            className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black shadow-2xl active:scale-95 transition-all text-xl uppercase tracking-widest border-b-4 border-slate-300"
          >
            SABER MI ROL
          </button>
        )}
        
        {isRevealed && (
          <div className="w-full flex justify-center mt-4">
            <button 
              onClick={onEndRound}
              className="text-slate-600 hover:text-red-400 font-black text-[10px] uppercase tracking-[0.4em] transition-colors opacity-50 hover:opacity-100 py-2"
            >
              Finalizar Ronda
            </button>
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }

        @keyframes neural-active {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.5); }
        }
        .animate-neural-active {
          animation: neural-active 1.5s ease-in-out infinite;
        }

        @keyframes synapse-firing {
          0% { opacity: 0; transform: translate(0, 0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(10px, -5px); }
        }
        .animate-synapse-1 {
          animation: synapse-firing 1s ease-in-out infinite;
        }
        .animate-synapse-2 {
          animation: synapse-firing 1.2s ease-in-out infinite 0.3s;
        }

        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(31px, 9999px, 94px, 0); transform: skew(0.85deg); }
          20% { clip: rect(70px, 9999px, 71px, 0); transform: skew(0.85deg); }
          40% { clip: rect(10px, 9999px, 11px, 0); transform: skew(0.85deg); }
          60% { clip: rect(62px, 9999px, 22px, 0); transform: skew(0.85deg); }
          80% { clip: rect(3px, 9999px, 4px, 0); transform: skew(0.85deg); }
          100% { clip: rect(11px, 9999px, 11px, 0); transform: skew(0.85deg); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(12px, 9999px, 62px, 0); transform: skew(0.13deg); }
          50% { clip: rect(30px, 9999px, 11px, 0); transform: skew(0.13deg); }
          100% { clip: rect(11px, 9999px, 11px, 0); transform: skew(0.13deg); }
        }
      `}</style>
    </div>
  );
};

export default Reveal;