---
increment: 0002-fix-calculator-layout
title: Fix Calculator Button Layout
type: bug
priority: P1
status: completed
created: 2026-09-21T00:00:00.000Z
test_mode: TDD
coverage_target: 95
---

# 0002-fix-calculator-layout — Fix Calculator Button Layout

**Project**: calculator

## Problem

The calculator button layout is incorrect. Currently the buttons are rendered in a 4-column grid but the order is wrong:
- Numbers 1-9 are not in standard calculator order (should be 1,2,3 bottom row; 4,5,6 middle; 7,8,9 top)
- Zero button is not on the bottom row with decimal and equals
- Operators are not aligned in the rightmost column

Users expect a standard calculator layout matching physical calculators and phone calculator apps.

## Scope

**In**:
- Reorder button elements in Calculator.vue template to standard layout
- Update CSS for zero button to span 2 columns (standard calculator UX)
- Ensure all existing tests still pass

**Out**:
- New button functionality
- Changes to calculation logic
- Backend changes

## Acceptance Criteria

- [x] AC-01: Buttons render in standard calculator layout: Row 1 (top): C, ÷, ×, − | Row 2: 7, 8, 9, + | Row 3: 4, 5, 6, − | Row 4: 1, 2, 3, + | Row 5 (bottom): 0 (spans 2 cols), ., =
- [x] AC-02: Zero button spans 2 columns on bottom row
- [x] AC-03: Numbers 1-9 appear in order from bottom to top (1,2,3 on row 4; 4,5,6 on row 3; 7,8,9 on row 2)
- [x] AC-04: All existing frontend unit tests pass (20 tests)
- [x] AC-05: Frontend build succeeds

## Approach

- **Files that change** (and in what order):
  1. `repositories/iury-almeida/CalculatorAgent/client/src/components/Calculator.vue` - Reorder template buttons, update zero button CSS

- **Key decisions**:
  - Use standard calculator button layout (iOS/Android style)
  - Zero button spans 2 columns using `grid-column: span 2`
  - Operators distributed in rightmost column (÷, ×, −, +, =)
  - Clear button at top-left

- **Rejected alternatives**:
  - CSS grid-template-areas: More complex, template reorder is simpler
  - Adding spacer buttons: Unnecessary, zero span handles layout

- **Risks**:
  - Test selectors may break if they rely on button order — mitigation: tests use text content selectors, not position
  - Zero button span may affect mobile layout — mitigation: test responsive design

## Open questions

- None blocking
