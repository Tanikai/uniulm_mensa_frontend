import { Canteen, MealType } from "./DataContext";

export const canteens: Canteen[] = [
  { id: "ul_uni_sued", display: "Mensa Uni Süd" },
  { id: "ul_uni_west", display: "Mensa Uni West" },
];

/**
 * Diet names that can be selected by the user
 */
export enum Diet {
  Unrestricted = "unrestricted",
  Vegan = "vegan",
  Vegetarian = "vegetarian",
  NoPork = "nopork",
  Meat = "meat",
  Fish = "fish",
  Pork = "pork",
  Beef = "beef",
  Poultry = "poultry",
}

export const DietSets: Record<Diet, Set<MealType>> = {
  [Diet.Unrestricted]: new Set(Object.values(MealType)),
  [Diet.Vegan]: new Set([MealType.Vegan]),
  [Diet.Vegetarian]: new Set([MealType.Vegan, MealType.Vegetarian]),
  [Diet.NoPork]: new Set(
    Object.values(MealType).filter((type) => type !== MealType.Pork),
  ),
  [Diet.Meat]: new Set([MealType.Pork, MealType.Beef, MealType.Poultry]),
  [Diet.Fish]: new Set([MealType.Fish]),
  [Diet.Pork]: new Set([MealType.Pork]),
  [Diet.Beef]: new Set([MealType.Beef]),
  [Diet.Poultry]: new Set([MealType.Poultry]),
};
