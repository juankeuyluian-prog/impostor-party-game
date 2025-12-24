
import React, { useState } from 'react';
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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const addPlayer = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    if (players.length >= MAX_PLAYERS) {
      showToast('Máximo 20 jugadores');
      return;
    }
    if (players.includes(trimmed)) {
      showToast('¡Nombre ya ocupado!');
      return;
    }
    setPlayers([...players, trimmed]);
    setNameInput('');
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const canContinue = players.length >= MIN_PLAYERS;

  return (
    <div className="glass-card rounded-[2rem] p-5 sm:p-8 space-y-6 relative flex flex-col max-h-[85vh] sm:max-h-none animate-in slide-in-from-right duration-300 shadow-2xl">
      {toast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-500 px-6 py-2 rounded-full text-[10px] font-black shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="text-green-400">●</span> {toast.toUpperCase()}
        </div>
      )}

      <div className="flex justify-between items-center shrink-0">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
          title="Volver"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/20 p-2 rounded-xl text-cyan-400 border border-cyan-500/20">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h2 className="text-lg sm:text-xl font-black text-white">Jugadores</h2>
            <p className="text-slate-500 text-[9px] uppercase font-black tracking-widest">Configuración</p>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs font-black bg-slate-800 text-cyan-400 rounded-lg px-3 py-1.5 border border-white/5">
          {players.length}/{MAX_PLAYERS}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <input 
          type="text" 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          placeholder="Nombre..."
          className="flex-1 bg-slate-900/40 border border-slate-700/50 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all text-base font-medium placeholder:text-slate-600"
        />
        <button 
          onClick={addPlayer}
          className="bg-cyan-500 text-slate-950 font-black rounded-2xl px-6 py-4 hover:brightness-110 transition-all active:scale-90 flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-[120px] overflow-y-auto scrollbar-hide space-y-2 pr-1">
        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-700 space-y-3 opacity-40">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Agrega participantes</p>
          </div>
        ) : (
          players.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-[10px] font-black border border-cyan-500/20">{i+1}</span>
                <span className="text-sm sm:text-base font-bold text-slate-200 truncate max-w-[150px]">{p}</span>
              </div>
              <button onClick={() => removePlayer(i)} className="text-slate-500 hover:text-red-400 transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-3 shrink-0">
        <button 
          onClick={onBack}
          className="flex-1 py-5 rounded-2xl font-black text-base sm:text-lg bg-slate-800/50 text-slate-400 border border-white/5 active:scale-95 transition-all hover:bg-slate-800"
        >
          ATRÁS
        </button>
        <button 
          disabled={!canContinue}
          onClick={() => onConfirm(players)}
          className={`flex-[2] py-5 rounded-2xl font-black text-base sm:text-lg transition-all flex items-center justify-center gap-3 ${
            canContinue 
            ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-xl shadow-cyan-500/20 active:scale-95 hover:brightness-110' 
            : 'bg-slate-800/50 text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          SIGUIENTE
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddPlayers;
