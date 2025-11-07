// CharacterList.tsx
import React from "react";
import CharacterCard from "./CharacterCard";
import type { StarWarsCharacter } from "../App";
import { useFavorite, FavoriteProvider } from "../contexts/FavoriteContext";
import { MdFavorite } from "react-icons/md";

interface CharacterListProps {
  characters: StarWarsCharacter[];
}

// --- Favorite Bar ---
const FavoriteBar: React.FC = () => {
  const { state } = useFavorite();
  const count = state.favorites.length;

  return (
    <div className="favorite-bar">
      <MdFavorite color={count > 0 ? "red" : "gray"} />
      <span>{count} Favorite{count !== 1 ? "s" : ""}</span>
    </div>
  );
};

// --- Character List ---
const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <FavoriteProvider>
      <FavoriteBar />
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </FavoriteProvider>
  );
};

export default CharacterList;
