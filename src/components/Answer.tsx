import styles from "@/styles/answer.module.css";
import AnswerModel from "@/model/answer";

interface AnswerProps {
  value: AnswerModel;
  index: number;
  letter: string;
  backgroundLetterColor: string;
  onResponse: (index: number) => void;
}

export function Answer({
  index,
  letter,
  value,
  backgroundLetterColor,
  onResponse,
}: AnswerProps) {
  const answer = value;
  const revealedAnswer = answer.revealed ? styles.revealedAnswer : "";
  return (
    <div className={styles.answer} onClick={() => onResponse(index)}>
      <div className={`${styles.contentAnswer} ${revealedAnswer}`}>
        <div className={styles.front}>
          <div
            className={styles.latter}
            style={{ backgroundColor: backgroundLetterColor }}
          >
            {letter}
          </div>
          <div className={styles.value}>{answer.value}</div>
        </div>
        <div className={styles.back}>
          {answer.right ? (
            <div className={styles.right}>
              <div>A resposta certa é...</div>
              <div className={styles.value}>{answer.value}</div>
            </div>
          ) : (
            <div className={styles.wrong}>
              <div>A resposta informada está errada...</div>
              <div className={styles.value}>{answer.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
