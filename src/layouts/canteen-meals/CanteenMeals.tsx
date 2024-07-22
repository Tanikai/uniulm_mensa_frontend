import {useContext} from "react";
import {Meal, Mensaplan} from "../../providers/DataContext";
import MealElement from "./meal-element/MealElement";

import "./CanteenMeals.css";
import {ScaleLoader} from "react-spinners";
import {DataContext, DataContextProps} from "../../providers/MensaplanProvider.tsx";

export default function CanteenMeals() {
    const {
        mensaplan, isLoading, activeDate, selectedCanteen, selectedDiet, setMealInfoDialog
    } = useContext<DataContextProps>(DataContext);
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

    const meals = canteen[activeDate].filter(({types}) => {
        if(selectedDiet === "Alle") {
            return true;
        }
        return types.includes(selectedDiet)
    });

    if (meals == null) {
        return (<div>Ein Fehler ist aufgetreten, sorry!</div>)
    }

    const onInfoClicked = (meal: Meal) => {
        setMealInfoDialog({open: true, meal: meal});
    }

    return (
        <div id="canteen-meals">
            {meals.length == 0 ? (
                <MealElement meal={undefined} onInfoClicked={() => undefined}></MealElement>
            ) : (
                meals.map((meal, index) => {
                    return <MealElement meal={meal} key={index} onInfoClicked={onInfoClicked}></MealElement>;
                })
            )}
        </div>
    );
}
