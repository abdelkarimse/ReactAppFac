import { createContext } from "react";
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}  

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light", // or your default theme
  toggleTheme: () => {}, // placeholder function
});
