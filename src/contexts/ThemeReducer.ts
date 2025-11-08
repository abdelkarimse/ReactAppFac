import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload; 
    },
  },
});

// Export actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer;
