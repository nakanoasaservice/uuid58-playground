import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  uuid58,
  uuid58Decode,
  uuid58DecodeSafe,
  uuid58EncodeSafe,
} from "@nakanoaas/uuid58";

export default component$(() => {
  const encodedId = useSignal("");
  const decodedId = useSignal("");
  const isError = useSignal(false);

  const generate = $(() => {
    const encoded = uuid58();
    const decoded = uuid58Decode(encoded);
    encodedId.value = encoded;
    decodedId.value = decoded;

    isError.value = false;
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
          class={`w-full border p-3 ${isError.value ? "border-red-500" : "border-gray-300"} rounded-md font-mono text-base focus:ring-2 focus:ring-blue-400 focus:outline-none`}
          value={encodedId.value}
          onInput$={(_, el) => {
            const result = uuid58DecodeSafe(el.value);
            if (result instanceof Error) {
              decodedId.value = result.message;
              isError.value = true;
            } else {
              decodedId.value = result;
              isError.value = false;
            }
          }}
        />
      </div>

      <div class="mb-6">
        <label class="mb-2 block font-medium text-gray-700">
          Decoded Value (Binary Representation):
        </label>
        <input
          type="text"
          class={`w-full border p-3 ${isError.value ? "border-red-500" : "border-gray-300"} rounded-md font-mono text-base focus:ring-2 focus:ring-blue-400 focus:outline-none`}
          value={decodedId.value}
          onInput$={(_, el) => {
            const result = uuid58EncodeSafe(el.value);
            if (result instanceof Error) {
              encodedId.value = result.message;
              isError.value = true;
            } else {
              encodedId.value = result;
              isError.value = false;
            }
          }}
        />
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
