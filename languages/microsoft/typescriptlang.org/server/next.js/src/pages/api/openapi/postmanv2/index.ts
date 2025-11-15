import type { NextApiRequest, NextApiResponse } from 'next';
import { convert } from 'openapi-to-postmanv2';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST')
    return response.status(405).end('Method Not Allowed');

  const { content } = request.body;

  if (!content || typeof content !== 'string') {
    return response.status(400).json({ error: 'Missing or invalid content' });
  }

  convert({ type: 'string', data: content }, {}, (err, result) => {
    if (err || !result?.result) {
      return response
        .status(500)
        .json({ error: 'Conversion failed', detail: err });
    }

    return response.status(200).json(result.output[0].data);
  });
}
