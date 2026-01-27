import React, { useState, useRef, useEffect } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants.ts';

interface AddPlayersProps {
  onConfirm: (players: string[], impostorCount: number) => void;
  onBack: () => void;
  initialPlayers: string[];
  initialImpostorCount: number;
}

const AddPlayers: React.FC<AddPlayersProps> = ({ onConfirm, onBack, initialPlayers, initialImpostorCount }) => {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [nameInput, setNameInput] = useState('');
  const [impostorCount, setImpostorCount] = useState(initialImpostorCount);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxAllowed = Math.max(1, Math.floor((players.length - 1) / 2));
    if (impostorCount > maxAllowed) setImpostorCount(maxAllowed);
  }, [players.length, impostorCount]);

  const addPlayer = () => {
    const trimmed = nameInput.trim();
    if (!trimmed || players.includes(trimmed) || players.length >= MAX_PLAYERS) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    setPlayers([...players, trimmed]);
    setNameInput('');
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const removePlayer = (idx: number) => setPlayers(players.filter((_, i) => i !== idx));
  const canContinue = players.length >= MIN_PLAYERS;
  const maxImpostors = Math.max(1, Math.floor((players.length - 1) / 2));

  return (
    <div className="glass-card rounded-[3.5rem] p-6 sm:p-10 space-y-8 h-[90vh] max-h-[850px] flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center shrink-0">
        <button onClick={onBack} className="btn-press p-4 bg-white/5 rounded-2xl text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg></button>
        <h2 className="text-2xl font-black tracking-tight">JUGADORES</h2>
        <div className="bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/20 text-cyan-400 font-black">{players.length}</div>
      </div>

      <div className={`flex gap-2 shrink-0 ${error ? 'animate-shake' : ''}`}>
        <input 
          type="text" 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          placeholder="Nombre..."
          className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all font-bold"
        />
        <button onClick={addPlayer} className="btn-press px-6 bg-cyan-500 text-slate-950 rounded-2xl font-black text-xl">+</button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
        {players.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-40 italic space-y-4">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
             <p className="text-xs uppercase tracking-[0.3em]">Sumá a la banda</p>
          </div>
        ) : (
          players.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 animate-in slide-in-from-right-4 duration-300">
              <span className="font-bold text-slate-200">{p}</span>
              <button onClick={() => removePlayer(i)} className="text-slate-600 hover:text-red-400 p-2 transition-colors">×</button>
            </div>
          ))
        )}
      </div>

      <div className="shrink-0 space-y-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-slate-500 tracking-widest">IMPOSTORES</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(n => (
              <button
                key={n}
                disabled={n > maxImpostors}
                onClick={() => setImpostorCount(n)}
                className={`w-10 h-10 rounded-xl font-black text-xs transition-all border ${
                  impostorCount === n ? 'bg-red-500 border-red-400 text-white' : 'bg-white/5 border-white/5 text-slate-500'
                } ${n > maxImpostors ? 'opacity-10 grayscale' : 'hover:bg-white/10'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <button 
          disabled={!canContinue}
          onClick={() => onConfirm(players, impostorCount)}
          className="btn-press w-full py-5 bg-white text-slate-950 rounded-[2rem] font-black tracking-widest text-lg disabled:opacity-20"
        >
          SIGUIENTE
        </button>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AddPlayers;