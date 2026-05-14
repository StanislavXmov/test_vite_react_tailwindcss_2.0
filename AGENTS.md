# Developer Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (binds to all network interfaces via `--host`) |
| `npm run build` | Run `tsc -b` then `vite build` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

# Project Structure

- Entry point: `src/main.tsx`
- UI components: `src/components/ui/` (shadcn/ui with `base-vega` style, lucide icons)
- Utilities: `src/lib/utils.ts`
- Path alias: `@` maps to `./src`

# Key Configurations

- **Tailwind CSS v4**: Uses `@tailwindcss/vite` plugin (no `tailwind.config.js`)
- **TypeScript**: Strict mode via `tsconfig.app.json`
- **Build**: Typecheck (`tsc -b`) is part of the build script, not separate

# Notes

- Dev server exposes on all interfaces (`--host` flag)
- No CI/CD or pre-commit hooks configured