# test_vite_react_tailwindcss_2.0

## Tests

- `pnpm test` — run unit and component tests once with Vitest.
- `pnpm test:watch` — run Vitest in watch mode.
- `pnpm test:coverage` — generate a coverage report in `coverage/`.
- `pnpm test:e2e` — run Playwright end-to-end tests in Chromium.
- `pnpm test:e2e:headed` — run Playwright with a visible browser.
- `pnpm test:e2e:ui` — open Playwright UI mode.

Shared test setup lives in `src/test/`. Add API handlers to
`src/test/mocks/handlers.ts`; MSW starts automatically for every Vitest test.
End-to-end tests live in `e2e/`.
