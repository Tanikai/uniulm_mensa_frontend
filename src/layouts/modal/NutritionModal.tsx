import ReactModal from "react-modal";
import { useContext, useMemo } from "react";
import { DataContext } from "../../providers/MensaplanProvider.tsx";
import { Meal } from "../../providers/DataContext.tsx";

import "./NutritionModal.css";
import {
  getAdditivesStrings,
  getAllergyStrings,
  getPriceKindStrings,
  getUIStrings,
  UIStringKeys,
} from "../../i18n/Strings.ts";

export default function NutritionModal() {
  const context = useContext(DataContext);
  const meal: Meal | null = context.mealInfoDialog.meal;

  const { allergyMap, additivesMap, priceKind, uiStrings } = useMemo(() => {
    return {
      allergyMap: getAllergyStrings(context.appLanguage),
      additivesMap: getAdditivesStrings(context.appLanguage),
      priceKind: getPriceKindStrings(context.appLanguage),
      uiStrings: getUIStrings(context.appLanguage) as Record<
        UIStringKeys,
        string
      >,
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
        <h2>{uiStrings.MODAL_TITLE}</h2>
        <button onClick={handleCloseModal} className={"close-button"}>
          ✕
        </button>
      </div>
      {meal != null ? (
        <>
          <h3>{uiStrings.MODAL_CALORIES_PER_EURO}</h3>
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
            CO<span style={{ verticalAlign: "sub" }}>2</span>-
            {uiStrings.MODAL_CO2}
          </h3>
          <p>{meal.co2}</p>
          <h3>{uiStrings.MODAL_NUTR_TITLE}</h3>
          <table className={"nutrition-table"}>
            <tbody>
              <tr>
                <td>{uiStrings.MODAL_NUTR_CALORIES}</td>
                <td>{meal.nutrition.calories}</td>
              </tr>
              <tr>
                <td>{uiStrings.MODAL_NUTR_PROTEIN}</td>
                <td>{meal.nutrition.protein}</td>
              </tr>
              <tr>
                <td>{uiStrings.MODAL_NUTR_CARB}</td>
                <td>
                  {meal.nutrition.carbohydrates} ({meal.nutrition.sugar})
                </td>
              </tr>
              <tr>
                <td>{uiStrings.MODAL_NUTR_FAT}</td>
                <td>
                  {meal.nutrition.fat} ({meal.nutrition.saturated_fat})
                </td>
              </tr>
              <tr>
                <td>{uiStrings.MODAL_NUTR_SALT}</td>
                <td>{meal.nutrition.salt}</td>
              </tr>
            </tbody>
          </table>
          <h3>{uiStrings.MODAL_NUTR_ALLERGENS}</h3>
          {allergies?.length === 0 ? (
            <p>{uiStrings.MODAL_NUTR_NO_ALLERGENS}</p>
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
          <h3>{uiStrings.MODAL_NUTR_ADDITIVES}</h3>
          {additives?.length === 0 ? (
            <p>{uiStrings.MODAL_NUTR_NO_ADDITIVES}</p>
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
        <p>{uiStrings.MODAL_NO_NUTR}</p>
      )}
    </ReactModal>
  );
}
