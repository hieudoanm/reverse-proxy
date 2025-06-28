/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Declare a route
fastify.get('/', async function handler(request) {
  const url = (request.query as { url: string }).url; // Get target URL from query parameter

  if (!url) {
    return { error: 'Missing target URL' };
  }

  try {
    const fetchOptions = {
      method: request.method,
      // headers: {
      //   ...request.headers,
      //   host: new URL(targetUrl).host, // Override host header
      // },
      body: ['GET', 'HEAD'].includes(request.method)
        ? null
        : (request.body as any),
    };

    // Fetch the response from the target URL
    const fetchResponse = await fetch(url, fetchOptions);
    const data = await fetchResponse.json();

    return data;
  } catch (error) {
    return { error: `Proxy Error: ${(error as Error).message}` };
  }
});

const PORT = 3000;

// Run the server!
const listen = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.info(`🚀 Reverse Proxy is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

listen();
