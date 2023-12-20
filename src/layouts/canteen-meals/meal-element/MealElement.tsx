import { Meal } from "../../../providers/DataContext";

import "./MealElement.css";

interface MealElementProps {
  meal: Meal | undefined;
}

export default function MealElement(props: MealElementProps) {
  if (props.meal == null) {
    return <div className="meal-element">Mensa geschlossen</div>;
  }
  return (
    <div className="meal-element">
      <div className="meal-category">
        <h2>{props.meal.category}</h2>
      </div>
      <div className="meal-name">
        <p>{props.meal.name}</p>
      </div>
      <div className="meal-price">
        <p>{props.meal.types.join(", ")}</p>
        <p>
          {props.meal.prices.students} | {props.meal.prices.employees} |{" "}
          {props.meal.prices.others}{" "}
        </p>
      </div>
    </div>
  );
}
