// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse<string>): void => {
  res.statusCode = 200;
  res.json('John Doe');
};

export default handler;
