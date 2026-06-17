export interface ClientCSV {
  ID: string;
  Nom: string;
  Ville: string;
  Adresse: string;
  "Type de Service": string;
  "Temps de Travail (Prestation Moyenne)": string;
  "Nombre de passages": string;
  "Date du dernier passage": string;
}
export interface FilterCriteria {
  city: string;
  name: string;
  minTime: string;
  minPassages: string;
}
