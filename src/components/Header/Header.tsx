import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="menu">
        <li>Logo</li>
        <li className={styles["text-bg-accent"] styles["text-uppercase"]}>Межгалактическая аналитика</li>
    </nav>
    </header >
  )
}

export default Header;
