import quizData from '../config.json';

export default function FinalCTA({ onStartQuiz }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-lavender-400 via-neon-pink to-neon-cyan rounded-3xl p-12 text-center shadow-xl">
          <p className="text-2xl md:text-3xl font-black text-white mb-8">
            {quizData.cta}
          </p>

          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-lavender-600 rounded-full font-black text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Começar agora 🔥
          </button>
        </div>
      </div>
    </section>
  );
}
