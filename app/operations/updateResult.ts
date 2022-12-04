import { prisma } from '@app/db';

type NewResult = {
  id: number;
  answers: {
    id: number;
    yes: boolean;
  }[];
};

export async function updateResult(newResult: NewResult) {
  const result = await prisma.result.findUnique({
    where: { id: newResult.id },
    include: { answers: { include: { question: true } } },
  });

  if (result == null) {
    throw new Error('Result is not found');
  }

  let score = 0;
  const totalValues = result.answers.reduce((accumulator, obj) => {
    return accumulator + obj.question.value;
  }, 0);

  for await (const newAnswer of newResult.answers) {
    const oldAnswer = result.answers.find(
      (answer) => answer.id == newAnswer.id
    );

    if (!oldAnswer) {
      throw new Error('Answer id is invalid');
    }

    if (newAnswer.yes) {
      score += Math.round((oldAnswer.question.value / totalValues) * 100);
      await prisma.answer.update({
        where: { id: newAnswer.id },
        data: { yes: true },
      });
    }
  }

  await prisma.result.update({ where: { id: newResult.id }, data: { score } });

  return score;
}
