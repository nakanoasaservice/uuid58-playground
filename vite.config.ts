import { defineConfig } from "vite-plus";

import solid from "vite-plugin-solid";

const ignorePatterns = ["dist/**", "server/**", "tmp/**", ".serena/**"];

export default defineConfig({
  plugins: [solid()],
  base: "/uuid58-playground/",
  lint: { ignorePatterns, options: { typeAware: true, typeCheck: true } },
  fmt: { ignorePatterns },
});
