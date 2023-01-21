import styles from "@/styles/timer.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface TimerProps {
  key: any;
  duration: number;
  timeEnd: () => void;
}

export function Timer({ duration,key, timeEnd }: TimerProps) {
  return (
    <div className={styles.timer}>
      <CountdownCircleTimer
        duration={duration}
        size={120}
        isPlaying
        onComplete={timeEnd}
        colors={["#bce596", "#f7b801", "#ed827a", "#f32011"]}
        colorsTime={[10, 7, 3, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
