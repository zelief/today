import { PrismaClient } from '@prisma/client';
import { Questions } from './components/questions';

const prisma = new PrismaClient();

export default async function Home() {
  const result = await prisma.result.create({ data: { score: 0 } });
  const allQuestions = await prisma.question.findMany();
  const answers = [];
  allQuestions.forEach

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
        <Questions questions={allQuestions} />
      </div>
    </div>
  );
}
