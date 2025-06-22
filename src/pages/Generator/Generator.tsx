import { ButtonUpload, Paragraph } from "../../components/ui";
import { useState } from "react";
import styles from "./Generator.module.css";
import { useFileStore } from "../../store";

export default function Generator() {
  const [isLoading, setIsLoading] = useState(false);
  const generateFileLink = useFileStore((state) => state.generateFileLink); // not generateFileLink
  const delay = 5000;

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(generateFileLink({ size: 0.01 }), { method: "GET" });

      if (!response.ok) {
        throw new Error("Ошибка при генерации файла");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv";
      document.body.appendChild(a);

      a.click();

      a.addEventListener("click", () => {
        console.log("Download started...");
      });

      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, delay);
    } catch (error) {
      alert("Не удалось скачать файл. Проверьте соединение или повторите попытку.");
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.flex} ${styles.main}`}>
      <Paragraph size="xl">
        Сгенерируйте готовый CSV-файл нажатием одной кнопки
      </Paragraph>
      <ButtonUpload isLoading={isLoading} onClick={handleClick} size="xl">
        <b>Начать генерацию</b>
      </ButtonUpload>
    </div>
  );
}
