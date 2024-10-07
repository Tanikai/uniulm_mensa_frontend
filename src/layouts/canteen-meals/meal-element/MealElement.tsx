import {Meal} from "../../../providers/DataContext";

import "./MealElement.css";

interface MealElementProps {
    meal: Meal;
    onInfoClicked: (meal: Meal) => void;
}

export default function MealElement({meal, onInfoClicked}: MealElementProps) {
    return (
        <div className="meal-element">
            <div className="meal-category">
                <h2>{meal.category}</h2>
                {meal.nutrition.calories !== "" && (
                    <button
                        className="info-button"
                        onClick={() => {
                            onInfoClicked(meal);
                        }}>⋯
                    </button>
                )}
            </div>
            <div className="meal-name">
                <p>{meal.name}</p>
            </div>
            <div className="meal-price">
                <p>{meal.types.join(", ")}</p>
                <p>
                    {meal.price_note !== "" && `(${meal.price_note}) `}
                    {meal.prices.students} | {meal.prices.employees} |{" "}
                    {meal.prices.others}{" "}
                </p>
            </div>
        </div>
    );
}
