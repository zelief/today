'use client';

import { Prisma, Question } from '@prisma/client';
import { useState } from 'react';

export function Questions({ questions }: { questions: Question[] }) {
  const [questionIdx, setQuestionIdx] = useState(0);

  return (
    <>
      <h5 className="mb-1 text-xl text-gray-900 dark:text-white">
        Apakah hari ini kamu <strong>{questions[questionIdx].question}</strong>?
      </h5>
      <div className="flex mt-4 space-x-3 md:mt-6">
        <button className="inline-flex items-center py-2 px-8 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Ya
        </button>
        <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
          Tidak
        </button>
      </div>
    </>
  );
}
