import prisma from '@app/db';

export async function getAnswers() {
  const result = await getTodayResult();

  if (result == null) {
    const result = await prisma.result.create({ data: { score: 0 } });
    const questions = await prisma.question.findMany();
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
  const todayDate = new Date().toISOString().slice(0, 10);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().slice(0, 10);

  return await prisma.result.findFirst({
    where: { createdAt: { gte: todayDate, lt: tomorrowDate } },
    include: {
      answers: { include: { question: { select: { question: true } } } },
    },
  });
}
