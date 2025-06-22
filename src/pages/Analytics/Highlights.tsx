import { Paragraph } from "../../components/ui";
import styles from "./Higlights.module.css";

export default function Highlights() {
  return (
    <div className={`${styles.flex} ${styles.main}`}>
      <Paragraph className={styles.p} size="xxl">
        Здесь появятся хайлайты
      </Paragraph>
    </div>
  );
}
