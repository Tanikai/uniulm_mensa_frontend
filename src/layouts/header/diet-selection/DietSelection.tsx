import React, { useContext, useMemo } from "react";

import { Diet } from "../../../providers/Constants";
import {
  DataContext,
  DataContextProps,
} from "../../../providers/MensaplanProvider.tsx";
import { getDietNameStrings } from "../../../i18n/Strings.ts";

export default function DietSelection() {
  const { selectedDiet, setSelectedDiet, appLanguage } =
    useContext<DataContextProps>(DataContext);

  const { dietDisplayName } = useMemo(() => {
    return { dietDisplayName: getDietNameStrings(appLanguage) };
  }, [appLanguage]);

  const onDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiet(event.target.value as Diet);
  };

  return (
    <select
      id="diet-select"
      aria-label="Ernährungsweise"
      onChange={onDietChange}
      defaultValue={selectedDiet}
    >
      {Object.values(Diet).map((diet: Diet) => {
        return (
          <option key={diet} value={diet}>
            {dietDisplayName[diet]}
          </option>
        );
      })}
    </select>
  );
}
