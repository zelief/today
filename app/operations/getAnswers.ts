import { prisma } from '@app/db';

export async function getAnswers() {
  const result = await getTodayResult();

  if (result == null) {
    const result = await prisma.result.create({ data: { score: 0 } });
    const questions = await prisma.question.findMany();

    if (questions.length == 0) {
      throw new Error('Question not found');
    }

    await prisma.answer.createMany({
      data: questions.map((q) => ({
        resultId: result.id,
        questionId: q.id,
        yes: false,
      })),
    });
  }

  return await getTodayResult();
}

async function getTodayResult() {
  const today = new Date().setHours(0, 0, 0, 0);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return await prisma.result.findFirst({
    where: { createdAt: { gte: new Date(today), lt: new Date(tomorrow) } },
    include: {
      answers: { include: { question: { select: { question: true } } } },
    },
  });
}
