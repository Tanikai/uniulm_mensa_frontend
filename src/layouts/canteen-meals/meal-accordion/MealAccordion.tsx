import { Meal, MealType } from "../../../providers/DataContext.tsx";
import MealElement from "../meal-element/MealElement.tsx";

import "./MealAccordion.css";
import { useState } from "react";

export interface MealAccordionProps {
  label: string;
  meals: Meal[];
  onInfoClicked: (meal: Meal) => void;
  mealTypeDisplay: Record<MealType, string>;
}

export function MealAccordion({
  label,
  meals,
  onInfoClicked,
  mealTypeDisplay,
}: MealAccordionProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    // TODO: make accordion expandable
    <div className="meal-accordion">
      {/*header that is always visible*/}
      <div
        className={"meal-accordion-header"}
        onClick={() => {
          toggleOpen();
        }}
      >
        <h2>{label}</h2>
        <span className={"caret"}>{open ? "⋀" : "⋁"}</span>
      </div>
      {/*body that is toggled*/}
      <div
        className={`meal-accordion-body ${open ? "meal-accordion-opened" : "meal-accordion-closed"}`}
      >
        {meals.length === 0 ? (
          <div className="meal-element">Keine Gerichte vorhanden.</div>
        ) : (
          meals.map((meal) => (
            <MealElement
              key={meal.name}
              meal={meal}
              onInfoClicked={onInfoClicked}
              mealTypeDisplay={mealTypeDisplay}
            />
          ))
        )}
      </div>
      <hr />
    </div>
  );
}
