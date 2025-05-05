import { AppLanguage } from "../i18n/Strings";

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
  None = "none",
  Vegan = "vegan",
  Vegetarian = "vegetarian",
  Pork = "pork",
  Beef = "beef",
  Poultry = "poultry",
  Fish = "fish",
  Lamb = "lamb",
  Game = "game",
  Bio = "bio",
}

export interface Meal {
  name: string;
  category: string;
  prices: MealPrices;
  price_note: string;
  types: MealType[];
  allergy: string[];
  co2: string;
  nutrition: MealNutrition;
}

export type Mensaplan = Record<string, Meal[]>;

export type MensaList = Record<string, Mensaplan>;

export type MensaListLang = Record<AppLanguage, MensaList>;

export interface Canteen {
  id: string;
  display: string;
}
