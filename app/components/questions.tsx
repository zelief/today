'use client';

import { getResult } from '@app/operations/getAnswers';
import { ButtonHTMLAttributes, useState } from 'react';

export function Questions({
  result,
}: {
  result: NonNullable<Awaited<ReturnType<typeof getResult>>>;
}) {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<boolean>>([]);
  const [allAnswered, setAllAnswered] = useState(false);
  const [score, setScore] = useState<number>();

  const answer = (isTrue: boolean) => {
    let newAnswer = answers;
    newAnswer[questionIdx] = isTrue;
    setAnswers(newAnswer);
    if (questionIdx == result.answers.length - 1) {
      setAllAnswered(true);
      return;
    }

    setQuestionIdx(questionIdx + 1);
  };

  const submitAnswers = async () => {
    const finalAnswers = result.answers.map((answer, index) => ({
      id: answer.id,
      yes: answers[index],
    }));

    const res = await fetch(`/api/result/${result.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: result.id, answers: finalAnswers }),
    });

    const data = await res.json();

    setScore(data.score);
  };

  if (score) {
    return (
      <div>
        <div className="text-center">
          Your score: <span>{score}</span>
        </div>
      </div>
    );
  }

  if (allAnswered) {
    return (
      <div>
        <div className="text-center mb-3">Submit answers?</div>
        <button
          onClick={submitAnswers}
          className="w-full py-2 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center p-8">
        <h5 className="mb-1 text-xl text-gray-900 dark:text-white">
          Apakah hari ini kamu{' '}
          <strong>{result.answers[questionIdx].question.question}</strong>?
        </h5>
        <div className="flex w-full mt-4 space-x-3 md:mt-6">
          <AnswerButton
            onClick={() => answer(true)}
            isActive={answers[questionIdx]}
          >
            Ya
          </AnswerButton>
          <AnswerButton
            onClick={() => answer(false)}
            isActive={answers[questionIdx] === false}
          >
            Tidak
          </AnswerButton>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {questionIdx == 0 ? (
          <div></div>
        ) : (
          <button onClick={() => setQuestionIdx(questionIdx - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-indigo-600 hover:text-indigo-800 active:text-indigo-800"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
        )}
        <div>
          {questionIdx + 1}/{result.answers.length}
        </div>
      </div>
    </>
  );
}

const AnswerButton: React.FC<
  { isActive: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ isActive, onClick, children }) => {
  if (isActive) {
    return (
      <button
        onClick={onClick}
        className="w-full py-2 items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="w-full py-2 items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
    >
      {children}
    </button>
  );
};
