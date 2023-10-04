import React, { useContext } from "react";
import "./DaySelection.css";
import { DataContext, DataContextProps } from "../../../providers/DataContext";
import { BarLoader } from "react-spinners";
import dayjs from "dayjs";

export default function DaySelection() {
  const weekdayTemplate = ["Mo", "Di", "Mi", "Do", "Fr"];
  const weekdays = [...weekdayTemplate, ...weekdayTemplate];
  const { planDates, activeDate, setActiveDate } =
    useContext<DataContextProps>(DataContext);

  if (planDates.length === 0) {
    return (
      <nav id="day-selection" style={{ display: "block", paddingTop: "20px" }}>
        <BarLoader
          className="centered"
          color="var(--md-sys-color-primary)"
        ></BarLoader>
      </nav>
    );
  }

  if (planDates.length !== 10) {
    console.error(`Date count is not 10, actual value: ${planDates.length}`);
  }

  const onDayButtonClicked = (
    _: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    setActiveDate(value);
  };

  const today: string = dayjs().format("YYYY-MM-DD");

  return (
    <nav id="day-selection">
      {planDates.map((dateIsoFormat: string, index: number) => {
        const date = dateIsoFormat.split("-")[2];
        return (
          <button
            className={`day-element ${
              activeDate === dateIsoFormat ? "active" : ""
            } ${today === dateIsoFormat ? "today" : ""}`}
            key={index}
            onClick={(e) => onDayButtonClicked(e, dateIsoFormat)}
          >
            {`${date} ${weekdays[index]}`}
          </button>
        );
      })}
    </nav>
  );
}
