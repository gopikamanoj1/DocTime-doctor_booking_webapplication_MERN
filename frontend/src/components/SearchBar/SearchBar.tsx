import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search functionality here (e.g., fetch data based on search query)
  };

  // Mock function for search submit (replace with actual search functionality)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here (e.g., fetch data based on search query)
    console.log('Search submitted:', searchQuery);
  };

  // Mock data for autocomplete suggestions (replace with actual data from backend)
  const autocompleteSuggestions = ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Gynecologist', 'Orthopedic'];

  return (
    <form onSubmit={handleSearchSubmit} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for doctors..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {/* Autocomplete suggestions */}
      {searchQuery && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md">
          {autocompleteSuggestions
            .filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((suggestion, index) => (
              <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                {suggestion}
              </li>
            ))}
        </ul>
      )}
      {/* Search button */}
      <button type="submit" className="absolute right-0 top-0 mt-2 mr-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
