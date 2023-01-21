import styles from "@/styles/question.module.css";
import QuestionModel from "@/model/question";
import { Answer } from "./Answer";
import { Timer } from "./Timer";
import { Statement } from "./Statement";

const letters = [
  { value: "A", color: "#f2c866" },
  { value: "B", color: "#f266ba" },
  { value: "C", color: "#85d4f2" },
  { value: "D", color: "#bce596" },
];

interface QuestionProps {
  value: QuestionModel;
  timeToAnswer?: number;
  onResponse: (index: number) => void;
  timeEnd: () => void;
}

export function Question({
  timeToAnswer,
  value,
  onResponse,
  timeEnd,
}: QuestionProps) {
  const question = value;

  function renderAnswer() {
    return question.answer.map((answer, i) => {
      return (
        <Answer
          key={`${question.id}-${i}`}
          value={answer}
          index={i}
          letter={letters[i].value}
          backgroundLetterColor={letters[i].color}
          onResponse={onResponse}
        />
      );
    });
  }

  return (
    <div className={styles.question}>
      <Statement text={question.statement} />
      <Timer
        key={question.id}
        duration={timeToAnswer ?? 10}
        timeEnd={timeEnd}
      />
      {renderAnswer()}
    </div>
  );
}
