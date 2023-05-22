import React, { useContext } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { ContextData } from '../context/context';

function DetailPageFavoriteButton({ data, userFavoriteArray }) {
  const {
    addFavoriteMoviesHandler,
    addFavoriteSeriesHandler,
    removeFavoriteMoviesHandler,
    removeFavoriteSeriesHandler,
    addedNotify,
    removedNotify,
  } = useContext(ContextData);

  return (
    <button
      className={`flex items-center focus:outline-none focus:scale-105 gap-x-1.5 ${
        userFavoriteArray.some((favorite) => favorite.id === data.id)
          ? 'bg-red-800 text-white'
          : 'bg-slate-950 text-white'
      } transition-all duration-300 rounded-md px-4 py-3 font-bold tracking-tighter text-lg shadow-sm shadow-white hover:scale-x-105 hover:scale-y-110`}
      aria-label="detail-page-favorite-button"
      onClick={() => {
        if (userFavoriteArray.some((favorite) => favorite.id === data.id)) {
          if (data.original_name) {
            removeFavoriteSeriesHandler(data);
          } else {
            removeFavoriteMoviesHandler(data);
          }
          removedNotify(
            data.original_name ? data.original_name : data.original_title,
          );
        } else {
          if (data.original_name) {
            addFavoriteSeriesHandler(data);
          } else {
            addFavoriteMoviesHandler(data);
          }
          addedNotify(
            data.original_name ? data.original_name : data.original_title,
          );
        }
      }}
    >
      {userFavoriteArray.some((favorite) => favorite.id === data.id)
        ? 'Unfavorite'
        : 'Favorite'}
      <AiFillHeart />
    </button>
  );
}

export default DetailPageFavoriteButton;
