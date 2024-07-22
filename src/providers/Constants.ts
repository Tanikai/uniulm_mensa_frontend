import { Canteen, Diet } from "./DataContext";

export const canteens: Canteen[] = [
  { id: "ul_uni_sued", display: "Mensa Uni Süd" },
  { id: "ul_uni_nord", display: "Bistro Uni Nord" },
//   "Burgerbar",
  { id: "ul_uni_west", display: "Mensa Uni West" },
//   { id: "westside-diner", display: "Westside Diner" },
];

export const diets: Diet[] = [
  "Alle",
  "vegan",
  "vegetarisch",
  "Fleisch",
  "Fisch",
  "Schwein",
  "Rind",
  "Geflügel"
];
