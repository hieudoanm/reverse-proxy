// main.ts

// Import Deno's serve function
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

// Define a handler for incoming requests
serve(async (req) => {
  const { searchParams } = new URL(req.url);

  // Get the target URL from query parameter `url`
  const targetUrl = searchParams.get('url');
  if (!targetUrl) {
    return new Response('Missing `url` query parameter', { status: 400 });
  }

  try {
    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    // Return the target response to the client
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (err) {
    console.error(err);
    return new Response('Error fetching target URL', { status: 500 });
  }
});
