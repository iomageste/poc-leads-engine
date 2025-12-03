# POC Leads Engine - Monorepo

## Overview

This is a monorepo for quiz-based lead generation applications. It contains multiple React + Vite applications that run interactive quizzes to collect user data and preferences.

## Project Structure

```text
leads-engine-monorepo/
├── apps/                    # Individual quiz applications
│   ├── _template/          # Template for creating new quiz apps
│   ├── quiz-maturidade-mkt/ # Marketing Maturity Diagnostic (currently running)
│   ├── quiz-perfil-tech/   # Tech profile quiz
│   └── quiz-guerras-mundiais/  # World Wars quiz
├── packages/
│   └── shell/              # Shared AppShell component with header/footer
├── package.json            # Root workspace configuration
└── README.md
```

## Technology Stack

- **Build Tool**: Vite 7.2.6
- **Framework**: React 19.2.0
- **Styling**: Tailwind CSS
- **Package Manager**: npm workspaces
- **Language**: JavaScript (ES Modules)

## Current Configuration
- **Main App**: quiz-maturidade-mkt (Marketing Maturity Diagnostic)
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (required for Replit proxy)
- **HMR**: WebSocket on port 443 with WSS protocol

## Running the Project

The project uses npm workspaces. The main workflow runs:

```bash
npm run dev -w apps/quiz-maturidade-mkt
```

To run other apps:

```bash
npm run dev -w apps/quiz-perfil-tech
npm run dev -w apps/quiz-guerras-mundiais
npm run dev -w apps/_template
```

## Architecture

Each quiz app follows a standard architecture:

1. **AppShell Wrapper**: All apps must wrap content in `<AppShell>` component from `@repo/shell`
2. **AppBridge API**: Global `window.AppBridge` object provides:
   - `track(event, data)`: Track user interactions
   - `submit(data)`: Submit final quiz results
   - `login()`: Trigger authentication flow
   - `user`: Current user object

3. **Mock Development**: In development, AppBridge is mocked via script in index.html

## Creating New Quiz Apps

Follow the workflow in `ai_instructions.md`:

1. Clone `apps/_template` to `apps/{new-quiz-name}`
2. Update package.json name to `@apps/{new-quiz-name}`
3. Develop within the src/ folder
4. Add run script to root package.json if needed

## Deployment

The project is configured for static deployment:

- **Build command**: `npm run build -w apps/quiz-perfil-tech`
- **Output directory**: `apps/quiz-perfil-tech/dist`
- **Deployment type**: Static (serves pre-built HTML, CSS, JS files)

The build process generates optimized production files in the dist folder that can be served statically.

## Recent Changes (Dec 3, 2024)
- Created new app: quiz-maturidade-mkt (Diagnóstico de Maturidade em Marketing Digital)
- 4-question quiz with point-based scoring system
- Results categorized into 3 levels: Iniciante (0-50), Intermediário (51-85), Avançado (86-150)
- Uses Tailwind CSS with purple/amber gradient theme
- Updated workflow to run quiz-maturidade-mkt as main app

## Previous Changes (Dec 2, 2024)
- Configured quiz-perfil-tech Vite app for Replit environment (port 5000)
- Other apps (template, quiz-guerras-mundiais) use default ports to avoid conflicts
- Set up HMR for proxy compatibility (WSS on port 443)
- Updated .gitignore for Node.js artifacts
- Configured static deployment with build step
- Verified build process works correctly

## Important Notes

- Port 5000 is required for Replit webview (only configured for main app)
- All frontend servers must bind to 0.0.0.0 (not localhost)
- AppShell component is read-only (from packages/shell)
- No external dependencies should be added without review
- Each app in the monorepo can specify its own port to allow concurrent development
