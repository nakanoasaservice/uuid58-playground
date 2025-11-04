import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  uuid58,
  uuid58Decode,
  Uuid58DecodeError,
  uuid58DecodeSafe,
  Uuid58EncodeError,
  uuid58EncodeSafe,
} from "@nakanoaas/uuid58";

interface ErrorStore {
  type: "encode" | "decode" | null;
  name: string;
  message: string;
  clear: (this: ErrorStore) => void;
  setError: (
    this: ErrorStore,
    result: Uuid58EncodeError | Uuid58DecodeError,
  ) => void;
}

export default component$(() => {
  const encodedId = useSignal("");
  const decodedId = useSignal("");
  const copied = useSignal(false);
  const error = useStore<ErrorStore>({
    type: null,
    name: "",
    message: "",

    clear: $(function (this: ErrorStore) {
      this.type = null;
      this.name = "";
      this.message = "";
    }),

    setError: $(function (
      this: ErrorStore,
      result: Uuid58EncodeError | Uuid58DecodeError,
    ) {
      this.type = result instanceof Uuid58EncodeError ? "encode" : "decode";
      this.name = result.name;
      this.message = result.message;
    }),
  });

  const generate = $(() => {
    const encoded = uuid58();
    const decoded = uuid58Decode(encoded);
    encodedId.value = encoded;
    decodedId.value = decoded;

    error.clear();
  });

  const copyToClipboard = $(async () => {
    try {
      await navigator.clipboard.writeText("npm i @nakanoaas/uuid58");
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    generate();
  });

  return (
    <div class="mx-auto max-w-3xl px-3 py-6 font-sans sm:p-8">
      <h1 class="mb-6 text-center text-xl font-bold text-gray-800 sm:mb-8 sm:text-2xl">
        UUID58 Playground
      </h1>

      <div class="mb-6 text-center">
        <p class="text-xs text-gray-700 sm:text-sm">
          UUID58 is a Base58 encoding of the 128-bit UUID binary data, resulting
          in a shorter, URL-safe string representation.
        </p>
        <div class="mt-4 flex items-center justify-center">
          <div class="relative inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 font-mono text-xs text-gray-800 sm:px-5 sm:py-3 sm:text-sm">
            <span class="mr-2 text-gray-500">&gt;</span>
            <span>npm i @nakanoaas/uuid58</span>
            <button
              onClick$={copyToClipboard}
              class="ml-3 flex items-center justify-center rounded p-1 transition-colors hover:bg-gray-200"
              aria-label="Copy to clipboard"
            >
              {copied.value ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-green-600"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-600"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-3">
          <a
            href="https://github.com/nakanoasaservice/uuid58"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-800 transition-colors hover:text-gray-600"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://jsr.io/@nakanoaas/uuid58"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://jsr.io/badges/@nakanoaas/uuid58"
              width="75"
              height="20"
              alt="JSR"
            />
          </a>
          <a
            href="https://badge.fury.io/js/@nakanoaas%2Fuuid58"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://badge.fury.io/js/@nakanoaas%2Fuuid58.svg"
              width="126"
              height="20"
              alt="npm version"
            />
          </a>
        </div>
      </div>

      <div class="mb-6 flex flex-col items-center justify-center">
        <button
          onClick$={generate}
          class="touch-manipulation rounded-md bg-blue-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-800"
        >
          Generate
        </button>
        <p class="mt-2 text-xs text-gray-700">
          Using crypto.getRandomValues() internally
        </p>
      </div>

      <div class="mb-6">
        <label
          for="encoded-input"
          class="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
        >
          Encoded (UUID58 Format):
        </label>
        <input
          type="text"
          id="encoded-input"
          spellcheck={false}
          class={`w-full overflow-x-auto rounded-md border p-2 font-mono text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:p-3 sm:text-base ${
            error.type === "decode"
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
          value={encodedId.value}
          onInput$={(_, el) => {
            const result = uuid58DecodeSafe(el.value);
            if (result instanceof Uuid58DecodeError) {
              error.setError(result);
            } else {
              decodedId.value = result;
              error.clear();
            }
          }}
        />
        {error.type === "decode" && (
          <div class="mt-2 rounded-md border border-red-400 bg-red-100 p-2 text-sm text-red-700 sm:p-3">
            <p class="font-medium">{error.name}</p>
            <p>{error.message}</p>
          </div>
        )}
      </div>

      <div class="mb-6">
        <label
          for="decoded-input"
          class="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
        >
          Decoded (UUID Format):
        </label>
        <input
          type="text"
          id="decoded-input"
          spellcheck={false}
          class={`w-full overflow-x-auto rounded-md border p-2 font-mono text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:p-3 sm:text-base ${
            error.type === "encode"
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
          value={decodedId.value}
          onInput$={(_, el) => {
            const result = uuid58EncodeSafe(el.value);
            if (result instanceof Uuid58EncodeError) {
              error.setError(result);
            } else {
              encodedId.value = result;
              error.clear();
            }
          }}
        />
        {error.type === "encode" && (
          <div class="mt-2 rounded-md border border-red-400 bg-red-100 p-2 text-sm text-red-700 sm:p-3">
            <p class="font-medium">{error.name}</p>
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "UUID58 Playground",
  meta: [
    {
      name: "description",
      content:
        "Convert between UUID58 (Base58-encoded UUIDs) and standard UUID formats",
    },
  ],
};
