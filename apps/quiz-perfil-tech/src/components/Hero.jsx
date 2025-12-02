export default function Hero({ onStartQuiz }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <div className="max-w-4xl w-full">
        <div className="text-center animate-slide_in">
          <div className="mb-6 inline-block">
            <div className="text-7xl animate-float">📚✨</div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-lavender-600 via-neon-pink to-neon-cyan bg-clip-text text-transparent leading-tight">
            Que tipo de estudante você é?
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            Seja honesto (ou não). 😭📚
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Um quiz rápido, irônico e dolorosamente verdadeiro.
          </p>

          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lavender-500 to-neon-pink rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Começar o Quiz 🚀
          </button>

          <div className="mt-16 hidden md:block">
            <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto opacity-60">
              <circle cx="100" cy="80" r="40" fill="#a066ff" opacity="0.3" />
              <circle cx="300" cy="120" r="50" fill="#ff10f0" opacity="0.2" />
              <path d="M150 60 Q200 40 250 60" stroke="#39ff14" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
