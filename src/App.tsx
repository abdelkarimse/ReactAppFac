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
  loading: boolean;
  error: string | null;
  characters: StarWarsCharacter[];
}

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: StarWarsCharacter[] }
  | { type: "FETCH_FAILURE"; payload: string };

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

const App: React.FC = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!response.ok) throw new Error("La requête a échoué");
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data.results });
      } catch (err: any) {
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };
    fetchCharacters();
  }, [page]);

  const { characters, loading, error } = state;

  // ✅ UseMemo to filter efficiently without another useEffect
  const filteredCharacters = useMemo(() => {
    if (!search.trim()) return characters;
    return characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, characters]);

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>

      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search character name..."
        />
      </div>

      <div className="navigation">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      {!loading && !error && <CharacterList characters={filteredCharacters} />}
    </div>
  );
};

export default App;
