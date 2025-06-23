import { tryCatch } from "./try-catch.ts";

const port = 3000;

Bun.serve({
  port,
  hostname: "0.0.0.0",

  async fetch(req) {
    const url = new URL(req.url);

    // ✅ Only accept /api
    if (!url.pathname.startsWith("/api")) {
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Get ?url= from query param
    const target = url.searchParams.get("url");
    if (!target) {
      return new Response(
        JSON.stringify({ error: "Missing ?url= parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`🔀 Proxying request to: ${target}`);

    const { data: response, error } = await tryCatch(
      fetch(target, {
        method: req.method,
        body:
          req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      })
    );

    if (error) {
      console.error("❌ Proxy fetch failed:", error);
      return new Response(JSON.stringify({ error }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!response) {
      return new Response(JSON.stringify({ error: "Invalid Data" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error: jsonError } = await tryCatch(response.json());

    if (jsonError) {
      console.error("❌ JSON parse failed:", jsonError);
      return new Response(JSON.stringify({ error: jsonError }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  },
});

console.log(
  `✅ Reverse proxy server is running at http://localhost:${port}/api`
);
