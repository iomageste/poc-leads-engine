export default function HowItWorks() {
  const steps = [
    { num: "1", emoji: "❓", text: "Responde 5 perguntinhas." },
    { num: "2", emoji: "💥", text: "A verdade dói, mas o resultado entrega." },
    { num: "3", emoji: "🎵", text: "Você ganha músicas que combinam com seu vibe-estudo." },
    { num: "4", emoji: "📱", text: "Compartilha com seus amigos pra sofrerem juntos." },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black mb-12 text-center text-gray-900">Como funciona</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative animate-slide_in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 border-purple-200 h-full flex flex-col items-center text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{step.emoji}</div>
                <div className="inline-block w-12 h-12 rounded-full bg-gradient-to-br from-lavender-400 to-neon-pink text-white font-black flex items-center justify-center mb-4">
                  {step.num}
                </div>
                <p className="text-gray-700 font-semibold text-sm md:text-base">{step.text}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 text-2xl text-lavender-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
