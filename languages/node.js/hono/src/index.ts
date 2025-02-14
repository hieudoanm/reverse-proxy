import { Hono } from 'hono';

const app = new Hono();

app.all('*', async (context) => {
  const targetUrl = context.req.query('target');

  if (!targetUrl) {
    return context.text('Missing target URL', 400);
  }

  try {
    const url = new URL(targetUrl);
    // const requestHeaders = new Headers(context.req.raw.headers);

    // Forward the request to the target URL
    const response = await fetch(url.toString(), {
      method: context.req.method,
      // headers: reqHeaders,
      body: context.req.method !== 'GET' ? context.req.raw.body : undefined,
    });

    // Return the proxied response
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return context.json(
      { error: `Proxy Error: ${(error as Error).message}` },
      500,
    );
  }
});

export default app;
