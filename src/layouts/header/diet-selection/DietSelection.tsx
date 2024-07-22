import React, { useContext } from "react";

import { diets } from "../../../providers/Constants";
import {DataContext, DataContextProps} from "../../../providers/MensaplanProvider.tsx";



export default function DietSelection() {

  const {setSelectedDiet} = useContext<DataContextProps>(DataContext);

  const onDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiet(event.target.value);
  };

  return (
    <select id="diet-select" onChange={onDietChange}>
      {diets.map((diet) => {
        return <option key={diet} value={diet}>{diet}</option>;
      })}
    </select>
  );
}
