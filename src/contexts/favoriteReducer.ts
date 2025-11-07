import type { StarWarsCharacter } from "../App";

export interface FavoriteState {
  favorites: StarWarsCharacter[];
}

export type FavoriteAction =
  | { type: "ADD_FAVORITE"; payload: StarWarsCharacter }
  | { type: "REMOVE_FAVORITE"; payload: string };

export const initialState: FavoriteState = {
  favorites: [],
};

export function favoriteReducer(state: FavoriteState, action: FavoriteAction): FavoriteState {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some((c) => c.name === action.payload.name)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return { ...state, favorites: state.favorites.filter((c) => c.name !== action.payload) };
    default:
      return state;
  
    }
}
