import styles from "@/styles/button.module.css";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  text: string;
  onClick?: (e: any) => void;
}

export function Button({ href, text, onClick }: ButtonProps) {
  function renderButton() {
    return (
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    );
  }

  return (
    <>
      {href ? (
        <Link href={href}>
          <>{renderButton()}</>
        </Link>
      ) : (
        renderButton()
      )}
    </>
  );
}
