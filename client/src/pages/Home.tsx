import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <header className={styles.home_header}>
      <h1 className={styles.h1_title}>Hello World and welcome to my new app</h1>
      <img
        src={logo}
        alt="logo du site "
        className={styles.logo}
        arial-label="logo de toolsroutepro"
      />
      <h2>Work in progress</h2>
      <Link to="/dashboard"> page Dashboard</Link>
    </header>
  );
}
