import { ButtonUpload, Paragraph } from '../../components/ui';
import DragAndDrop from './DragAndDrop';
import styles from './Analytics.module.css';
import Highlights from './Highlights';
import { useFileStore } from '../../store';

export default function Analytics() {
  const file = useFileStore();
  return (
    <div>
      <div className={`${styles.flex} ${styles.main}`}>
        <Paragraph size='xl'>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за сверхнизкое время
        </Paragraph>
        <DragAndDrop />
        {!file.isError && (
          <ButtonUpload
            disabled={!file.loaded}
            isLoading={file.isLoadingAnalytics}
            onClick={() => {
              file.sendFile({ rows: 10000 });
            }}
            size='xxl'
          >
            <b>Отправить</b>
          </ButtonUpload>
        )}
      </div>
      <Highlights />
    </div>
  );
}
