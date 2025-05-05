import { Meal, MealType } from "../../../providers/DataContext";

import "./MealElement.css";

interface MealElementProps {
  meal: Meal;
  onInfoClicked: (meal: Meal) => void;
  mealTypeDisplay: Record<MealType, string>;
}

export default function MealElement({
  meal,
  onInfoClicked,
  mealTypeDisplay,
}: MealElementProps) {
  return (
    <div className="meal-element">
      <div className="meal-category">
        <h2>{meal.category}</h2>
        {meal.nutrition.calories !== "" && (
          <button
            className="info-button"
            onClick={() => {
              onInfoClicked(meal);
            }}
          >
            ⋯
          </button>
        )}
      </div>
      <div className="meal-name">
        <p>{meal.name}</p>
      </div>
      <div className="meal-price">
        <p>
          {meal.types.map((meal_type) => mealTypeDisplay[meal_type]).join(", ")}
        </p>
        <p>
          {meal.price_note !== "" && `(${meal.price_note}) `}
          <span title={"Studierende"}>{meal.prices.students}</span> |{" "}
          <span title={"Mitarbeitende"}>{meal.prices.employees}</span> |{" "}
          <span title={"Gäste"}>{meal.prices.others}</span>{" "}
        </p>
      </div>
    </div>
  );
}
