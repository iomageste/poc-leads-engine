import { AppShell } from '@repo/shell';

function App() {
  return (
    <AppShell title="Template Quiz">
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Título do Quiz</h1>
        <p>Conteúdo gerado pela IA vai aqui...</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </div>
    </AppShell>
  );
}

export default App;