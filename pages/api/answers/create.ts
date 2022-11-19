import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const

    const score = calculateScore()

  const result = await prisma.result.create({
    data: {},
  });
    
  await prisma.answer.create({
    data: {},
  });
  res.status(200).json({ name: 'John Doe' });
}

function calculateScore() {
    return 10 * 10;
}

