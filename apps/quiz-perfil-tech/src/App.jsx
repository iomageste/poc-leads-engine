import { useState } from 'react';
import { AppShell } from '@repo/shell';
import quizData from './config.json';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ Frontend: 0, Backend: 0, DevOps: 0 });
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
    newScores[selectedOption.type] = newScores[selectedOption.type] + 1;
    setScores(newScores);

    if (currentStep < quizData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      const winner = Object.keys(newScores).reduce((a, b) =>
        newScores[a] > newScores[b] ? a : b
      );
      setResult(winner);
      setIsComplete(true);
    }
  };

  const handleConfirm = async () => {
    await window.AppBridge.submit({
      result: result,
      scores: scores,
      quizTitle: quizData.title
    });
  };

  if (isComplete && result) {
    const resultData = quizData.results[result];
    return (
      <AppShell title={quizData.title}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
                  <span className="text-green-400 text-sm font-mono">Quiz Completo</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">{resultData.title}</h2>
              </div>

              <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-6 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">{resultData.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(scores).map(([type, score]) => (
                  <div key={type} className="bg-gray-950/50 border border-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{score}</div>
                    <div className="text-xs text-gray-500 font-mono uppercase">{type}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/20"
              >
                Confirmar Resultado
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  const currentQuestion = quizData.questions[currentStep];
  const progress = ((currentStep + 1) / quizData.questions.length) * 100;

  return (
    <AppShell title={quizData.title}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">{quizData.title}</h1>
              <span className="text-gray-500 font-mono text-sm">
                {currentStep + 1}/{quizData.questions.length}
              </span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl mb-6">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-gray-800 border border-gray-700 rounded-full mb-4">
                <span className="text-gray-400 text-xs font-mono">PERGUNTA {currentStep + 1}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedOption === option
                      ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500 shadow-lg shadow-green-500/10'
                      : 'bg-gray-950/50 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedOption === option
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-600'
                    }`}>
                      {selectedOption === option && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-200 text-lg">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full font-semibold py-4 rounded-xl transition-all duration-200 ${
              selectedOption
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-green-500/20'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {currentStep < quizData.questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
