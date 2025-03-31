import { Meal } from "../../../providers/DataContext.tsx";
import MealElement from "../meal-element/MealElement.tsx";

export interface MealAccordionProps {
  label: string;
  meals: Meal[];
  onInfoClicked: (meal: Meal) => void;
}

export function MealAccordion({
  label,
  meals,
  onInfoClicked,
}: MealAccordionProps) {
  return (
    // TODO: make accordion expandable
    <div className="meal-accordion">
      <h2>{label}</h2>
      {meals.length === 0 ? (
        <div className="meal-element">Keine Gerichte vorhanden.</div>
      ) : (
        meals.map((meal) => (
          <MealElement
            key={meal.type}
            meal={meal}
            onInfoClicked={onInfoClicked}
          />
        ))
      )}
    </div>
  );
}
