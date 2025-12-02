import { useState } from 'react';
import quizData from '../config.json';

export default function Quiz({ onStart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    window.AppBridge.track('answer_selected', {
      questionId: currentStep,
      questionText: quizData.questions[currentStep].text,
      selectedOption: option.label,
      type: option.type
    });
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newScores = { ...scores };
    newScores[selectedOption.type] = (newScores[selectedOption.type] || 0) + 1;
    setScores(newScores);

    if (currentStep < quizData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      const winner = Object.keys(newScores).reduce((a, b) =>
        (newScores[a] || 0) > (newScores[b] || 0) ? a : b
      );
      const resultProfile = quizData.profiles.find(p => p.id === winner);
      setResult(resultProfile);
      setIsComplete(true);
    }
  };

  const handleConfirm = async () => {
    await window.AppBridge.submit({
      result: result.id,
      title: result.title,
      scores: scores,
      quizTitle: quizData.title
    });
  };

  if (isComplete && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 pt-20">
        <div className="max-w-2xl w-full">
          <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/60`}>
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 bg-white/40 backdrop-blur-sm border-2 border-white/60 rounded-full mb-6">
                <span className="text-gray-700 text-sm font-bold uppercase">Resultado</span>
              </div>

              <div className="text-6xl mb-6">{result.emoji}</div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                {result.title}
              </h2>

              <p className="text-xl text-gray-700 italic mb-8">
                "{result.subtitle}"
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-white/40">
              <p className="text-gray-800 text-lg leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setScores({});
                  setSelectedOption(null);
                  setIsComplete(false);
                  setResult(null);
                }}
                className="flex-1 px-6 py-4 bg-white/60 backdrop-blur-sm text-gray-900 font-bold rounded-xl border-2 border-white/60 hover:bg-white transition-all"
              >
                Refazer Quiz
              </button>

              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-lavender-500 to-neon-pink text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Compartilhar 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentStep];
  const progress = ((currentStep + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 pt-20 pb-10">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onStart}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ←
            </button>
            <span className="text-gray-600 font-bold text-sm md:text-base">
              Questão {currentStep + 1} de {quizData.questions.length}
            </span>
            <div className="w-6"></div>
          </div>

          <div className="w-full bg-lavender-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-lavender-500 via-neon-pink to-neon-cyan h-full transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border-2 border-lavender-200 mb-6">
          <div className="mb-8">
            <div className="inline-block px-4 py-1 bg-lavender-100 border-2 border-lavender-300 rounded-full mb-6">
              <span className="text-lavender-700 text-xs font-bold uppercase tracking-widest">
                Questão {currentStep + 1}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? 'bg-lavender-100 border-lavender-500 shadow-lg'
                    : 'bg-gray-50 border-gray-200 hover:border-lavender-300 hover:bg-lavender-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option
                        ? 'border-lavender-500 bg-lavender-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedOption === option && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-800 font-semibold text-base md:text-lg">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`w-full font-bold py-5 rounded-2xl transition-all duration-200 text-lg ${
            selectedOption
              ? 'bg-gradient-to-r from-lavender-500 to-neon-pink text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep < quizData.questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
        </button>
      </div>
    </div>
  );
}
