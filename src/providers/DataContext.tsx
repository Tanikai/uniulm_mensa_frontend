export interface MealPrices {
  students: string;
  employees: string;
  others: string;
}

export interface MealNutrition {
  calories: string;
  protein: string;
  carbohydrates: string;
  sugar: string;
  fat: string;
  saturated_fat: string;
  salt: string;
}

/**
 * Meal types that are returned by the API
 */
export enum MealType {
  Vegan = "vegan",
  Vegetarian = "vegetarisch",
  Fish = "Fisch",
  Pork = "Schwein",
  Beef = "Rind",
  Poultry = "Geflügel",
}

export interface Meal {
  name: string;
  category: string;
  prices: MealPrices;
  price_note: string;
  type: string; // FIXME: parse to MealType
  types: string[]; // FIXME: parse to MealType
  allergy: string[];
  co2: string;
  nutrition: MealNutrition;
}

export type Mensaplan = Record<string, Meal[]>;

export type MensaList = Record<string, Mensaplan>;

export interface Canteen {
  id: string;
  display: string;
}
