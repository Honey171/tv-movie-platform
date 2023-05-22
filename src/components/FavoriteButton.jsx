import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';

function FavoriteButton({
  userFavoriteArray,
  data,
  index,
  removedNotify,
  removeFavoriteHandler,
  addFavoriteHandler,
  addedNotify,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="relative">
      <p
        className={`${
          hoveredIndex === index ? 'scale-1' : 'scale-0'
        } transition-all z-50 duration-300 bg-slate-950 shadow-white shadow-sm py-1 px-1 absolute text-xs text-white -top-9 right-0 rounded-md`}
      >
        {userFavoriteArray.some((favorite) => favorite.id === data.id)
          ? 'Remove from favorites'
          : 'Add to favorites'}
      </p>
      <button
        className="absolute right-0 px-2 py-1 bg-[#010f16] border-r-2 rounded-tr-md rounded-bl-md flex items-center gap-1 font-bold z-40 focus:outline-none focus:border-2"
        onMouseEnter={() => {
          setHoveredIndex(index);
        }}
        onMouseLeave={() => {
          setHoveredIndex(-1);
        }}
        onClick={() => {
          if (userFavoriteArray.some((favorite) => favorite.id === data.id)) {
            removeFavoriteHandler(data);
            removedNotify(
              data.original_name
                ? data.original_name
                : data.name
                ? data.name
                : data.original_title,
            );
          } else {
            addFavoriteHandler(data);
            addedNotify(
              data.original_name
                ? data.original_name
                : data.name
                ? data.name
                : data.original_title,
            );
          }
        }}
        aria-label="favorite-button"
      >
        <AiFillHeart
          className={`text-lg ${
            userFavoriteArray.some((favorite) => favorite.id === data.id)
              ? 'text-red-500'
              : 'text-white'
          }`}
        />
      </button>
      <span
        className={`absolute bg-white w-1 h-5 -top-4 right-0 ${
          hoveredIndex === index ? 'scale-1' : 'scale-0'
        } rounded-tl-md transition-all duration-300`}
      ></span>
    </div>
  );
}

export default FavoriteButton;
