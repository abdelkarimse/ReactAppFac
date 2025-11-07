// CharacterCard.tsx
import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import type { StarWarsCharacter } from "../App";
import { useFavorite } from "../contexts/FavoriteContext";

interface CharacterCardProps {
  character: StarWarsCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { state, dispatch } = useFavorite();

  const isFavorite = state.favorites.some((c) => c.name === character.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: character.name });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: character });
    }
  };

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}`;

  return (
    <div className="character-card">
      <button className="favorite-toggle" onClick={toggleFavorite}>
        {isFavorite ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
      </button>

      <img src={avatar} alt={character.name} className="character-image" />

      <h2 className="character-name">{character.name}</h2>

      <div className="character-info">
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Gender: {character.gender}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
