import { useState } from 'react';
import { AppShell } from '@repo/shell';
import quizData from './config.json';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (option, index) => {
    setSelectedOption({ option, index });
    window.AppBridge.track('answer_selected', {
      questionId: quizData.questions[currentStep].id,
      questionText: quizData.questions[currentStep].text,
      selectedOption: option.label,
      points: option.points,
      type: option.type
    });
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newScore = totalScore + selectedOption.option.points;
    setTotalScore(newScore);

    const newAnswers = [...answers, {
      questionId: quizData.questions[currentStep].id,
      questionText: quizData.questions[currentStep].text,
      selectedOption: selectedOption.option.label,
      points: selectedOption.option.points,
      type: selectedOption.option.type
    }];
    setAnswers(newAnswers);

    if (currentStep < quizData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      const finalScore = newScore;
      let resultKey = 'iniciante';
      
      for (const [key, value] of Object.entries(quizData.results)) {
        if (finalScore >= value.min_score && finalScore <= value.max_score) {
          resultKey = key;
          break;
        }
      }
      
      setResult(quizData.results[resultKey]);
      setIsComplete(true);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await window.AppBridge.submit({
        totalScore,
        resultTitle: result.title,
        answers
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete && result) {
    return (
      <AppShell title={quizData.title}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg">
                  <span className="text-white text-sm font-bold uppercase tracking-wide">Resultado</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">{result.title}</h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <p className="text-white/90 text-lg leading-relaxed text-center">{result.description}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-400/30 rounded-2xl p-6 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">{totalScore}</div>
                  <div className="text-purple-200 text-sm uppercase tracking-wide">Pontos</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {answers.map((answer, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-white mb-1">+{answer.points}</div>
                    <div className="text-xs text-white/60">Q{idx + 1}</div>
                  </div>
                ))}
              </div>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-lg ${
                    isSubmitting
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white hover:shadow-amber-500/30 hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Receber Relatório Completo'}
                </button>
              ) : (
                <div className="text-center p-6 bg-green-500/20 border border-green-400/30 rounded-xl">
                  <div className="text-green-400 text-xl font-bold mb-2">Enviado com sucesso!</div>
                  <p className="text-green-200/80">Você receberá o relatório completo em breve.</p>
                </div>
              )}
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{quizData.title}</h1>
              <span className="text-purple-200 font-medium text-sm bg-white/10 px-3 py-1 rounded-full">
                {currentStep + 1}/{quizData.questions.length}
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-500 rounded-full shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl mb-6">
            <div className="mb-8">
              <div className="inline-block px-4 py-1 bg-purple-500/30 border border-purple-400/30 rounded-full mb-6">
                <span className="text-purple-200 text-xs font-semibold uppercase tracking-wide">
                  Pergunta {currentStep + 1}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option, idx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedOption?.index === idx
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400 shadow-lg shadow-amber-500/20 transform scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        selectedOption?.index === idx
                          ? 'border-amber-400 bg-amber-400'
                          : 'border-white/40'
                      }`}
                    >
                      {selectedOption?.index === idx && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-white/90 text-base md:text-lg leading-relaxed">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-lg ${
              selectedOption
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white hover:shadow-amber-500/30 hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {currentStep < quizData.questions.length - 1 ? 'Próxima Pergunta' : 'Ver Meu Resultado'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Pontuação atual: <span className="text-amber-400 font-bold">{totalScore}</span> pontos
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
