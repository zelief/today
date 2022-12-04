import { updateResult } from '@app/operations/updateResult';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const score = await updateResult(req.body);

  res.status(200).json({ score });
}
