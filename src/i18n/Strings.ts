import { MealType } from "../providers/DataContext.tsx";
import { Diet } from "../providers/Constants.ts";

export type AppLanguage = "de" | "en";

const allergyDe: Record<string, string> = {
  "13": "Krebstiere",
  "14": "Eier",
  "22": "Erdnüsse",
  "23": "Soja",
  "24": "Milch/Milchprodukte",
  "25H": "Haselnuss",
  "25W": "Walnuss",
  "25P": "Pistazie",
  "25Mn": "Mandel",
  "25C": "Cashew",
  "25Ma": "Macadamia",
  "25Pk": "Pekanuss",
  "26": "Sellerie",
  "27": "Senf",
  Gl: "Glutenhaltiges Getreide",
  "28": "Sesamsamen",
  "29": "Schwefeldioxid Konz. > 10 mg",
  "30": "Sulfite Konz. > 10 mg",
  "31": "Lupine",
  "32": "Weichtiere",
  "34W": "Weizen",
  "34G": "Gerste",
  "34H": "Hafer",
  "34R": "Roggen",
  "34D": "Dinkel",
  "35": "Fisch",
};

const allergyEn: Record<string, string> = {
  "13": "Shellfish",
  // "14": "Egg",
  "22": "Peanuts",
  "23": "Soy",
  "24": "Milk / Milk Products",
  "25H": "Hazelnut",
  "25W": "Walnut",
  "25P": "Pistachio",
  "25Mn": "Almond",
  "25C": "Cashew",
  "25Ma": "Macadamia",
  "25Pk": "Pecan",
  "26": "Celery",
  "27": "Mustard",
  Gl: "Gluten",
  "28": "Sesame",
  "29": "Sulfur Dioxid > 10 mg",
  "30": "Sulfites > 10 mg",
  "31": "Lupine",
  "32": "Mollusces",
  "34W": "Wheat",
  "34G": "Barley",
  "34H": "Oats",
  "34R": "Rye",
  "34D": "Spelt",
  "35": "Fish",
};

const additivesDe: Record<string, string> = {
  "1": "Farbstoff",
  "2": "Konservierungsstoff",
  "3": "Antioxidationsmittel",
  "4": "Geschmacksverstärker",
  "5": "geschwefelt",
  "6": "geschwärzt",
  "7": "gewachst",
  "8": "Phosphat",
  "9": "Süßungsmittel",
  "10": "Phenylalin",
  "18": "Gelatine (Schwein)",
  "18R": "Gelatine (Rind)",
};

const additivesEn: Record<string, string> = {
  "1": "Food colouring",
  "2": "Preservatives",
  "3": "Antioxidants",
  "4": "Flavour enhancers",
  "5": "Sulphurised",
  "6": "Blackened",
  "7": "Waxed",
  "8": "Phosphates",
  "9": "Sweeteners",
  "10": "Phenylalanine",
  "18": "Gelatin (Pork)",
  "18R": "Gelatin (Beef)",
};

export type UIStringKeys =
  | "MODAL_TITLE"
  | "MODAL_CALORIES_PER_EURO"
  | "MODAL_CO2"
  | "MODAL_NUTR_TITLE"
  | "MODAL_NUTR_CALORIES"
  | "MODAL_NUTR_PROTEIN"
  | "MODAL_NUTR_CARB"
  | "MODAL_NUTR_FAT"
  | "MODAL_NUTR_SALT"
  | "MODAL_NUTR_ALLERGENS"
  | "MODAL_NUTR_NO_ALLERGENS"
  | "MODAL_NUTR_ADDITIVES"
  | "MODAL_NUTR_NO_ADDITIVES"
  | "MODAL_NO_NUTR";

const UIStringsDe: Record<UIStringKeys, string> = {
  MODAL_TITLE: "Zusätzliche Informationen",
  MODAL_CALORIES_PER_EURO: "Kalorien pro Euro",
  MODAL_CO2: "Ausstoß",
  MODAL_NUTR_TITLE: "Nährwerttabelle pro Portion",
  MODAL_NUTR_CALORIES: "Kalorien",
  MODAL_NUTR_PROTEIN: "Protein",
  MODAL_NUTR_CARB: "Kohlenhydrate",
  MODAL_NUTR_FAT: "Fett",
  MODAL_NUTR_SALT: "Salz",
  MODAL_NUTR_ALLERGENS: "Allergene",
  MODAL_NUTR_NO_ALLERGENS: "Keine Allergene angegeben.",
  MODAL_NUTR_ADDITIVES: "Zusatzstoffe",
  MODAL_NUTR_NO_ADDITIVES: "Keine Zusatzstoffe angegeben.",
  MODAL_NO_NUTR: "Zu diesem Gericht gibt es keine zusätzlichen Informationen.",
};

