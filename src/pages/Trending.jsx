import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../context/context';
import { AiOutlineDown } from 'react-icons/ai';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import GridTemplate from '../components/GridTemplate';
import { Helmet } from 'react-helmet';

function Trending() {
  const { addedNotify, removedNotify, setLoading, loading, errorNotify } =
    useContext(ContextData);
  const [trendings, setTrendings] = useState({});
  const [showTypes, setShowTypes] = useState(false);
  const [trendingPageCurrentPageNumber, setTrendingPageCurrentPageNumber] =
    useState(1);
  const [trendingPageShowFullNameIdx, setTrendingPageShowFullNameIdx] =
    useState(-1);
  const [selectedTrendingType, setSelectedTrendingType] = useState('all');
  const [selectedTrendingTime, setSelectedTrendingTime] = useState('day');
  const [trendingPageWritingClicked, setTrendingPageWritingClicked] =
    useState(false);
  const [trendingPageCurrentNumber, setTrendingPageCurrentNumber] =
    useState(null);
  const [trendingPageInputNumberError, setTrendingPageInputNumberError] =
    useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const trendingPageFetchHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/${selectedTrendingType}/${selectedTrendingTime}?api_key=${process.env.REACT_APP_API_KEY}&page=${trendingPageCurrentPageNumber}`,
          { signal },
        );
        const data = await response.json();
        setTrendings(data);
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

    trendingPageFetchHandler();

    return () => {
      controller.abort();
    };
  }, [selectedTrendingTime, selectedTrendingType]);

  const newPageWithPaginateHandler = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${selectedTrendingType}/${selectedTrendingTime}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
      );
      const data = await response.json();
      setTrendings(data);
    } catch (err) {
      errorNotify();
    } finally {
      setTrendingPageWritingClicked(false);
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Helmet>
        <title>Trendings page</title>
        <meta
          name="description"
          content="Trendings page"
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
              {selectedTrendingType.slice(0, 1).toUpperCase() +
                selectedTrendingType.slice(1)}{' '}
              / {selectedTrendingTime === 'day' ? 'Daily' : 'Weekly'} /
              Trendings
            </p>
            <div className="flex gap-5">
              <div className="relative">
                <span
                  className="flex items-center gap-1 bg-slate-950 tracking-tighter shadow-sm shadow-white rounded-md px-1 font-bold text-white"
                  onClick={() => setShowTypes(!showTypes)}
                >
                  <span className="min-w-[50px] max-w-[75px]">
                    {selectedTrendingType === 'all'
                      ? 'All'
                      : selectedTrendingType === 'tv'
                      ? 'Tv series'
                      : 'Movies'}
                  </span>
                  <AiOutlineDown
                    className={`${
                      showTypes ? 'rotate-180' : 'rotate-0'
                    } transition-all duration-300`}
                  />
                </span>
                <ul
                  className={`absolute z-50 w-full ${
                    showTypes ? 'scale-1' : 'scale-0'
                  } transition-all duration-300 rounded-md pt-1.5 space-y-0.5 text-white`}
                >
                  <li
                    onFocus={() => setShowTypes(true)}
                    onBlur={() => setShowTypes(false)}
                    tabIndex={0}
                    className={`bg-slate-800 tracking-tighter rounded-md pl-1 cursor-pointer hover:bg-slate-500 transition-all duration-300 ${
                      selectedTrendingType === 'all'
                        ? 'bg-slate-500 ring-2 ring-black text-white'
                        : ''
                    }`}
                    onClick={() => {
                      if (selectedTrendingType === 'all') {
                        return;
                      }
                      setSelectedTrendingType('all');
                      setTrendingPageCurrentPageNumber(1);
                      setShowTypes(false);
                    }}
                  >
                    All
                  </li>
                  <li
                    onFocus={() => setShowTypes(true)}
                    onBlur={() => setShowTypes(false)}
                    tabIndex={0}
                    className={`bg-slate-800 tracking-tighter rounded-md pl-1 cursor-pointer hover:bg-slate-500 transition-all duration-300 ${
                      selectedTrendingType === 'tv'
                        ? 'bg-slate-500 ring-2 ring-black text-white'
                        : ''
                    }`}
                    onClick={() => {
                      if (selectedTrendingType === 'tv') {
                        return;
                      }
                      setSelectedTrendingType('tv');
                      setTrendingPageCurrentPageNumber(1);
                      setShowTypes(false);
                    }}
                  >
                    Tv Series
                  </li>
                  <li
                    onFocus={() => setShowTypes(true)}
                    onBlur={() => setShowTypes(false)}
                    tabIndex={0}
                    className={`bg-slate-800 tracking-tighter rounded-md pl-1 cursor-pointer hover:bg-slate-500 transition-all duration-300 ${
                      selectedTrendingType === 'movie'
                        ? 'bg-slate-500 ring-2 ring-black text-white'
                        : ''
                    }`}
                    onClick={() => {
                      if (selectedTrendingType === 'movie') {
                        return;
                      }
                      setSelectedTrendingType('movie');
                      setTrendingPageCurrentPageNumber(1);
                      setShowTypes(false);
                    }}
                  >
                    Movies
                  </li>
                </ul>
              </div>
              <div
                className={`font-bold space-x-1 rounded-md ${
                  selectedTrendingTime === 'day' ? 'border-r' : 'border-l'
                }`}
              >
                <button
                  onClick={() => {
                    if (selectedTrendingTime === 'day') {
                      return;
                    }
                    setSelectedTrendingTime('day');
                  }}
                  className={`${
                    selectedTrendingTime === 'day'
                      ? 'bg-slate-950 shadow-sm shadow-white'
                      : ''
                  } transition-all duration-300 cursor-pointer px-1 py-0.5 rounded-md text-white`}
                >
                  Daily
                </button>
                <button
                  onClick={() => {
                    if (selectedTrendingTime === 'week') {
                      return;
                    }
                    setSelectedTrendingTime('week');
                  }}
                  className={`${
                    selectedTrendingTime === 'week'
                      ? 'bg-slate-950 shadow-sm shadow-white'
                      : ''
                  } transition-all duration-300 cursor-pointer px-1 py-0.5 rounded-md text-white`}
                >
                  Weekly
                </button>
              </div>
            </div>
          </div>
          <GridTemplate
            loading={loading}
            data={trendings}
            removedNotify={removedNotify}
            addedNotify={addedNotify}
            showFullNameIndex={trendingPageShowFullNameIdx}
            setShowFullNameIndex={setTrendingPageShowFullNameIdx}
          />
          <Pagination
            loading={loading}
            pageNumber={trendingPageCurrentPageNumber}
            setPageNumber={setTrendingPageCurrentPageNumber}
            inputNumber={trendingPageCurrentNumber}
            setInputNumber={setTrendingPageCurrentNumber}
            data={trendings}
            isClicked={trendingPageWritingClicked}
            setIsClicked={setTrendingPageWritingClicked}
            inputError={trendingPageInputNumberError}
            setInputError={setTrendingPageInputNumberError}
            nextPageFunction={newPageWithPaginateHandler}
          />
        </section>
      )}
    </main>
  );
}

export default Trending;
