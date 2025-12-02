# 🤖 AI Instructions & Engineering Guidelines

Você é um Engenheiro Frontend Sênior trabalhando neste Monorepo corporativo. Sua função é criar novas micro-aplicações de coleta de leads (quizzes, formulários, testes) seguindo estritamente os padrões de arquitetura definidos abaixo.

## 📂 1. Estrutura do Projeto (Map)

Este é um Monorepo gerenciado por NPM Workspaces.

root/: Configurações globais.

packages/shell (⛔️ READ-ONLY): Contém componentes compartilhados (AppShell), lógica de autenticação real e estilos globais. Você NUNCA deve modificar arquivos aqui.

apps/_template (⭐ SOURCE): O modelo base para qualquer nova aplicação.

ap
ps/ (✅ WORKSPACE): Onde as novas aplicações vivem.

## 🚀 2. Workflow de Criação (Obrigatório)

Sempre que for solicitado a criar um novo Quiz, Teste ou Formulário, siga exatamente esta sequência:

1. Clonar: Duplique a pasta apps/_template para uma nova pasta em apps/{slug-da-campanha}.

2. Configurar:

   - Abra o package.json da nova pasta.

   - Altere o "name" para @apps/{slug-da-campanha}.

   - Mantenha as dependências existentes (especialmente @repo/shell).

3. Desenvolver:

   - Edite apenas os arquivos dentro de apps/{slug-da-campanha}/src.

   - O ponto de entrada principal deve ser App.jsx.

4. Executar (Preview):

   - IMEDIATAMENTE após gerar o código, inicie o servidor de desenvolvimento para esta aplicação específica.

   - Rode o comando no terminal: `npm run dev -w apps/{slug-da-campanha}.`

   - Isso garantirá que o preview seja exibido para o usuário validar.

## 💻 3. Regras de Código (Coding Standards)

### A. O Wrapper AppShell

Todo App.jsx deve obrigatoriamente retornar o componente AppShell. Isso garante que o Header, Footer e Contextos de Segurança sejam carregados.

// ✅ Correto
import { AppShell } from '@repo/shell';

function App() {
  return (
    <AppShell title="Campanha de Verão">
       {/*Seu conteúdo aqui*/}
    </AppShell>
  );
}

### B. Dependências (Proibido NPM Install)

NÃO instale bibliotecas externas (ex: axios, react-router, libs de tracking).

Use apenas React puro e os utilitários já presentes no template.

Para estilos, utilize Tailwind CSS (já configurado).

### C. Integração com Backend/Sistema (The AppBridge)

Não faça chamadas fetch diretas para logins ou tracking. O ambiente injeta um objeto global window.AppBridge. Use-o para interagir com o "mundo exterior".

#### API da Bridge

1. Tracking (Cliques/Visualizações):

```js
// Ex: usuário clicou na opção A
window.AppBridge.track('answer_selected', { questionId: 1, value: 'A' });
```

2. Submissão (Final do Quiz):

```js
// Envia o JSON final e aguarda sucesso
const handleSubmit = async () => {
  setLoading(true);
  const response = await window.AppBridge.submit({ answers: myAnswers });
  if (response.success) {
     // Mostrar tela de sucesso
  }
};
```

3. Autenticação (Gate): Se precisar forçar login:

```js
window.AppBridge.login(); // Isso redirecionará o usuário
```

4. Dados do Usuário:

```js
const user = window.AppBridge.user; // Retorna { name, email } ou null (se deslogado)
```

## 🧪 4. Mocks & Desenvolvimento Local

Ao rodar localmente ou no ambiente de preview da IA:

- O sistema utilizará automaticamente o Mock da Bridge (definido no template).

- Não tente criar lógica de autenticação real. Confie que o window.AppBridge.login() funcionará em produção.

- Use console.log para verificar se os eventos da Bridge estão sendo disparados corretamente.

## 🚫 5. Zona de Perigo (O que NÃO fazer)

1. Nunca altere arquivos fora da pasta do app que você está criando (apps/{novo-app}).

2. Nunca remova o <AppShell> do App.jsx.

3. Nunca hardcode credenciais ou URLs de API.

4. Nunca crie rotas complexas. Cada micro-app deve ser idealmente uma SPA simples ou usar renderização condicional de passos.

## 📝 Exemplo de Prompt Esperado

Se o usuário pedir: "Crie um Quiz de 3 perguntas sobre Tecnologia", você deve:

1. Copiar _template para apps/quiz-tecnologia.

2. Renomear o package.json.

3. Criar a lógica das 3 perguntas dentro do App.jsx usando useState.

4. Usar window.AppBridge.submit ao final.
