# Project Context & Optimization Guide (damha)

## 1. Project Standards
- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS
- **Design System**: Glassmorphism, Grand Nature Theme
- **Primary Color**: `#D60000` (Damha Red)
- **Accent Color**: `#D60000` (Damha Red)
- **Methodology**: bkit PDCA Cycle (Mandatory)

## 2. Context Engineering (Token Saving)
- **Avoid Large Files**: Never read `public/assets/` or `.pdf` files unless explicitly requested.
- **Incremental Reading**: Prefer `grep_search` and `list_directory` before reading entire files.
- **Ignore Build Artifacts**: `.next/` and `node_modules/` are strictly ignored via `.geminiignore`.
- **Memory Management**: Use `docs/.bkit-memory.json` to track state across sessions without re-analyzing the entire codebase.

## 3. Tool Usage Rules
- **Silent Operations**: Do not narrate low-level file reads or listings.
- **Surgical Edits**: Use `replace` with minimal context blocks to save tokens.
- **Linter First**: Always run `npm run lint` after code changes to catch cascading errors early.

## 4. Documentation Structure
- Plans: `docs/01-plan/features/`
- Designs: `docs/02-design/features/`
- Analysis: `docs/03-analysis/`
- Reports: `docs/04-report/`
