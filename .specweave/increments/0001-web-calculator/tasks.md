# Tasks: Web Calculator with Backend

<!-- SW:BOARD -->
| Task | State | By | Evidence | Note |
|---|---|---|---|---|
| T-01 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/server && npm … |  |
| T-02 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/server && npm … |  |
| T-03 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/server && npm … |  |
| T-04 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/client && npm … |  |
| T-05 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/client && npm … |  |
| T-06 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent/client && npm … |  |
| T-07 | done | opencode@desktop-qbl55af | cd repositories/iury-almeida/CalculatorAgent && npm run dev… |  |
| T-08 | done | opencode@desktop-qbl55af | README.md created with setup/install/run commands at reposi… |  |

8/8 done · 0 skipped · 0 claimed · 0 blocked · 0 stale · 0 open
<!-- /SW:BOARD -->

### T-01 Initialize backend project structure
- AC: AC-01, AC-02, AC-03 | Files: repositories/iury-almeida/CalculatorAgent/server/package.json, repositories/iury-almeida/CalculatorAgent/server/index.js | Test: cd repositories/iury-almeida/CalculatorAgent/server && npm test
- [x] done by opencode@desktop-qbl55af 2026-09-21T20:46:39.486Z — cd repositories/iury-almeida/CalculatorAgent/server && npm test → exit 0 log: .specweave/increments/0001-web-calculator…

### T-02 Implement calculator logic module
- AC: AC-02, AC-03 | Files: repositories/iury-almeida/CalculatorAgent/server/calculator.js, repositories/iury-almeida/CalculatorAgent/server/calculator.test.js | Test: cd repositories/iury-almeida/CalculatorAgent/server && npm test -- calculator.test.js
- [x] done by opencode@desktop-qbl55af 2026-09-21T20:47:33.364Z — cd repositories/iury-almeida/CalculatorAgent/server && npm test -- calculator.test.js → exit 0 log: .specweave/incremen…

### T-03 Implement Express API endpoints
- AC: AC-01, AC-02, AC-03 | Files: repositories/iury-almeida/CalculatorAgent/server/index.js, repositories/iury-almeida/CalculatorAgent/server/index.test.js | Test: cd repositories/iury-almeida/CalculatorAgent/server && npm test -- index.test.js
- [x] done by opencode@desktop-qbl55af 2026-09-21T20:48:16.359Z — cd repositories/iury-almeida/CalculatorAgent/server && npm test → exit 0 log: .specweave/increments/0001-web-calculator…

### T-04 Initialize frontend Vue 3 + Vite project
- AC: AC-04 | Files: repositories/iury-almeida/CalculatorAgent/client/package.json, repositories/iury-almeida/CalculatorAgent/client/vite.config.js, repositories/iury-almeida/CalculatorAgent/client/index.html | Test: cd repositories/iury-almeida/CalculatorAgent/client && npm run build
- [x] done by opencode@desktop-qbl55af 2026-09-21T20:53:02.585Z — cd repositories/iury-almeida/CalculatorAgent/client && npm run build → exit 0 log: .specweave/increments/0001-web-calcu…

### T-05 Implement Calculator Vue component
- AC: AC-04, AC-05, AC-06 | Files: repositories/iury-almeida/CalculatorAgent/client/src/components/Calculator.vue, repositories/iury-almeida/CalculatorAgent/client/src/components/Calculator.test.js | Test: cd repositories/iury-almeida/CalculatorAgent/client && npm test -- Calculator.test.js
- [x] done by opencode@desktop-qbl55af 2026-09-21T21:05:19.301Z — cd repositories/iury-almeida/CalculatorAgent/client && npm test -- Calculator.test.js --run → exit 0 log: .specweave/in…

### T-06 Wire up frontend App and entry point
- AC: AC-04, AC-05 | Files: repositories/iury-almeida/CalculatorAgent/client/src/App.vue, repositories/iury-almeida/CalculatorAgent/client/src/main.js | Test: cd repositories/iury-almeida/CalculatorAgent/client && npm run build
- [x] done by opencode@desktop-qbl55af 2026-09-21T21:05:54.305Z — cd repositories/iury-almeida/CalculatorAgent/client && npm run build → exit 0 log: .specweave/increments/0001-web-calcu…

### T-07 Add root package.json with dev scripts
- AC: AC-01, AC-04 | Files: repositories/iury-almeida/CalculatorAgent/package.json | Test: cd repositories/iury-almeida/CalculatorAgent && npm run dev -- --help
- [x] done by opencode@desktop-qbl55af 2026-09-21T21:07:45.234Z — cd repositories/iury-almeida/CalculatorAgent && npm run dev -- --help → exit 0 log: .specweave/increments/0001-web-calc…

### T-08 Add README with setup instructions
- AC: AC-01, AC-04 | Files: repositories/iury-almeida/CalculatorAgent/README.md | Test: manual: verify README exists and has setup/run commands
- [x] done by opencode@desktop-qbl55af 2026-09-21T21:09:15.241Z — README.md created with setup/install/run commands at repositories/iury-almeida/CalculatorAgent/README.md