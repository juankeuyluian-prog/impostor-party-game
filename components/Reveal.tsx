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
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* Scanning Orbits */}
                            <div className="absolute inset-0 border border-amber-500/10 rounded-full animate-spin-slow"></div>
                            <div className="absolute inset-2 border-t border-amber-500/30 rounded-full animate-spin"></div>
                            
                            {/* Neural Lens Icon */}
                            <svg className="w-14 h-14 text-amber-500 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Magnifying Glass Frame */}
                              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
                              <path d="M21 21L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                              
                              {/* Neural Core inside lens */}
                              <path d="M10 7C9 7 8 8 8 9.5C8 10.5 8.5 11 9 11.5C8.5 12 8 12.5 8 13.5C8 15 9.5 16 11 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-neural-active opacity-60" />
                              <path d="M10 7C11 7 12 8 12 9.5C12 10.5 11.5 11 11 11.5C11.5 12 12 12.5 12 13.5C12 15 10.5 16 9 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-neural-active opacity-60" />
                              
                              {/* Digital Artifacts */}
                              <rect x="9.5" y="9" width="1" height="1" fill="currentColor" className="animate-synapse-1" />
                              <rect x="11.5" y="12" width="1" height="1" fill="currentColor" className="animate-synapse-2" />
                              <rect x="8.5" y="11.5" width="1" height="1" fill="currentColor" className="animate-synapse-3" />
                            </svg>
                            
                            {/* Laser Scan Effect */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-12 h-[2px] bg-amber-400/50 blur-[1px] shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-laser-scan z-20"></div>
                          </div>
                          <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] animate-pulse">Buscando Indicios...</span>
                        </div>
                      ) : hintWord ? (
                        <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight leading-tight uppercase animate-in zoom-in duration-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                          {hintWord}
                        </span>
                      ) : (
                        <button 
                          onClick={handleVerPista}
                          className="px-8 py-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:brightness-110 flex items-center gap-3 group/hint"
                        >
                          <svg className="w-5 h-5 group-hover/hint:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          OBTENER PISTA
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
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-neural-active {
          animation: neural-active 1.5s ease-in-out infinite;
        }

        @keyframes synapse-firing {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-synapse-1 { animation: synapse-firing 1s ease-in-out infinite; }
        .animate-synapse-2 { animation: synapse-firing 1.2s ease-in-out infinite 0.2s; }
        .animate-synapse-3 { animation: synapse-firing 0.8s ease-in-out infinite 0.4s; }

        @keyframes laser-scan {
          0%, 100% { top: 25%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 75%; }
        }
        .animate-laser-scan {
          animation: laser-scan 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 6s linear infinite;
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