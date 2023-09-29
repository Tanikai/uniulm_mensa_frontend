import "./App.css";
import CanteenMeals from "./layouts/canteen-meals/CanteenMeals";
import Header from "./layouts/header/Header";

function App() {
  return (
    <>
      <Header />
      <CanteenMeals />
      <footer>
        <a
          href="https://github.com/tanikai/mensaplan-web-interface"
          target="_blank"
        >
          GitHub
        </a>
        <span> | </span>
        <a
          href="https://studierendenwerk-ulm.de/essen-trinken/speiseplaene/"
          target="_blank"
        >
          Quelle
        </a>
        <span> | </span>
        <a href="https://uulm.anter.dev/" target="_blank">
          Rohdaten
        </a>
        <span> | </span>
        <a href="https://www.anter.dev/imprint" target="_blank">
          Impressum
        </a>
      </footer>
    </>
  );
}

export default App;
