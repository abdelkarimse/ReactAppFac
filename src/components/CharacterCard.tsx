// CharacterCard.tsx
import React from "react";
import type { StarWarsCharacter } from "../App";

interface CharacterCardProps {
  character: StarWarsCharacter;
}

// Composant fonctionnel qui affiche les informations d'un personnage
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  // Image de profil générée automatiquement à partir du nom du personnage
  const placeholderImage = `https://ui-avatars.com/api/?name=${character.name}`;

  return (
    <div className="character-card">
      {/* Image du personnage (ou avatar généré) */}
      <img src={placeholderImage} alt={character.name} />

      {/* Nom du personnage */}
      <h2>{character.name}</h2>

      {/* Détails du personnage */}
      <p>Taille : {character.height} cm</p>
      <p>Masse : {character.mass} kg</p>
      <p>Genre : {character.gender}</p>
    </div>
  );
};

// Exportation du composant pour utilisation dans d'autres fichiers
export default CharacterCard;
