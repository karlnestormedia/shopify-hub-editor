import { createFileRoute } from "@tanstack/react-router";

// TEMPORÄR: rapporterar scroll-läget från förhandsvisningen så att tröskeln för
// den klibbiga förbeställ-listen kan sättas exakt. Tas bort strax efteråt.
const KEY = "__folditScroll";

type Ping = {
  y: number;
  top: number;
  bottom: number;
  vh: number;
  max: number;
  at: number;
};

function num(params: URLSearchParams, key: string) {
  const raw = Number(params.get(key) ?? "0");
  return Number.isFinite(raw) ? Math.round(raw) : 0;
}

export const Route = createFileRoute("/api/public/scroll")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        if (params.get("y") === null) {
          return Response.json((globalThis as Record<string, unknown>)[KEY] ?? null);
        }
        (globalThis as Record<string, unknown>)[KEY] = {
          y: num(params, "y"),
          top: num(params, "top"),
          bottom: num(params, "bottom"),
          vh: num(params, "vh"),
          max: num(params, "max"),
          at: Date.now(),
        } satisfies Ping;
        return new Response("ok");
      },
    },
  },
});
