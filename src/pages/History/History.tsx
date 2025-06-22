import { Button, Paragraph } from "../../components/ui";
import { File, TrashCan, Smile, SmileSad } from "../../components/ui/icons";
import { useFileStore } from "../../store";

import styles from "./History.module.css";

export default function History() {
  const deleteHistoryRow = useFileStore((state) => state.deleteHistoryRow);
  const history = useFileStore((state) => state.history);
  const clearHistory = useFileStore((state) => state.clearHistory);
  console.log(history)
  return (
    <div className={styles.main}>
      {history ?
        history.map(({ id, ...historyData }) => (
          <div key={id} className={styles.flex}>
            <HistoryRow {...historyData} />
            <Button color="white" onClick={() => deleteHistoryRow(id)}>
              <TrashCan />
            </Button>
          </div>
        )) : <Paragraph size="xl">Нет истории файлов</Paragraph>}
      <Paragraph size="xl">Нет истории файлов</Paragraph>
      <div>
        <Button color="white" onClick={() => clearHistory()}>
          <TrashCan />
        </Button>
      </div>
    </div>
  );
}

export function HistoryRow({
  name,
  date,
  isSuccessfull,
}: {
  name: string;
  date: Date;
  isSuccessfull: boolean;
}) {
  return (
    <ul className={styles.row}>
      <li className={styles["row--item"]}>
        <File /> {name}
      </li>
      <li className={styles["row--item"]}>{date.toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })}</li>
      <li
        className={`${styles["row--item"]} ${isSuccessfull ? "" : styles.disabled}`}
      >
        Обработан успешно <Smile />
      </li>
      <li
        className={`${styles["row--item"]} ${isSuccessfull ? styles.disabled : ""}`}
      >
        Не удалось обработать <SmileSad />
      </li>
    </ul>
  );
}
