import Paragraph from '../Paragraph/Paragraph';
import styles from './InfoRow.module.css';

type InfoRowProps = {
  title: string;
  description: string;
  className?: string;
};

export default function InfoRow({
  title,
  description,
  className,
}: InfoRowProps) {
  return (
    <div className={`${styles.row} ${className}`}>
      <Paragraph size='xl'>
        <b>{title}</b>
      </Paragraph>
      <Paragraph>{description}</Paragraph>
    </div>
  );
}
