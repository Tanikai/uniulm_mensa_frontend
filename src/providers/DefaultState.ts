import { DataContextProps } from "./DataContext";

export const defaultState: DataContextProps = {
  mensaplan: {},
  planDates: [],
  activeDate: "",
  setActiveDate: () => void 0,
  isLoading: true,
  selectedCanteen: "ul_uni_sued",
  setSelectedCanteen: () => void 0,
};
