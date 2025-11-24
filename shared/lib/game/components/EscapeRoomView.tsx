import React, { useState } from 'react';
import { GameContent } from '../types';
import { Button } from '../../../ui/Button';

interface EscapeRoomViewProps {
  game: GameContent;
  onExit: () => void;
}

export const EscapeRoomView: React.FC<EscapeRoomViewProps> = ({ game, onExit }) => {
  const data = game.escapeRoomData!;
  const [currentSceneId, setCurrentSceneId] = useState(data.startSceneId);
  const [inventory, setInventory] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([data.startSceneId]);

  const currentScene = data.scenes.find(s => s.id === currentSceneId);

  if (!currentScene) {
    return <div className="text-red-500">Ошибка: Сцена {currentSceneId} не найдена. AI мог запутаться в ссылках.</div>;
  }

  const handleChoice = (nextSceneId: string, itemRequired?: string | null) => {
    if (itemRequired && !inventory.includes(itemRequired)) {
      alert(`Вам нужен предмет: ${itemRequired}!`);
      return;
    }
    
    // Check if the next scene has an item
    const nextScene = data.scenes.find(s => s.id === nextSceneId);
    if (nextScene?.itemFound && !inventory.includes(nextScene.itemFound)) {
      setInventory(prev => [...prev, nextScene.itemFound!]);
    }

    setCurrentSceneId(nextSceneId);
    setHistory(prev => [...prev, nextSceneId]);
  };

  const isEnding = currentScene.choices.length === 0;

  return (
    <div className="max-w-5xl mx-auto h-[700px] flex gap-6">
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden relative">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🎬</span> {currentScene.title}
          </h2>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Ход: {history.length}</div>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
           {/* Placeholder for multimodal image integration */}
          <div className="w-full h-56 bg-gradient-to-br from-slate-800 to-indigo-900/40 rounded-xl mb-6 flex flex-col items-center justify-center border border-indigo-500/10 group overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <span className="text-indigo-400 font-mono text-sm z-10">[Визуализация сцены]</span>
            <span className="text-slate-600 text-xs mt-2 z-10">Gemini Image Gen (Coming Soon)</span>
          </div>

          <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-line font-light">
            {currentScene.description}
          </p>

          {currentScene.itemFound && !inventory.includes(currentScene.itemFound) && (
            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-3 animate-pulse">
              <div className="p-2 bg-emerald-500/10 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide opacity-70">Найдено</div>
                <div className="font-bold text-lg">{currentScene.itemFound}</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700">
          <div className="grid grid-cols-1 gap-3">
            {currentScene.choices.map((choice, idx) => {
              const locked = choice.requiredItem && !inventory.includes(choice.requiredItem);
              return (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice.nextSceneId, choice.requiredItem)}
                  disabled={locked || false}
                  className={`p-4 text-left rounded-lg transition-all border flex justify-between items-center group relative overflow-hidden
                    ${locked 
                      ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-70' 
                      : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow-lg'
                    }`}
                >
                  <span className="z-10">{choice.text}</span>
                  {locked && (
                    <span className="z-10 text-xs bg-slate-700 px-2 py-1 rounded text-red-300 border border-red-500/30 flex items-center gap-1">
                      🔒 Нужен: {choice.requiredItem}
                    </span>
                  )}
                  {!locked && <span className="z-10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">→</span>}
                </button>
              );
            })}
            
            {isEnding && (
               <Button onClick={onExit} variant="primary" className="w-full">Завершить квест</Button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar / Inventory */}
      <div className="w-72 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 flex flex-col">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Инвентарь
        </h3>
        {inventory.length === 0 ? (
          <div className="text-slate-600 text-sm italic text-center py-10 border border-dashed border-slate-700 rounded-xl">
            Пусто...
          </div>
        ) : (
          <ul className="space-y-2">
            {inventory.map((item, i) => (
              <li key={i} className="bg-slate-700 px-4 py-3 rounded-lg text-slate-200 text-sm flex items-center gap-3 border border-slate-600 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                {item}
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-auto pt-6 border-t border-slate-700">
          <Button onClick={onExit} variant="outline" className="w-full text-sm">Выйти в меню</Button>
        </div>
      </div>
    </div>
  );
};