const UIStringsEn: Record<UIStringKeys, string> = {
  MODAL_TITLE: "Additional Information",
  MODAL_CALORIES_PER_EURO: "Calories per Euro",
  MODAL_CO2: "Emissions",
  MODAL_NUTR_TITLE: "Nutrition Information per Portion",
  MODAL_NUTR_CALORIES: "Calories",
  MODAL_NUTR_PROTEIN: "Protein",
  MODAL_NUTR_CARB: "Carbohydrates",
  MODAL_NUTR_FAT: "Fat",
  MODAL_NUTR_SALT: "Salt",
  MODAL_NUTR_ALLERGENS: "Allergens",
  MODAL_NUTR_NO_ALLERGENS: "No allergens listed.",
  MODAL_NUTR_ADDITIVES: "Additives",
  MODAL_NUTR_NO_ADDITIVES: "No additives listed.",
  MODAL_NO_NUTR: "This meal does not have any additional information.",
};

const mealTypeDisplayDe: Record<MealType, string> = {
  [MealType.None]: "Unbekannt",
  [MealType.Vegan]: "Vegan",
  [MealType.Vegetarian]: "Vegetarisch",
  [MealType.Pork]: "Schwein",
  [MealType.Beef]: "Rind",
  [MealType.Poultry]: "Geflügel",
  [MealType.Fish]: "Fisch",
  [MealType.Lamb]: "Lamm",
  [MealType.Game]: "Wildfleisch",
  [MealType.Bio]: "Bio",
};

const mealTypeDisplayEn: Record<MealType, string> = {
  [MealType.None]: "Unknown",
  [MealType.Vegan]: "Vegan",
  [MealType.Vegetarian]: "Vegetarian",
  [MealType.Pork]: "Pork",
  [MealType.Beef]: "Beef",
  [MealType.Poultry]: "Poultry",
  [MealType.Fish]: "Fish",
  [MealType.Lamb]: "Lamb",
  [MealType.Game]: "Game",
  [MealType.Bio]: "Bio",
};

const DietNameDe: Record<Diet, string> = {
  [Diet.Unrestricted]: "Uneingeschränkt",
  [Diet.Vegan]: "Vegan",
  [Diet.Vegetarian]: "Vegetarisch",
  [Diet.NoPork]: "Kein Schwein",
  [Diet.Meat]: "Nur Fleisch",
  [Diet.Fish]: "Nur Fisch",
  [Diet.Pork]: "Nur Schwein",
  [Diet.Beef]: "Nur Rind",
  [Diet.Poultry]: "Nur Geflügel",
};

const DietNameEn: Record<Diet, string> = {
  [Diet.Unrestricted]: "Unrestricted",
  [Diet.Vegan]: "Vegan",
  [Diet.Vegetarian]: "Vegetarian",
  [Diet.NoPork]: "No Pork",
  [Diet.Meat]: "Only Meat",
  [Diet.Fish]: "Only Fish",
  [Diet.Pork]: "Only Pork",
  [Diet.Beef]: "Only Beef",
  [Diet.Poultry]: "Only Poultry",
};

const priceKindDe: Record<string, string> = {
  students: "Studierende",
  employees: "Mitarbeitende",
  others: "Gäste",
};

const priceKindEn: Record<string, string> = {
  students: "Students",
  employees: "Employees",
  others: "Guests",
};

function getLangMap(
  currentLang: AppLanguage,
  de: Record<string, string>,
  en: Record<string, string>,
) {
  if (currentLang == "de") {
    return de;
  } else {
    return { ...de, ...en }; // use de as fallback if en string does not exist
  }
}

export function getAllergyStrings(lang: AppLanguage) {
  return getLangMap(lang, allergyDe, allergyEn);
}

export function getAdditivesStrings(lang: AppLanguage) {
  return getLangMap(lang, additivesDe, additivesEn);
}

export function getPriceKindStrings(lang: AppLanguage) {
  return getLangMap(lang, priceKindDe, priceKindEn);
}

export function getUIStrings(lang: AppLanguage) {
  return getLangMap(lang, UIStringsDe, UIStringsEn);
}

export function getMealTypeStrings(lang: AppLanguage) {
  return getLangMap(lang, mealTypeDisplayDe, mealTypeDisplayEn);
}

export function getDietNameStrings(lang: AppLanguage) {
  return getLangMap(lang, DietNameDe, DietNameEn);
}
