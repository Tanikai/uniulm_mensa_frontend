import { DataContextProps } from "./DataContext";

export const defaultState: DataContextProps = {
  mensaplan: {},
  planDates: [],
  activeDate: "",
  setActiveDate: () => {},
  isLoading: true,
  selectedCanteen: "ul_uni_sued",
  setSelectedCanteen: () => {},
};

