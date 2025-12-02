import React, { useEffect } from 'react';

// Este componente vai "proteger" todas as páginas criadas pela IA
export const AppShell = ({ children, title }) => {
  useEffect(() => {
    console.log(`[Shell] Inicializando contexto para: ${title}`);
    // Aqui você injeta a lógica de Auth e Tracking real depois
    // window.AppBridge = ...
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="p-4 bg-white shadow-sm">
        <span className="font-bold text-blue-600">MinhaEmpresa</span>
      </header>
      <main className="max-w-md mx-auto mt-8 p-4">
        {children}
      </main>
    </div>
  );
};