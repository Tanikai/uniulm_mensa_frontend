import React, { useEffect, useState } from "react";
import { DataContext, MensaList } from "./DataContext";
import { defaultState } from "./DefaultState";
import { add, format } from "date-fns";

interface MensaProviderProps {
  children: React.ReactNode;
}

const MensaplanProvider: React.FC<MensaProviderProps> = ({ children }) => {
  const [data, setData] = useState<MensaList>(defaultState.mensaplan);
  const [planDates, setPlanDates] = useState<string[]>(defaultState.planDates);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [selectedCanteen] = useState<string>(
    defaultState.selectedCanteen);
  const [activeDate, setActiveDate] = useState<string>(defaultState.activeDate);
  const apiUrl = "https://uulm.anter.dev/api/v1/canteens/ul_uni_sued/all";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        const dates = getDates(result);
        setPlanDates(dates);
        setActiveDate(getRecommendedDate(dates));
        setData(result);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error while fetching data:", error));
  }, []);

  return (
    <DataContext.Provider
      value={{
        mensaplan: data,
        planDates: planDates,
        isLoading: isLoading,
        selectedCanteen: selectedCanteen,
        activeDate: activeDate,
        setActiveDate: setActiveDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function getDates(mensaList: MensaList): string[] {
  const firstCanteenElement = mensaList[Object.keys(mensaList)[0]];
  return Object.keys(firstCanteenElement);
}

function getRecommendedDate(dates: string[]): string {
  let date = new Date(); // today
  for (let i = 0; i < 5; i++) {
    // check if day is included in available canteen dates, if not then skip
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (dates.includes(formattedDate)) return formattedDate;
    date = add(date, {days: 1});
  }
  return "";
}


export default MensaplanProvider;
