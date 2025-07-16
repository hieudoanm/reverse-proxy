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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const targetUrl: string = req.query.url as string;
  const decodedUrl: string = decodeURI(targetUrl);
  logger.info(`decodedUrl=${decodedUrl}`);

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const proxyRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined,
      } as any,
      body: ['GET', 'HEAD'].includes(req.method || '') ? undefined : req.body,
    });

    const contentType = proxyRes.headers.get('content-type');
    res.status(proxyRes.status);

    if (contentType?.includes('application/json')) {
      const data = await proxyRes.json();
      res.json(data);
    } else {
      const text = await proxyRes.text();
      res.send(text);
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
};

export default handler;
