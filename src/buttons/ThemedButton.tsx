import {  useStoretheme } from "../contexts/ThemeContext";
function ThemedButton() {
  // Le bouton recupere la valeur du theme ET la fonction pour le changer
     const {theme} = useStoretheme();
     const {toggleTheme} = useStoretheme();
  return (
    <button onClick={toggleTheme} className=" themed - button ">
      Passer en thème {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemedButton;
