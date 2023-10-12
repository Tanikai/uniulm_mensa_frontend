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
          rel="noreferrer"
        >
          GitHub
        </a>
        <span> | </span>
        <a
          href="https://studierendenwerk-ulm.de/essen-trinken/speiseplaene/"
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        <span> | </span>
        <a href="https://uulm.anter.dev/" target="_blank" rel="noreferrer">
          Rohdaten
        </a>
        <span> | </span>
        <a
          href="https://www.anter.dev/imprint"
          target="_blank"
          rel="noreferrer"
        >
          Impressum
        </a>
      </footer>
    </>
  );
}

export default App;
