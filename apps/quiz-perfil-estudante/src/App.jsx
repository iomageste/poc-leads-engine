import { useState } from 'react';
import { AppShell } from '@repo/shell';
import quizData from './config.json';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    window.AppBridge.track('answer_selected', {
      questionId: currentStep,
      questionText: quizData.questions[currentStep].text,
      selectedOption: option.label
    });
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentStep < quizData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmit = async () => {
    await window.AppBridge.submit({
      quizTitle: quizData.title,
      answers: answers
    });
  };

  if (isComplete) {
    return (
      <AppShell title={quizData.title}>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full">
            <div className="bg-white border-4 border-orange-400 rounded-3xl p-10 shadow-2xl text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-3xl font-black text-gray-800 mb-4">
                Parabens, voce terminou!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Suas respostas foram registradas com sucesso. Agora voce pode voltar a procrastinar em paz.
              </p>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg text-lg"
              >
                Confirmar Respostas
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl md:text-3xl font-black text-gray-800">
                {quizData.title}
              </h1>
              <span className="text-gray-500 font-bold text-sm bg-white px-3 py-1 rounded-full border-2 border-orange-300">
                {currentStep + 1}/{quizData.questions.length}
              </span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden border-2 border-orange-300">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white border-4 border-orange-300 rounded-3xl p-8 shadow-xl mb-6">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-orange-100 border-2 border-orange-300 rounded-full mb-4">
                <span className="text-orange-600 text-xs font-black uppercase">
                  Pergunta {currentStep + 1}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-5 rounded-2xl border-3 transition-all duration-200 ${
                    selectedOption === option
                      ? 'bg-gradient-to-r from-orange-100 to-red-100 border-4 border-orange-500 shadow-lg scale-105'
                      : 'bg-gray-50 border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full border-3 mt-0.5 mr-4 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-400 bg-white'
                    }`}>
                      {selectedOption === option && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-800 font-medium leading-snug">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-lg ${
              selectedOption
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep < quizData.questions.length - 1 ? 'Proxima Pergunta' : 'Finalizar Quiz'}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
