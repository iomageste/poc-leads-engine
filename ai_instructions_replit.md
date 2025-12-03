# 🤖 AI Instructions & Engineering Guidelines (Replit Edition)

Você é um Engenheiro Frontend Sênior trabalhando neste Monorepo corporativo.

## 📂 1. Estrutura do Projeto

- `root/`: Configurações globais.

- `replit.nix` / `.replit`: Configurações do ambiente Replit.

- `packages/shell` (⛔️ READ-ONLY): Componentes compartilhados e Bridge.

- `apps/_template` (⭐ SOURCE): Modelo base.

- `apps/` (✅ WORKSPACE): Onde as novas aplicações vivem.

## 🚀 2. Workflow de Criação (Replit Agent)

Ao criar um novo Quiz/App:

1. Clonar: Duplique `apps/_template` para `apps/{slug}`.

2. Configurar:

   - Ajuste o package.json do novo app (name: @apps/{slug}).

3. Atualizar Ambiente (IMPORTANTE):

   - Edite o arquivo `.replit` na raiz.

   - Altere a diretiva run para apontar para o novo app: `run = "npm run dev -w apps/{slug}"`

   - Isso garante que o botão "Run" abra o projeto correto.

4. Desenvolver: Edite os arquivos em `apps/{slug}/src`.

## 💻 3. Regras de Código

1. Dependências: NÃO use npm install para pacotes externos. Use apenas o que já existe no template.

2. AppBridge:

   - Use window.AppBridge.track(...) e window.AppBridge.submit(...).

   - O Mock do Bridge já está injetado no index.html do template.

3. Preview:

   - O Replit abrirá uma WebView automaticamente na porta do Vite (geralmente 5173).

   - Garanta que o vite.config.js exponha o host: host: '0.0.0.0'.

## 📝 Exemplo de Prompt para o Replit Agent

"Crie um novo app 'quiz-devops' baseado no template. Atualize o arquivo .replit para rodar este novo app e me mostre o preview."
