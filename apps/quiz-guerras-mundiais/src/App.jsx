import { useState } from 'react';
import { AppShell } from '@repo/shell';
import quizData from './config.json';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option, index) => {
    setSelectedOption(index);
    window.AppBridge.track('answer_selected', {
      questionId: currentStep,
      questionText: quizData.questions[currentStep].text,
      selectedOption: option.label,
      isCorrect: option.correct
    });
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const currentQuestion = quizData.questions[currentStep];
    const isCorrect = currentQuestion.options[selectedOption].correct;

    const newAnswers = [...answers, {
      questionId: currentStep,
      selectedOption: selectedOption,
      isCorrect: isCorrect
    }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentStep < quizData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleConfirm = async () => {
    await window.AppBridge.submit({
      score: isCorrect ? score + 1 : score,
      totalQuestions: quizData.questions.length,
      answers: answers,
      quizTitle: quizData.title
    });
  };

  if (isComplete) {
    const finalScore = score;
    const percentage = Math.round((finalScore / quizData.questions.length) * 100);

    return (
      <AppShell title={quizData.title}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 bg-primary/10 border-2 border-primary rounded-full mb-6">
                  <span className="text-primary text-sm font-semibold">Quiz Concluído</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Resultado Final</h2>

                <div className="my-8">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#FF6B35"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute">
                      <div className="text-4xl font-bold text-primary">{percentage}%</div>
                    </div>
                  </div>
                </div>

                <div className="text-lg text-gray-600 mb-2">
                  Você acertou <span className="font-bold text-primary">{finalScore}</span> de{' '}
                  <span className="font-bold">{quizData.questions.length}</span> questões
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    {percentage >= 80
                      ? 'Excelente! Você domina o conteúdo sobre as Guerras Mundiais!'
                      : percentage >= 60
                      ? 'Bom trabalho! Continue estudando para melhorar ainda mais.'
                      : 'Continue se dedicando! Revise o conteúdo e tente novamente.'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Enviar Resultado
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{quizData.title}</h1>
              <span className="text-gray-500 font-medium text-sm">
                Questão {currentStep + 1} de {quizData.questions.length}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-primary to-orange-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 mb-6">
            <div className="mb-8">
              <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <span className="text-primary text-xs font-semibold uppercase tracking-wide">
                  Questão {currentStep + 1}
                </span>
              </div>
              <h2 className="text-lg font-medium text-gray-800 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option, idx)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                    selectedOption === idx
                      ? 'bg-primary/5 border-primary shadow-md shadow-primary/10'
                      : 'bg-gray-50 border-gray-200 hover:border-primary/50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        selectedOption === idx
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedOption === idx && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`w-full font-semibold py-4 rounded-xl transition-all duration-200 ${
              selectedOption !== null
                ? 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep < quizData.questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
