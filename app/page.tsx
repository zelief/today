import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const allQuestions = await prisma.question.findMany();

  console.log(allQuestions);
  return (
    <div>
      {allQuestions.map((q) => (
        <p key={q.id}>{q.question}</p>
      ))}
    </div>
  );
}
