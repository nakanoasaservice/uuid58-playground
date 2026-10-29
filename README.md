# UUID58 Playground

[Live Demo on GitHub Pages](https://nakanoasaservice.github.io/uuid58-playground/)

---

UUID58 Playground is a web application for encoding and decoding UUIDs using the UUID58 format.

- **UUID58** is a Base58 encoding of the 128-bit UUID binary data, resulting in a shorter, URL-safe string representation.
- This playground allows you to easily convert between standard UUIDs and UUID58 format.
- Internally, UUID58 generation uses `crypto.getRandomValues()`.

## Features

- Generate a new random UUID and see its UUID58 encoding
- Convert from UUID58 to standard UUID format and vice versa
- Error handling with clear messages and visual cues
- Responsive design for both desktop and mobile devices
- Links to [JSR](https://jsr.io/@nakanoaas/uuid58), [npm](https://www.npmjs.com/package/@nakanoaas/uuid58), and [GitHub](https://github.com/nakanoasaservice/uuid58)

## Live Demo

You can try the playground here:

👉 [https://nakanoasaservice.github.io/uuid58-playground/](https://nakanoasaservice.github.io/uuid58-playground/)

## Project Structure

```text
├── index.html       # Page metadata and app mount point
├── src/
│   ├── main.tsx     # Typed UI, conversion, and clipboard state
│   └── global.css   # Responsive styles
├── public/robots.txt
└── vite.config.ts   # Build, lint, and formatting configuration
```

## Development

This project uses [Solid.js](https://www.solidjs.com/) with TSX and plain CSS and
[Vite+](https://viteplus.dev/) for development, builds, formatting, linting, and
TypeScript checking. UI expressions and event handlers are written in TypeScript. Dependencies are
bundled locally; no runtime CDN is required for JavaScript.
[Bun](https://bun.sh/) is the package manager and script runtime (`bunfig.toml`
enables `run.bun`). Run `mise install` to install Bun. No separate Node.js setup
or global Vite+ installation is needed for the commands below.

To start development:

```bash
bun install
bun start
```

## Build & Preview

To build and preview the production version locally:

```bash
bun run build
bun run preview
```

Run `bun run check` for formatting, lint, and TypeScript checks together.
Run `bun run fmt` to format files. These share `vite.config.ts`; `tsconfig.json`
controls strict TypeScript checking, including TSX expressions and event handlers.

When upgrading Vite+, keep the `vite` override aligned with `vite-plus` and the
`vitest` override aligned with the bundled version (`bunx --no-install vp toolchain vitest`).

## Deployment

This site is deployed to GitHub Pages:

- [https://nakanoasaservice.github.io/uuid58-playground/](https://nakanoasaservice.github.io/uuid58-playground/)

## License

MIT
