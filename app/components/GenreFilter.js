import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';

export default function GenreFilter({ genres, onGenreSelect }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreSelect = (id) => {
    if(selectedGenre === id){
      setSelectedGenre(null);
      onGenreSelect(null);
    }else{
      setSelectedGenre(id);
      onGenreSelect(id);
    }
  };

  return (
    <aside className="bg-gray-200 w-1/6 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Genre</h2>
      <ul className="space-y-2">
        {genres.map(genre => (
          <li key={genre.id} 
              className={`cursor-pointer transition duration-300 ease-in-out py-1 px-2 rounded-md ${selectedGenre === genre.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`} 
              onClick={() => handleGenreSelect(genre.id)}>
            {genre.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};