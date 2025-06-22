import Button, { type ButtonProps } from "./Button.tsx";
import styles from "./ButtonUpload.module.css";

export default function ButtonUpload({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button className={`${styles.upload} ${className}`} {...props}>
      {children}
    </Button>
  );
}
