import ReactModal from "react-modal";
import {useContext} from "react";
import {DataContext} from "../../providers/MensaplanProvider.tsx";
import {Meal} from "../../providers/DataContext.tsx";

import "./NutritionModal.css";

export default function NutritionModal() {
    const context = useContext(DataContext);
    const meal: Meal | null = context.mealInfoDialog.meal;

    const handleCloseModal = () => {
        context.setMealInfoDialog({open: false, meal: null});
    }

    return <ReactModal
        isOpen={context.mealInfoDialog.open}
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false} // FIXME: accessibility with set
        className="Modal"
        overlayClassName="Overlay"
    >
        <div className={"modal-header"}>
            <h2>Zusätzliche Informationen</h2>
            <button onClick={handleCloseModal} className={"close-button"}>✕</button>
        </div>
        {meal != null ?
            (
                <>
                    <h3>CO<span style={{verticalAlign: "sub"}}>2</span>-Ausstoß</h3>
                    <p>{meal.co2}</p>
                    <h3>Nährwerttabelle</h3>
                    <table className={"nutrition-table"}>
                        <tbody>
                        <tr>
                            <td>Kalorien</td>
                            <td>{meal.nutrition.calories}</td>
                        </tr>
                        <tr>
                            <td>Protein</td>
                            <td>{meal.nutrition.protein}</td>
                        </tr>
                        <tr>
                            <td>Kohlenhydrate</td>
                            <td>{meal.nutrition.carbohydrates} ({meal.nutrition.sugar})</td>
                        </tr>
                        <tr>
                            <td>Fett</td>
                            <td>{meal.nutrition.fat} ({meal.nutrition.saturated_fat})</td>
                        </tr>
                        <tr>
                            <td>Salz</td>
                            <td>{meal.nutrition.salt}</td>
                        </tr>
                        </tbody>
                    </table>
                </>)
            : (<p>Zu diesem Gericht gibt es keine zusätzlichen Informationen.</p>)}

    </ReactModal>;
}
