import styles from "./Paragraph.module.css";
import type { HTMLAttributes, ReactNode } from "react";

type ParagraphProps = {
  size?: "m" | "l" | "xl" | "xxl";
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph({
  size = "m",
  children,
  className,
}: ParagraphProps) {
  const sizeClass = styles[size] || "";
  return <p className={`${sizeClass} ${className}`}>{children}</p>;
}
