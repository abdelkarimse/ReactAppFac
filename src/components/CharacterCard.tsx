// CharacterCard.tsx
import React from "react";
import type { StarWarsCharacter } from "../App";

interface CharacterCardProps {
  character: StarWarsCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const placeholderImage =`https://ui-avatars.com/api/?name=${character.name}`;

  return (
    <div className="character-card">
      <img src={placeholderImage} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};

export default CharacterCard;
