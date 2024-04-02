"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MovieDetails({ params }) {
  const [movie, setMovie] = useState(null);
  const { id: movieId } = params;
  const [isLoading, setIsLoading] = useState(false);

  console.log('params.id', params.id);
  console.log('0movieId', movieId);

  useEffect(() => {
    console.log('movieId', movieId);
    const fetchMovieDetails = (movieId) => {
      setIsLoading(true);
      const API_KEY = process.env.API_KEY;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(data => {
          setMovie(data);
          setIsLoading(false);
        })
        .catch(err => console.error(err));
    };

    if(movieId){
      fetchMovieDetails(movieId);
    }

    return () => {};
  }, [movieId]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="absolute top-4 left-4">
          <Link href="/" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back
            </a>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {movie && (
              <div className="container mx-auto px-4 py-8">
                <Head>
                  <title>{movie.title}</title>
                </Head>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3">
                    <img 
                      className="w-full" 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={500}
                      height={750}
                    />
                  </div>
                  <div className="lg:w-2/3 lg:pl-8 mt-6 lg:mt-0">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-gray-600 text-lg mt-2">{movie.overview}</p>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Genres:</p>
                      <ul className="list-disc list-inside">
                        {movie.genres.map(genre => (
                          <li key={genre.id}>{genre.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Release Date:</p>
                      <p>{movie.release_date}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Runtime:</p>
                      <p>{movie.runtime} minutes</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Average Rating:</p>
                      <p>{movie.vote_average}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Vote Average:</p>
                      <p>{movie.vote_average}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}