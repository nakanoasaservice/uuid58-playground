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

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── index.tsx
```

- `src/routes`: Directory-based routing. The main page is implemented in `index.tsx`.
- `src/components`: Place for reusable UI components.
- `public`: Static assets (images, etc.).

## Development

This project uses [Qwik](https://qwik.dev/) and [Qwik Router](https://qwik.dev/docs/routing/), with [Bun](https://bun.sh/) as the package manager and runtime.

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

## Deployment

This site is deployed to GitHub Pages:

- [https://nakanoasaservice.github.io/uuid58-playground/](https://nakanoasaservice.github.io/uuid58-playground/)

## License

MIT
