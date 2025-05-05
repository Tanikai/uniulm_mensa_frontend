import React, { createContext, useEffect, useState } from "react";
import { Meal, MensaList, MensaListLang } from "./DataContext";
import dayjs from "dayjs";
import { Diet } from "./Constants.ts";
import { AppLanguage, getToMealTypeStrings } from "../i18n/Strings.ts";

export interface MealInfoDialog {
  open: boolean;
  meal: Meal | null;
}

export interface DataContextProps {
  mensaplan: MensaListLang;
  planDates: string[];
  activeDate: string; // in YYYY-MM-DD format
  setActiveDate: (date: string) => void;
  isLoading: boolean;
  selectedCanteen: string;
  setSelectedCanteen: (canteen: string) => void;
  selectedDiet: Diet;
  setSelectedDiet: (diet: Diet) => void;
  mealInfoDialog: MealInfoDialog;
  setMealInfoDialog: (dialog: MealInfoDialog) => void;
  appLanguage: AppLanguage;
  toggleAppLanguage: () => void;
}

const defaultState: DataContextProps = {
  mensaplan: { de: {}, en: {} },
  planDates: [],
  activeDate: "",
  setActiveDate: () => {},
  isLoading: true,
  selectedCanteen: "ul_uni_sued",
  setSelectedCanteen: () => {},
  selectedDiet: Diet.Unrestricted,
  setSelectedDiet: () => {},
  mealInfoDialog: {
    open: false,
    meal: null,
  },
  setMealInfoDialog: () => {},
  appLanguage: "de",
  toggleAppLanguage: () => {},
};

export const DataContext = createContext<DataContextProps>(defaultState);

interface MensaProviderProps {
  children: React.ReactNode;
}

const apiUrl = "https://uulm.anter.dev/api/v1/canteens/all";

const MensaplanProvider: React.FC<MensaProviderProps> = ({ children }) => {
  const [data, setData] = useState<MensaListLang>(defaultState.mensaplan);
  const [planDates, setPlanDates] = useState<string[]>(defaultState.planDates);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [selectedCanteen, setSelectedCanteen] = useState<string>(
    defaultState.selectedCanteen,
  );
  const [selectedDiet, setSelectedDiet] = useState<Diet>(() => {
    const storedDiet = localStorage.getItem("selected_diet");
    return storedDiet !== null
      ? (storedDiet as Diet)
      : defaultState.selectedDiet;
  });
  const setSelectedDietWithStorage = (diet: Diet) => {
    localStorage.setItem("diet", diet);
    setSelectedDiet(diet);
  };
  const [activeDate, setActiveDate] = useState<string>(defaultState.activeDate);
  const [mealInfoDialog, setMealInfoDialog] = useState<MealInfoDialog>(
    defaultState.mealInfoDialog,
  );

  const [appLanguage, setAppLanguage] = useState<AppLanguage>(() => {
    const storedLanguage = localStorage.getItem("lang");
    return storedLanguage !== null
      ? (storedLanguage as AppLanguage)
      : defaultState.appLanguage;
  });
  const toggleAppLanguage = () => {
    let newLanguage: AppLanguage;
    if (appLanguage == "de") {
      newLanguage = "en";
    } else {
      newLanguage = "de";
    }
    localStorage.setItem("lang", newLanguage);
    setAppLanguage(newLanguage);
  };

  useEffect(() => {
    let ignore = false;

    if (Object.keys(data[appLanguage]).length > 0) {
      return;
    }

    setIsLoading(true);
    fetch(`${apiUrl}?lang=${appLanguage}`)
      .then((response) => response.json())
      .then((result: MensaList) => {
        // FIXME: yup validation
        const dates = getDates(result);
        setPlanDates(dates);
        setActiveDate(getRecommendedDate(dates));
        const updated = data;
        updated[appLanguage] = result;
        setData(updated);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });

    return () => {
      ignore = true;
    };
  }, [appLanguage, data]);

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
        appLanguage: appLanguage,
        toggleAppLanguage: toggleAppLanguage,
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
