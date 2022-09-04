import Search from "assets/icons/search.svg";
import { FunctionComponent, Dispatch, SetStateAction, useEffect } from "react";

const SearchBar: FunctionComponent<{
  setQuery: Dispatch<SetStateAction<string>>;
}> = ({ setQuery }) => {
  useEffect(() => {
    setQuery("");
  }, [setQuery]);

  return (
    <div className="search-bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const query = (e.target as any).searchInput.value;
          setQuery(query);
        }}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-lotion/50 sr-only"
        >
          Search
        </label>
        <div className="relative flex items-center">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Search className="fill-lotion/50 w-5 h-5" />
          </div>
          <input
            type="search"
            name="searchInput"
            id="default-search"
            className="search-bar-input"
            placeholder="Search for players..."
            required
          />
          <button type="submit"></button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
