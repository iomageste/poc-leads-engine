# POC Leads Engine - Monorepo

## Overview
This is a monorepo for quiz-based lead generation applications. It contains multiple React + Vite applications that run interactive quizzes to collect user data and preferences.

## Project Structure
```
leads-engine-monorepo/
├── apps/                    # Individual quiz applications
│   ├── _template/          # Template for creating new quiz apps
│   ├── quiz-perfil-tech/   # Tech profile quiz (currently running)
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
- **Main App**: quiz-perfil-tech
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (required for Replit proxy)
- **HMR**: WebSocket on port 443 with WSS protocol

## Running the Project
The project uses npm workspaces. The main workflow runs:
```bash
npm run dev:quiz-perfil-tech
```

To run other apps:
```bash
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

## Recent Changes (Dec 2, 2024)
- Configured all Vite apps for Replit environment (0.0.0.0:5000)
- Set up HMR for proxy compatibility (WSS on port 443)
- Updated .gitignore for Node.js artifacts
- Configured workflow for quiz-perfil-tech app

## Important Notes
- Port 5000 is required for Replit webview
- All frontend servers must bind to 0.0.0.0 (not localhost)
- AppShell component is read-only (from packages/shell)
- No external dependencies should be added without review
