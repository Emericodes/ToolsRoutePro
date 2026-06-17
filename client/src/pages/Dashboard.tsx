import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCSVUpload } from "../components/CSVUploader";
import FilterBar from "../components/FilterBar";
import type { FilterCriteria } from "../types/type";
import { filterClients } from "../utils/filterClients";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { allClients, availableCities, uploadCSV } = useCSVUpload();

  const [activeFilters, setActiveFilters] = useState<FilterCriteria>({
    city: "",
    name: "",
    minTime: "",
    minPassages: "",
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredClients = useMemo(() => {
    const temporaryList = filterClients(allClients, activeFilters);

    return [...temporaryList].sort((a, b) => {
      const nameA = a.Nom || "";
      const nameB = b.Nom || "";

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      }
      return nameB.localeCompare(nameA);
    });
  }, [allClients, activeFilters, sortOrder]);

  const cancelFilter = () => {
    setActiveFilters({
      city: "",
      name: "",
      minTime: "",
      minPassages: "",
    });
    setSortOrder("asc");
  };

  return (
    <div className={styles.dashboard_container}>
      <header className={styles.dashboard_header}>
        <h1 className={styles.h1}>ToolsTourPro - Tableau de bord</h1>
        <Link to="/" className={styles.link_home}>
          Retour à l'accueil
        </Link>
      </header>

      <main className={styles.main_content}>
        <section className={styles.upload_section}>
          <label htmlFor="csv-file-picker" className={styles.upload_label}>
            Sélectionner un fichier CSV (Clients)
          </label>
          <input
            id="csv-file-picker"
            type="file"
            accept=".csv"
            onChange={uploadCSV}
            className={styles.file_input}
          />
        </section>

        {allClients.length > 0 && (
          <section className={styles.data_section}>
            <FilterBar
              cities={availableCities}
              currentFilters={activeFilters}
              onApply={(newCriteria) => setActiveFilters(newCriteria)}
              onReset={cancelFilter}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />

            <h2 className={styles.h2_subtitle}>
              Liste des clients à planifier ({filteredClients.length} affichés
              sur {allClients.length} au total)
            </h2>

            {filteredClients.length === 0 ? (
              <div className={styles.no_results}>
                Aucun client ne correspond à vos critères de recherche.
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Ville</th>
                    <th>Adresse</th>
                    <th>Service</th>
                    <th>Temps de travail</th>
                    <th>Nombre de passages</th>
                    <th>Date du dernier passage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <tr key={`${client.ID}-${client.Nom}-${index}`}>
                      <td>{client.ID}</td>
                      <td>{client.Nom}</td>
                      <td>{client.Ville}</td>
                      <td>{client.Adresse}</td>
                      <td>{client["Type de Service"]}</td>
                      <td>{client["Temps de Travail (Prestation Moyenne)"]}</td>
                      <td>{client["Nombre de passages"]}</td>
                      <td>{client["Date du dernier passage"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
