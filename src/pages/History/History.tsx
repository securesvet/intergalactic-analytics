import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Paragraph } from '../../components/ui';
import { File, TrashCan, Smile, SmileSad } from '../../components/ui/icons';
import { useFileStore } from '../../store';
import { ModalWithStats } from '../Modal/Modal.tsx';

import styles from './History.module.css';

export default function History() {
  const navigate = useNavigate();
  const deleteHistoryRow = useFileStore((state) => state.deleteHistoryRow);
  const history = useFileStore((state) => state.history);
  const clearHistory = useFileStore((state) => state.clearHistory);
  const statsHistory = useFileStore((state) => state.statsHistory);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (statsHistory) {
      setShowModal(true);
    }
  }, [statsHistory]);

  const hasHistory = history && history.length > 0;

  return (
    <div className={styles.main}>
      {showModal && <ModalWithStats onClose={() => setShowModal(false)} />}

      {hasHistory ? (
        history.map(({ id, ...historyData }) => (
          <div key={id} className={styles.flex}>
            <HistoryRow {...historyData} onClick={() => setShowModal(historyData.isSuccessfull)} />
            <Button color='white' onClick={() => deleteHistoryRow(id)}>
              <TrashCan />
            </Button>
          </div>
        ))
      ) : (
        <Paragraph size='xl'>Нет истории файлов</Paragraph>
      )}

      <div className={styles.buttons}>
        <Button size='xl' onClick={() => navigate('/')}>
          <b>Сгенерировать больше</b>
        </Button>
        {hasHistory && (
          <Button color='black' size='xl' onClick={clearHistory}>
            <b className={styles.white}>Очистить всё</b>
          </Button>
        )}
      </div>
    </div>
  );
}

export function HistoryRow({
  name,
  date,
  isSuccessfull,
  onClick
}: {
  name: string;
  date: Date;
  isSuccessfull: boolean;
  onClick?: () => void;
}) {
  return (
    <ul className={styles.row} onClick={onClick} style={{ cursor: isSuccessfull ? 'pointer' : 'default' }}>
      <li className={styles['row--item']}>
        <File /> {name}
      </li>
      <li className={styles['row--item']}>
        {new Date(date).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </li>
      <li
        className={`${styles['row--item']} ${isSuccessfull ? '' : styles.disabled}`}
      >
        Обработан успешно <Smile />
      </li>
      <li
        className={`${styles['row--item']} ${isSuccessfull ? styles.disabled : ''}`}
      >
        Не удалось обработать <SmileSad />
      </li>
    </ul>
  );
}
