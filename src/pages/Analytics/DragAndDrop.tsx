import { useState, useRef } from "react";
import styles from "./DragAndDrop.module.css";
import { Button, Paragraph } from "../../components/ui";
import { Close } from "../../components/ui/icons";
import { useFileStore } from "../../store";

export default function DragAndDrop() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const loadedFile = useFileStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    loadedFile.changeFile(files[0]);
    // process files as needed
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      loadedFile.changeFile(files[0]);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`${styles["drag-container"]} ${isDragging ? styles["drag-hover"] : ""} ${loadedFile.isError ? styles.error : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`${styles.flex} ${styles["flex-col"]}`}>
        <div className={styles.flex}>
          <Button onClick={handleClick} size="xl" color={`${loadedFile.isError ? "orange" : "white"}`}>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {loadedFile.loaded ? loadedFile.file?.name : "Загрузить файл"}
          </Button>
          {loadedFile.loaded ? (
            <Button color="black" onClick={() => loadedFile.clearFile()}>
              <Close />
            </Button>
          ) : (
            ""
          )}
        </div>
        <Paragraph size="xl">
          {loadedFile.loaded ? loadedFile.isError ? "упс, не то..." : "файл загружен!" : "или перетащите сюда"}
        </Paragraph>
      </div>
    </div>
  );
}
