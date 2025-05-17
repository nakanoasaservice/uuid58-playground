import { component$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import { uuid58, uuid58Decode, uuid58DecodeSafe, uuid58EncodeSafe } from "@nakanoaas/uuid58";


export default component$(() => {
  useStyles$(`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: sans-serif;
    }
    
    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 2rem;
      color: #333;
      text-align: center;
    }
    
    .input-group {
      margin-bottom: 1.5rem;
    }
    
    .label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #555;
    }
    
    .input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 1rem;
    }
    
    .input:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
    }
    
    .error {
      color: #e53e3e;
      font-style: italic;
    }
  `);

  const encodedId = useSignal("");
  const decodedId = useSignal("");

  useTask$(() => {
    const encoded = uuid58()
    const decoded = uuid58Decode(encoded)
    encodedId.value = encoded
    decodedId.value = decoded
  })

  const encodedError = useSignal(false);
  const decodedError = useSignal(false);

  return (
    <div class="container">
      <h1 class="title">UUID58 Encode/Decode Playground</h1>
      
      <div class="input-group">
        <label class="label">Encoded Value (UUID58):</label>
        <input 
          type="text" 
          class={`input ${encodedError.value ? 'error' : ''}`}
          value={encodedId.value} 
          onInput$={(_, el) => {
            const result = uuid58DecodeSafe(el.value);
            if (result instanceof Error) {
              decodedId.value = result.message;
              decodedError.value = true;
            } else {
              decodedId.value = result;
              decodedError.value = false;
            }
          }}
        />
      </div>

      <div class="input-group">
        <label class="label">Decoded Value (Binary Representation):</label>
        <input 
          type="text" 
          class={`input ${decodedError.value ? 'error' : ''}`}
          value={decodedId.value} 
          onInput$={(_, el) => {
            const result = uuid58EncodeSafe(el.value);
            if (result instanceof Error) {
              encodedId.value = result.message;
              encodedError.value = true;
            } else {
              encodedId.value = result;
              encodedError.value = false;
            }
          }}
        />
      </div>
    </div>
  );
});
