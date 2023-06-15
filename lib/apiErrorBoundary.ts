import type { NextApiRequest, NextApiResponse } from 'next';

export const apiErrorBoundary = (
  callback: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    callback(req, res).catch((e) => {
      console.log(e);
      res.status(500).json({ error: 'Something went wrong' });
    });
  };
};
