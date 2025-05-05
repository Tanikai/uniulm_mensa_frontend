import { useContext } from "react";
import { DataContext } from "../../../providers/MensaplanProvider.tsx";

import "./LanguageToggle.css";

export function LanguageToggle() {
  const { appLanguage, toggleAppLanguage } = useContext(DataContext);

  return (
    <button
      id={"language-toggle"}
      onClick={() => {
        toggleAppLanguage();
      }}
    >
      {appLanguage == "de" ? "🇩🇪" : "🇬🇧"}
    </button>
  );
}
