import { useState, useEffect, useContext } from 'react';
import { ContextData } from '../context/context';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import FavoriteButton from '../components/FavoriteButton';
import { Helmet } from 'react-helmet';

function PeoplePage() {
  const {
    setLoading,
    loading,
    errorNotify,
    addedNotify,
    removedNotify,
    userFavoritePeople,
    removeFavoritePeopleHandler,
    addFavoritePeopleHandler,
  } = useContext(ContextData);
  const [peopleResult, setPeopleResult] = useState([]);
  const [peoplePageCurrentPageNumber, setPeoplePageCurrentPageNumber] =
    useState(1);
  const [peoplePageWritingClicked, setPeoplePageWritingClicked] =
    useState(false);
  const [peoplePageCurrentNumber, setPeoplePageCurrentNumber] = useState(null);
  const [peoplePageInputNumberError, setPeoplePageInputNumberError] =
    useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const popularPeopleFetchHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
          { signal },
        );
        const data = await response.json();
        setPeopleResult(data);
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          setLoading(false);
          return;
        } else {
          setLoading(false);
          errorNotify();
        }
      }
    };
    popularPeopleFetchHandler();

    return () => {
      controller.abort();
    };
  }, []);

  const newPageWithPaginateHandler = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`,
      );
      const data = await response.json();
      setPeopleResult(data);
    } catch (err) {
      errorNotify();
    } finally {
      setLoading(false);
      setPeoplePageWritingClicked(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>People page</title>
        <meta
          name="description"
          content="People page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      {!loading && (
        <section className="mt-32 pb-5 flex flex-col items-center justify-center space-y-10 sm:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen">
          <div className="self-start">
            <p className="text-3xl tracking-tighter text-white font-bold">
              Popular people
            </p>
          </div>
          <div
            className={`grid sm:gap-10 gap-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-full ${
              loading ? 'scale-0 ' : 'scale-100'
            }`}
          >
            {peopleResult.results?.length > 0 &&
              peopleResult.results.map((person, idx) => (
                <div
                  key={idx}
                  className="relative hover:scale-y-110 hover:scale-x-105 transition-all duration-300"
                >
                  <FavoriteButton
                    userFavoriteArray={userFavoritePeople}
                    data={person}
                    index={idx}
                    removedNotify={removedNotify}
                    removeFavoriteHandler={removeFavoritePeopleHandler}
                    addFavoriteHandler={addFavoritePeopleHandler}
                    addedNotify={addedNotify}
                  />
                  <Link
                    to={`/person/${person.id}`}
                    state={{ id: person.id }}
                    aria-label="person-poster-link"
                    className="rounded-md focus:outline-yellow-300"
                  >
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                          : person.gender === 1
                          ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                          : person.gender === 2
                          ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                          : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                      }
                      alt=""
                      className="sm:w-52 h-64 w-40 rounded-md"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-col max-w-[160px] sm:max-w-[207px] mt-2 tracking-tighter">
                    <Link
                      to={`/person/${person.id}`}
                      state={{ id: person.id }}
                      aria-label="person-name-link"
                      className="text-white text-lg hover:text-yellow-400 self-start transition-all duration-300 focus:outline-dashed focus:outline-white focus:rounded-md"
                    >
                      {person.name}
                    </Link>
                    <p className="text-slate-300 text-sm">
                      Popularity score: {Math.trunc(person.popularity)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            loading={loading}
            pageNumber={peoplePageCurrentPageNumber}
            setPageNumber={setPeoplePageCurrentPageNumber}
            inputNumber={peoplePageCurrentNumber}
            setInputNumber={setPeoplePageCurrentNumber}
            data={peopleResult}
            isClicked={peoplePageWritingClicked}
            setIsClicked={setPeoplePageWritingClicked}
            inputError={peoplePageInputNumberError}
            setInputError={setPeoplePageInputNumberError}
            nextPageFunction={newPageWithPaginateHandler}
          />
        </section>
      )}
    </main>
  );
}

export default PeoplePage;
