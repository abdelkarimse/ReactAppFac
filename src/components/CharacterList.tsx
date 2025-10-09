import React from "react";
import CharacterCard from "./CharacterCard";
import type { StarWarsCharacter } from "../App";

interface CharacterListProps {
  characters: StarWarsCharacter[];
}

// Composant fonctionnel qui affiche la liste des personnages
const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="character-list">
      {/* Parcourt la liste des personnages et affiche une carte pour chacun */}
      {characters.map((character) => (
        // Chaque élément doit avoir une clé unique pour aider React à gérer le rendu
        <CharacterCard 
          key={character.name} 
          character={character} 
        />
      ))}
    </div>
  );
};

// Exportation du composant pour pouvoir l'utiliser ailleurs
export default CharacterList;
