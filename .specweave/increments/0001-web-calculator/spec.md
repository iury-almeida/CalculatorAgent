---
increment: 0001-web-calculator
title: Web Calculator with Backend
type: feature
priority: P1
status: completed
created: 2026-09-21T00:00:00.000Z
test_mode: TDD
coverage_target: 95
---

# 0001-web-calculator — Web Calculator with Backend

**Project**: calculator

## Problem

Users need a web-based calculator that performs arithmetic operations (add, subtract, multiply, divide) with a clean UI. The calculation logic should run on a backend server to demonstrate client-server architecture, enabling future extensions like history persistence, complex operations, or multi-user features. Currently there is no calculator application in the CalculatorAgent repository.

## Scope

**In**:
- Vue 3 frontend with Vite build tool
- Node.js/Express backend server
- REST API endpoints for calculator operations (POST /api/calculate)
- Basic arithmetic: addition, subtraction, multiplication, division
- Error handling for invalid input and division by zero
- Responsive calculator UI with number pad and operator buttons
- Unit tests for backend calculation logic
- Unit tests for frontend components

**Out**:
- Scientific calculator functions (sin, cos, sqrt, etc.)
- Calculation history persistence
- User authentication/accounts
- WebSocket real-time updates
- Docker/containerization
- CI/CD pipeline

## Acceptance Criteria

- [x] AC-01: Backend starts on port 3001 and responds to health check at GET /health
- [x] AC-02: POST /api/calculate accepts { a: number, b: number, operator: "+"|"-"|"*"|"/" } and returns { result: number }
- [x] AC-03: Backend returns 400 for invalid operator, non-numeric input, or division by zero
- [x] AC-04: Frontend loads at localhost:5173 (Vite dev server) and displays calculator UI
- [x] AC-05: Frontend sends calculation requests to backend and displays results
- [x] AC-06: Frontend shows error messages for invalid operations (e.g., division by zero)
- [x] AC-07: All backend unit tests pass with ≥95% coverage
- [x] AC-08: All frontend unit tests pass with ≥95% coverage

## Approach

- **Files that change** (and in what order):
  1. Backend: `repositories/iury-almeida/CalculatorAgent/server/` - Express server setup
  2. Backend: `repositories/iury-almeida/CalculatorAgent/server/calculator.js` - Calculation logic module
  3. Backend: `repositories/iury-almeida/CalculatorAgent/server/calculator.test.js` - Unit tests for calculator
  4. Backend: `repositories/iury-almeida/CalculatorAgent/server/index.test.js` - API integration tests
  4. Frontend: `repositories/iury-almeida/CalculatorAgent/client/` - Vue 3 + Vite project
  5. Frontend: `repositories/iury-almeida/CalculatorAgent/client/src/components/Calculator.vue` - Main calculator component
  6. Frontend: `repositories/iury-almeida/CalculatorAgent/client/src/components/Calculator.test.js` - Component tests
  6. Frontend: `repositories/iury-almeida/CalculatorAgent/client/src/App.vue` - App entry
  7. Root: `repositories/iury-almeida/CalculatorAgent/package.json` - Root scripts for dev/prod
  8. Root: `repositories/iury-almeida/CalculatorAgent/README.md` - Setup instructions

- **Key decisions**:
  - Use Vue 3 Composition API with `<script setup>` for modern Vue patterns
  - Use Vite for fast dev server and optimized builds
  - Express for minimal, well-understood backend
  - Jest for backend testing, Vitest for frontend testing (native Vite integration)
  - Single POST endpoint with operator enum for simplicity
  - CORS enabled for local development

- **Rejected alternatives**:
  - WebSocket for real-time: Overkill for simple calculator, REST is simpler
  - Separate repos for frontend/backend: Single repo keeps sync easier for this scope
  - TypeScript: Not required for this scope, can add later if needed

- **Risks**:
  - Port conflicts (3001/5173) — mitigation: configurable via env, documented in README
  - CORS issues in dev — mitigation: explicit CORS middleware in Express

## Open questions

- None blocking — all decisions made within scope
