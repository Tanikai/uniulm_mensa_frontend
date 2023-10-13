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

export type Mensaplan = Record<string, Meal[]>;

export type MensaList = Record<string, Mensaplan>;

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
