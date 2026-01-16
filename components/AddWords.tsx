import React, { useState } from 'react';
import { WORD_CATEGORIES, MIN_WORDS } from '../constants.ts';

interface AddWordsProps {
  playerCount: number;
  onStart: (words: string[], rounds: number, useHints: boolean) => void;
  onBack: () => void;
  initialUseHints: boolean;
}

const AddWords: React.FC<AddWordsProps> = ({ playerCount, onStart, onBack, initialUseHints }) => {
  const [wordsText, setWordsText] = useState('');
  const [rounds, setRounds] = useState(3);
  const [useHints, setUseHints] = useState(initialUseHints);
  
  const handleCategoryClick = (cat: keyof typeof WORD_CATEGORIES) => {
    const rawList = WORD_CATEGORIES[cat];
    const formattedList = rawList.split(',').map(w => w.trim()).join('\n');
    
    setWordsText(prev => {
      const existing = prev.trim();
      return existing ? existing + '\n' + formattedList : formattedList;
    });
  };

  const handleClear = () => {
    setWordsText('');
  };

  const getCleanWords = () => wordsText.split(/\r?\n/).map(w => w.trim()).filter(w => w.length > 0);
  const cleanWords = getCleanWords();
  const canStart = cleanWords.length >= MIN_WORDS;

  const roundOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 space-y-6 sm:space-y-8 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[850px] border-white/10">
      {/* Header Section */}
      <div className="grid grid-cols-3 items-center shrink-0">
        <div className="flex justify-start">
          <button 
            onClick={onBack}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-pink-500/20 p-2.5 sm:p-3 rounded-2xl text-pink-500 border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => setUseHints(!useHints)}
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl transition-all active:scale-90 border ${
              useHints 
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                : 'bg-slate-800/80 border-white/5 text-slate-500'
            }`}
            title={useHints ? "Pistas activadas" : "Pistas desactivadas"}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Round Selection */}
      <div className="space-y-4 shrink-0 px-1">
        <label className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-black tracking-[0.3em] block text-center opacity-80">Cantidad de Rondas</label>
        <div className="bg-slate-900/80 p-1 rounded-2xl flex relative border border-white/5 shadow-inner">
          <div 
            className="absolute top-1 bottom-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl transition-all duration-300 ease-out shadow-[0_4px_15px_rgba(236,72,153,0.4)]"
            style={{ 
              left: `${(roundOptions.indexOf(rounds) / roundOptions.length) * 100 + 0.1}%`,
              width: `${(100 / roundOptions.length) - 0.2}%`
            }}
          />
          {roundOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setRounds(opt)}
              className={`flex-1 py-3 sm:py-4 rounded-xl font-black text-xs sm:text-base transition-all relative z-10 tracking-tighter ${
                rounds === opt ? 'text-white' : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Words Input Area */}
      <div className="space-y-3 flex-1 flex flex-col min-h-0 relative">
        <div className="flex justify-between items-center px-1 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
             <label className="text-[9px] sm:text-[11px] text-slate-500 uppercase font-black tracking-[0.25em] opacity-80">PALABRAS:</label>
             <span className={`text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded border ${useHints ? 'text-amber-400 border-amber-400/20 bg-amber-400/10' : 'text-slate-600 border-slate-700 bg-slate-800'} uppercase tracking-wider shrink-0`}>
                {useHints ? 'CON IA PISTAS' : 'SIN PISTAS'}
             </span>
             {wordsText.length > 0 && (
              <button 
                onClick={handleClear}
                className="text-[7px] sm:text-[8px] font-black text-red-400 uppercase tracking-wider hover:text-red-300 transition-colors flex items-center gap-1 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 shrink-0"
              >
                BORRAR
              </button>
            )}
          </div>
          <div className="flex items-center">
            <div className="text-[7px] sm:text-[9px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">
              {cleanWords.length}
            </div>
          </div>
        </div>
        <textarea 
          value={wordsText}
          onChange={(e) => setWordsText(e.target.value)}
          placeholder="Escribí una palabra por línea.&#10;Ej: Fernet&#10;Messi&#10;Mate&#10;..."
          className="w-full flex-1 min-h-[120px] sm:min-h-[160px] bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-7 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/10 transition-all text-sm sm:text-lg font-bold leading-relaxed resize-none scrollbar-hide text-pink-50 placeholder:text-slate-700 shadow-inner"
        />
      </div>

      {/* Categories */}
      <div className="shrink-0 space-y-3 px-1">
        <p className="text-[9px] sm:text-[10px] text-slate-600 uppercase font-black tracking-[0.3em] text-center opacity-50">Categorías rápidas</p>
        <div className="flex flex-wrap gap-2.5 justify-center pb-2">
          {(Object.keys(WORD_CATEGORIES) as Array<keyof typeof WORD_CATEGORIES>).map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="text-[9px] sm:text-[10px] font-black px-4 py-2.5 rounded-xl bg-slate-800/60 border border-white/5 hover:border-pink-500/30 transition-all text-slate-400 hover:text-white active:scale-95 shadow-sm"
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0 pt-2">
        <button 
          disabled={!canStart}
          onClick={() => onStart(cleanWords, rounds, useHints)}
          className="w-full py-5 sm:py-6 rounded-3xl font-black text-base sm:text-xl transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] border-b-4 bg-white text-slate-950 border-slate-300 shadow-[0_15px_30px_rgba(0,0,0,0.3)] active:translate-y-1 active:border-b-0 hover:brightness-105 active:brightness-95 disabled:bg-slate-800/50 disabled:text-slate-600 disabled:cursor-not-allowed disabled:border-slate-900 disabled:opacity-50"
        >
          ¡DALE!
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddWords;