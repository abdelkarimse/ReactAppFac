import React, { createContext, useContext, useReducer } from "react";
import { favoriteReducer, initialState, type FavoriteState, type FavoriteAction } from "./favoriteReducer";

interface FavoriteContextType {
  state: FavoriteState;
  dispatch: React.Dispatch<FavoriteAction>;
}

const FavoriteContext = createContext<FavoriteContextType>({
  state: initialState,
  dispatch: () => {},
});

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
};
