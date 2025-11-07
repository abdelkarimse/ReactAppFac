import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
function ThemedButton() {
  // Le bouton recupere la valeur du theme ET la fonction pour le changer
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className=" themed - button ">
      Passer en thème {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemedButton;
