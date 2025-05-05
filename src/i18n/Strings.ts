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

interface UIStringIntf {
  MODAL_ADDITIONAL_INFO: string;
}

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

export function getUIStrings(lang: AppLanguage) {}
