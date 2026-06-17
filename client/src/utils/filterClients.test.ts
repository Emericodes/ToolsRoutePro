import { expect, test } from "vitest";
import type { ClientCSV } from "../types/type";
import { filterClients } from "./filterClients";

const mockClients: ClientCSV[] = [
  {
    ID: "1",
    Nom: "Jean Dupont",
    Ville: "Paris", // Ajout des guillemets ici
    Adresse: "10 rue de la Paix",
    "Type de Service": "Maintenance",
    "Temps de Travail (Prestation Moyenne)": "45",
    "Nombre de passages": "12",
    "Date du dernier passage": "2026-06-01",
  }, // Ajout de la virgule de séparation ici
  {
    ID: "2",
    Nom: "Martin Durand",
    Ville: "Lyon",
    Adresse: "20 rue de la République",
    "Type de Service": "Contrôle",
    "Temps de Travail (Prestation Moyenne)": "30",
    "Nombre de passages": "5",
    "Date du dernier passage": "2026-05-15",
  },
];

test("filterClients doit trouver un client peu importe les majuscules ou les espaces", () => {
  const filters = {
    city: "",
    name: "  dupont  ",
    minTime: "",
    minPassages: "",
  };

  // Exécution avec le bon nom de variable (mockClients avec un 'c')
  const resultat = filterClients(mockClients, filters);

  expect(resultat.length).toBe(1);
  expect(resultat[0].Nom).toBe("Jean Dupont");
});
