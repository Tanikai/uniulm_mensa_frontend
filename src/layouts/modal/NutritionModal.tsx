import ReactModal from "react-modal";
import { useContext } from "react";
import { DataContext } from "../../providers/MensaplanProvider.tsx";
import { Meal } from "../../providers/DataContext.tsx";

import "./NutritionModal.css";

const allergyMap: Record<string, string> = {
  "13": "Krebstiere",
  "14": "Eier",
  "22": "Erdnüsse",
  "23": "Soja",
  "24": "Milch/Milchprodukte",
  "25H": "Haselnuss",
  "25W": "Walnuss",
  "25P": "Pistazie",
  "25Mn": "Mandel",
  "25C": "Cashew",
  "25Ma": "Macadamia",
  "25Pk": "Pekanuss",
  "26": "Sellerie",
  "27": "Senf",
  Gl: "Glutenhaltiges Getreide",
  "28": "Sesamsamen",
  "29": "Schwefeldioxid Konz. > 10 mg",
  "30": "Sulfite Konz. > 10 mg",
  "31": "Lupine",
  "32": "Weichtiere",
  "34W": "Weizen",
  "34G": "Gerste",
  "34H": "Hafer",
  "34R": "Roggen",
  "34D": "Dinkel",
  "35": "Fisch",
};

const additivesMap: Record<string, string> = {
  "1": "Farbstoff",
  "2": "Konservierungsstoff",
  "3": "Antioxidationsmittel",
  "4": "Geschmacksverstärker",
  "5": "geschwefelt",
  "6": "geschwärzt",
  "7": "gewachst",
  "8": "Phosphat",
  "9": "Süßungsmittel",
  "10": "Phenylalin",
  "18": "Gelatine (Schwein)",
  "18R": "Gelatine (Rind)",
};

const priceKindToString: Record<string, string> = {
  "students": "Studierende",
  "employees": "Mitarbeitende",
  "others": "Gäste"
};

export default function NutritionModal() {
  const context = useContext(DataContext);
  const meal: Meal | null = context.mealInfoDialog.meal;

  const handleCloseModal = () => {
    context.setMealInfoDialog({ open: false, meal: null });
  };

  const extractValue = (source: string, regex: RegExp) => {
    const match = source.match(regex);
    if (match) {
        const kcalString = match[1].replace(',', '.');
        return parseFloat(kcalString);
    }
    return undefined;
  }

  const extractCaloriesPerEuro = (meal: Meal) => {
    const kcals = extractValue(meal.nutrition.calories, /(\d+,\d+)\s*kcal/);
    if (kcals === undefined) {
      return [];
    }

    const prices = Object.entries(meal.prices).map(([kind, p]: [string, string]) => { return {
      kind: kind,
      price: extractValue(p, /(\d+,\d{2})\s*€/)
    }});
    if (prices.some(({price}) => price === undefined)) {
      return [];
    }

    return(prices.map(({kind, price}) => {
      return {price: (kcals / (price as unknown as number)).toFixed(2), type: kind};
    }))
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
              {extractCaloriesPerEuro(meal).map(({price, type}) => {
                return (
                  <tr key={type}>
                    <td>{priceKindToString[type]}</td>
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
