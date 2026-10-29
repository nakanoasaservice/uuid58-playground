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
├── index.html       # Page markup and Alpine directives
├── src/
│   ├── main.js      # Generation, conversion, and clipboard state
│   └── global.css   # Responsive styles
├── public/robots.txt
└── vite.config.js   # GitHub Pages base path
```

## Development

This project uses [Alpine.js](https://alpinejs.dev/) with plain HTML/CSS and
[Vite](https://vite.dev/) for development and static builds. Dependencies are
bundled locally; no runtime CDN is required for JavaScript.
[Bun](https://bun.sh/) is the package manager and runtime.

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

Check formatting and lint with `bun run fmt.check` and `bun run lint`.

## Deployment

This site is deployed to GitHub Pages:

- [https://nakanoasaservice.github.io/uuid58-playground/](https://nakanoasaservice.github.io/uuid58-playground/)

## License

MIT
