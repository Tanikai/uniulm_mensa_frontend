import { useContext } from "react";
import { DataContext, DataContextProps } from "../../providers/DataContext";
import MealElement from "./meal-element/MealElement";

import "./CanteenMeals.css";
import { ScaleLoader } from "react-spinners";

export default function CanteenMeals() {
  const { mensaplan, isLoading, activeDate } =
    useContext<DataContextProps>(DataContext);
  if (isLoading || activeDate === "") {
    return (
      <div id="canteen-meals" style={{"textAlign": "center", "paddingTop": "25vh"}}>
        <ScaleLoader color="var(--md-sys-color-primary)"></ScaleLoader>
      </div>
    );
  }

  const canteen = mensaplan["ul_uni_sued"];
  const meals = canteen[activeDate];

  return (
    <div id="canteen-meals">
      {meals.length == 0 ? (
        <p>Canteen is closed</p>
      ) : (
        meals.map((meal, index) => {
          return <MealElement meal={meal} key={index}></MealElement>;
        })
      )}
    </div>
  );
}
