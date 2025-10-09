import React, { useEffect, useReducer, useState, useMemo } from "react";
import CharacterList from "./components/CharacterList";
import "./App.scss";

export interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface State {
  loading: boolean; // indique si les données sont en cours de chargement
  error: string | null; // message d'erreur s’il y a un problème
  characters: StarWarsCharacter[]; // liste des personnages récupérés
}

type Action =
  | { type: "FETCH_INIT" } // début du chargement
  | { type: "FETCH_SUCCESS"; payload: StarWarsCharacter[] } // succès de la requête
  | { type: "FETCH_FAILURE"; payload: string }; // échec de la requête

// 🔹 État initial
const initialState: State = {
  loading: false,
  error: null,
  characters: [],
};

function fetchReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, characters: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Action non reconnue");
  }
}

// 🔹 Composant principal de l’application
const App: React.FC = () => {
  // Gestion de l’état via useReducer
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  // Page actuelle pour la pagination
  const [page, setPage] = useState(1);

  // Texte de recherche
  const [search, setSearch] = useState("");

  // 🔹 Récupération des personnages à chaque changement de page
  useEffect(() => {
    const fetchCharacters = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        // Appel à l’API SWAPI (Star Wars API)
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!response.ok) throw new Error("La requête a échoué");
        const data = await response.json();
        // Mise à jour des personnages
        dispatch({ type: "FETCH_SUCCESS", payload: data.results });
      } catch (err: any) {
        // Gestion d’erreur
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };
    fetchCharacters();
  }, [page]); // Dépendance : se déclenche à chaque changement de page

  // Déstructuration pour plus de lisibilité
  const { characters, loading, error } = state;

  // 🔹 Filtrage des personnages selon le champ de recherche
  // useMemo évite de recalculer inutilement le filtrage
  const filteredCharacters = useMemo(() => {
    if (!search.trim()) return characters;
    return characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, characters]);

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>

      {/* Champ de recherche */}
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Rechercher un personnage..."
        />
      </div>

      {/* Navigation entre les pages */}
      <div className="navigation">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Précédent
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((p) => p + 1)}>Suivant</button>
      </div>

      {/* Affichage de l’état actuel */}
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      {/* Liste des personnages une fois les données chargées */}
      {!loading && !error && <CharacterList characters={filteredCharacters} />}
    </div>
  );
};

export default App;
