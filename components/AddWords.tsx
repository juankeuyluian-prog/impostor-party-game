
import React, { useRef, useEffect, useState } from 'react';
import { WORD_CATEGORIES, MIN_WORDS } from '../constants.ts';

interface AddWordsProps {
  playerCount: number;
  onStart: (words: string[], rounds: number, useHints: boolean) => void;
  onBack: () => void;
  initialUseHints: boolean;
}

const AddWords: React.FC<AddWordsProps> = ({ playerCount, onStart, onBack, initialUseHints }) => {
  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [rounds, setRounds] = useState(3);
  const [useHints, setUseHints] = useState(initialUseHints);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  
  const roundOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      let closestRound = rounds;
      let minDistance = Infinity;

      const items = container.querySelectorAll('[data-round]');
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - itemCenterX);
        if (distance < minDistance) {
          minDistance = distance;
          closestRound = parseInt(item.getAttribute('data-round') || '3');
        }
      });

      if (closestRound !== rounds) setRounds(closestRound);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [rounds]);

  const scrollToRound = (round: number, behavior: ScrollBehavior = 'smooth') => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector(`[data-round="${round}"]`) as HTMLElement;
    if (activeEl) {
      isScrollingRef.current = true;
      const offsetLeft = activeEl.offsetLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const itemWidth = activeEl.offsetWidth;
      scrollRef.current.scrollTo({
        left: offsetLeft - (containerWidth / 2) + (itemWidth / 2),
        behavior
      });
      setTimeout(() => { isScrollingRef.current = false; }, 500);
    }
  };

  useEffect(() => {
    scrollToRound(rounds, 'auto');
  }, []);

  const addWord = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !words.includes(trimmed)) {
      setWords([...words, trimmed]);
      setInputValue('');
      setTimeout(() => {
        if (gridRef.current) gridRef.current.scrollTop = gridRef.current.scrollHeight;
      }, 100);
    }
  };

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (cat: keyof typeof WORD_CATEGORIES) => {
    const newWords = WORD_CATEGORIES[cat].split(',').map(w => w.trim());
    setWords(prev => {
      const combined = [...prev, ...newWords];
      return Array.from(new Set(combined));
    });
  };

  const handleClear = () => setWords([]);
  const canStart = words.length >= MIN_WORDS;

  return (
    <div className="glass-card rounded-[3.5rem] p-6 sm:p-10 space-y-6 shadow-2xl overflow-hidden flex flex-col h-[94dvh] max-h-[900px] border-white/10 relative transition-all">
      <div className="mist mist-1 bg-pink-500/10"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center shrink-0 relative z-10">
        <button onClick={onBack} className="btn-press w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900/60 border border-white/5 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-xl font-black tracking-tighter uppercase italic text-pink-500">Configuración</h2>
        </div>
        <button 
          onClick={() => setUseHints(!useHints)}
          className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all border ${useHints ? 'bg-amber-500/20 border-amber-500/30 text-amber-500' : 'bg-slate-900/60 border-white/5 text-slate-600'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.657 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" /></svg>
        </button>
      </div>

      {/* Rounds Selector */}
      <div className="space-y-2 shrink-0 relative z-10">
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em]">RONDAS</label>
          <span className="text-pink-400 font-black text-[10px] uppercase bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">{rounds}</span>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-[calc(50%-1.5rem)] snap-x snap-mandatory">
          {roundOptions.map(opt => (
            <div
              key={opt}
              data-round={opt}
              onClick={() => { setRounds(opt); scrollToRound(opt); }}
              className={`flex-none w-12 h-12 rounded-2xl font-black text-lg transition-all flex items-center justify-center border-2 snap-center cursor-pointer ${rounds === opt ? 'bg-pink-600 border-pink-400 text-white scale-110 shadow-lg' : 'bg-slate-900/40 border-slate-800 text-slate-600 scale-90 opacity-40'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* Word Input & Grid Section */}
      <div className="flex-1 flex flex-col min-h-0 space-y-4 relative z-10">
        <div className="flex gap-2">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addWord()}
            placeholder="Añadir palabra..."
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-500/50 transition-all font-bold placeholder:text-slate-700"
          />
          <button onClick={addWord} className="btn-press w-14 bg-pink-500 text-slate-950 rounded-2xl font-black text-xl">+</button>
        </div>

        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em]">LISTA DE PALABRAS ({words.length})</label>
          {words.length > 0 && (
            <button onClick={handleClear} className="text-[10px] font-black text-red-400/60 hover:text-red-400 transition-colors">LIMPIAR TODO</button>
          )}
        </div>

        <div 
          ref={gridRef}
          className="flex-1 overflow-y-auto scrollbar-hide p-1"
        >
          {words.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40 space-y-3">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              <p className="text-[10px] uppercase font-black tracking-widest">Sin palabras añadidas</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {words.map((word, i) => (
                <div 
                  key={`${word}-${i}`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 hover:border-pink-500/30 transition-all animate-in zoom-in duration-300"
                >
                  <span className="font-bold text-slate-200 text-sm truncate pr-2">{word}</span>
                  <button onClick={() => removeWord(i)} className="text-slate-600 hover:text-red-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="shrink-0 space-y-3 relative z-10">
        <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.4em] text-center">AÑADIR TEMÁTICA</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(WORD_CATEGORIES) as Array<keyof typeof WORD_CATEGORIES>).map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="text-[9px] font-black px-4 py-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-pink-500/40 text-slate-500 hover:text-pink-400 transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="shrink-0 pt-2 relative z-10">
        <button 
          disabled={!canStart}
          onClick={() => onStart(words, rounds, useHints)}
          className={`btn-press w-full py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-4 tracking-widest border-b-[6px] bg-white text-slate-950 border-slate-300 shadow-2xl disabled:opacity-20`}
        >
          COMENZAR
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
      </div>
    </div>
  );
};

export default AddWords;
