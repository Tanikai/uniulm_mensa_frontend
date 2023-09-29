import { createContext } from "react";
import { defaultState } from "./DefaultState";

interface MealPrices {
  students: string;
  employees: string;
  others: string;
}

export interface Meal {
  name: string;
  category: string;
  prices: MealPrices;
  type: string;
  allergy: string[];
}

export interface Mensaplan {
  [index: string]: Meal[]; // index is the date in iso
}

export interface MensaList {
  [index: string]: Mensaplan;
}

export interface DataContextProps {
  mensaplan: MensaList;
  planDates: string[];
  activeDate: string; // in YYYY-MM-DD format
  setActiveDate: (date: string) => void;
  isLoading: boolean;
  selectedCanteen: string;
  setSelectedCanteen: (canteen: string) => void;
}

export interface Canteen {
  id: string;
  display: string;
}

export const DataContext = createContext<DataContextProps>(defaultState);
