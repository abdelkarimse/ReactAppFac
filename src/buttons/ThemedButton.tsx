import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../contexts/ThemeReducer";

function ThemedButton() {
  const dispatch = useDispatch();

  // Get the current theme value from Redux
  const theme = useSelector((state: any) => state.theme.theme);

  // Dispatch the toggle action when clicked
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleToggle} className="themed-button">
      Passer en thème {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemedButton;
