import { useContext } from "react";
import { Meal, MealType, Mensaplan } from "../../providers/DataContext";
import MealElement from "./meal-element/MealElement";

import "./CanteenMeals.css";
import { ScaleLoader } from "react-spinners";
import {
  DataContext,
  DataContextProps,
} from "../../providers/MensaplanProvider.tsx";
import { DietName, DietSets } from "../../providers/Constants.ts";
import { MealAccordion } from "./meal-accordion/MealAccordion.tsx";

interface MealGroup {
  label: string;
  meals: Meal[];
}

/**
 * Group meals according to their category name.
 * @param labels Label that is shown to the user for the group.
 * @param prefixes Regular expression
 * @param meals Meals that should be grouped
 *
 * @returns Tuple of groups and remaining meals
 */
function parseMealGroups(
  labels: string[],
  prefixes: string[],
  meals: Meal[],
): [MealGroup[], Meal[]] {
  if (prefixes.length != labels.length) {
    throw Error("prefixes and labels need same length");
  }

  const remainingMeals = [];
  const groups = new Map<string, Meal[]>();
  for (const prefix of prefixes) {
    groups.set(prefix, []);
  }

  for (const meal of meals) {
    let added = false;
    for (const prefix of prefixes) {
      const exp = new RegExp(prefix, "i"); // i = ignore case
      if (exp.test(meal.category)) {
        groups.get(prefix)?.push(meal);
        added = true;
        break;
      }
    }

    // was it added or not?
    if (!added) remainingMeals.push(meal);
  }

  const mealGroups: MealGroup[] = Array.from(groups.values()).map(
    (groupMeals, i) => {
      return { label: labels[i], meals: groupMeals };
    },
  );

  return [mealGroups, remainingMeals];
}

export default function CanteenMeals() {
  const {
    mensaplan,
    isLoading,
    activeDate,
    selectedCanteen,
    selectedDiet,
    setMealInfoDialog,
  } = useContext<DataContextProps>(DataContext);
  if (isLoading || activeDate === "") {
    return (
      <div
        id="canteen-meals"
        style={{ textAlign: "center", paddingTop: "25vh" }}
      >
        <ScaleLoader color="var(--md-sys-color-primary)"></ScaleLoader>
      </div>
    );
  }

  const canteen: Mensaplan = mensaplan[selectedCanteen];
  if (canteen == null) {
    return <div></div>;
  }

  const meals = canteen[activeDate];

  if (meals == null) {
    return <div>Ein Fehler ist aufgetreten, sorry!</div>;
  }

  if (meals.length === 0) {
    return (
      <div id="canteen-meals">
        <div className="meal-element">Mensa geschlossen</div>
      </div>
    );
  }

  const filteredMeals = meals.filter(({ types }) => {
    if (selectedDiet === DietName.Unrestricted) {
      return true;
    }
    // if meal has no types, then only show in unrestricted diet
    if (types.length === 0) {
      return false;
    }
    for (const t of types) {
      // every meal type of the meal must be in the selected diet
      if (!DietSets[selectedDiet].has(t as MealType)) {
        return false;
      }
    }
    return true;
  });

  if (filteredMeals.length === 0 && meals.length > 0) {
    return (
      <div id="canteen-meals">
        <div className="meal-element">
          Für den gewählten Filter gibt es keine Gerichte.
        </div>
      </div>
    );
  }

  const [mealGroups, remainingMeals] = parseMealGroups(
    ["Pizza", "Burger", "Beilage", "Dessert"],
    ["Pizza", "Burger", "Salat|Beilage", "Dessert"],
    meals,
  );

  const onInfoClicked = (meal: Meal) => {
    setMealInfoDialog({ open: true, meal: meal });
  };

  return (
    <div id="canteen-meals">
      {remainingMeals.map((meal) => {
        return (
          <MealElement
            meal={meal}
            key={meal.name}
            onInfoClicked={onInfoClicked}
          ></MealElement>
        );
      })}
      <hr />
      {mealGroups.map((mealGroup) => {
        return mealGroup.meals.length === 0 ? (
          <></>
        ) : (
          <MealAccordion
            key={mealGroup.label}
            label={mealGroup.label}
            meals={mealGroup.meals}
            onInfoClicked={onInfoClicked}
          ></MealAccordion>
        );
      })}
    </div>
  );
}
