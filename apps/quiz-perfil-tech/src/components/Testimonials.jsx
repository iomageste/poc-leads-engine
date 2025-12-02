import quizData from '../config.json';

export default function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black mb-12 text-center text-gray-900">O que dizem por aí</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizData.testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md border-2 border-lavender-200 hover:shadow-lg transition-all animate-slide_in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg text-gray-800 font-semibold leading-relaxed italic">"{testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
