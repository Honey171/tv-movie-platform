import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../context/context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import GridTemplate from '../components/GridTemplate';
import FavoritePagePersonGridTemplate from '../components/FavoritePagePersonGridTemplate';
import { Helmet } from 'react-helmet';

function SearchPage() {
  const {
    searchedValue,
    loading,
    setLoading,
    errorNotify,
    searchedMovieResults,
    searchedTvResults,
    searchedPersonResults,
    setSearchedMovieResults,
    setSearchedTvResults,
    setSearchedPersonResults,
    removedNotify,
    addedNotify,
  } = useContext(ContextData);
  const navigate = useNavigate();
  const [selectedResultType, setSelectedResultType] = useState('movie');
  const [searchPaginationPageNumber, setSearchPaginationPageNumber] =
    useState(1);
  const [searchPageWritingClicked, setSearchPageWritingClicked] =
    useState(false);
  const [searchPageCurrentNumber, setSearchPageCurrentNumber] = useState(null);
  const [searchPageInputNumberError, setSearchPageInputNumberError] =
    useState('');
  const [searchPageShowFullNameIdx, setSearchPageShowFullNameIdx] =
    useState(-1);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    if (!searchedValue) {
      navigate('/');
    }
  }, [navigate, searchedValue]);

  const nextPageResultsHandler = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${selectedResultType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchedValue}&page=${pageNumber}&include_adult=yes`,
      );
      const data = await response.json();
      if (selectedResultType === 'movie') {
        setSearchedMovieResults(data);
      } else if (selectedResultType === 'tv') {
        setSearchedTvResults(data);
      } else {
        setSearchedPersonResults(data);
      }
    } catch (err) {
      errorNotify();
    } finally {
      setLoading(false);
      setSearchPageWritingClicked(false);
    }
  };

  useEffect(() => {
    const total_pages =
      selectedResultType === 'movie'
        ? searchedMovieResults.total_pages
        : selectedResultType === 'tv'
        ? searchedTvResults.total_pages
        : selectedResultType === 'person'
        ? searchedPersonResults.total_pages
        : 0;

    const max_pages = total_pages > 500 ? 500 : total_pages;
    setMaxPages(max_pages);
  }, [
    selectedResultType,
    searchedMovieResults,
    searchedTvResults,
    searchedPersonResults,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const resetDataToPageOne = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/${selectedResultType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchedValue}&page=1&include_adult=yes`,
          { signal },
        );
        const data = await response.json();
        if (selectedResultType === 'movie') {
          setSearchedMovieResults(data);
        } else if (selectedResultType === 'tv') {
          setSearchedTvResults(data);
        } else {
          setSearchedPersonResults(data);
        }
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

    resetDataToPageOne();

    return () => {
      controller.abort();
    };
  }, [selectedResultType, searchedValue]);

  useEffect(() => {
    setSearchPaginationPageNumber(1);
  }, [selectedResultType, searchedValue]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Search page - {searchedValue + ' results'}</title>
        <meta
          name="description"
          content="Search page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="mt-32 pb-5 flex flex-col items-center space-y-10 xl:min-w-[900px] sm:min-w-[500px] sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen">
          <p className="self-start text-xl font-bold max-w-xs text-white pl-1">
            Search Results <br />
            with keyword:{' '}
            <span className="text-yellow-500 break-words">
              "{searchedValue}"
            </span>
          </p>
          <div className="flex justify-center border-b pb-3 border-white w-full pl-1">
            <button
              className={`px-1.5 md:px-2.5 py-3 text-white rounded-md z-20 border transition-all duration-200 cursor-pointer md:hover:font-bold ${
                selectedResultType === 'movie'
                  ? 'bg-amber-900 border-black font-bold'
                  : 'bg-slate-950 border-yellow-500'
              }`}
              onClick={() => {
                if (selectedResultType === 'movie') {
                  return;
                }
                setSelectedResultType('movie');
              }}
            >
              Movie results
            </button>
            <button
              className={`px-1.5 md:px-2.5 py-3 text-white rounded-md z-10 border -translate-x-2 hover:z-30 transition-all duration-200 cursor-pointer md:hover:font-bold ${
                selectedResultType === 'tv'
                  ? 'bg-amber-900 border-black z-30 font-bold'
                  : 'bg-slate-950 border-yellow-500'
              }`}
              onClick={() => {
                if (selectedResultType === 'tv') {
                  return;
                }
                setSelectedResultType('tv');
              }}
            >
              Tv serie results
            </button>
            <button
              className={`px-1.5 md:px-2.5 py-3 text-white rounded-md z-0 border -translate-x-4 hover:z-20 transition-all duration-200 cursor-pointer md:hover:font-bold ${
                selectedResultType === 'person'
                  ? 'bg-amber-900 border-black z-20 font-bold'
                  : 'bg-slate-950 border-yellow-500 '
              }`}
              onClick={() => {
                if (selectedResultType === 'person') {
                  return;
                }
                setSelectedResultType('person');
              }}
            >
              Person results
            </button>
          </div>
          {(selectedResultType === 'movie' &&
            searchedMovieResults?.results?.length > 0) ||
          (selectedResultType === 'tv' &&
            searchedTvResults?.results?.length > 0) ? (
            <GridTemplate
              loading={loading}
              data={
                selectedResultType === 'movie'
                  ? searchedMovieResults
                  : searchedTvResults
              }
              addedNotify={addedNotify}
              removedNotify={removedNotify}
              showFullNameIndex={searchPageShowFullNameIdx}
              setShowFullNameIndex={setSearchPageShowFullNameIdx}
            />
          ) : (
            ((selectedResultType === 'movie' &&
              searchedMovieResults?.results?.length === 0) ||
              (selectedResultType === 'tv' &&
                searchedTvResults?.results?.length === 0)) && (
              <div className="text-white font-bold text-lg w-full">
                Nothing found
              </div>
            )
          )}
          {searchedPersonResults?.results?.length > 0 &&
          selectedResultType === 'person' ? (
            <FavoritePagePersonGridTemplate
              data={searchedPersonResults.results}
              removedNotify={removedNotify}
              addedNotify={addedNotify}
              showFullNameIndex={searchPageShowFullNameIdx}
              setShowFullNameIndex={setSearchPageShowFullNameIdx}
            />
          ) : (
            searchedPersonResults?.results?.length === 0 &&
            selectedResultType === 'person' && (
              <div className="text-white font-bold text-lg w-full">
                Nothing found
              </div>
            )
          )}
          {maxPages > 1 && (
            <Pagination
              loading={loading}
              pageNumber={searchPaginationPageNumber}
              setPageNumber={setSearchPaginationPageNumber}
              inputNumber={searchPageCurrentNumber}
              setInputNumber={setSearchPageCurrentNumber}
              data={
                selectedResultType === 'tv'
                  ? searchedTvResults
                  : selectedResultType === 'movie'
                  ? searchedMovieResults
                  : searchedPersonResults
              }
              isClicked={searchPageWritingClicked}
              setIsClicked={setSearchPageWritingClicked}
              inputError={searchPageInputNumberError}
              setInputError={setSearchPageInputNumberError}
              nextPageFunction={nextPageResultsHandler}
            />
          )}
        </section>
      )}
    </main>
  );
}

export default SearchPage;
