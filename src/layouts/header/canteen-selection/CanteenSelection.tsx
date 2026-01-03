import React, { useContext } from "react";

import { canteens } from "../../../providers/Constants";
import {
  DataContext,
  DataContextProps,
} from "../../../providers/MensaplanProvider.tsx";

export default function CanteenSelection() {
  const { selectedCanteen, setSelectedCanteen } =
    useContext<DataContextProps>(DataContext);

  const onCanteenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCanteen(event.target.value);
  };

  return (
    <select
      id="mensa-select"
      aria-label="Mensa"
      onChange={onCanteenChange}
      defaultValue={selectedCanteen}
    >
      {canteens.map((canteen) => {
        return (
          <option key={canteen.id} value={canteen.id}>
            {canteen.display}
          </option>
        );
      })}
    </select>
  );
}
