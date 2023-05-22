import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../context/context';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import GridTemplate from '../components/GridTemplate';
import { Helmet } from 'react-helmet';

function Home() {
  const {
    loading,
    setLoading,
    errorNotify,
    userFavoriteArray,
    removeFavoriteHandler,
    addFavoriteHandler,
    addedNotify,
    removedNotify,
  } = useContext(ContextData);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [homePageShowFullNameIdx, setHomePageShowFullNameIdx] = useState(-1);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const topRatedFetchHandler = async () => {
      setLoading(true);
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
          { signal },
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
          { signal },
        ),
      ])
        .then(([response1, response2]) =>
          Promise.all([response1.json(), response2.json()]),
        )
        .then((data) => {
          setTopRatedMovies(data[0]);
          setTopRatedTv(data[1]);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            setLoading(false);
            return;
          } else {
            setLoading(false);
            errorNotify();
          }
        });
    };
    topRatedFetchHandler();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Home page</title>
        <meta
          name="description"
          content="Home page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="flex flex-col items-center justify-center mt-14 md:mt-0">
          <Slider />
          <div className="max-w-6xl flex flex-col mt-20 px-2">
            <p className="self-start pb-8 text-white text-3xl font-bold tracking-tighter">
              Top rated movies
            </p>
            <GridTemplate
              loading={loading}
              data={topRatedMovies}
              userFavorites={userFavoriteArray}
              removeFavoriteItemFunction={removeFavoriteHandler}
              addFavoriteItemFunction={addFavoriteHandler}
              addedNotify={addedNotify}
              removedNotify={removedNotify}
              showFullNameIndex={homePageShowFullNameIdx}
              setShowFullNameIndex={setHomePageShowFullNameIdx}
            />
            <Link
              to={'/topRated'}
              state={{ type: 'movie' }}
              className="mb-5 text-white text-xl font-bold mt-14 bg-slate-950 shadow-sm shadow-yellow-500 self-center px-2 py-2 rounded-md hover:bg-yellow-500 hover:shadow-md hover:shadow-white hover:text-black focus:bg-yellow-500 focus:shadow-md focus:shadow-white focus:text-black focus:outline-none tracking-tighter transition-all duration-300"
            >
              Check all movies
            </Link>
          </div>
          <div className="max-w-6xl flex flex-col mt-20 px-2">
            <p className="self-start pb-8 text-white text-3xl font-bold tracking-tighter">
              Top rated tv series
            </p>
            <GridTemplate
              loading={loading}
              data={topRatedTv}
              userFavorites={userFavoriteArray}
              removeFavoriteItemFunction={removeFavoriteHandler}
              addFavoriteItemFunction={addFavoriteHandler}
              addedNotify={addedNotify}
              removedNotify={removedNotify}
              showFullNameIndex={homePageShowFullNameIdx}
              setShowFullNameIndex={setHomePageShowFullNameIdx}
            />
            <Link
              to={'/topRated'}
              state={{ type: 'tv' }}
              className="mb-5 text-white text-xl font-bold mt-14 bg-slate-950 shadow-sm shadow-yellow-500 self-center px-2 py-2 rounded-md hover:bg-yellow-500 hover:shadow-md hover:shadow-white hover:text-black focus:bg-yellow-500 focus:shadow-md focus:shadow-white focus:text-black focus:outline-none tracking-tighter transition-all duration-300"
            >
              Check all tv series
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
