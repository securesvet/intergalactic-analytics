import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import { Loader } from '../icons';

export type ButtonProps = {
  color?: 'green' | 'yellow' | 'black' | 'white' | 'orange';
  size?: 'm' | 'l' | 'xl' | 'xxl';
  isLoading?: boolean;
  loader?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  color = 'green',
  size = 'm',
  children,
  className,
  isLoading = false,
  loader,
  ...props
}: { children: ReactNode } & ButtonProps) {
  const sizeClass = styles[size] || '';
  const colorClass = isLoading ? styles.loading : styles[color] || '';
  const loaderComponent = loader || <Loader />;

  return (
    <button
      className={`${styles.button} ${sizeClass} ${colorClass} ${className}`}
      {...props}
    >
      {isLoading ? loaderComponent : children}
    </button>
  );
}
