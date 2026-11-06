import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";

export async function render(path: string) {
  const context: Record<string, any> = {};
  let failure: unknown;
  const stream = await renderToReadableStream(
    <HelmetProvider context={context}><ThemeProvider><StaticRouter location={path}><App /></StaticRouter></ThemeProvider></HelmetProvider>,
    { onError(error) { failure = error; } },
  );
  await stream.allReady;
  if (failure) throw failure;
  const html = await new Response(stream).text();
  const helmet = context.helmet;
  return { html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(item => item.toString()).join("\n") };
}
