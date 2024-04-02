import React, { useState } from 'react';

export default function SearchBar({ keyword, onChange, onSearch }) {
  //const [searchTerm, setSearchTerm] = useState(keyword);
  console.log('keyword', keyword);

  const handleChange = (event) => {
    //setSearchTerm(event.target.value);
    onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //onSearch(searchTerm);
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="Search movies..."
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </form>
  );
};