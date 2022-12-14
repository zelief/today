import { prisma } from '@app/db';

import { describe, expect, it } from '@jest/globals';
import { getResult } from './getAnswers';

describe('Get answers operation', () => {
  it('should create new result if the result of current date is not exist', async () => {
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

    await getResult();

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

  it('should throw error if questions is empty', async () => {
    await expect(getResult()).rejects.toThrow('Question not found');
  });

  it('should not create new result if the result of current date is exist', async () => {
    await prisma.question.createMany({
      data: [
        {
          id: 99,
          question: 'question 1',
          value: 4,
        },
        {
          id: 100,
          question: 'question 2',
          value: 4,
        },
        {
          id: 101,
          question: 'question 3',
          value: 4,
        },
      ],
    });

    await prisma.result.create({
      data: {
        score: 0,
        answers: {
          createMany: {
            data: [
              {
                questionId: 99,
                yes: false,
              },
              {
                questionId: 100,
                yes: false,
              },
              {
                questionId: 101,
                yes: false,
              },
            ],
          },
        },
      },
    });

    await getResult();

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
