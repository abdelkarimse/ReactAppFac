import { create } from "zustand";
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}  

 export const useStoretheme = create((set,get) => ({
  theme: "light",
  toggleTheme: () => {
    set((state : ThemeContextType) => ({ theme: state.theme === "light" ? "dark" : "light" }));
  },
  }));
