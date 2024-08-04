import { highlight } from "@/lib/shiki";

export async function CodeHighlight({ code }: { code: string }) {
  const html = await highlight(code);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
