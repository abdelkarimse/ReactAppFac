import React from "react";
import CharacterCard from "./CharacterCard";
import type { StarWarsCharacter } from "../App";


interface CharacterListProps {
  characters: StarWarsCharacter[];
}
const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
          <CharacterCard  character={character} />
      ))}
    </div>
  );  
};

export default CharacterList;
