
import React from 'react';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <div className="glass-card rounded-3xl p-10 text-center space-y-8 animate-in zoom-in-95 duration-500 shadow-2xl">
      <div className="flex justify-center">
        <div className="bg-emerald-500/20 p-5 rounded-full border border-emerald-500/40">
          <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">¡Roles Asignados!</h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-[300px] mx-auto font-medium">
          Todos conocen su identidad. ¡Es hora de que comience el juego!
        </p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 text-left space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cómo jugar:</h3>
        <ul className="text-sm space-y-3">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">1.</span>
            <span className="text-slate-300 font-medium">Hagan una ronda: cada uno diga UNA palabra relacionada con la secreta.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">2.</span>
            <span className="text-slate-300 font-medium">El Impostor debe intentar deducir la palabra y no ser descubierto.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">3.</span>
            <span className="text-slate-300 font-medium">Al final, discutan y ¡voten por quién creen que es el impostor!</span>
          </li>
        </ul>
      </div>

      <button 
        onClick={onRestart}
        className="w-full py-5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl font-black text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-tighter"
      >
        VOLVER A JUGAR
      </button>
    </div>
  );
};

export default GameOver;
