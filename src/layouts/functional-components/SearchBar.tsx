import React, { useEffect, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("q");

    if (query) {
      setInputValue(query);
    }
  }, []);

  const updateURL = (query: string) => {
    const cleanQuery = query.trim();
    const newURL = cleanQuery
      ? `/productos?q=${encodeURIComponent(cleanQuery)}`
      : "/productos";

    window.location.href = newURL;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    updateURL("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateURL(inputValue);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border border-border dark:border-darkmode-border rounded-full flex bg-light/90 dark:bg-dark/10 pl-4 relative"
    >
      <input
        type="text"
        name="search"
        placeholder="Busca productos, marcas y más..."
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent p-2 pr-20 w-full"
      />

      <div className="absolute right-0 top-0 flex h-full items-center">
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 m-1 rounded-full"
            aria-label="Limpiar búsqueda"
          >
            <IoClose className="h-4 w-4" />
          </button>
        )}

        <button
          type="submit"
          className="search-icon p-2 m-1 rounded-full"
          aria-label="Buscar"
        >
          <IoSearch className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;