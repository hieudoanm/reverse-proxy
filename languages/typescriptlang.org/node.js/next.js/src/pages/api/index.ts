/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@reverse-proxy/utils/log';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Reverse proxy to a target URL
 *     description: Forwards the request to the URL specified in the `url` query parameter and returns the response.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The full URL to proxy the request to.
 *     responses:
 *       200:
 *         description: Successful response from the proxied URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing or invalid `url` query parameter
 *       500:
 *         description: Internal server error while proxying
 */

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const { method = '' } = request;

  // Handle CORS preflight request
  if (method === 'OPTIONS') {
    return response.status(200).end();
  }

  const targetUrl: string = request.query.url as string;
  const decodedUrl: string = decodeURI(targetUrl);
  logger.info(`decodedUrl=${decodedUrl}`);

  if (!targetUrl) {
    return response.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const headers = { ...request.headers, host: undefined };
    const proxyResponse = await fetch(targetUrl, {
      method,
      headers: headers as any,
      body: ['GET', 'HEAD'].includes(method || '') ? undefined : request.body,
    });

    const contentType = proxyResponse.headers.get('content-type');
    response.status(proxyResponse.status);

    if (contentType?.includes('application/json')) {
      const data = await proxyResponse.json();
      response.json(data);
    } else {
      const text = await proxyResponse.text();
      response.send(text);
    }
  } catch (err: any) {
    response.status(500).json({ error: 'Proxy failed', details: err.message });
  }
};

export default handler;
