import { Button } from "../../components/ui";
import { File, TrashCan, Smile, SmileSad } from "../../components/ui/icons";
import { useFileStore } from "../../store";

import styles from "./History.module.css";

export default function History() {
  const deleteHistoryRow = useFileStore((state) => state.deleteHistoryRow);
  const histories = [
    {
      id: 0,
      fileName: "file1.csv",
      date: "22.04.2024",
      successfull: false,
    },
    {
      id: 1,
      fileName: "file2.csv",
      date: "22.05.2024",
      successfull: true,
    },
    {
      id: 2,
      fileName: "file3.csv",
      date: "22.06.2024",
      successfull: false,
    },
  ];
  return (
    <div className={styles.main}>
      {histories.map(({ id, ...historyData }) => (
        <div key={id} className={styles.flex}>
          <HistoryRow {...historyData} />
          <Button color="white" onClick={() => deleteHistoryRow(id)}>
            <TrashCan />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function HistoryRow({
  fileName,
  date,
  successfull,
}: {
  fileName: string;
  date: string;
  successfull: boolean;
}) {
  return (
    <ul className={styles.row}>
      <li className={styles["row--item"]}>
        <File /> {fileName}
      </li>
      <li className={styles["row--item"]}>{date}</li>
      <li
        className={`${styles["row--item"]} ${successfull ? "" : styles.disabled}`}
      >
        Обработан успешно <Smile />
      </li>
      <li
        className={`${styles["row--item"]} ${successfull ? styles.disabled : ""}`}
      >
        Не удалось обработать <SmileSad />
      </li>
    </ul>
  );
}
