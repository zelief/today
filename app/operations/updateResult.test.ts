import { prisma } from '@app/db';

import { describe, expect, it } from '@jest/globals';
import { updateResult } from './updateResult';

describe('Update the result and the answers', () => {
  it('should error if invlaid answer id is found', async () => {
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

    const result = await prisma.result.create({
      data: {
        score: 0,
        answers: {
          createMany: {
            data: [
              {
                id: 101,
                questionId: 99,
                yes: false,
              },
              {
                id: 102,
                questionId: 100,
                yes: false,
              },
              {
                id: 103,
                questionId: 101,
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
});
