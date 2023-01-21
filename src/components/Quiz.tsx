import QuestionModel from "@/model/question";
import styles from "@/styles/quiz.module.css";
import { Button } from "./Button";
import { Question } from "./Question";

interface QuizProps {
  question: QuestionModel;
  lastQuestion: boolean;
  questionAnswered: (question: QuestionModel) => void;
  nextStep: () => void;
}

export function Quiz({
  question,
  lastQuestion,
  nextStep,
  questionAnswered,
}: QuizProps) {
  function questionProvider(index: number) {
    if (question.notAnswered) {
      questionAnswered(question.answerWith(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {question ? (
        <Question
          value={question}
          timeToAnswer={20}
          onResponse={questionProvider}
          timeEnd={nextStep}
        />
      ) : (
        false
      )}
      <Button
        onClick={nextStep}
        text={lastQuestion ? "Finalizar" : "Próxima"}
      />
    </div>
  );
}
