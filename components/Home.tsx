
import React from 'react';

interface HomeProps {
  onCreate: () => void;
}

const Home: React.FC<HomeProps> = ({ onCreate }) => {
  return (
    <div className="glass-card rounded-[2rem] p-6 sm:p-10 text-center space-y-6 sm:space-y-10 animate-in fade-in zoom-in duration-500 shadow-2xl overflow-hidden">
      <div className="flex justify-center pt-2">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-cyan-400 opacity-20 animate-pulse"></div>
          <svg className="w-20 h-20 sm:w-24 sm:h-24 text-cyan-400 relative drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
          <span className="text-white">El </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Impostor</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-[280px] sm:max-w-[340px] mx-auto leading-relaxed font-medium">
          El juego para previas definitivo. Una palabra secreta. Un impostor.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Jugadores', val: '2-20', color: 'text-cyan-400' },
          { label: 'Minutos', val: '5-15', color: 'text-pink-500' },
          { label: 'Estilo', val: 'Pasar', color: 'text-green-500' }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-800/40 p-3 sm:p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <div className={`${item.color} font-black text-sm sm:text-lg whitespace-nowrap`}>{item.val}</div>
            <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <button 
          onClick={onCreate}
          className="w-full py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-cyan-500/20 text-base sm:text-lg uppercase tracking-tight"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          CREAR NUEVA PARTIDA
        </button>
        <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-widest opacity-60">
          💡 Optimizado para móviles y PC
        </p>
      </div>
    </div>
  );
};

export default Home;