export default function Why() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-lavender-200">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">Por que isso existe?</h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Porque a vida acadêmica já é difícil demais. Então aqui vai um quiz pra rir da própria desgraça. 😭
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <span className="px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full font-semibold text-sm">
              Rápido ⚡
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold text-sm">
              Irônico 😂
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
              Verdadeiro 📚
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
