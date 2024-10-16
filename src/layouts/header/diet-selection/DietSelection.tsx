import React, { useContext } from "react";

import { DietName } from "../../../providers/Constants";
import {
  DataContext,
  DataContextProps,
} from "../../../providers/MensaplanProvider.tsx";

export default function DietSelection() {
  const { selectedDiet, setSelectedDiet } =
    useContext<DataContextProps>(DataContext);

  const onDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiet(event.target.value as DietName);
  };

  return (
    <select
      id="diet-select"
      aria-label="Ernährungsweise"
      onChange={onDietChange}
      defaultValue={selectedDiet}
    >
      {Object.values(DietName).map((diet: DietName) => {
        return (
          <option key={diet} value={diet}>
            {diet}
          </option>
        );
      })}
    </select>
  );
}
