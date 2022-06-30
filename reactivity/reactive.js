import { mutableHandlers } from "./baseHandlers.js";

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

function createActiveObject(raw, baseHandle) {
  return new Proxy(raw, baseHandle);
}
