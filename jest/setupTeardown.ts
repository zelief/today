import { prisma } from '@app/db';
import { beforeEach, afterAll } from '@jest/globals';

beforeEach(async () => {
  const deleteAnswers = prisma.answer.deleteMany();
  const deleteResults = prisma.result.deleteMany();
  const deleteQuestions = prisma.question.deleteMany();
  await prisma.$transaction([deleteAnswers, deleteResults, deleteQuestions]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
