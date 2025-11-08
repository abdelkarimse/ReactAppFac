import React, {  useEffect, useReducer, useState } from "react";
import CharacterList from "./components/CharacterList";
import "./App.scss";
import SearchNavbar from "./components/SearchNavbar";
import { toast, ToastContainer } from "react-toastify";
import { useStoretheme } from "./contexts/ThemeContext";
import ThemedButton from "./buttons/ThemedButton";

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
  const { characters, loading, error } = state;
  const {theme} = useStoretheme();
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        if (!search.trim()) {
          // No search: fetch paginated characters
          dispatch({ type: "FETCH_INIT" });
          const response = await fetch(
            `https://swapi.dev/api/people/?page=${page}`
          );
          if (!response.ok) throw new Error("La requête a échoué");
          const data = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: data.results });
          toast.success(`Success: donnes charge la page ${page}`);
        } else {
          // Search query: ignore pagination
          setPage(1);
          const response = await fetch(
            `https://swapi.dev/api/people/?search=${search}`
          );
          if (!response.ok) throw new Error("La requête a échoué");
          const data = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: data.results });
        }
      } catch (err: any) {
        toast.error("Données non disponibles");
        console.error("Fetch failed:", err.message);
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };

    fetchCharacters();
  }, [search, page]);

  return (
      <div className={`page-container theme-${theme}`}>
        <div className="App">
          <h1>Star Wars Characters</h1>

          <ThemedButton />
          <div className="navigation">
            <button
              className="nav-button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Précédent
            </button>

            <SearchNavbar onSearchSubmit={setSearch} />

            <button
              className="nav-button"
              onClick={() => setPage((p) => p + 1)}
              disabled={characters.length < 10}
            >
              Suivant
            </button>
          </div>
          {loading && <p className="loading ">Chargement...</p>}
          {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

          {!loading && !error && <CharacterList characters={characters} />}
          <ToastContainer />
        </div>
      </div>
  );
};

export default App;
