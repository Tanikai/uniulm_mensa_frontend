import { useEffect } from "react";
import { useEffectThrottled } from "../../hooks/useEffectThrottled.ts";
import { useScroll } from "../../hooks/useScroll";
import CanteenSelection from "./canteen-selection/CanteenSelection";
import DaySelection from "./day-selection/DaySelection";
import DietSelection from "./diet-selection/DietSelection";

import "./Header.css";
import { LanguageToggle } from "./language-toggle/LanguageToggle.tsx";

function dontAnimateTranslation(element: Element) {
  element
    .getAnimations()
    .map((anim) => anim as CSSTransition)
    .filter((anim) => anim.transitionProperty === "transform")
    .forEach((anim) => {
      anim.finish();
    });
}

function Header() {
  const { position, distance, atTop, scrolledUp, scrolledDown } = useScroll();

  useEffectThrottled(
    () => {
      // Hide header on scroll down, show on scroll up
      const header = document.querySelector(".sticky");
      if (header === null) return;

      const headerHeight = header.getBoundingClientRect().height;

      if (scrolledDown && position > headerHeight) {
        header.classList.add("hidden");
      } else if (scrolledUp && distance > 10) {
        header.classList.remove("hidden");
      }
    },
    100,
    [scrolledUp, scrolledDown, distance, position],
  );

  useEffectThrottled(
    () => {
      // Determine when the header should be sticky and when it should flow with the page
      const header = document.querySelector(".sticky");
      if (header === null) return;

      const headerHeight = header.getBoundingClientRect().height;

      if (atTop) {
        // We are at the top of the page -> not sticky, flow with the page
        header.classList.add("fixed");
      } else if (
        position < headerHeight &&
        header.classList.contains("hidden")
      ) {
        // If we are nearly at the top and the header is currently hidden -> don't animate in the sticky header, but make it flow with the page
        header.classList.add("fixed");
        dontAnimateTranslation(header); // No animation here, as the header should move with the page and not animate in
      } else if (position > headerHeight) {
        // The header is completely scrolled off-screen -> sticky, do not flow with the page
        const wasFixed = header.classList.contains("fixed");
        header.classList.remove("fixed");
        if (wasFixed) {
          // If the header was previously sticky, do not animate it, this would create a weird flicker/jump
          dontAnimateTranslation(header);
        }
      }
    },
    100,
    [atTop, position],
  );

  useEffect(() => {
    // Let the CSS know when we're not at the top of the page. Only useful when on large screens
    const header = document.querySelector(".sticky");
    if (header === null) return;

    if (atTop) {
      header.classList.remove("scrolled");
    } else {
      header.classList.add("scrolled");
    }
  }, [atTop]);

  return (
    <header className="sticky">
      <div className="row">
        <div className="title-row">
          <h1>
            <a href="#">UUlm Mensa</a>
          </h1>
          <LanguageToggle />
        </div>
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
