/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', async function handler(request) {
  const targetUrl = (request.query as { target: string }).target; // Get target URL from query parameter

  if (!targetUrl) {
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
    const response = await fetch(targetUrl, fetchOptions).then((response) =>
      response.json(),
    );

    return response;
  } catch (error) {
    return { error: `Proxy Error: ${(error as Error).message}` };
  }
});

// Run the server!
const listen = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

listen();
