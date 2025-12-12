import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StarWarsCharacter } from "../App";

interface FavoritesState {
  favorites: StarWarsCharacter[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<StarWarsCharacter>) => {
      const exists = state.favorites.some(
        (item) => item.name === action.payload.name
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item.name !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
