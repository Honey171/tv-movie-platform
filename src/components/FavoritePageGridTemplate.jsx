import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { AiFillStar } from 'react-icons/ai';
import { ContextData } from '../context/context';
import FullName from './FullName';

function FavoritePageGridTemplate({
  loading,
  data,
  removedNotify,
  addedNotify,
  showFullNameIndex,
  setShowFullNameIndex,
}) {
  const {
    addFavoriteMoviesHandler,
    removeFavoriteMoviesHandler,
    addFavoriteSeriesHandler,
    removeFavoriteSeriesHandler,
    userFavoriteMovies,
    userFavoriteSeries,
  } = useContext(ContextData);

  return (
    <div
      className={`grid sm:gap-10 gap-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
        loading ? 'scale-0 ' : 'scale-100'
      }`}
    >
      {data?.length > 0 &&
        data.map((result, idx) => (
          <div
            className="hover:scale-x-105 hover:scale-y-95 transition-all duration-300 relative focus:scale-y-95 focus:scale-x-105 focus:outline-none"
            key={idx}
          >
            <p
              className={`absolute px-1 py-1 bg-[#010f16] border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
                result.vote_average &&
                String(result.vote_average).slice(0, 3) > 7
                  ? 'text-green-500'
                  : String(result.vote_average).slice(0, 3) > 5
                  ? 'text-yellow-500'
                  : String(result.vote_average).slice(0, 3) <= 0
                  ? 'text-white'
                  : 'text-red-500'
              }`}
            >
              <AiFillStar className="text-lg text-yellow-500" />{' '}
              {result.vote_average && String(result.vote_average).slice(0, 3)}
            </p>
            {result.original_name && (
              <FavoriteButton
                userFavoriteArray={userFavoriteSeries}
                data={result}
                index={idx}
                addFavoriteHandler={addFavoriteSeriesHandler}
                addedNotify={addedNotify}
                removeFavoriteHandler={removeFavoriteSeriesHandler}
                removedNotify={removedNotify}
              />
            )}
            {result.original_title && (
              <FavoriteButton
                userFavoriteArray={userFavoriteMovies}
                data={result}
                index={idx}
                addFavoriteHandler={addFavoriteMoviesHandler}
                addedNotify={addedNotify}
                removeFavoriteHandler={removeFavoriteMoviesHandler}
                removedNotify={removedNotify}
              />
            )}
            <Link
              to={`/detail/${result.id}`}
              state={{
                result,
                type: result.media_type
                  ? result.media_type
                  : result.original_name
                  ? 'tv'
                  : 'movie',
              }}
              aria-label="poster-link"
              className="rounded-md focus:outline-yellow-300"
            >
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w185_and_h278_face${result.poster_path}`
                    : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                }
                alt=""
                className="w-40 h-56 sm:w-52 sm:h-64 rounded-md mb-3"
                loading="lazy"
              />
            </Link>
            <FullName
              showFullNameIndex={showFullNameIndex}
              setShowFullNameIndex={setShowFullNameIndex}
              result={result}
              idx={idx}
            />
            <p className="text-gray-400 text-sm tracking-tighter">
              {result.first_air_date && result.first_air_date !== ''
                ? new Date(result.first_air_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : result.release_date && result.release_date !== ''
                ? new Date(result.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </p>
          </div>
        ))}
    </div>
  );
}

export default FavoritePageGridTemplate;
