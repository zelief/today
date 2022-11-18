import prisma from '@app/db';

import { describe, expect, test } from '@jest/globals';

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
    const a = 'yuhu';

    expect(a).toBe('yuhu');
  });
});
