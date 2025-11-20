/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@reverse-proxy/utils/log';
import { tryCatch } from '@reverse-proxy/utils/try-catch';
import type { NextApiRequest, NextApiResponse } from 'next';

const enableCors = (response: NextApiResponse) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  response.setHeader('Access-Control-Expose-Headers', '*');
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  // Always set CORS headers
  enableCors(response);

  const { method = '' } = request;

  // Handle CORS preflight request
  if (method === 'OPTIONS') {
    return response.status(200).end();
  }

  const targetUrl: string = request.query.url as string;
  if (!targetUrl) {
    return response
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  const decodedUrl: string = decodeURI(targetUrl);
  logger.info(`decodedUrl=${decodedUrl}`);

  const body = ['GET', 'HEAD'].includes(method || '')
    ? undefined
    : request.body;
  const { data: fetchResponse, error } = await tryCatch(
    fetch(targetUrl, { method, body })
  );

  if (error) {
    logger.error(`Proxy request failed: ${error.message}`);
    return response
      .status(500)
      .json({ error: 'Proxy request failed', details: error.message });
  }

  if (!fetchResponse?.ok) {
    logger.error(`Proxy response not ok: ${fetchResponse?.statusText}`);
    return response
      .status(fetchResponse?.status || 500)
      .json({ error: 'Proxy response not ok' });
  }

  const contentType = fetchResponse.headers.get('content-type');
  response.status(fetchResponse.status);

  if (contentType?.includes('application/json')) {
    const { data, error } = await tryCatch(fetchResponse.json());
    if (error) {
      logger.error(`Failed to parse JSON response: ${error.message}`);
      return response.status(500).json({
        error: 'Failed to parse JSON response',
        details: error.message,
      });
    }
    if (!data) {
      return response
        .status(500)
        .json({ error: 'No data returned from proxy' });
    }
    response.json(data);
  } else {
    const { data: text, error } = await tryCatch(fetchResponse.text());
    if (error) {
      logger.error(`Failed to read text response: ${error.message}`);
      return response.status(500).json({
        error: 'Failed to read text response',
        details: error.message,
      });
    }
    if (!text) {
      return response
        .status(500)
        .json({ error: 'No text returned from proxy' });
    }
    response.send(text);
  }
};

export default handler;
