import {Canteen, MealType} from "./DataContext";

export const canteens: Canteen[] = [
    {id: "ul_uni_sued", display: "Mensa Uni Süd"},
    {id: "ul_uni_west", display: "Mensa Uni West"},
];


/**
 * Diet names that can be selected by the user
 */
export enum DietName {
    Unrestricted = "Uneingeschränkt",
    Vegan = "Vegan",
    Vegetarian = "Vegetarisch",
    NoPork = "Kein Schwein",
    Meat = "Nur Fleisch",
    Fish = "Nur Fisch",
    Pork = "Nur Schwein",
    Beef = "Nur Rind",
    Poultry = "Nur Geflügel",
}

export const DietSets: Record<DietName, MealType[]> = {
    [DietName.Unrestricted]: Object.values(MealType),
    [DietName.Vegan]: [MealType.Vegan],
    [DietName.Vegetarian]: [MealType.Vegan, MealType.Vegetarian],
    [DietName.NoPork]: Object.values(MealType).filter((type) => type !== MealType.Pork),
    [DietName.Meat]: [MealType.Pork, MealType.Beef, MealType.Poultry],
    [DietName.Fish]: [MealType.Fish],
    [DietName.Pork]: [MealType.Pork],
    [DietName.Beef]: [MealType.Beef],
    [DietName.Poultry]: [MealType.Poultry],
}
