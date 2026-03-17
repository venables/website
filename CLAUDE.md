# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Tech Stack

This is an **Astro** website with the following key technologies:

- **Astro 5** with SSG (Static Site Generation)
- **TypeScript** with strict configuration
- **Tailwind CSS v4** for styling
- **MDX** for content authoring
- **Cloudflare** for deployment
- **pnpm** as package manager

## Development Commands

**Primary commands:**

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm check` - Run all quality checks (format, lint, typecheck, test)
- `pnpm fix` - Auto-fix formatting and linting issues

**Quality assurance:**

- `pnpm format` - Format code with oxfmt
- `pnpm format:check` - Check formatting without changes
- `pnpm lint` - Lint with oxlint
- `pnpm typecheck` - TypeScript type checking
- `pnpm test` - Run tests

**Utilities:**

- `pnpm clean` - Clean build artifacts
- `pnpm nuke` - Clean everything including node_modules
- `pnpm outdated` - Interactive dependency updates

## Architecture & Structure

**Content Management:**

- Blog posts live in `content/<slug>/post.md` with colocated images
- Content collections defined in `src/content.config.ts` using Astro's glob
  loader
- RSS schema validation for all posts
- OG images generated at build time via `src/pages/og/[id].png.ts`

**Layouts:**

- `src/layouts/_root.astro` - Base HTML layout
- `src/layouts/layout.astro` - Main page layout
- `src/layouts/markdown-layout.astro` - For MDX/Markdown content
- Layout props typed in `src/layouts/_root.types.ts`

**Key Directories:**

- `src/components/` - Astro components organized by feature
  - `analytics/` - Google Analytics and PostHog
  - `articles/` - Blog post listing and display
  - `layout/` - Header, footer, theme toggle
- `src/lib/` - Utilities and business logic
  - `utils.ts` - Tailwind class merging utility
- `src/config/site.ts` - Site configuration and metadata
- `src/pages/` - File-based routing (includes API routes)

**Styling:**

- Uses Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Custom fonts loaded via Fontsource
- Theme toggle for dark/light mode
- Typography plugin for markdown content

**Path Aliases:**

- `@/*` maps to `src/*` (configured in tsconfig.json)

## Development Notes

**Content Creation:**

- Create a new directory `content/<slug>/` with a `post.md` file inside
- Colocate images alongside `post.md` in the same directory
- Add `ogImage: <filename>` to frontmatter for social card images
- Posts automatically appear in listings via content collections

**Component Development:**

- Follow existing Astro component patterns
- Use TypeScript for prop typing
- Utilize the `cn()` utility for conditional Tailwind classes

**Testing:**

- Tests should be co-located with components or in dedicated test files

**Code Quality:**

- All code is formatted with oxfmt and linted with oxlint
- TypeScript strict mode enabled
- Run `pnpm check` before committing changes
