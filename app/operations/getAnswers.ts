import prisma from '@app/db';

export async function getAnswers() {
  await prisma.answer.findMany();
  return 'yuhu';
}
