import { createSignal, For, onCleanup, Show } from "solid-js";
import { render } from "solid-js/web";
import { uuid58, uuid58Decode, uuid58DecodeSafe, uuid58EncodeSafe } from "@nakanoaas/uuid58";
import "./global.css";

type Field = "encoded" | "decoded";
type ConversionError = { field: Field; name: string; message: string };
const fields: { key: Field; label: string }[] = [
  { key: "encoded", label: "Encoded (UUID58 Format):" },
  { key: "decoded", label: "Decoded (UUID Format):" },
];

function Playground() {
  const initial = uuid58();
  const [ids, setIds] = createSignal({ encoded: initial, decoded: uuid58Decode(initial) });
  const [error, setError] = createSignal<ConversionError>();
  const [copyStatus, setCopyStatus] = createSignal("Copy");
  let copyTimer: ReturnType<typeof setTimeout> | undefined;
  onCleanup(() => clearTimeout(copyTimer));

  function generate() {
    const encoded = uuid58();
    setIds({ encoded, decoded: uuid58Decode(encoded) });
    setError(undefined);
  }

  function convert(field: Field, value: string) {
    const decoding = field === "encoded";
    const result = decoding ? uuid58DecodeSafe(value) : uuid58EncodeSafe(value);
    setIds((previous) => ({
      ...previous,
      [field]: value,
      ...(typeof result === "string" ? { [decoding ? "decoded" : "encoded"]: result } : {}),
    }));
    setError(
      typeof result === "string"
        ? undefined
        : { field, name: result.name, message: result.message },
    );
  }

  async function copy() {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText("npm i @nakanoaas/uuid58");
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Copy failed");
    }
    copyTimer = setTimeout(() => setCopyStatus("Copy"), 2000);
  }

  return (
    <main>
      <header>
        <h1>UUID58 Playground</h1>
        <p>
          UUID58 is a Base58 encoding of the 128-bit UUID binary data, resulting in a shorter,
          URL-safe string representation.
        </p>
        <div class="install">
          <code>npm i @nakanoaas/uuid58</code>
          <button type="button" onClick={copy} aria-label="Copy to clipboard">
            {copyStatus()}
          </button>
        </div>
        <nav aria-label="Package links">
          <a
            href="https://github.com/nakanoasaservice/uuid58"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="https://jsr.io/@nakanoaas/uuid58" target="_blank" rel="noopener noreferrer">
            <img src="https://jsr.io/badges/@nakanoaas/uuid58" width="75" height="20" alt="JSR" />
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
        </nav>
      </header>
      <div class="generate">
        <button type="button" onClick={generate}>
          Generate
        </button>
        <p>Using crypto.getRandomValues() internally</p>
      </div>
      <For each={fields}>
        {(field) => (
          <section>
            <label for={`${field.key}-input`}>{field.label}</label>
            <input
              type="text"
              id={`${field.key}-input`}
              value={ids()[field.key]}
              onInput={(event) => convert(field.key, event.currentTarget.value)}
              spellcheck={false}
              autocomplete="off"
              autocapitalize="off"
              aria-invalid={error()?.field === field.key}
              aria-describedby={error()?.field === field.key ? `${field.key}-error` : undefined}
            />
            <Show when={error()?.field === field.key && error()}>
              {(issue) => (
                <div class="error" id={`${field.key}-error`} role="alert">
                  <strong>{issue().name}</strong>
                  <p>{issue().message}</p>
                </div>
              )}
            </Show>
          </section>
        )}
      </For>
    </main>
  );
}

const root = document.getElementById("app");
if (!root) throw new Error("Missing app root");
render(() => <Playground />, root);
