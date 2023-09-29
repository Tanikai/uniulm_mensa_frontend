import CanteenSelection from "./canteen-selection/CanteenSelection";
import DaySelection from "./day-selection/DaySelection";

import "./Header.css";

function Header() {
  return (
    <header>
      <div className="row">
        <h1>
          <a href="#">UUlm Mensa</a>
        </h1>
        <CanteenSelection />
      </div>
      <DaySelection />
    </header>
  );
}

export default Header;
