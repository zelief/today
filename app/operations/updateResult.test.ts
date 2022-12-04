import { prisma } from '@app/db';

import { describe, expect, it, beforeEach } from '@jest/globals';

import { updateResult } from './updateResult';

describe('Update the result and the answers', () => {
  const questions = [
    {
      id: 99,
      question: 'question 1',
      value: 3,
    },
    {
      id: 100,
      question: 'question 2',
      value: 2,
    },
    {
      id: 101,
      question: 'question 3',
      value: 5,
    },
  ];

  beforeEach(async () => {
    await prisma.question.createMany({
      data: questions,
    });
  });

  it('should error if invalid answer id is found', async () => {
    const result = await prisma.result.create({
      data: {
        score: 0,
        answers: {
          createMany: {
            data: [
              {
                id: 101,
                questionId: questions[0].id,
                yes: false,
              },
              {
                id: 102,
                questionId: questions[1].id,
                yes: false,
              },
              {
                id: 103,
                questionId: questions[2].id,
                yes: false,
              },
            ],
          },
        },
      },
    });

    const newResult = {
      id: result.id,
      answers: [
        { id: 101, yes: true },
        { id: 102, yes: true },
        { id: 104, yes: true },
      ],
    };

    await expect(updateResult(newResult)).rejects.toThrow(
      'Answer id is invalid'
    );
  });

  it('should error if result is not found', async () => {
    const newResult = {
      id: 88,
      answers: [
        { id: 101, yes: true },
        { id: 102, yes: true },
        { id: 103, yes: false },
      ],
    };

    await expect(updateResult(newResult)).rejects.toThrow(
      'Result is not found'
    );
  });

  it('should save the score and answers correctly', async () => {
    const result = await prisma.result.create({
      data: {
        score: 0,
        answers: {
          createMany: {
            data: [
              {
                id: 101,
                questionId: questions[0].id,
                yes: false,
              },
              {
                id: 102,
                questionId: questions[1].id,
                yes: false,
              },
              {
                id: 103,
                questionId: questions[2].id,
                yes: false,
              },
            ],
          },
        },
      },
    });

    const newResult = {
      id: result.id,
      answers: [
        { id: 101, yes: true },
        { id: 102, yes: true },
        { id: 103, yes: false },
      ],
    };

    await updateResult(newResult);

    const resultAfter = await prisma.result.findUnique({
      where: { id: newResult.id },
      include: { answers: { select: { id: true, yes: true } } },
    });

    expect(resultAfter?.score).toBe(50); // score = sum of the yes answers' question's value divided by sum of questions' value in percent
    expect(resultAfter?.answers[0].yes).toBe(true);
    expect(resultAfter?.answers[1].yes).toBe(true);
    expect(resultAfter?.answers[2].yes).toBe(false);
  });
});
