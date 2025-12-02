import quizData from '../config.json';

export default function ProfileCards({ onStartQuiz }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-4 text-center text-gray-900">Teasers dos perfis</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Qual você acha que é?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {quizData.profiles.map((profile, idx) => (
            <div
              key={profile.id}
              className={`bg-gradient-to-br ${profile.color} rounded-2xl p-6 shadow-md border-2 border-white/50 hover:shadow-lg transform hover:scale-105 transition-all duration-200 animate-slide_in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-5xl mb-3">{profile.emoji}</div>
              <h3 className="font-black text-lg text-gray-900 mb-1">{profile.title}</h3>
              <p className="text-sm text-gray-700 italic">"{profile.subtitle}"</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lavender-500 to-neon-pink rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Quero saber qual eu sou 👉
          </button>
        </div>
      </div>
    </section>
  );
}
