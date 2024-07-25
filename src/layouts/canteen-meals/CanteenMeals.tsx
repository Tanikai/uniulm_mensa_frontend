import {useContext} from "react";
import {Meal, MealType, Mensaplan} from "../../providers/DataContext";
import MealElement from "./meal-element/MealElement";

import "./CanteenMeals.css";
import {ScaleLoader} from "react-spinners";
import {DataContext, DataContextProps} from "../../providers/MensaplanProvider.tsx";
import {DietName, DietSets} from "../../providers/Constants.ts";

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

    const meals = canteen[activeDate];

    if (meals == null) {
        return (<div>Ein Fehler ist aufgetreten, sorry!</div>)
    }

    if (meals.length === 0) {
        return (
            <div id="canteen-meals">
                <div className="meal-element">Mensa geschlossen</div>
            </div>
        );
    }

    const filteredMeals = meals.filter(({types}) => {
        if (selectedDiet === DietName.Unrestricted) {
            return true;
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
                <div className="meal-element">Für den gewählten Filter gibt es keine Essen</div>
            </div>
        );
    }


    const onInfoClicked = (meal: Meal) => {
        setMealInfoDialog({open: true, meal: meal});
    }

    return (
        <div id="canteen-meals">
            {
                filteredMeals.map((meal, index) => {
                    return <MealElement meal={meal} key={index} onInfoClicked={onInfoClicked}></MealElement>;
                })
            }
        </div>
    );
}
