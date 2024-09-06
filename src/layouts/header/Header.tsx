import { useEffect } from 'react';
import CanteenSelection from "./canteen-selection/CanteenSelection";
import DaySelection from "./day-selection/DaySelection";
import DietSelection from "./diet-selection/DietSelection";

import "./Header.css";
import { useScroll } from '../../hooks/useScroll';

function Header() {
  const [scrollY, distance] = useScroll();

  useEffect(() => {
    if(scrollY > 0) {
      document.querySelector('.sticky')?.classList.add('scrolled')
    } else {
      document.querySelector('.sticky')?.classList.remove('scrolled')
    }
  }, [scrollY, distance]);

  return (
    <header className="sticky">
      <div className="row">
        <h1>
          <a href="#">UUlm Mensa</a>
        </h1>
        <nav>
          <CanteenSelection />
          <DietSelection />
        </nav>
      </div>
      <DaySelection />
    </header>
  );
}

export default Header;
