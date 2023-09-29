import React, { useContext } from "react";

import "./CanteenSelection.css";
import { DataContext, DataContextProps} from "../../../providers/DataContext";
import { canteens } from "../../../providers/Constants";



export default function CanteenSelection() {

  const context = useContext<DataContextProps>(DataContext);

  const onCanteenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    context.selectedCanteen = event.target.value;
  };

  return (
    <nav id="canteen-selection">
      <select id="mensa-select" onChange={onCanteenChange}>
        {canteens.map((canteen) => {
          return <option key={canteen.id} value={canteen.id}>{canteen.display}</option>;
        })}
      </select>
    </nav>
  );
}
