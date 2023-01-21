import { NextApiRequest, NextApiResponse } from "next"
import questions from "../questionsBank"
import { Shuffle } from "@/functions/arrays"

export default (req: NextApiRequest, res: NextApiResponse) => {
    const ids = questions.map(question => question.id)
    res.status(200).json(Shuffle(ids))
}