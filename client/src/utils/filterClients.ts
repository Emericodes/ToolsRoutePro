import type { ClientCSV } from "../types/type";

interface FilterCriteria {
  city: string;
  name: string;
  minTime: string;
  minPassages: string;
}

export function filterClients(
  csvData: ClientCSV[],
  appliedFilters: FilterCriteria,
): ClientCSV[] {
  return csvData.filter((client) => {
    const matchCity =
      appliedFilters.city === "" || client.Ville === appliedFilters.city;

    const searchName = appliedFilters.name.trim().toLowerCase();
    const matchName =
      searchName === "" || client.Nom.toLowerCase().includes(searchName);

    const minTimeNum = Number.parseInt(appliedFilters.minTime, 10);
    const clientTimeNum =
      Number.parseInt(client["Temps de Travail (Prestation Moyenne)"], 10) || 0;
    const matchTime = Number.isNaN(minTimeNum) || clientTimeNum >= minTimeNum;

    const minPassagesNum = Number.parseInt(appliedFilters.minPassages, 10);
    const clientPassagesNum =
      Number.parseInt(client["Nombre de passages"], 10) || 0;
    const matchPassages =
      Number.isNaN(minPassagesNum) || clientPassagesNum >= minPassagesNum;

    return matchCity && matchName && matchTime && matchPassages;
  });
}
