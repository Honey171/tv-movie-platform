import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextData } from '../context/context';
import Spinner from '../components/Spinner';
import GridTemplate from '../components/GridTemplate';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';

function KeywordResultPage() {
  const { state } = useLocation();

  const {
    setLoading,
    loading,
    userFavoriteArray,
    removeFavoriteHandler,
    addFavoriteHandler,
    removedNotify,
    addedNotify,
    errorNotify,
  } = useContext(ContextData);

  const [keywordResults, setKeywordResults] = useState([]);
  const [keywordPageCurrentPageNumber, setKeywordPageCurrentPageNumber] =
    useState(1);
  const [keywordPageWritingClicked, setKeywordPageWritingClicked] =
    useState(false);
  const [keywordPageCurrentNumber, setKeywordPageCurrentNumber] =
    useState(null);
  const [keywordPageInputNumberError, setKeywordPageInputNumberError] =
    useState('');
  const [keywordPagePageShowFullNameIdx, setKeywordPagePageShowFullNameIdx] =
    useState(-1);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const discoverFetchHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `
          https://api.themoviedb.org/3/keyword/${state.id}/movies?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&page=1
          `,
          { signal },
        );
        const data = await response.json();
        setKeywordResults(data);
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
    discoverFetchHandler();

    return () => {
      controller.abort();
    };
  }, [state.id]);

  const newPageWithPaginateHandler = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `
          https://api.themoviedb.org/3/keyword/${state.id}/movies?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&page=${page}
          `,
      );
      const data = await response.json();
      setKeywordResults(data);
    } catch (err) {
      errorNotify();
    } finally {
      setKeywordPageWritingClicked(false);
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Helmet>
        <title>{state?.name + ' keyword result page'}</title>
        <meta
          name="description"
          content="Keyword result page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="mt-32 pb-5 flex flex-col items-center justify-center space-y-10 sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen">
          <div className="self-start flex flex-col space-y-4 max-w-[350px] md:max-w-none text-white text-lg">
            <Link
              to={`/detail/${state.movieId}`}
              state={{ id: state.movieId, type: 'movie' }}
              className="hover:text-yellow-300 hover:scale-105 text-white/90 transition-all duration-300 self-start tracking-tighter"
            >
              Go to {state.movieName}
            </Link>
            <div className="text-3xl tracking-tighter">
              Keyword results for{' '}
              <span className="font-bold text-yellow-300">{state.name}</span>
            </div>
          </div>
          <GridTemplate
            loading={loading}
            data={keywordResults}
            userFavorites={userFavoriteArray}
            removeFavoriteItemFunction={removeFavoriteHandler}
            addFavoriteItemFunction={addFavoriteHandler}
            removedNotify={removedNotify}
            addedNotify={addedNotify}
            showFullNameIndex={keywordPagePageShowFullNameIdx}
            setShowFullNameIndex={setKeywordPagePageShowFullNameIdx}
          />
          <Pagination
            loading={loading}
            pageNumber={keywordPageCurrentPageNumber}
            setPageNumber={setKeywordPageCurrentPageNumber}
            inputNumber={keywordPageCurrentNumber}
            setInputNumber={setKeywordPageCurrentNumber}
            data={keywordResults}
            isClicked={keywordPageWritingClicked}
            setIsClicked={setKeywordPageWritingClicked}
            inputError={keywordPageInputNumberError}
            setInputError={setKeywordPageInputNumberError}
            nextPageFunction={newPageWithPaginateHandler}
          />
        </section>
      )}
    </main>
  );
}

export default KeywordResultPage;
