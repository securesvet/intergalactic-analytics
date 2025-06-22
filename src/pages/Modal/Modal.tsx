import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { useFileStore } from '../../store';
import { InfoRow } from '../../components/ui';
import { Button } from '../../components/ui';
import { Close } from '../../components/ui/icons';

const valueToDescription: Record<string, string> = {
  total_spend_galactic: 'общие расходы в галактических кредитах',
  rows_affected: 'количество обработанных записей',
  less_spent_at: 'день года с минимальными расходами',
  big_spent_at: 'день года с максимальными расходами',
  big_spent_value: 'максимальная сумма расходов за день',
  average_spend_galactic: 'средние расходы в галактических кредитах',
  big_spent_civ: 'цивилизация с максимальными расходами',
  less_spent_civ: 'цивилизация с минимальными расходами',
};

export function ModalWithStats({ onClose }: { onClose: () => void }) {
  const { statsHistory } = useFileStore();

  if (!statsHistory) return null;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.statsGrid}>
            {Object.entries(statsHistory).map(([key, value]) => {
              if (!valueToDescription[key]) return;
              return (
                <InfoRow
                  className={styles.inforow}
                  key={key}
                  title={String(
                    typeof value === 'string' ? value : Math.floor(value),
                  )}
                  description={valueToDescription[key] || key}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button color='black' onClick={onClose}>
        <Close />
      </Button>
    </div>,
    document.body,
  );
}
