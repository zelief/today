import { prisma } from '@app/db';

import { describe, expect, test } from '@jest/globals';
import { getAnswers } from './getAnswers';

describe('Get answers operation', () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().slice(0, 10);

  test('it should create new result if the result of current date is not exist', async () => {
    await prisma.question.createMany({
      data: [
        {
          question: 'question 1',
          value: 4,
        },
        {
          question: 'question 2',
          value: 4,
        },
        {
          question: 'question 3',
          value: 4,
        },
      ],
    });

    await getAnswers();

    const result = await prisma.result.findMany();
    const answers = await prisma.answer.findMany();
    const questions = await prisma.question.findMany();

    expect(result).toHaveLength(1);
    expect(answers).toHaveLength(3);
    expect(answers[0].resultId).toBe(result[0].id);
    expect(answers[1].resultId).toBe(result[0].id);
    expect(answers[2].resultId).toBe(result[0].id);
    expect(answers[0].questionId).toBe(questions[0].id);
    expect(answers[1].questionId).toBe(questions[1].id);
    expect(answers[2].questionId).toBe(questions[2].id);
  });
});
