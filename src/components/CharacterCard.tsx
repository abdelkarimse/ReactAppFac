// CharacterCard.tsx
import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import type { StarWarsCharacter } from "../App";
import { useStoreFavorites } from "../contexts/favoriteReducer";

interface CharacterCardProps {
  character: StarWarsCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const {addFavorite} = useStoreFavorites();
  const {removeFavorite} = useStoreFavorites();
  const {favorites} = useStoreFavorites();

  const isFavorite = favorites.some((c :any ) => c.name === character.name);

  const toggleFavorite = () => {

    if (!isFavorite) {
        addFavorite(character);
    } else {
        removeFavorite(character.name);
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
