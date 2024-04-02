export default function MovieCard ({ movie }) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          {movie.overview}
        </p>
        <p className="text-gray-600 text-base mt-2">
          Release Date: {movie.release_date}
        </p>
      </div>
    </div>
  );
};