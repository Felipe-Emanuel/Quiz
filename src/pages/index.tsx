import { useEffect, useState } from "react";
import { Quiz } from "@/components/Quiz";
import { useRouter } from "next/router";
import QuestionModel from "@/model/question";

const BASE_URL = "http://localhost:3000/api";

export default function Home() {
  const [idQuestions, setIdQuestions] = useState<number[]>([]);
  const [question, setQuestion] = useState<QuestionModel>();
  const [answerRight, setAnswerRight] = useState<number>(0);

  const router = useRouter();

  async function loadIdQuestions() {
    const resp = await fetch(`${BASE_URL}/quiz`);
    const idQuestions = await resp.json();
    setIdQuestions(idQuestions);
  }

  async function loadIdQuestion(idQuestion: number) {
    const resp = await fetch(`${BASE_URL}/answers/${idQuestion}`);
    const json = await resp.json();
    const newQuestion = QuestionModel.fromObject(json);
    setQuestion(newQuestion);
  }

  useEffect(() => {
    loadIdQuestions();
  }, []);

  useEffect(() => {
    idQuestions.length > 0 && loadIdQuestion(idQuestions[0]);
  }, [idQuestions]);

  function questionAnswered(answeredQuestion: QuestionModel) {
    setQuestion(answeredQuestion);
    const hit = answeredQuestion.hit;
    setAnswerRight(answerRight + (hit ? 1 : 0));
  }

  function idNextSQuestion() {
    const nextIndex = idQuestions.indexOf(question!.id) + 1;
    return idQuestions[nextIndex];
  }

  function nextStep() {
    const nextId = idNextSQuestion();
    nextId ? goToNextQuestion(nextId) : endGame();
  }

  function goToNextQuestion(nextId: number) {
    loadIdQuestion(nextId);
  }

  function endGame() {
    router.push({
      pathname: "/result",
      query: {
        total: idQuestions.length,
        rights: answerRight,
      },
    });
  }

  return question ? (
    <Quiz
      question={question!}
      lastQuestion={idNextSQuestion() === undefined}
      questionAnswered={questionAnswered}
      nextStep={nextStep}
    />
  ) : false
}
