import { component$, isDev } from "@qwik.dev/core";
import { RouterOutlet, useQwikRouter } from "@qwik.dev/router";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  useQwikRouter();

  /**
   * The root of a QwikRouter site contains the document's `<head>` and `<body>`.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </>
  );
});
