import { ArrowUpAZ, ArrowUpZA } from "lucide-react";
import type { FilterCriteria } from "../types/type";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  cities: string[];
  currentFilters: FilterCriteria;
  onApply: (filters: FilterCriteria) => void;
  onReset: () => void;
  // On ajoute juste ces 2 lignes pour que la barre ait accès au tri :
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

export default function FilterBar({
  cities,
  currentFilters,
  onApply,
  onReset,
  sortOrder,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className={styles.filter_container}>
      {/* 1. NOM */}
      <div className={styles.filter_group}>
        <label htmlFor="filter-name">Rechercher un nom :</label>
        <input
          id="filter-name"
          type="text"
          placeholder="Ex: Dupont..."
          value={currentFilters.name}
          onChange={(e) => onApply({ ...currentFilters, name: e.target.value })}
          className={styles.input}
        />
      </div>

      {/* 2. VILLE */}
      <div className={styles.filter_group}>
        <label htmlFor="filter-city">Filtrer par ville :</label>
        <select
          id="filter-city"
          value={currentFilters.city}
          onChange={(e) => onApply({ ...currentFilters, city: e.target.value })}
          className={styles.select}
        >
          <option value="">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* 3. TEMPS DE TRAVAIL */}
      <div className={styles.filter_group}>
        <label htmlFor="filter-time">Temps de travail min (min) :</label>
        <input
          id="filter-time"
          type="number"
          placeholder="Ex: 30"
          value={currentFilters.minTime}
          onChange={(e) =>
            onApply({ ...currentFilters, minTime: e.target.value })
          }
          className={styles.input}
        />
      </div>

      {/* 4. NOMBRE DE PASSAGES */}
      <div className={styles.filter_group}>
        <label htmlFor="filter-passages">Nombre de passages min :</label>
        <input
          id="filter-passages"
          type="number"
          placeholder="Ex: 5"
          value={currentFilters.minPassages}
          onChange={(e) =>
            onApply({ ...currentFilters, minPassages: e.target.value })
          }
          className={styles.input}
        />
      </div>

      {/* 5. LES BOUTONS DE TRI LUCIDE (Le seul vrai ajout) */}
      <div className={styles.filter_group}>
        <label htmlFor="sort-asc">Ordre alphabétique :</label>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            id="sort-asc"
            type="button"
            onClick={() => onSortChange("asc")}
            className={`${styles.sort_btn} ${sortOrder === "asc" ? styles.active : ""}`}
          >
            <ArrowUpAZ size={18} />
          </button>
          <button
            id="sort-desc"
            type="button"
            onClick={() => onSortChange("desc")}
            className={`${styles.sort_btn} ${sortOrder === "desc" ? styles.active : ""}`}
          >
            <ArrowUpZA size={18} />
          </button>
        </div>
      </div>

      {/* BOUTON EFFACER */}
      <div className={styles.filter_group}>
        <button type="button" onClick={onReset} className={styles.btn_reset}>
          Effacer
        </button>
      </div>
    </div>
  );
}
