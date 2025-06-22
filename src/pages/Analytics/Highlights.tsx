import { Paragraph, InfoRow } from "../../components/ui";
import { useFileStore } from "../../store";
import styles from "./Higlights.module.css";

export default function Highlights() {
  const { statsHistory } = useFileStore();

  const valueToDescription: Record<string, string> = {
    total_spend_galactic: "общие расходы в галактических кредитах",
    rows_affected: "количество обработанных записей",
    less_spent_at: "день года с минимальными расходами",
    big_spent_at: "день года с максимальными расходами",
    big_spent_value: "максимальная сумма расходов за день",
    average_spend_galactic: "средние расходы в галактических кредитах",
    big_spent_civ: "цивилизация с максимальными расходами",
    less_spent_civ: "цивилизация с минимальными расходами",
  };

  return (
    <div className={`${statsHistory ? styles.grid : styles.flex} ${styles.main}`}>
      {statsHistory ? (
        Object.entries(statsHistory).map(([key, value]) => {
          if (!valueToDescription[key]) return;
          const description = valueToDescription[key] || key;
          const displayValue = typeof value === "number" ? Math.floor(value) : value;
          return (
            <InfoRow key={key} title={String(displayValue)} description={description} />
          );
        })
      ) : (
        <Paragraph className={styles.p} size="xxl">
          Здесь появятся хайлайты
        </Paragraph>
      )}
    </div>
  );
}
