import { Button, ButtonUpload, Paragraph } from '../../components/ui';
import { Close } from '../../components/ui/icons';
import { useState } from 'react';
import styles from './Generator.module.css';
import { useFileStore } from '../../store';

export default function Generator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const generateFileLink = useFileStore((state) => state.generateFileLink); // not generateFileLink
  const delay = 5000;

  const handleClick = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(generateFileLink({ size: 0.01 }), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Ошибка при генерации файла');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv';
      document.body.appendChild(a);

      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, delay);
    } catch (error) {
      console.error('Download failed:', error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsDone(true);
    }
  };

  return (
    <div className={`${styles['flex-col']} ${styles.main}`}>
      <Paragraph size='xl'>
        Сгенерируйте готовый CSV-файл нажатием одной кнопки
      </Paragraph>
      <div className={styles.flex}>
        <ButtonUpload
          isLoading={isLoading}
          onClick={handleClick}
          size='xl'
          color={`${error ? 'orange' : 'green'}`}
        >
          {error ? 'Ошибка' : isDone ? 'Done' : <b>Начать генерацию</b>}
        </ButtonUpload>
        {error ||
          (isDone && (
            <Button
              color='black'
              onClick={() => {
                setError(false);
                setIsDone(false);
              }}
            >
              <Close />
            </Button>
          ))}
      </div>
      {error && <Paragraph size='xl'>упс, не то...</Paragraph>}
      {isDone && <Paragraph size='xl'>файл сгенерирован!</Paragraph>}
    </div>
  );
}
