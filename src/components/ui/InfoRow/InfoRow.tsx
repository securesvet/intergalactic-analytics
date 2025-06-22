import Paragraph from '../Paragraph/Paragraph';
import styles from './InfoRow.module.css';

type InfoRowProps = {
  title: string;
  description: string;
}

export default function InfoRow({ title, description }: InfoRowProps) {
  return (
    <div className={styles.row}>
      <Paragraph size="xl">{title}</Paragraph>
      <Paragraph>{description}</Paragraph>
    </div>
  )
}

