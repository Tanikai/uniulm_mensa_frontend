import "./App.css";
import CanteenMeals from "./layouts/canteen-meals/CanteenMeals";
import Header from "./layouts/header/Header";
import Footer from "./layouts/Footer.tsx";
import NutritionModal from "./layouts/modal/NutritionModal.tsx";

function App() {
  return (
    <>
      <Header />
      <NutritionModal />
      <CanteenMeals />
      <Footer />
    </>
  );
}

export default App;
