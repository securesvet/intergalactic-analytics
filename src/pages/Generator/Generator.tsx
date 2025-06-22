import { ButtonUpload, Paragraph } from "../../components/ui";
import { useState } from "react";
import styles from "./Generator.module.css";
import { useFileStore } from "../../store";

export default function Generator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const generateFile = useFileStore((state) => state.generateFile);

  const handleClick = async () => {
    setIsLoading(true);
    await generateFile({ size: 1 });
  };
  return (
    <div className={`${styles.flex} ${styles.main}`}>
      <Paragraph size="xl">
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </Paragraph>
      <ButtonUpload isLoading={isLoading} onClick={handleClick} size="xl">
        <b>Начать генерацию</b>
      </ButtonUpload>
    </div>
  );
}
