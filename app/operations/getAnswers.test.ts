import { prismaMock } from '../prismaMock'; 
import { describe, expect, test } from '@jest/globals';
import { getAnswers } from './getAnswers';

describe('Get answers operation', () => {
  test('it should create new result if the result of current date is not exist', () => {
    getAnswers();
    expect(prismaMock.answer.findMany).toBeCalled();
    expect(prismaMock.result.create).not.toBeCalled();
  });
});
