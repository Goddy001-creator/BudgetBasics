# BudgetBasics — NextGen BudgetBee

An educational, fully client-side Single Page Application teaching students personal budgeting fundamentals — built with React + Vite for the "Web Innovation Unleashed" category.

## Features
- Budgeting Basics, Needs vs Wants, 50-30-20 calculator, Savings Goals, Expense Planner (session-only), Money Mistakes, Infographics gallery, rule-based AI Chatbot
- Site-wide keyword search, dark mode, responsive nav, tips ticker, live clock, visitor counter
- Client-side form validation only (Feedback, Contact) — no backend, no data storage, no banking

## Tech Stack
React 19 + Vite, plain CSS (CSS variables for theming), lucide-react icons. No backend, no database, no authentication.

## Getting Started
```bash
npm install
npm run dev      # start local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Project Structure
```
src/
  components/   Nav, Footer, Widgets (ticker, stats bar, back-to-top)
  pages/        One component per site section
  data/         content.js — all pre-populated educational content, tips, and chatbot FAQ (JSON-style module, no external DB)
  App.jsx       State-based routing, dark mode, search
  index.css     Design tokens (teal / dark / cream / gold palette) and base styles
```

## Assumptions
- Sample currency values are illustrative (₦) and used only for teaching calculations.
- The AI Chatbot uses keyword matching against a pre-defined FAQ list (no external AI API), per the "no backend" constraint.
- Feedback and Contact forms validate in-browser only; submissions are not sent or stored anywhere.
- Visitor counter is a randomized session value for demonstration, since there is no server to persist real counts.
