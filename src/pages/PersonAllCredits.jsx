import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineClear, AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import { ContextData } from '../context/context';
import FavoriteButton from '../components/FavoriteButton';
import FullName from '../components/FullName';
import { Helmet } from 'react-helmet';

function PersonAllCredits() {
  const {
    addFavoriteMoviesHandler,
    removeFavoriteMoviesHandler,
    addFavoriteSeriesHandler,
    removeFavoriteSeriesHandler,
    userFavoriteMovies,
    userFavoriteSeries,
    addedNotify,
    removedNotify,
  } = useContext(ContextData);
  const { state } = useLocation();
  const sectionRef = useRef(null);
  const [currentCreditSearchedValue, setCurrentCreditSearchedValue] =
    useState('');
  const [submittedCreditSearchedValue, setSubmittedCreditSearchedValue] =
    useState('');
  const [searchedResultArray, setSearchedResultArray] = useState([]);
  const [isShowRestButtonClicked, setIsShowRestButtonClicked] = useState(false);
  const [allCreditPageShowFullNameIndex, setAllCreditPageShowFullNameIndex] =
    useState(-1);

  useEffect(() => {
    if (currentCreditSearchedValue.trim() === '') {
      setSearchedResultArray([]);
      setSubmittedCreditSearchedValue('');
    }
  }, [currentCreditSearchedValue]);

  useEffect(() => {
    const scrollOptions = {
      top: sectionRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    };
    const scrollOptions2 = {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };

    if (
      submittedCreditSearchedValue.trim() !== '' &&
      searchedResultArray?.length > 0
    ) {
      window.scrollTo(scrollOptions);
    } else {
      window.scrollTo(scrollOptions2);
    }
  }, [searchedResultArray?.length, submittedCreditSearchedValue]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>{state.personDetail.name + "'s all credits page"}</title>
        <meta
          name="description"
          content="Person all credits page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      <div className="w-full h-[400px] bg-black/70 flex flex-col justify-center space-y-5 max-w-7xl xl:rounded-b-lg px-2">
        <Link
          to={`/person/${state.personDetail.id}`}
          state={{ id: state.personDetail.id }}
          className="text-white self-start text-sm hover:text-base hover:text-yellow-300 transition-all duration-300"
        >
          Back to {state.personDetail.name}'s page
        </Link>
        <p className="text-3xl tracking-tighter text-white self-start ">
          <span className="text-yellow-300">{state.personDetail.name}'s </span>
          combined credits
        </p>
      </div>
      <section
        className="mt-20 min-h-screen flex flex-col items-center justify-center"
        ref={sectionRef}
      >
        <div className="text-white flex flex-col-reverse md:flex-row items-center justify-between min-w-full px-1 md:space-y-0">
          <div className="flex flex-col space-y-5 md:text-3xl text-2xl text-center md:text-left tracking-tighter mt-5">
            Combined credits <br />
            <p className="text-sm md:text-md opacity-70">
              {searchedResultArray.length > 0
                ? searchedResultArray.length
                : state.credits.cast.concat(state.credits.crew).length}{' '}
              Movies & tv Series
            </p>
            <p
              className={`text-lg md:text-xl ${
                searchedResultArray.length > 0 ? 'block' : 'hidden'
              }`}
            >
              Search results for{' '}
              <span className="opacity-100 text-2xl text-yellow-300">
                {submittedCreditSearchedValue}
              </span>
            </p>
          </div>
          <label className="flex items-center space-x-2 relative">
            {searchedResultArray?.length === 0 &&
              submittedCreditSearchedValue.trim() !== '' && (
                <p className="absolute -top-8">No result for this keyword</p>
              )}
            <input
              type="text"
              value={currentCreditSearchedValue}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  currentCreditSearchedValue.trim() !== ''
                ) {
                  setSearchedResultArray(
                    state.credits.cast
                      .concat(state.credits.crew)
                      .filter((obj) =>
                        String(obj.original_title)
                          .toLowerCase()
                          .includes(currentCreditSearchedValue.toLowerCase()),
                      ),
                  );
                  setSubmittedCreditSearchedValue(currentCreditSearchedValue);
                }
              }}
              onChange={(e) => setCurrentCreditSearchedValue(e.target.value)}
              className="text-white bg-slate-950 shadow-sm shadow-white focus:bg-slate-900 placeholder:text-sm placeholder:text-white outline-none px-1 py-1 rounded-md transition-all duration-300"
              placeholder="Search in combined credits"
            />
            <button
              onClick={() => {
                if (currentCreditSearchedValue.trim() === '') {
                  return;
                }
                setSearchedResultArray(
                  state.credits.cast
                    .concat(state.credits.crew)
                    .filter((obj) =>
                      String(obj.original_title)
                        .toLowerCase()
                        .includes(currentCreditSearchedValue.toLowerCase()),
                    ),
                );
                setSubmittedCreditSearchedValue(currentCreditSearchedValue);
              }}
              className="bg-slate-950 shadow-sm shadow-white px-1 py-1 text-lg rounded-md hover:bg-slate-900 transition-all duration-300 active:bg-black"
            >
              <AiOutlineSearch />
            </button>
            <button
              className="bg-slate-950 shadow-sm shadow-white px-1 py-1 text-lg rounded-md hover:bg-slate-900 transition-all duration-300 active:bg-black"
              onClick={() => setCurrentCreditSearchedValue('')}
            >
              <AiOutlineClear />
            </button>
          </label>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 gap-y-10 sm:gap-10 md:pt-10 pt-20 px-2">
          {searchedResultArray.length > 0 &&
            searchedResultArray.map((result, idx) => (
              <div
                key={idx}
                className="relative hover:scale-y-110 hover:scale-x-105 transition-all duration-300"
              >
                <FavoriteButton
                  userFavoriteArray={
                    result.original_name
                      ? userFavoriteSeries
                      : userFavoriteMovies
                  }
                  data={result}
                  index={idx}
                  addFavoriteHandler={
                    result.original_name
                      ? addFavoriteSeriesHandler
                      : addFavoriteMoviesHandler
                  }
                  addedNotify={addedNotify}
                  removeFavoriteHandler={
                    result.original_name
                      ? removeFavoriteSeriesHandler
                      : removeFavoriteMoviesHandler
                  }
                  removedNotify={removedNotify}
                />
                <Link
                  to={`/detail/${result.id}`}
                  state={{ type: result.media_type, id: result.id }}
                >
                  <img
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w185_and_h278_face/${result.poster_path}`
                        : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                    }
                    alt=""
                    loading="lazy"
                    className="w-52 h-64 rounded-md"
                  />
                </Link>
                <p
                  className={`absolute px-1 py-1 bg-[#010f16] top-0 border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
                    result.vote_average &&
                    String(result.vote_average).slice(0, 3) > 7
                      ? 'text-green-500'
                      : String(result.vote_average).slice(0, 3) > 5
                      ? 'text-yellow-500'
                      : String(result.vote_average).slice(0, 3) <= 0
                      ? 'text-white'
                      : 'text-red-500'
                  }`}
                >
                  <AiFillStar className="text-lg text-yellow-500" />{' '}
                  {result.vote_average &&
                    String(result.vote_average).slice(0, 3)}
                </p>
                <FullName
                  showFullNameIndex={allCreditPageShowFullNameIndex}
                  setShowFullNameIndex={setAllCreditPageShowFullNameIndex}
                  result={result}
                  idx={idx}
                />
                <p className="text-gray-400 text-sm">
                  {result.first_air_date && result.first_air_date !== ''
                    ? new Date(result.first_air_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : result.release_date && result.release_date !== ''
                    ? new Date(result.release_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : 'Date not found'}
                </p>
              </div>
            ))}
          {!searchedResultArray.length > 0 &&
            !isShowRestButtonClicked &&
            state.credits.cast
              .concat(state.credits.crew)
              .slice(0, 50)
              .map((result, idx) => (
                <div
                  key={idx}
                  className="relative hover:scale-y-110 hover:scale-x-105 transition-all duration-300"
                >
                  <FavoriteButton
                    userFavoriteArray={
                      result.original_name
                        ? userFavoriteSeries
                        : userFavoriteMovies
                    }
                    data={result}
                    index={idx}
                    addFavoriteHandler={
                      result.original_name
                        ? addFavoriteSeriesHandler
                        : addFavoriteMoviesHandler
                    }
                    addedNotify={addedNotify}
                    removeFavoriteHandler={
                      result.original_name
                        ? removeFavoriteSeriesHandler
                        : removeFavoriteMoviesHandler
                    }
                    removedNotify={removedNotify}
                  />
                  <Link
                    to={`/detail/${result.id}`}
                    state={{ type: result.media_type, id: result.id }}
                  >
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w185_and_h278_face/${result.poster_path}`
                          : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                      }
                      alt=""
                      loading="lazy"
                      className="w-52 h-64 rounded-md"
                    />
                  </Link>
                  <p
                    className={`absolute px-1 py-1 bg-[#010f16] top-0 border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
                      result.vote_average &&
                      String(result.vote_average).slice(0, 3) > 7
                        ? 'text-green-500'
                        : String(result.vote_average).slice(0, 3) > 5
                        ? 'text-yellow-500'
                        : String(result.vote_average).slice(0, 3) <= 0
                        ? 'text-white'
                        : 'text-red-500'
                    }`}
                  >
                    <AiFillStar className="text-lg text-yellow-500" />{' '}
                    {result.vote_average &&
                      String(result.vote_average).slice(0, 3)}
                  </p>
                  <FullName
                    showFullNameIndex={allCreditPageShowFullNameIndex}
                    setShowFullNameIndex={setAllCreditPageShowFullNameIndex}
                    result={result}
                    idx={idx}
                  />
                  <p className="text-gray-400 text-sm">
                    {result.first_air_date && result.first_air_date !== ''
                      ? new Date(result.first_air_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )
                      : result.release_date && result.release_date !== ''
                      ? new Date(result.release_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )
                      : 'Date not found'}
                  </p>
                </div>
              ))}
          {!searchedResultArray.length > 0 &&
            isShowRestButtonClicked &&
            state.credits.cast.concat(state.credits.crew).map((result, idx) => (
              <div
                key={idx}
                className="relative hover:scale-y-110 hover:scale-x-105 transition-all duration-300"
              >
                <FavoriteButton
                  userFavoriteArray={
                    result.original_name
                      ? userFavoriteSeries
                      : userFavoriteMovies
                  }
                  data={result}
                  index={idx}
                  addFavoriteHandler={
                    result.original_name
                      ? addFavoriteSeriesHandler
                      : addFavoriteMoviesHandler
                  }
                  addedNotify={addedNotify}
                  removeFavoriteHandler={
                    result.original_name
                      ? removeFavoriteSeriesHandler
                      : removeFavoriteMoviesHandler
                  }
                  removedNotify={removedNotify}
                />
                <Link
                  to={`/detail/${result.id}`}
                  state={{ type: result.media_type, id: result.id }}
                >
                  <img
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w185_and_h278_face/${result.poster_path}`
                        : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                    }
                    alt=""
                    loading="lazy"
                    className="w-52 h-64 rounded-md"
                  />
                </Link>
                <p
                  className={`absolute px-1 py-1 bg-[#010f16] top-0 border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
                    result.vote_average &&
                    String(result.vote_average).slice(0, 3) > 7
                      ? 'text-green-500'
                      : String(result.vote_average).slice(0, 3) > 5
                      ? 'text-yellow-500'
                      : String(result.vote_average).slice(0, 3) <= 0
                      ? 'text-white'
                      : 'text-red-500'
                  }`}
                >
                  <AiFillStar className="text-lg text-yellow-500" />{' '}
                  {result.vote_average &&
                    String(result.vote_average).slice(0, 3)}
                </p>
                <FullName
                  showFullNameIndex={allCreditPageShowFullNameIndex}
                  setShowFullNameIndex={setAllCreditPageShowFullNameIndex}
                  result={result}
                  idx={idx}
                />
                <p className="text-gray-400 text-sm">
                  {result.first_air_date && result.first_air_date !== ''
                    ? new Date(result.first_air_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : result.release_date && result.release_date !== ''
                    ? new Date(result.release_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : 'Date not found'}
                </p>
              </div>
            ))}
        </div>
        {state.credits.cast.concat(state.credits.crew).length > 50 &&
          !searchedResultArray.length > 0 && (
            <button
              className={`mt-10 mb-3 px-3 py-3 font-bold rounded-md bg-slate-950 shadow-sm shadow-white hover:bg-slate-900 focus:bg-slate-900 tracking-tighter text-white transition-all duration-300 active:bg-black ${
                isShowRestButtonClicked ? 'hidden' : 'inline-block'
              }`}
              onClick={() => setIsShowRestButtonClicked(true)}
            >
              Show rest of the credits
            </button>
          )}
        {!searchedResultArray.length > 0 && (
          <button
            className={`mt-10 mb-3 px-3 py-3 font-bold rounded-md bg-slate-950 shadow-sm shadow-white hover:bg-slate-900 focus:bg-slate-900 tracking-tighter text-white transition-all duration-300 active:bg-black ${
              isShowRestButtonClicked ? 'inline-block' : 'hidden'
            }`}
            onClick={() => setIsShowRestButtonClicked(false)}
          >
            Hide rest of the credits
          </button>
        )}
      </section>
    </main>
  );
}

export default PersonAllCredits;
