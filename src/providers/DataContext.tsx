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

export interface Meal {
    name: string;
    category: string;
    prices: MealPrices;
    type: string;
    types: string[];
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

export type Diet = string
