import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { uuid58, uuid58Decode, uuid58DecodeSafe, uuid58EncodeSafe } from "@nakanoaas/uuid58";


export default component$(() => {
  const encodedId = useSignal("");
  const decodedId = useSignal("");
  const isError = useSignal(false);

  const generate = $(() => {
    const encoded = uuid58()
    const decoded = uuid58Decode(encoded)
    encodedId.value = encoded
    decodedId.value = decoded

    isError.value = false
  })


  useTask$(() => {
    generate()
  })

  return (
    <div class="max-w-3xl mx-auto p-8 font-sans">
      <h1 class="text-2xl font-bold mb-8 text-center text-gray-800">UUID58 Encode/Decode Playground</h1>

      <div class="mb-6 flex justify-center">
        <button 
          onClick$={generate}
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          Generate New UUID
        </button>
      </div>
      
      <div class="mb-6">
        <label class="block mb-2 font-medium text-gray-700">Encoded Value (UUID58):</label>
        <input 
          type="text" 
          class={`w-full p-3 border ${isError.value ? 'border-red-500' : 'border-gray-300'} rounded-md font-mono text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
        <label class="block mb-2 font-medium text-gray-700">Decoded Value (Binary Representation):</label>
        <input 
          type="text" 
          class={`w-full p-3 border ${isError.value ? 'border-red-500' : 'border-gray-300'} rounded-md font-mono text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
