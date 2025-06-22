import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import csv_analytics from "../../assets/csv_analytics.svg";
import csv_generator from "../../assets/csv_generator.svg";
import csv_history from "../../assets/csv_history.svg";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <li className={styles["menu-left"]}>
          <img src={logo} alt="logo" />
          <div className={styles.title__container}>
            <div className={`${styles["text-bg-accent"]} ${styles["title"]}`}>
              <b>Межгалактическая аналитика</b>
            </div>
          </div>
        </li>
        <li className={styles["menu-right"]}>
          <Link to={`/`}>
            <img
              src={csv_analytics}
              alt="Analytics"
              className={location.pathname === "/" ? styles.active : ""}
            />
          </Link>
          <Link to={`/generator`}>
            <img
              src={csv_generator}
              alt="Generator"
              className={
                location.pathname === "/generator" ? styles.active : ""
              }
            />
          </Link>
          <Link to={`/history`}>
            <img
              src={csv_history}
              alt="History"
              className={location.pathname === "/history" ? styles.active : ""}
            />
          </Link>
        </li>
      </nav>
    </header>
  );
};

export default Header;
