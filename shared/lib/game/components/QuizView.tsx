import React, { useState } from 'react';
import { GameContent } from '../types';
import { Button } from '../../../ui/Button';

interface QuizViewProps {
  game: GameContent;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ game, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = game.quizData || [];
  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionId: string) => {
    if (showExplanation) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    const isCorrect = currentQuestion.options.find(o => o.id === selectedOption)?.isCorrect;
    if (isCorrect) setScore(s => s + 1);
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4 text-white">Тест завершен!</h2>
        <div className={`text-6xl font-black mb-6 ${percentage > 70 ? 'text-emerald-400' : 'text-indigo-400'}`}>
          {percentage}%
        </div>
        <p className="text-slate-300 mb-8">
          Вы ответили правильно на {score} из {questions.length} вопросов.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onExit} variant="secondary">В меню</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 text-slate-400 font-mono text-sm">
        <span>Вопрос {currentIndex + 1} / {questions.length}</span>
        <span>Очки: {score}</span>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
        <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            let className = "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
            
            if (showExplanation) {
              if (option.isCorrect) className += "bg-emerald-900/30 border-emerald-500 text-emerald-100";
              else if (option.id === selectedOption) className += "bg-red-900/30 border-red-500 text-red-100";
              else className += "bg-slate-700/50 border-transparent opacity-50";
            } else {
              if (selectedOption === option.id) className += "bg-indigo-600 border-indigo-500 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-800";
              else className += "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-200";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={className}
                disabled={showExplanation}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg text-indigo-200 text-sm animate-fade-in">
            <span className="font-bold block mb-1 uppercase tracking-wider text-xs">Объяснение:</span>
            {currentQuestion.explanation}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!showExplanation ? (
          <Button onClick={handleCheckAnswer} disabled={!selectedOption}>Проверить</Button>
        ) : (
          <Button onClick={handleNext}>{currentIndex === questions.length - 1 ? 'Завершить' : 'Следующий вопрос'}</Button>
        )}
      </div>
    </div>
  );
};