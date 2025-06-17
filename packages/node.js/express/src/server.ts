import express, { Request, Response } from 'express';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const targetUrl: string = req.query.target as string;

  if (!targetUrl) {
    res.status(400).send('Missing target URL');
    return;
  }

  try {
    const fetchOptions = {
      method: req.method,
      // headers: {
      //   ...request.headers,
      //   host: new URL(targetUrl).host, // Override host header
      // },
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
    };

    // Fetch the response from the target URL
    const response = await fetch(targetUrl, fetchOptions).then((response) =>
      response.json(),
    );

    res.json(response);
  } catch (error) {
    res.status(500).send(`Proxy Error: ${(error as Error).message}`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Reverse proxy running on http://localhost:${PORT}`);
});
