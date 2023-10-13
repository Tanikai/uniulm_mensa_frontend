import React, { useEffect, useState } from "react";
import { DataContext, MensaList } from "./DataContext";
import { defaultState } from "./DefaultState";
import dayjs from "dayjs";

interface MensaProviderProps {
  children: React.ReactNode;
}

const MensaplanProvider: React.FC<MensaProviderProps> = ({ children }) => {
  const [data, setData] = useState<MensaList>(defaultState.mensaplan);
  const [planDates, setPlanDates] = useState<string[]>(defaultState.planDates);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [selectedCanteen, setSelectedCanteen] = useState<string>(
    defaultState.selectedCanteen
  );
  const [activeDate, setActiveDate] = useState<string>(defaultState.activeDate);
  const apiUrl = "https://uulm.anter.dev/api/v1/canteens/ul_uni_sued/all";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        // FIXME: response validation with yup
        const dates = getDates(result);
        setPlanDates(dates);
        setActiveDate(getRecommendedDate(dates));
        setData(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        mensaplan: data,
        planDates: planDates,
        isLoading: isLoading,
        selectedCanteen: selectedCanteen,
        setSelectedCanteen: setSelectedCanteen,
        activeDate: activeDate,
        setActiveDate: setActiveDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function getDates(mensaList: MensaList): string[] {
  const suedCanteen = mensaList.ul_uni_sued;
  return Object.keys(suedCanteen).sort();
}

function getRecommendedDate(dates: string[]): string {
  let date = dayjs();
  for (let i = 0; i < 5; i++) {
    // check if day is included in available canteen dates, if not then skip
    const formattedDate = date.format("YYYY-MM-DD");
    if (dates.includes(formattedDate)) return formattedDate;
    date = date.add(1, "day");
  }
  return "";
}

export default MensaplanProvider;
