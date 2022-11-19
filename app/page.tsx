import { PrismaClient } from '@prisma/client';
import { Questions } from './components/questions';
import { getResult } from './operations/getAnswers';

const prisma = new PrismaClient();

export default async function Home() {
  const result = await getResult();

  if (!result?.answers) {
    throw new Error("Answers not found")
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
        <Questions result={result} />
      </div>
    </div>
  );
}
