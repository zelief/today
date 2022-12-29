import { prisma } from '@app/db';
import { beforeEach } from '@jest/globals';

beforeEach(async () => {
  const deleteAnswers = prisma.answer.deleteMany();
  const deleteResults = prisma.result.deleteMany();
  const deleteQuestions = prisma.question.deleteMany();
  return await prisma.$transaction([deleteAnswers, deleteResults, deleteQuestions]);
});
