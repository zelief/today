type NewResult = {
  id: number;
  answers: {
    id: number;
    yes: boolean;
  }[];
};

export async function updateResult(newResult: NewResult) {
  throw new Error('Result id is invalid');
}
