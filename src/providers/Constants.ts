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

export const DietSets: Record<DietName, Set<MealType>> = {
    [DietName.Unrestricted]: new Set(Object.values(MealType)),
    [DietName.Vegan]: new Set([MealType.Vegan]),
    [DietName.Vegetarian]: new Set([MealType.Vegan, MealType.Vegetarian]),
    [DietName.NoPork]: new Set(Object.values(MealType).filter((type) => type !== MealType.Pork)),
    [DietName.Meat]: new Set([MealType.Pork, MealType.Beef, MealType.Poultry]),
    [DietName.Fish]: new Set([MealType.Fish]),
    [DietName.Pork]: new Set([MealType.Pork]),
    [DietName.Beef]: new Set([MealType.Beef]),
    [DietName.Poultry]: new Set([MealType.Poultry]),
}
