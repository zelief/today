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
    include: { answers: true },
  });

  if (result == null) {
    throw new Error('Result is not found');
  }

  const validAnswerIds = result?.answers.map((answer) => answer.id);

  newResult.answers.forEach((answer) => {
    if (!validAnswerIds.includes(answer.id)) {
      throw new Error('Answer id is invalid');
    }
  });
}
