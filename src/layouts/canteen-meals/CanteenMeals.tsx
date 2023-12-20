import { useContext } from "react";
import { DataContext, DataContextProps, Mensaplan } from "../../providers/DataContext";
import MealElement from "./meal-element/MealElement";

import "./CanteenMeals.css";
import { ScaleLoader } from "react-spinners";

export default function CanteenMeals() {
  const { mensaplan, isLoading, activeDate, selectedCanteen } =
    useContext<DataContextProps>(DataContext);
  if (isLoading || activeDate === "") {
    return (
      <div id="canteen-meals" style={{"textAlign": "center", "paddingTop": "25vh"}}>
        <ScaleLoader color="var(--md-sys-color-primary)"></ScaleLoader>
      </div>
    );
  }

  const canteen: Mensaplan = mensaplan[selectedCanteen];
  if (canteen == null) {
    return (<div></div>);
  }
  const meals = canteen[activeDate];

  if (meals == null) {
    return (<div>Ein Fehler ist aufgetreten, sorry!</div>)
  }

  return (
    <div id="canteen-meals">
      {meals.length == 0 ? (
         <MealElement meal={undefined}></MealElement>
      ) : (
        meals.map((meal, index) => {
          return <MealElement meal={meal} key={index}></MealElement>;
        })
      )}
    </div>
  );
}
