import React from 'react';
import { GameContent, GameType, AppState } from '../../shared/lib/game/types';
import { QuizView } from '../../shared/lib/game/components/QuizView';
import { EscapeRoomView } from '../../shared/lib/game/components/EscapeRoomView';
import { Button } from '../../shared/ui/Button';

interface GamePlayerProps {
  game: GameContent | null;
  onExit: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onExit }) => {
  if (!game) return null;

  return (
    <div className="animate-fade-in w-full">
       <div className="mb-6 flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
         <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-xs font-bold bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded uppercase tracking-wider">
                 {game.type === GameType.Quiz ? 'Тест' : 'Квест'}
               </span>
               <h1 className="text-xl font-bold text-white">{game.title}</h1>
            </div>
            <p className="text-slate-400 text-sm max-w-2xl">{game.description}</p>
         </div>
         <Button variant="outline" onClick={onExit} className="text-xs px-4 py-2 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700">
            Завершить сессию
         </Button>
       </div>

       {game.type === GameType.Quiz ? (
         <QuizView game={game} onExit={onExit} />
       ) : (
         <EscapeRoomView game={game} onExit={onExit} />
       )}
    </div>
  );
};