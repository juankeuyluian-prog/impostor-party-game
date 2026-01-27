import React from 'react';

interface HomeProps {
  onCreate: () => void;
}

const Home: React.FC<HomeProps> = ({ onCreate }) => {
  return (
    <div className="glass-card rounded-[3.5rem] p-8 sm:p-14 text-center space-y-12 animate-in fade-in zoom-in duration-700 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="flex justify-center pt-6 relative z-10">
        <div className="relative animate-float-logo">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/30 rounded-full animate-pulse"></div>
          <div className="relative p-8 bg-slate-900/80 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-xl">
            <svg className="w-20 h-20 sm:w-24 sm:h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <h1 className="text-6xl sm:text-7xl font-black tracking-tighter uppercase leading-none italic">
          <span className="text-white block">EL</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">IMPOSTOR</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-xs mx-auto font-medium tracking-wide">
          Un juego de mentiras, <span className="text-cyan-400">deducción</span> y mucha caradurez.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 relative z-10">
        {[
          { label: 'PLAYERS', val: '2+', color: 'text-cyan-400' },
          { label: 'TIME', val: '5M', color: 'text-pink-400' },
          { label: 'HYPE', val: '100', color: 'text-emerald-400' }
        ].map((i, idx) => (
          <div key={idx} className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
            <span className={`${i.color} font-black text-xl`}>{i.val}</span>
            <span className="text-[8px] font-bold text-slate-500 tracking-[0.2em]">{i.label}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 relative z-10">
        <button 
          onClick={onCreate}
          className="btn-press w-full py-6 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[2.5rem] font-black text-slate-950 text-xl tracking-widest shadow-[0_20px_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4 group"
        >
          COMENZAR
          <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes float-logo {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float-logo { animation: float-logo 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;