"use client"
import 'tailwindcss/tailwind.css';
import GenreFilter from './components/GenreFilter';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log(genre);
  };

  const handleTitleSearch = () =>{
    setSelectedGenre(null);
    const API_KEY = process.env.API_KEY;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results || []);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    setIsLoading(true);
    setKeyword('');
    const API_KEY = process.env.API_KEY;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    let url = 'https://api.themoviedb.org/3/discover/movie?language=en-US';

    if(sortBy){
      url += `&sort_by=${sortBy}.${sortDirection}`;
    }
    if(selectedGenre){
      url += `&with_genres=${selectedGenre}`;
    }
    
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results || []);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedGenre, sortBy, sortDirection]);

  useEffect(() => {
    const API_KEY = process.env.API_KEY;
    const URL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
    };

    fetch(URL, options)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Movie</h1>
      </header>

      <div className="flex flex-1">
        <GenreFilter genres={genres} onGenreSelect={handleGenreSelect} />
        
        <main className="flex-1 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Movie List</h2>
            <div>
              <label htmlFor="sortSelect" className="mr-2">Sort by:</label>
              <select id="sortSelect" onChange={(e) => handleSortChange(e.target.value)}>
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="popularity">Popularity</option>
              </select>
              <select id="sortDirection" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
            <SearchBar keyword={keyword} onChange={(value) => setKeyword(value)} onSearch={handleTitleSearch} />
          </div>
          {/* movie list */}
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map(movie => (
                <Link key={movie.id} href={`/movie/${movie.id}`} legacyBehavior>
                  <a>
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />
                  </a>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

