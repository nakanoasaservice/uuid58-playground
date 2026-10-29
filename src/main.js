import Alpine from "alpinejs";
import {
  uuid58,
  uuid58Decode,
  uuid58DecodeSafe,
  uuid58EncodeSafe,
} from "@nakanoaas/uuid58";
import "./global.css";

Alpine.data("playground", () => ({
  fields: [
    { key: "encoded", label: "Encoded (UUID58 Format):" },
    { key: "decoded", label: "Decoded (UUID Format):" },
  ],
  ids: { encoded: "", decoded: "" },
  error: null,
  copyStatus: "Copy",
  copyTimer: null,

  init() {
    this.generate();
  },
  generate() {
    this.ids.encoded = uuid58();
    this.ids.decoded = uuid58Decode(this.ids.encoded);
    this.error = null;
  },
  convert(field, value) {
    this.ids[field] = value;
    const decoding = field === "encoded";
    const result = decoding ? uuid58DecodeSafe(value) : uuid58EncodeSafe(value);
    this.error =
      typeof result === "string"
        ? null
        : { field, name: result.name, message: result.message };
    if (!this.error) this.ids[decoding ? "decoded" : "encoded"] = result;
  },
  async copy() {
    clearTimeout(this.copyTimer);
    try {
      await navigator.clipboard.writeText("npm i @nakanoaas/uuid58");
      this.copyStatus = "Copied!";
    } catch {
      this.copyStatus = "Copy failed";
    }
    this.copyTimer = setTimeout(() => {
      this.copyStatus = "Copy";
    }, 2000);
  },
}));

Alpine.start();
