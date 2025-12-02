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
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-xl w-full">
            <div className="card shadow-heavy text-center animate-fade-in">
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-gray-800 mb-4">
                Parabens, voce terminou!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Suas respostas foram registradas com sucesso. Agora voce pode voltar a procrastinar em paz.
              </p>
              <button
                onClick={handleSubmit}
                className="btn-primary w-full"
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
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="container-quiz animate-slide-up">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-gray-800">
                {quizData.title}
              </h1>
              <span className="badge">
                {currentStep + 1}/{quizData.questions.length}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card mb-8">
            <div className="mb-8">
              <div className="badge inline-block mb-4">
                Pergunta {currentStep + 1}
              </div>
              <h2 className="text-gray-800 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
                    ${selectedOption === option
                      ? 'card-interactive card-interactive-selected'
                      : 'card-interactive'
                    }
                  `}
                >
                  <div className="flex items-start">
                    <div className={`
                      radio-custom mt-0.5 mr-4
                      ${selectedOption === option
                        ? 'radio-custom-selected'
                        : 'radio-custom-unselected'
                      }
                    `}>
                      {selectedOption === option && (
                        <div className="radio-dot" />
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
            className={selectedOption ? 'btn-primary w-full' : 'btn-secondary w-full'}
          >
            {currentStep < quizData.questions.length - 1 ? 'Proxima Pergunta' : 'Finalizar Quiz'}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
