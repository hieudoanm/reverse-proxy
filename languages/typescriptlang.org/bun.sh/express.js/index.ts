import type { Request, Response } from 'express';
import express from 'express';

const app = express();

app.get('/', async (request: Request, response: Response) => {
  const url: string = request.query.url as string;
  console.info('url', url);

  if (!url) {
    response.status(400).send('Missing URL');
    return;
  }

  try {
    const fetchOptions = {
      method: request.method,
      // headers: {
      //   ...request.headers,
      //   host: new URL(targetUrl).host, // Override host header
      // },
      body: ['GET', 'HEAD'].includes(request.method) ? null : request.body,
    };

    // Fetch the response from the target URL
    const fetchResponse = await fetch(url, fetchOptions);
    const data = await fetchResponse.json();

    response.json(data);
  } catch (error) {
    response.status(500).send(`Proxy Error: ${(error as Error).message}`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Reverse proxy running on http://localhost:${PORT}`);
});
