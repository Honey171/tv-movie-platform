import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { ContextData } from '../context/context';
import FullName from './FullName';

function FavoritePagePersonGridTemplate({
  loading,
  data,
  removedNotify,
  addedNotify,
  showFullNameIndex,
  setShowFullNameIndex,
}) {
  const {
    addFavoritePeopleHandler,
    removeFavoritePeopleHandler,
    userFavoritePeople,
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
            <FavoriteButton
              userFavoriteArray={userFavoritePeople}
              data={result}
              index={idx}
              addFavoriteHandler={addFavoritePeopleHandler}
              addedNotify={addedNotify}
              removeFavoriteHandler={removeFavoritePeopleHandler}
              removedNotify={removedNotify}
            />
            <Link
              to={`/person/${result.id}`}
              state={{
                id: result.id,
              }}
            >
              <img
                src={
                  result.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${result.profile_path}`
                    : result.gender === 1
                    ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                    : result.gender === 2
                    ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                    : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                }
                alt=""
                className="w-40 h-56 sm:w-52 sm:h-64 rounded-md mb-3 bg-white/70"
                loading="lazy"
              />
            </Link>
            <FullName
              showFullNameIndex={showFullNameIndex}
              setShowFullNameIndex={setShowFullNameIndex}
              result={result}
              idx={idx}
            />
          </div>
        ))}
    </div>
  );
}

export default FavoritePagePersonGridTemplate;
