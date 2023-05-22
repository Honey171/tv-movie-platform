import React, { useContext, useState } from 'react';
import { ContextData } from '../context/context';
import FavoritePageGridTemplate from '../components/FavoritePageGridTemplate';
import FavoritePagePersonGridTemplate from '../components/FavoritePagePersonGridTemplate';
import { Helmet } from 'react-helmet';

function FavoritesPage() {
  const {
    userFavoriteMovies,
    userFavoriteSeries,
    userFavoritePeople,
    removedNotify,
    addedNotify,
  } = useContext(ContextData);
  const [favoritePageShowFullNameIdx, setFavoritePageShowFullNameIdx] =
    useState(-1);
  const [currentFavoriteType, setCurrentFavoriteType] = useState('movies');

  return (
    <main className={`flex flex-col items-center min-h-screen`}>
      <Helmet>
        <title>Favorites page</title>
        <meta
          name="description"
          content="User favorites page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      <section className="mt-32 pb-5 flex flex-col items-center justify-center space-y-10 sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl ">
        <div className="w-full flex md:justify-between flex-col md:flex-row space-y-5 items-center justify-center">
          <div className="self-start text-white text-3xl font-bold tracking-tighter">
            Your favorite list /{' '}
            {currentFavoriteType === 'movies'
              ? 'Movies'
              : currentFavoriteType === 'series'
              ? 'Tv Series'
              : 'People'}
          </div>
          <div className="text-white space-x-2">
            <button
              onClick={() => {
                if (currentFavoriteType === 'movies') {
                  return;
                }
                setCurrentFavoriteType('movies');
              }}
              className={`shadow-sm shadow-white px-1.5 rounded-md tracking-tighter ${
                currentFavoriteType === 'movies' ? 'bg-amber-900 py-0.5' : ''
              } transition-all duration-300`}
            >
              Movies
            </button>
            <button
              onClick={() => {
                if (currentFavoriteType === 'series') {
                  return;
                }
                setCurrentFavoriteType('series');
              }}
              className={`shadow-sm shadow-white px-1.5 rounded-md tracking-tighter ${
                currentFavoriteType === 'series' ? 'bg-amber-900 py-0.5' : ''
              } transition-all duration-300`}
            >
              Series
            </button>
            <button
              onClick={() => {
                if (currentFavoriteType === 'people') {
                  return;
                }
                setCurrentFavoriteType('people');
              }}
              className={`shadow-sm shadow-white px-1.5 rounded-md tracking-tighter  ${
                currentFavoriteType === 'people' ? 'bg-amber-900 py-0.5' : ''
              } transition-all duration-300`}
            >
              People
            </button>
          </div>
        </div>
        {(currentFavoriteType === 'movies' &&
          userFavoriteMovies.length !== 0) ||
        (currentFavoriteType === 'series' && userFavoriteSeries.length !== 0) ||
        (currentFavoriteType === 'people' &&
          userFavoritePeople.length !== 0) ? (
          currentFavoriteType === 'movies' ||
          currentFavoriteType === 'series' ? (
            <FavoritePageGridTemplate
              data={
                currentFavoriteType === 'movies'
                  ? userFavoriteMovies
                  : currentFavoriteType === 'series'
                  ? userFavoriteSeries
                  : []
              }
              removedNotify={removedNotify}
              addedNotify={addedNotify}
              showFullNameIndex={favoritePageShowFullNameIdx}
              setShowFullNameIndex={setFavoritePageShowFullNameIdx}
            />
          ) : (
            <FavoritePagePersonGridTemplate
              data={userFavoritePeople}
              removedNotify={removedNotify}
              addedNotify={addedNotify}
              showFullNameIndex={favoritePageShowFullNameIdx}
              setShowFullNameIndex={setFavoritePageShowFullNameIdx}
            />
          )
        ) : (
          <div className="-mt-20 mx-1">
            <p className="text-center flex flex-col space-y-5">
              <span className="text-white text-3xl">
                Your{' '}
                {currentFavoriteType === 'movies'
                  ? 'movie'
                  : currentFavoriteType === 'series'
                  ? 'tv series'
                  : 'people'}{' '}
                favorite list is empty right now!
              </span>{' '}
              <span className="text-gray-400 text-xl">
                If you want to add something to your list, click the heart icon
                or use the favorite button on the detail page
              </span>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default FavoritesPage;
