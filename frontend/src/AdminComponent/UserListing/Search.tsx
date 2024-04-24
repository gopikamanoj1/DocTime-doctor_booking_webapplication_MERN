import React, { ChangeEvent, useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void; // Callback function to handle search
  placeholder?: string; // Optional placeholder text
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call the provided callback when the query changes
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Clear the search query
  };

  return (
    <div className="relative ">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <button
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={handleClear}
        >
          &#x2715; {/* Unicode for 'X' to represent clear */}
        </button>
      )}
    </div>
  );
};

export default Search;
