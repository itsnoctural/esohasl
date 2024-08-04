import { createHighlighterCore } from "shiki";
import getWasm from "shiki/wasm";

const highlighter = await createHighlighterCore({
  themes: [
    import("shiki/themes/dark-plus.mjs"),
    import("shiki/themes/light-plus.mjs"),
  ],
  langs: [import("shiki/langs/luau.mjs")],
  loadWasm: getWasm,
});

export async function highlight(code: string) {
  return highlighter.codeToHtml(code, {
    lang: "luau",
    themes: {
      light: "light-plus",
      dark: "dark-plus",
    },
  });
}
