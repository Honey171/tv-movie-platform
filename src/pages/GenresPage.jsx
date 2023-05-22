import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextData } from '../context/context';
import { Helmet } from 'react-helmet';

function GenresPage() {
  const { movieGenres, tvGenres } = useContext(ContextData);
  const [selectedGenres, setSelectedGenres] = useState('movie');

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <section className="mt-20 flex flex-col items-center justify-center mb-2">
        <Helmet>
          <title>Genres page</title>
          <meta
            name="description"
            content="Genres page"
          />
          <meta
            property="og:title"
            content="Movie/Tv series platform"
          />
        </Helmet>

        <div className="text-2xl md:text-3xl pt-10 text-white font-bold">
          <button
            className={`cursor-pointer ${
              selectedGenres === 'movie' ? 'text-yellow-400 underline' : ''
            } transition-all duration-500 focus:scale-105 focus:outline-none tracking-tighter`}
            onClick={() => {
              if (selectedGenres === 'movie') {
                return;
              }
              setSelectedGenres('movie');
            }}
          >
            Movies genres
          </button>{' '}
          /{' '}
          <button
            className={`cursor-pointer ${
              selectedGenres === 'tv' ? 'text-yellow-400 underline' : ''
            } transition-all duration-500 focus:scale-105 focus:outline-none tracking-tighter`}
            onClick={() => {
              if (selectedGenres === 'tv') {
                return;
              }
              setSelectedGenres('tv');
            }}
          >
            Tv series genres
          </button>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-2 pt-10 gap-3 sm:gap-8 px-1">
          {selectedGenres === 'movie'
            ? movieGenres.map((genre, idx) => (
                <Link
                  key={idx}
                  className="relative flex items-center justify-center md:hover:scale-110 transition-all duration-300 border border-white hover:border-yellow-300 rounded-md md:focus:scale-110 focus:outline-yellow-300"
                  to={`/genre/${genre.id}`}
                  state={{
                    id: genre.id,
                    genre: genre.name,
                    type: selectedGenres === 'movie' ? 'movie' : 'tv',
                  }}
                >
                  <p className="absolute text-xl sm:text-2xl font-bold text-yellow-300 z-10 text-center hover:text-white sm:hover:text-3xl tracking-tighter transition-all duration-200">
                    {genre.name}
                  </p>
                  <img
                    src={genre.image}
                    alt=""
                    className="max-w-96 h-28 sm:h-40 md:h-48 z-0 rounded-md brightness-[0.45] hover:brightness-[0.8] transition-all duration-200"
                    loading="lazy"
                  />
                </Link>
              ))
            : tvGenres.map((genre, idx) => (
                <Link
                  key={idx}
                  className="relative flex items-center justify-center md:hover:scale-110 transition-all duration-300 border border-white hover:border-yellow-300 rounded-md md:focus:scale-110 focus:outline-yellow-300"
                  to={`/genre/${genre.id}`}
                  state={{
                    id: genre.id,
                    genre: genre.name,
                    type: selectedGenres === 'movie' ? 'movie' : 'tv',
                  }}
                >
                  <p className="absolute text-xl sm:text-2xl font-bold text-yellow-300 z-10 text-center hover:text-white sm:hover:text-3xl tracking-tighter transition-all duration-200">
                    {genre.name}
                  </p>
                  <img
                    src={genre.image}
                    alt=""
                    className="max-w-96 h-28 sm:h-40 md:h-48 z-0 rounded-md brightness-[0.45] hover:brightness-[0.8] transition-all duration-200"
                    loading="lazy"
                  />
                </Link>
              ))}
        </div>
      </section>
    </main>
  );
}

export default GenresPage;
