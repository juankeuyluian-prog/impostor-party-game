
import React, { useState } from 'react';
import { WORD_CATEGORIES, MIN_WORDS } from '../constants.ts';

interface AddWordsProps {
  playerCount: number;
  onStart: (words: string[]) => void;
  onBack: () => void;
}

const AddWords: React.FC<AddWordsProps> = ({ playerCount, onStart, onBack }) => {
  const [wordsText, setWordsText] = useState('');
  
  const handleCategoryClick = (cat: keyof typeof WORD_CATEGORIES) => {
    const rawList = WORD_CATEGORIES[cat];
    const formattedList = rawList.split(',').map(w => w.trim()).join('\n');
    
    setWordsText(prev => {
      const existing = prev.trim();
      return existing ? existing + '\n' + formattedList : formattedList;
    });
  };

  const getCleanWords = () => wordsText.split(/\r?\n/).map(w => w.trim()).filter(w => w.length > 0);
  const cleanWords = getCleanWords();
  const canStart = cleanWords.length >= MIN_WORDS;

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-8 space-y-6 animate-in slide-in-from-right duration-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex justify-between items-center shrink-0">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-pink-500/20 p-2.5 rounded-xl text-pink-400 border border-pink-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h2 className="text-xl font-black text-white">Palabras Secretas</h2>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Temas</p>
          </div>
        </div>
        <div className="text-xs font-black bg-slate-800 text-pink-400 rounded-lg px-3 py-1.5 border border-white/5">
          {cleanWords.length} PALABRAS
        </div>
      </div>

      <div className="space-y-2 flex-1 flex flex-col min-h-0">
        <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] pl-1 shrink-0">Ingresa palabras (una por línea):</label>
        <textarea 
          value={wordsText}
          onChange={(e) => setWordsText(e.target.value)}
          placeholder="Cyberpunk&#10;Volcán&#10;Chocolate&#10;..."
          className="w-full flex-1 min-h-[100px] bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/10 transition-all text-sm font-medium leading-relaxed resize-none scrollbar-hide text-pink-50"
        />
      </div>

      <div className="space-y-3 shrink-0">
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest pl-1">Sugerencias:</p>
        <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto scrollbar-hide pr-1">
          {(Object.keys(WORD_CATEGORIES) as Array<keyof typeof WORD_CATEGORIES>).map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="text-[9px] sm:text-[10px] font-black px-3 py-2 rounded-xl bg-slate-800/80 border border-white/5 hover:border-pink-500/40 transition-all text-slate-400 hover:text-pink-400 active:scale-95"
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 shrink-0">
        <button 
          onClick={onBack}
          className="flex-1 py-5 rounded-2xl font-black text-base sm:text-lg bg-slate-800/50 text-slate-400 border border-white/5 active:scale-95 transition-all hover:bg-slate-800"
        >
          ATRÁS
        </button>
        <button 
          disabled={!canStart}
          onClick={() => onStart(cleanWords)}
          className={`flex-[2] py-5 rounded-2xl font-black text-base sm:text-lg transition-all flex items-center justify-center gap-3 ${
            canStart 
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl shadow-pink-500/20 active:scale-95' 
            : 'bg-slate-800/50 text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          INICIAR JUEGO
        </button>
      </div>
    </div>
  );
};

export default AddWords;
