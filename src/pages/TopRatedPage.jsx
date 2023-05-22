import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextData } from '../context/context';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import GridTemplate from '../components/GridTemplate';
import { Helmet } from 'react-helmet';

function TopRatedPage() {
  const { state } = useLocation();
  const { addedNotify, removedNotify, setLoading, loading, errorNotify } =
    useContext(ContextData);
  const [topRateds, setTopRateds] = useState([]);
  const [selectedTopRatedType, setSelectedTopRatedType] = useState('movie');
  const [topRatedPageCurrentPageNumber, setTopRatedPageCurrentPageNumber] =
    useState(1);
  const [topRatedPageShowFullNameIdx, setTopRatedPageShowFullNameIdx] =
    useState(-1);
  const [topRatedPageWritingClicked, setTopRatedPageWritingClicked] =
    useState(false);
  const [topRatedPageCurrentNumber, setTopRatedPageCurrentNumber] =
    useState(null);
  const [topRatedPageInputNumberError, setTopRatedPageInputNumberError] =
    useState('');

  useEffect(() => {
    if (state && state.type === 'tv') {
      setSelectedTopRatedType('tv');
    } else if (state && state.type === 'movie') {
      setSelectedTopRatedType('movie');
    } else {
      return;
    }
  }, [state]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const topTrendPageFetchHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/${selectedTopRatedType}/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${topRatedPageCurrentPageNumber}`,
          { signal },
        );
        const data = await response.json();
        setTopRateds(data);
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
    topTrendPageFetchHandler();

    return () => {
      controller.abort();
    };
  }, [selectedTopRatedType, state]);

  const newPageWithPaginateHandler = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/${selectedTopRatedType}/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`,
      );
      const data = await response.json();
      setTopRateds(data);
    } catch (err) {
      errorNotify();
    } finally {
      window.scrollTo(0, 0);
      setTopRatedPageWritingClicked(false);
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Helmet>
        <title>Top rateds page</title>
        <meta
          name="description"
          content="Top rateds page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="mt-32 pb-5 flex flex-col items-center justify-center space-y-10 sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen">
          <div className="md:w-full flex md:flex-row gap-y-5 md:gap-y-0 flex-col justify-between items-center px-2">
            <p className="self-start text-2xl md:text-3xl tracking-tighter font-bold text-white">
              {selectedTopRatedType === 'tv' ? 'Tv series' : 'Movies'} / Top
              rated
            </p>
            <div className="flex gap-5">
              <div
                className={`font-bold space-x-1 rounded-md ${
                  selectedTopRatedType === 'tv' ? 'border-r' : 'border-l'
                }`}
              >
                <button
                  onClick={() => {
                    if (selectedTopRatedType === 'tv') {
                      return;
                    }
                    setSelectedTopRatedType('tv');
                  }}
                  className={`${
                    selectedTopRatedType === 'tv'
                      ? 'bg-slate-950 shadow-sm shadow-white'
                      : ''
                  } transition-all duration-300 cursor-pointer px-1 py-0.5 rounded-md text-white`}
                >
                  Tv series
                </button>
                <button
                  onClick={() => {
                    if (selectedTopRatedType === 'movie') {
                      return;
                    }
                    setSelectedTopRatedType('movie');
                  }}
                  className={`${
                    selectedTopRatedType === 'movie'
                      ? 'bg-slate-950 shadow-sm shadow-white'
                      : ''
                  } transition-all duration-300 cursor-pointer px-1 py-0.5 rounded-md text-white`}
                >
                  Movies
                </button>
              </div>
            </div>
          </div>
          <GridTemplate
            loading={loading}
            data={topRateds}
            removedNotify={removedNotify}
            addedNotify={addedNotify}
            showFullNameIndex={topRatedPageShowFullNameIdx}
            setShowFullNameIndex={setTopRatedPageShowFullNameIdx}
          />
          <Pagination
            loading={loading}
            pageNumber={topRatedPageCurrentPageNumber}
            setPageNumber={setTopRatedPageCurrentPageNumber}
            inputNumber={topRatedPageCurrentNumber}
            setInputNumber={setTopRatedPageCurrentNumber}
            data={topRateds}
            isClicked={topRatedPageWritingClicked}
            setIsClicked={setTopRatedPageWritingClicked}
            inputError={topRatedPageInputNumberError}
            setInputError={setTopRatedPageInputNumberError}
            nextPageFunction={newPageWithPaginateHandler}
          />
        </section>
      )}
    </main>
  );
}

export default TopRatedPage;
