import React, { useState } from "react";
import "../App.scss";
// Define props interface
interface SearchNavbarProps {
  onSearchSubmit: (query: string) => void;
}

const SearchNavbar: React.FC<SearchNavbarProps> = ({ onSearchSubmit }) => {
  const [search, setSearch] = useState("");

  return (
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); // update local state
            onSearchSubmit(e.target.value); // update parent
          }}
          placeholder="Search..."
        />
      </div>
  );
};

export default SearchNavbar;
