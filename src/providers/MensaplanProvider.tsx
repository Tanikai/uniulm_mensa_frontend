import React, { createContext, useEffect, useState } from "react";
import { Meal, MensaList } from "./DataContext";
import dayjs from "dayjs";
import { DietName } from "./Constants.ts";

export interface MealInfoDialog {
  open: boolean;
  meal: Meal | null;
}

export interface DataContextProps {
  mensaplan: MensaList;
  planDates: string[];
  activeDate: string; // in YYYY-MM-DD format
  setActiveDate: (date: string) => void;
  isLoading: boolean;
  selectedCanteen: string;
  setSelectedCanteen: (canteen: string) => void;
  selectedDiet: DietName;
  setSelectedDiet: (diet: DietName) => void;
  mealInfoDialog: MealInfoDialog;
  setMealInfoDialog: (dialog: MealInfoDialog) => void;
}

const defaultState: DataContextProps = {
  mensaplan: {},
  planDates: [],
  activeDate: "",
  setActiveDate: () => {},
  isLoading: true,
  selectedCanteen: "ul_uni_sued",
  setSelectedCanteen: () => {},
  selectedDiet: DietName.Unrestricted,
  setSelectedDiet: () => {},
  mealInfoDialog: {
    open: false,
    meal: null,
  },
  setMealInfoDialog: () => {},
};

export const DataContext = createContext<DataContextProps>(defaultState);

interface MensaProviderProps {
  children: React.ReactNode;
}

const apiUrl = "https://uulm.anter.dev/api/v1/canteens/all";

const MensaplanProvider: React.FC<MensaProviderProps> = ({ children }) => {
  const [data, setData] = useState<MensaList>(defaultState.mensaplan);
  const [planDates, setPlanDates] = useState<string[]>(defaultState.planDates);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [selectedCanteen, setSelectedCanteen] = useState<string>(
    defaultState.selectedCanteen,
  );
  const [selectedDiet, setSelectedDiet] = useState<DietName>(() => {
    const storedDiet = localStorage.getItem("diet");
    return storedDiet !== null
      ? (storedDiet as DietName)
      : defaultState.selectedDiet;
  });
  const setSelectedDietWithStorage = (diet: DietName) => {
    localStorage.setItem("diet", diet);
    setSelectedDiet(diet);
  };
  const [activeDate, setActiveDate] = useState<string>(defaultState.activeDate);
  const [mealInfoDialog, setMealInfoDialog] = useState<MealInfoDialog>(
    defaultState.mealInfoDialog,
  );

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result: MensaList) => {
        // FIXME: yup validation
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
        selectedDiet: selectedDiet,
        setSelectedDiet: setSelectedDietWithStorage,
        activeDate: activeDate,
        setActiveDate: setActiveDate,
        mealInfoDialog: mealInfoDialog,
        setMealInfoDialog: setMealInfoDialog,
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
