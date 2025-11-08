import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import type { StarWarsCharacter } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../contexts/FavortiesReducer";

interface CharacterCardProps {
  character: StarWarsCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state: any) => state.favorites?.favorites || []);

  const isFavorite = favorites.some(
    (item: StarWarsCharacter) => item.name === character.name
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character.name));
    } else {
      dispatch(addFavorite(character));
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
