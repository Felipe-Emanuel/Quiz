// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import questions from "../questionsBank";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const selectedId = +req.query.id!;

  const uniqQuestion = questions.filter(
    (question) => question.id === selectedId
  );

  if (uniqQuestion.length === 1) {
    const selectedQuestion = uniqQuestion[0].shuffleAnswer();
    res.status(200).json(selectedQuestion.toObject());
  } else {
    res.status(204).send("No Question Selected");
  }
}
