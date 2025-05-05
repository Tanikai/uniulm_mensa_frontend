import ReactModal from "react-modal";
import { useContext, useMemo } from "react";
import { DataContext } from "../../providers/MensaplanProvider.tsx";
import { Meal } from "../../providers/DataContext.tsx";

import "./NutritionModal.css";
import {
  getAdditivesStrings,
  getAllergyStrings,
  getPriceKindStrings,
} from "../../i18n/Strings.ts";

export default function NutritionModal() {
  const context = useContext(DataContext);
  const meal: Meal | null = context.mealInfoDialog.meal;

  const { allergyMap, additivesMap, priceKind } = useMemo(() => {
    return {
      allergyMap: getAllergyStrings(context.appLanguage),
      additivesMap: getAdditivesStrings(context.appLanguage),
      priceKind: getPriceKindStrings(context.appLanguage),
    };
  }, [context.appLanguage]);

  const handleCloseModal = () => {
    context.setMealInfoDialog({ open: false, meal: null });
  };

  const extractValue = (source: string, regex: RegExp) => {
    const match = source.match(regex);
    if (match) {
      const kcalString = match[1].replace(",", ".");
      return parseFloat(kcalString);
    }
    return undefined;
  };

  const extractCaloriesPerEuro = (meal: Meal) => {
    const kcals = extractValue(meal.nutrition.calories, /(\d+,\d+)\s*kcal/);
    if (kcals === undefined) {
      return [];
    }

    const prices = Object.entries(meal.prices).map(
      ([kind, p]: [string, string]) => {
        return {
          kind: kind,
          price: extractValue(p, /(\d+,\d{2})\s*€/),
        };
      },
    );
    if (prices.some(({ price }) => price === undefined)) {
      return [];
    }

    return prices.map(({ kind, price }) => {
      return {
        price: (kcals / (price as unknown as number)).toFixed(2),
        type: kind,
      };
    });
  };

  const allergies = meal?.allergy.filter((key) => key in allergyMap).sort();
  const additives = meal?.allergy.filter((key) => key in additivesMap).sort();

  return (
    <ReactModal
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
        <button onClick={handleCloseModal} className={"close-button"}>
          ✕
        </button>
      </div>
      {meal != null ? (
        <>
          <h3>Kalorien pro Euro</h3>
          <table className={"nutrition-table"}>
            <tbody>
              {extractCaloriesPerEuro(meal).map(({ price, type }) => {
                return (
                  <tr key={type}>
                    <td>{priceKind[type]}</td>
                    <td>{price} kcal / €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3>
            CO<span style={{ verticalAlign: "sub" }}>2</span>-Ausstoß
          </h3>
          <p>{meal.co2}</p>
          <h3>Nährwerttabelle pro Portion</h3>
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
                <td>
                  {meal.nutrition.carbohydrates} ({meal.nutrition.sugar})
                </td>
              </tr>
              <tr>
                <td>Fett</td>
                <td>
                  {meal.nutrition.fat} ({meal.nutrition.saturated_fat})
                </td>
              </tr>
              <tr>
                <td>Salz</td>
                <td>{meal.nutrition.salt}</td>
              </tr>
            </tbody>
          </table>
          <h3>Allergene</h3>
          {allergies?.length === 0 ? (
            <p>Keine Allergene angegeben.</p>
          ) : (
            <table className={"nutrition-table"}>
              <tbody>
                {allergies?.map((allergy, index) => (
                  <tr key={index}>
                    <td> {allergy} </td>
                    <td> {allergyMap[allergy]} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3>Zusatzstoffe</h3>
          {additives?.length === 0 ? (
            <p>Keine Zusatzstoffe angegeben.</p>
          ) : (
            <table className={"nutrition-table"}>
              <tbody>
                {additives?.map((additive, index) => (
                  <tr key={index}>
                    <td> {additive} </td>
                    <td> {additivesMap[additive]} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Zu diesem Gericht gibt es keine zusätzlichen Informationen.</p>
      )}
    </ReactModal>
  );
}
