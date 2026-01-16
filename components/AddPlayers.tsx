import React, { useState, useRef } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants.ts';

interface AddPlayersProps {
  onConfirm: (players: string[]) => void;
  onBack: () => void;
  initialPlayers: string[];
}

const AddPlayers: React.FC<AddPlayersProps> = ({ onConfirm, onBack, initialPlayers }) => {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [nameInput, setNameInput] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setIsError(true);
    setTimeout(() => {
      setToast(null);
      setIsError(false);
    }, 2000);
  };

  const addPlayer = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      return;
    }
    if (players.length >= MAX_PLAYERS) {
      showToast('No entran más, che');
      return;
    }
    if (players.includes(trimmed)) {
      showToast('¡Ese nombre ya está!');
      return;
    }

    setIsSuccess(true);
    
    setTimeout(() => {
      const newPlayers = [...players, trimmed];
      setPlayers(newPlayers);
      setNameInput('');
      setLastAddedIndex(newPlayers.length - 1);
      
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);

      setTimeout(() => {
        setIsSuccess(false);
      }, 300);

      setTimeout(() => {
        setLastAddedIndex(null);
      }, 1200);
    }, 80);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    if (lastAddedIndex === index) setLastAddedIndex(null);
  };

  const canContinue = players.length >= MIN_PLAYERS;

  return (
    <div className="glass-card rounded-[2.5rem] p-5 sm:p-10 space-y-5 sm:space-y-8 relative flex flex-col max-h-[90vh] sm:max-h-[800px] shadow-2xl border-white/10">
      {toast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-red-500/50 px-6 py-2.5 rounded-full text-[10px] font-black shadow-[0_0_30px_rgba(239,68,68,0.2)] z-[60] flex items-center gap-2 animate-in fade-in slide-in-from-top-6 whitespace-nowrap">
          <span className="text-red-500 animate-pulse">●</span> {toast.toUpperCase()}
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center shrink-0 gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-none">Jugadores</h2>
          <p className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] mt-1.5 opacity-60">Sumá a la banda</p>
        </div>

        <div className={`min-w-[40px] h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[11px] sm:text-xs font-black rounded-2xl border transition-all duration-300 ${
          isSuccess ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-110' : 'bg-slate-800 text-cyan-400 border-white/5'
        }`}>
          {players.length}
        </div>
      </div>

      {/* Input Section */}
      <div className={`flex gap-2.5 shrink-0 relative transition-all duration-300 ${isError ? 'animate-shake' : ''} ${isSuccess ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
        <div className="relative flex-1">
          <input 
            type="text" 
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (isError) setIsError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Nombre del pibe..."
            className={`w-full bg-slate-900/40 border rounded-2xl px-6 py-4 sm:py-5 outline-none transition-all duration-300 text-base sm:text-lg font-bold placeholder:text-slate-700 placeholder:font-medium text-white shadow-inner ${
              isSuccess 
                ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-emerald-500/10' 
                : isError
                  ? 'border-red-500/50 bg-red-500/5'
                  : 'border-slate-700/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20'
            }`}
          />
        </div>
        <button 
          onClick={addPlayer}
          className={`font-black rounded-2xl px-6 sm:px-8 py-4 sm:py-5 transition-all duration-300 active:scale-90 flex items-center justify-center shadow-lg border-b-4 ${
            isSuccess 
              ? 'bg-emerald-500 text-slate-950 border-emerald-700' 
              : 'bg-cyan-500 text-slate-950 border-cyan-700 hover:brightness-110 active:border-b-0 active:translate-y-1'
          }`}
        >
          {isSuccess ? (
            <svg className="w-6 h-6 animate-ping-once" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Player List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide space-y-2.5 min-h-0 pr-1 transition-all duration-500"
      >
        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-slate-700 space-y-4 opacity-30 animate-pulse">
            <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">Mínimo 2 jugadores</p>
          </div>
        ) : (
          <div className="grid gap-2.5 pb-4">
            {players.map((p, i) => (
              <div 
                key={`${p}-${i}`} 
                className={`flex items-center justify-between bg-white/5 border p-4 sm:p-5 rounded-[1.5rem] transition-all duration-500 group hover:border-cyan-500/20 ${
                  lastAddedIndex === i 
                    ? 'border-emerald-500 bg-emerald-500/10 animate-pop-in opacity-100' 
                    : 'border-white/5 opacity-100 translate-x-0'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-black border transition-all duration-500 ${
                    lastAddedIndex === i 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-110' 
                      : 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                  }`}>
                    {i+1}
                  </span>
                  <span className={`text-base sm:text-lg font-bold truncate max-w-[140px] sm:max-w-[180px] transition-colors duration-500 ${
                    lastAddedIndex === i ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {p}
                  </span>
                </div>
                <button 
                  onClick={() => removePlayer(i)} 
                  className="text-slate-600 hover:text-red-400 transition-all p-2 hover:scale-110 active:scale-90"
                >
                  <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="shrink-0 pt-2">
        <button 
          disabled={!canContinue}
          onClick={() => onConfirm(players)}
          className={`w-full py-5 sm:py-6 rounded-[1.8rem] font-black text-base sm:text-xl transition-all duration-300 flex items-center justify-center gap-4 uppercase tracking-[0.15em] border-b-4 ${
            canContinue 
            ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 border-emerald-700 shadow-2xl shadow-cyan-500/20 active:translate-y-1 active:border-b-0 hover:brightness-110' 
            : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border-slate-900 opacity-50'
          }`}
        >
          SIGUIENTE
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-pop-in {
          animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
        }
        .animate-ping-once {
          animation: ping-once 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddPlayers;