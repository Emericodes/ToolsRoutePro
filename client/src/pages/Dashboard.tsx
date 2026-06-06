import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.h1}>Espace de travail - Dashboard</h1>
        <p>importer vos csv pour travailler vos tournées</p>
        <Link to="/"> Retour à l'accueil</Link>
      </header>

      <main>
        <div>
          <label htmlFor="csv-picker">
            Sélectionner le fichier CSV de la tournée :
          </label>
          <input
            id="csv-picker"
            type="file"
            accept=".csv"
            // C'est ici qu'on branchera PapaParse juste après
          />
        </div>
      </main>
    </div>
  );
}
