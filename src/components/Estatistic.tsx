import styles from "@/styles/estatistic.module.css";

interface EstatisticProps {
  value: any;
  text: string;
  backgroundColor?: string;
  fontColor?: string;
}

export function Estatistic({
  value,
  text,
  backgroundColor,
  fontColor,
}: EstatisticProps) {
  return (
    <div className={styles.estatistic}>
      <div
        className={styles.value}
        style={{
          backgroundColor: backgroundColor ?? "#fdd60f",
          color: fontColor ?? "#333",
        }}
      >
        {value}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
