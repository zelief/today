import { prismaMock } from '../prismaMock';
import { describe, expect, test } from '@jest/globals';
import { getAnswers } from './getAnswers';
import { any } from 'jest-mock-extended';
import { Question, Result } from '@prisma/client';

describe('Get answers operation', () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().slice(0, 10);

  test('it should create new result if the result of current date is not exist', async () => {
    const questions: Question[] = [
      {
        id: 1,
        question: 'question 1',
        value: 4,
      },
      {
        id: 2,
        question: 'question 2',
        value: 4,
      },
      {
        id: 3,
        question: 'question 3',
        value: 4,
      },
    ];

    const result: Result = {
      createdAt: new Date(),
      id: 19,
      score: 0,
    };

    prismaMock.result.findFirst.calledWith(any()).mockResolvedValue(null);
    prismaMock.question.findMany.calledWith().mockResolvedValue(questions);
    prismaMock.result.create.calledWith(any()).mockResolvedValue(result);

    await getAnswers();

    expect(
      prismaMock.result.findFirst.calledWith({
        where: { createdAt: { gte: todayDate, lt: tomorrowDate } },
      })
    ).toBeCalled();

    expect(prismaMock.result.create).toBeCalledTimes(1);
    expect(
      prismaMock.answer.createMany.calledWith({
        data: [
          { questionId: questions[0].id, resultId: result.id, yes: false },
          { questionId: questions[1].id, resultId: result.id, yes: false },
          { questionId: questions[2].id, resultId: result.id, yes: false },
        ],
      })
    ).toBeCalledTimes(1);
  });
});
