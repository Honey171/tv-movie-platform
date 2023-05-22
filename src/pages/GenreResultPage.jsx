import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextData } from '../context/context';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import GridTemplate from '../components/GridTemplate';
import { Helmet } from 'react-helmet';

function GenreResultPage() {
  const { state } = useLocation();
  const {
    genreResult,
    setGenreResult,
    setLoading,
    loading,
    userFavoriteArray,
    addFavoriteHandler,
    removeFavoriteHandler,
    addedNotify,
    removedNotify,
    errorNotify,
  } = useContext(ContextData);
  const [
    genreResultPageCurrentPageNumber,
    setGenreResultPageCurrentPageNumber,
  ] = useState(1);
  const [genreResultPageShowFullNameIdx, setGenreResultPageShowFullNameIdx] =
    useState(-1);
  const [genreResultPageWritingClicked, setGenreResultPageWritingClicked] =
    useState(false);
  const [genreResultPageCurrentNumber, setGenreResultPageCurrentNumber] =
    useState(null);
  const [genreResultPageInputNumberError, setGenreResultPageInputNumberError] =
    useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const genreResultFetchHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${state.type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=yes&include_video=false&page=1&with_genres=${state.id}&with_watch_monetization_types=flatrate`,
          { signal },
        );
        const data = await response.json();
        setGenreResult(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        } else {
          errorNotify();
        }
      } finally {
        setLoading(false);
      }
    };
    genreResultFetchHandler();

    return () => {
      controller.abort();
    };
  }, [state.id]);

  const newPageWithPaginateHandler = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${state.type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=yes&include_video=false&page=${page}&with_genres=${state.id}&with_watch_monetization_types=flatrate`,
      );
      const data = await response.json();
      setGenreResult(data);
    } catch (err) {
      errorNotify();
    } finally {
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Helmet>
        <title>{state.type + ' / ' + state.genre + ' genre page'}</title>
        <meta
          name="description"
          content="Genre result page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="mt-32 pb-5 flex flex-col items-center justify-center space-y-10 sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen">
          <div className="self-start flex flex-col space-y-5">
            <Link
              className="self-start text-white hover:scale-105 hover:text-yellow-400 hover:font-bold transition-all duration-300"
              to={'/genre'}
            >
              Go to genres
            </Link>
            <p className="self-start text-2xl lg:text-3xl tracking-tighter font-bold text-white">
              {state.type.slice(0, 1).toUpperCase() +
                state.type.slice(1) +
                ' / '}{' '}
              {state.genre}
            </p>
          </div>
          <GridTemplate
            loading={loading}
            data={genreResult}
            userFavorites={userFavoriteArray}
            removeFavoriteItemFunction={removeFavoriteHandler}
            addFavoriteItemFunction={addFavoriteHandler}
            removedNotify={removedNotify}
            addedNotify={addedNotify}
            showFullNameIndex={genreResultPageShowFullNameIdx}
            setShowFullNameIndex={setGenreResultPageShowFullNameIdx}
          />
          <Pagination
            loading={loading}
            pageNumber={genreResultPageCurrentPageNumber}
            setPageNumber={setGenreResultPageCurrentPageNumber}
            inputNumber={genreResultPageCurrentNumber}
            setInputNumber={setGenreResultPageCurrentNumber}
            data={genreResult}
            isClicked={genreResultPageWritingClicked}
            setIsClicked={setGenreResultPageWritingClicked}
            inputError={genreResultPageInputNumberError}
            setInputError={setGenreResultPageInputNumberError}
            nextPageFunction={newPageWithPaginateHandler}
          />
        </section>
      )}
    </main>
  );
}

export default GenreResultPage;
