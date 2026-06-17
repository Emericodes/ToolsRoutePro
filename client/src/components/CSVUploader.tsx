import Papa from "papaparse";
import { useMemo, useState } from "react";
import type { ClientCSV } from "../types/type";

export function useCSVUpload() {
  const [rawClients, setRawClients] = useState<ClientCSV[]>([]);

  const importCSVFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRawClients(results.data as ClientCSV[]);
      },
      error: (error) => {
        console.error("Error while reading the CSV file:", error);
      },
    });
  };

  const availableCities = useMemo(() => {
    const allCities = rawClients.map((client) => client.Ville);

    const validCities = allCities.filter(Boolean) as string[];

    const uniqueCitiesSet = new Set(validCities);

    return Array.from(uniqueCitiesSet).sort();
  }, [rawClients]);

  return {
    allClients: rawClients,
    availableCities: availableCities,
    uploadCSV: importCSVFile,
  };
}
