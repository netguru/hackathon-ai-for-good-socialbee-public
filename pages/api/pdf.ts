import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import pdf from 'pdf-parse';
import formidable from 'formidable';

import { openAiCall } from '@/lib/openAiCall';
import { apiErrorBoundary } from '@/lib/apiErrorBoundary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiErrorBoundary(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.query.language) {
    res.status(400).json({ error: 'Missing parameter: language' });
    return;
  }

  const language = String(req.query.language);
  if (!['English', 'German'].includes(language)) {
    res.status(400).json({ error: 'Incorrect language' });
    return;
  }

  const { files } = await parseForm(req);

  // @ts-ignore - type bug
  const pdfFile = fs.readFileSync(files.file.filepath);
  const parsedPdf = await pdf(pdfFile);
  const message = await openAiCall({ message: parsedPdf.text, language });

  res.status(200).json({ data: message });
});

const parseForm = async (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable();

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
