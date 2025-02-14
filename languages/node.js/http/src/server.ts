import http, { RequestOptions } from 'node:http';

const PORT: number = parseInt(process.env.PORT ?? '3000', 10) ?? 3000; // Port where the proxy will run

const server = http.createServer((request, response) => {
  const parsedUrl: URL = new URL(
    request.url ?? '',
    `http://${request.headers.host}`,
  );
  const targetUrl: string | null = parsedUrl.searchParams.get('url'); // Extract target URL from query param
  console.info('Target URL: ', targetUrl);

  if (!targetUrl) {
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end('Missing "url" query parameter');
    return;
  }

  try {
    // Validate URL
    const target: URL = new URL(targetUrl); // Validate URL

    // Set up the request options
    const requestOptions: RequestOptions = {
      hostname: target.hostname,
      port: target.port || 80, // Default to HTTP port
      path: target.pathname + target.search,
      method: request.method,
      // headers: request.headers,
    };
    console.info('Request Options: ', requestOptions);

    // Make the request to the target server
    const proxy = http.request(requestOptions, (targetResponse) => {
      // Copy response headers from target
      response.writeHead(
        targetResponse.statusCode ?? 500,
        targetResponse.headers,
      );
      // Pipe the response from the target to the client
      targetResponse.pipe(response);
    });

    // Handle errors
    proxy.on('error', (proxyError: Error) => {
      console.error('Proxy error:', proxyError);
      response.writeHead(500);
      response.end('Internal Server Error');
    });

    // Pipe the request body to the target server
    request.pipe(proxy);
  } catch (error) {
    console.error(error);
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end('Invalid URL');
  }
});

// Start the proxy server
server.listen(PORT, () => {
  console.log(`Reverse Proxy Server is running on http://localhost:${PORT}`);
});
