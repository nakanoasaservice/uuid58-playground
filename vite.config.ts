import { defineConfig } from "vite-plus";

import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  base: "/uuid58-playground/",
  lint: { options: { typeAware: true, typeCheck: true } },
});
