import { defineConfig } from "vite-plus";

const ignorePatterns = ["dist/**", "server/**", "tmp/**", ".serena/**"];

export default defineConfig({
  base: "/uuid58-playground/",
  lint: { ignorePatterns, options: { typeAware: true, typeCheck: true } },
  fmt: { ignorePatterns },
});
