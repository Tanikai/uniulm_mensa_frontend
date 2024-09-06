import { useEffect } from 'react';
import { useScroll } from '../../hooks/useScroll';
import CanteenSelection from "./canteen-selection/CanteenSelection";
import DaySelection from "./day-selection/DaySelection";
import DietSelection from "./diet-selection/DietSelection";

import "./Header.css";

function Header() {
  const {position, atTop, scrolledUp, scrolledDown} = useScroll();

  useEffect(() => { // Hide header on scroll down, show on scroll up
    const header = document.querySelector('.sticky');
    if(header === null)
      return;

    if(scrolledDown) {
      header.classList.add('hidden');
    } else if(scrolledUp) {
      header.classList.remove('hidden');
    }
  }, [scrolledUp, scrolledDown]);

  useEffect(() => { // Determine, when the header should be sticky and when it should flow with the page
    const header = document.querySelector('.sticky');
    if(header === null)
      return;

    if(atTop) { // Header is at the top of the page -> not sticky, flow with the page
      header.classList.add('fixed');
    } else if(position > header.getBoundingClientRect().height) { // The header is completely scrolled off-screen -> sticky, do not flow with the page
      const wasFixed = header.classList.contains('fixed');
      header.classList.remove('fixed');
      if(wasFixed) { // If the header was previously sticky, do not animate it, this would create a weird flicker/jump
        header.getAnimations()
          .map(anim => anim as CSSTransition)
          .filter(anim => anim.transitionProperty === 'transform')
          .forEach(anim => { anim.finish(); });
      }
    }
  }, [atTop, position]);

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
