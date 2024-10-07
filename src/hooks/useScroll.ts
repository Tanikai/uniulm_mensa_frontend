import { useState, useEffect } from "react";

export const useScroll = () => {
  const [position, setPosition] = useState(window.scrollY);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setDistance(currentPosition - position);
      setPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  return {
    position,
    distance: Math.abs(distance),
    scrolledDown: distance > 0,
    scrolledUp: distance < 0,
    atTop: position === 0,
  };
};
