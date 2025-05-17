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
  type: "encode" | "decode" | "";
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
  const error = useStore({
    type: "" as "encode" | "decode" | "",
    name: "",
    message: "",

    clear: $(function (this: ErrorStore) {
      this.type = "";
      this.message = "";
      this.name = "";
    }),

    setError: $(function (
      this: ErrorStore,
      result: Uuid58EncodeError | Uuid58DecodeError,
    ) {
      this.type = result instanceof Uuid58EncodeError ? "encode" : "decode";
      this.message = result.message;
      this.name = result.constructor.name;
    }),
  });

  const generate = $(() => {
    const encoded = uuid58();
    const decoded = uuid58Decode(encoded);
    encodedId.value = encoded;
    decodedId.value = decoded;

    error.clear();
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    generate();
  });

  return (
    <div class="mx-auto max-w-3xl p-8 font-sans">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">
        UUID58 Encode/Decode Playground
      </h1>

      <div class="mb-6 flex justify-center">
        <button
          onClick$={generate}
          class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          Generate New UUID
        </button>
      </div>

      <div class="mb-6">
        <label class="mb-2 block font-medium text-gray-700">
          Encoded Value (UUID58):
        </label>
        <input
          type="text"
          class={`w-full rounded-md border p-3 font-mono text-base focus:ring-2 focus:ring-blue-400 focus:outline-none ${
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
          <div class="mt-2 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
            <p class="font-medium">{error.name}</p>
            <p>{error.message}</p>
          </div>
        )}
      </div>

      <div class="mb-6">
        <label class="mb-2 block font-medium text-gray-700">
          Decoded Value (Binary Representation):
        </label>
        <input
          type="text"
          class={`w-full rounded-md border p-3 font-mono text-base focus:ring-2 focus:ring-blue-400 focus:outline-none ${
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
          <div class="mt-2 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
            <p class="font-medium">{error.name}</p>
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
