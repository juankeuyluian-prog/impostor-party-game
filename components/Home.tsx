import React from 'react';

interface HomeProps {
  onCreate: () => void;
}

const Home: React.FC<HomeProps> = ({ onCreate }) => {
  return (
    <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 text-center space-y-8 sm:space-y-12 animate-in fade-in zoom-in duration-700 shadow-2xl overflow-hidden relative border-white/5">
      {/* Decorative Light Streak */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="flex justify-center pt-2">
        <div className="relative group">
          <div className="absolute inset-0 blur-3xl bg-cyan-400 opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <div className="relative p-6 bg-slate-900/40 rounded-3xl border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <svg className="w-20 h-20 sm:w-24 sm:h-24 text-cyan-400 relative drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none">
          <span className="text-white drop-shadow-lg">El </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-emerald-400 to-cyan-400 animate-gradient-x">Impostor</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-[280px] sm:max-w-[400px] mx-auto leading-relaxed font-medium">
          El juego ideal para la previa. Una palabra secreta. Un impostor. <span className="text-cyan-400 font-bold">¿Quién miente?</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        {[
          { label: 'Jugadores', val: '2-20', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-400' },
          { label: 'Minutos', val: '5-15', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-400' },
          { label: 'Modo', val: 'Previa', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400' }
        ].map((item, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${item.color} p-4 sm:p-6 rounded-3xl border ${item.border} flex flex-col items-center justify-center transition-all hover:translate-y-[-4px]`}>
            <div className={`${item.text} font-black text-sm sm:text-xl whitespace-nowrap drop-shadow-sm`}>{item.val}</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-2">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <button 
          onClick={onCreate}
          className="w-full py-5 sm:py-6 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-[length:200%_auto] animate-gradient-x rounded-[2rem] font-black text-slate-950 flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-cyan-500/25 text-base sm:text-xl uppercase tracking-wider group"
        >
          <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          ARMAR PARTIDA
        </button>
        <div className="flex items-center justify-center gap-2 opacity-50">
          <div className="h-px w-8 bg-slate-700"></div>
          <p className="text-[10px] sm:text-[12px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            💡 Pasá el celu y divertite
          </p>
          <div className="h-px w-8 bg-slate-700"></div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;