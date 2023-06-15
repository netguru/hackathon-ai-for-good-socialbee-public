import type { NextApiRequest, NextApiResponse } from 'next';

import { openAiCall } from '@/lib/openAiCall';
import { apiErrorBoundary } from '@/lib/apiErrorBoundary';

export default apiErrorBoundary(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body;

  if (!body.input_text) {
    res.status(400).json({ error: 'Missing body: input_text' });
    return;
  }

  if (!body.language) {
    res.status(400).json({ error: 'Missing body: language' });
    return;
  }

  const language = String(body.language);
  if (!['English', 'German'].includes(language)) {
    res.status(400).json({ error: 'Incorrect language' });
    return;
  }

  const inputText = String(body.input_text);
  const message = await openAiCall({
    message: inputText,
    language,
  });

  res.status(200).json({ data: message });
});
