import type { StarWarsCharacter } from "../App";
import {create} from "zustand"
import { persist } from "zustand/middleware";


export interface FavoriteState {
  favorites: StarWarsCharacter[];
}

export const initialState: FavoriteState = {
  favorites: [],
};

 export const useStoreFavorites = create( persist (
  (set) => ({
  favorites: [],
  addFavorite: (character: StarWarsCharacter) => {
    set((state ) => ({ favorites: [...state.favorites, character] }));
  },
  removeFavorite: (character: string) => {
    set((state) => ({ favorites: state.favorites.filter((c:any) => c.name !== character) }));
  },

  }),
  {
    name: "favorites",
  }
 )
);
