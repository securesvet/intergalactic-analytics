import { Paragraph, InfoRow } from '../../components/ui';
import { useFileStore } from '../../store';
import styles from './Higlights.module.css';
import { valueToDescription } from '../../utils';

export default function Highlights() {
  const { statsHistory } = useFileStore();

  return (
    <div
      className={`${statsHistory ? styles.grid : styles.flex} ${styles.main}`}
    >
      {statsHistory ? (
        Object.entries(statsHistory).map(([key, value]) => {
          if (!valueToDescription[key]) return;
          const description = valueToDescription[key] || key;
          const displayValue =
            typeof value === 'number' ? Math.floor(value) : value;
          return (
            <InfoRow
              key={key}
              title={String(displayValue)}
              description={description}
            />
          );
        })
      ) : (
        <Paragraph className={styles.p} size='xxl'>
          Здесь появятся хайлайты
        </Paragraph>
      )}
    </div>
  );
}
