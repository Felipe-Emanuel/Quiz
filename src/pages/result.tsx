import styles from "@/styles/results.module.css";
import { Estatistic } from "@/components/Estatistic";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";

export default function Result() {
  const router = useRouter();

  const total = +router.query.total!;
  const rights = +router.query.rights!;
  const percentual = Math.round((rights / total) * 100);

  return (
    <div className={styles.results}>
      <h1>Resultado Final</h1>
      <div style={{ display: "flex" }}>
        <Estatistic text="Perguntas" value={total} />
        <Estatistic text="Certas" value={rights} backgroundColor="#9cd2a4" />
        <Estatistic
          text="Percentual"
          value={`${percentual}%`}
          backgroundColor="#de6a33"
        />
      </div>
      <Button href="/" text="Tentar Novamente"/>
    </div>
  );
}
