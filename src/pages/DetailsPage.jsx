import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextData } from '../context/context';
import { AiFillStar, AiOutlineLink } from 'react-icons/ai';
import { GiFilmSpool } from 'react-icons/gi';
import { MdReadMore } from 'react-icons/md';
import Spinner from '../components/Spinner';
import ReactPlayer from 'react-player/youtube';
import DetailPageFavoriteButton from '../components/DetailPageFavoriteButton';
import { Helmet } from 'react-helmet';

function DetailsPage() {
  const {
    loading,
    setLoading,
    isTrailerButtonClicked,
    setIsTrailerButtonClicked,
    userFavoriteMovies,
    userFavoriteSeries,
    errorNotify,
  } = useContext(ContextData);
  const { state } = useLocation();
  const trailerContainerRef = useRef(null);
  const trailerToggleButtonRef = useRef(null);
  const [detailData, setDetailData] = useState([]);
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const detailsFetcher = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/${state.type}/${
            state?.result?.id ? state.result.id : state.id
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&append_to_response=credits,videos,similar,alternative_titles,keywords,images`,
          { signal },
        );
        const data = await response.json();
        setDetailData(data);
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
    detailsFetcher();

    return () => {
      controller.abort();
    };
  }, [state?.id, state?.type, state?.result?.id]);

  useEffect(() => {
    if (detailData?.videos?.results?.length > 0) {
      setTrailerId(
        detailData.videos.results.find((video) => video.type === 'Trailer')
          ?.key,
      );
    }
  }, [detailData.videos, state?.id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        trailerContainerRef.current &&
        !trailerContainerRef.current.contains(event.target) &&
        !trailerToggleButtonRef.current.contains(event.target)
      ) {
        setIsTrailerButtonClicked(false);
      }
    }
    function handleButtonClick(e) {
      setIsTrailerButtonClicked(true);
    }

    document.body.addEventListener('click', handleClickOutside);

    trailerToggleButtonRef?.current?.addEventListener(
      'click',
      handleButtonClick,
    );

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isTrailerButtonClicked]);

  useEffect(() => {
    const scrollDownOptions = {
      top: trailerContainerRef.current.offsetTop - 150,
      behavior: 'smooth',
    };
    const scrollTopOptions = {
      top: 0,
      behavior: 'smooth',
    };
    if (trailerContainerRef && isTrailerButtonClicked) {
      window.scrollTo(scrollDownOptions);
    } else {
      window.scrollTo(scrollTopOptions);
    }
  }, [isTrailerButtonClicked]);

  useEffect(() => {
    if (isTrailerButtonClicked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isTrailerButtonClicked]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen mt-14 md:mt-0">
      <Helmet>
        <title>
          {detailData?.original_name ||
            detailData?.original_title + ' detail page'}
        </title>
        <meta
          name="description"
          content="Detail page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      <div
        className={`absolute z-50 opacity-100 ${
          isTrailerButtonClicked ? 'inline-block' : 'hidden'
        }`}
        ref={trailerContainerRef}
      >
        <div className="relative">
          <span
            className="right-0 -top-10 absolute bg-black text-white text-lg hover:bg-white hover:text-black rounded-full flex items-center justify-center w-8 h-8 cursor-pointer transition-all duration-300 font-bold"
            onClick={() => setIsTrailerButtonClicked(false)}
          >
            X
          </span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerId}`}
            controls={true}
            width={
              document.body.clientWidth >= 1280
                ? 1000
                : document.body.clientWidth >= 1024 &&
                  document.body.clientWidth < 1280
                ? 900
                : document.body.clientWidth >= 768 &&
                  document.body.clientWidth < 1024
                ? 650
                : document.body.clientWidth >= 640 &&
                  document.body.clientWidth < 768
                ? 550
                : 350
            }
            height={
              document.body.clientWidth >= 1280
                ? 562.5
                : document.body.clientWidth >= 1024 &&
                  document.body.clientWidth < 1280
                ? 506
                : document.body.clientWidth >= 768 &&
                  document.body.clientWidth < 1024
                ? 406
                : document.body.clientWidth >= 640 &&
                  document.body.clientWidth < 768
                ? 310
                : 250
            }
            playing={isTrailerButtonClicked ? true : false}
          />
          <div className="lg:text-white md:text-lg sm:text-right"></div>
        </div>
      </div>
      {loading && <Spinner />}
      {!loading && (
        <section
          className={`min-h-screen w-full ${
            isTrailerButtonClicked ? 'opacity-40 pointer-events-none' : ''
          } transition-all duration-300`}
        >
          <div className="relative flex items-center justify-center">
            {detailData.backdrop_path ? (
              <>
                <div className="w-full h-[900px] bg-gray-950 block md:hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${detailData.backdrop_path}`}
                    alt=""
                    className="brightness-[1] shadow-md shadow-white w-full h-[275px] md:h-[900px] block md:hidden"
                    loading="lazy"
                    tabIndex="0"
                  />
                </div>
                <div className="w-full hidden md:block">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${detailData.backdrop_path}`}
                    alt=""
                    className="w-full brightness-[0.3] md:h-[600px] xl:h-[700px] 2xl:h-[900px]"
                    loading="lazy"
                    tabIndex="0"
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-[700px] brightness-[0.35] bg-black"></div>
            )}
            <div className="absolute flex items-center flex-col space-y-5 lg:space-y-0 md:flex-row md:space-x-7 text-white px-3">
              <img
                src={
                  detailData.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${detailData.poster_path}`
                    : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                }
                alt=""
                className="xl:w-72 xl:h-96 md:w-60 md:h-80 sm:w-56 sm:h-64 w-52 h-60 rounded-md"
                loading="lazy"
              />
              <div className="md:max-x-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl flex flex-col space-y-5">
                <p className="text-3xl font-bold tracking-tighter">
                  {detailData.original_title
                    ? detailData.original_title
                    : detailData.original_name}
                </p>
                <div>
                  {detailData?.genres?.length > 0 &&
                    detailData.genres
                      .map((genre, idx) => {
                        return (
                          <Link
                            key={idx}
                            to={`/genre/${genre.id}`}
                            state={{
                              id: genre.id,
                              type: state.type,
                              genre: genre.name,
                            }}
                            aria-label="genre-link"
                            className="hover:text-yellow-500 transition-all duration-300 text-slate-200 tracking-tighter focus:rounded-sm"
                          >
                            {genre.name}
                          </Link>
                        );
                      })
                      .reduce((prev, curr) => [prev, ' / ', curr])}
                </div>
                <div className="self-start flex items-center space-x-4">
                  <p
                    className={`px-1 py-1 bg-slate-950 border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
                      detailData.vote_average &&
                      String(detailData.vote_average).slice(0, 3) > 7
                        ? 'text-green-500'
                        : detailData.vote_average &&
                          String(detailData.vote_average).slice(0, 3) > 5
                        ? 'text-yellow-500'
                        : String(detailData.vote_average).slice(0, 3) <= 0
                        ? 'text-white'
                        : 'text-red-500'
                    } `}
                  >
                    <AiFillStar className="text-lg text-yellow-400" />{' '}
                    {detailData.vote_average &&
                      String(detailData.vote_average).slice(0, 3)}
                  </p>
                  {detailData.runtime && (
                    <p>
                      <span className="text-lg font-bold">
                        {Math.trunc(detailData.runtime / 60) +
                          'h' +
                          ' ' +
                          (detailData.runtime % 60) +
                          'm'}{' '}
                      </span>
                    </p>
                  )}
                </div>
                <p
                  className={`font-medium tracking-tight ${
                    detailData.overview && detailData.overview.length > 400
                      ? 'text-sm lg:text-base'
                      : ''
                  }`}
                >
                  {detailData.overview}
                </p>
                <div className="flex space-x-3">
                  <div className="relative">
                    <button
                      className={`flex items-center gap-x-1.5 bg-slate-950 transition-all duration-300 rounded-md px-4 py-3 font-bold focus:outline-none focus:scale-105  ${
                        trailerId
                          ? 'cursor-pointer hover:scale-x-105 hover:scale-y-110'
                          : 'cursor-not-allowed'
                      } tracking-tighter text-lg shadow shadow-white`}
                      disabled={!trailerId ? true : false}
                      ref={trailerToggleButtonRef}
                      onClick={() => setIsTrailerButtonClicked(true)}
                      aria-label="trailer-button"
                    >
                      Watch trailer <GiFilmSpool />
                    </button>
                    {!trailerId && (
                      <span className="absolute text-sm font-bold mt-1.5">
                        There is no trailer!
                      </span>
                    )}
                  </div>
                  <DetailPageFavoriteButton
                    data={detailData}
                    userFavoriteArray={
                      detailData.original_name
                        ? userFavoriteSeries
                        : userFavoriteMovies
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-evenly flex-col lg:flex-row">
            <div className="flex flex-col items-center mt-10">
              <p className="text-white font-bold text-lg">
                Cast /{' '}
                <Link
                  to={'/cast&crew'}
                  state={{
                    type: detailData.original_name ? 'tv' : 'movie',
                    id: detailData.id,
                    name: detailData.original_name
                      ? detailData.original_name
                      : detailData.original_title,
                    cast: detailData?.credits?.cast,
                    crew: detailData?.credits?.crew,
                  }}
                  className="hover:text-yellow-500 transition-all duration-300 focus:rounded-md"
                  aria-label="all-cast-crew-link"
                >
                  Show all cast & crew
                </Link>
              </p>
              <div
                className={`flex flex-row items-center gap-x-5 overflow-x-auto scroll-smooth pb-5 castScroll max-w-[320px] sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl pt-10`}
              >
                {detailData?.credits?.cast?.length > 0
                  ? detailData?.credits?.cast?.length > 10
                    ? detailData.credits.cast.slice(0, 10).map((cast, idx) => (
                        <div
                          className="min-w-[175px] min-h-[250px] h-[300px] w-[175px] rounded-md bg-slate-950 border flex flex-col gap-y-2 text-sm overflow-hidden"
                          key={idx}
                        >
                          <Link
                            to={`/person/${cast.id}`}
                            state={{ id: cast.id }}
                            aria-label="cast-poster-link"
                            className="focus:outline-none focus:scale-105"
                          >
                            <img
                              src={
                                cast.profile_path
                                  ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                                  : cast.gender === 1
                                  ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                                  : cast.gender === 2
                                  ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                                  : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                              }
                              loading="lazy"
                              alt="poster"
                              className="w-full h-44 rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300 bg-white/70"
                            />
                          </Link>
                          <div className="max-w-[200px] px-2 pb-3 text-base space-y-1">
                            <Link
                              to={`/person/${cast.id}`}
                              state={{ id: cast.id }}
                              className="font-bold text-white hover:text-slate-400 focus:outline-dashed focus:outline-white focus:rounded-sm"
                              aria-label="cast-name-link"
                            >
                              {cast.original_name}
                            </Link>
                            <p className="text-sm font-bold text-yellow-500 tracking-tighter">
                              {cast.character}
                            </p>
                          </div>
                        </div>
                      ))
                    : detailData.credits.cast.map((cast, idx) => (
                        <div
                          className="min-w-[175px] min-h-[250px] h-[300px] w-[175px] rounded-md bg-slate-950 border flex flex-col gap-y-2 text-sm overflow-hidden"
                          key={idx}
                        >
                          <Link
                            to={`/person/${cast.id}`}
                            state={{ id: cast.id }}
                            aria-label="cast-poster-link"
                            className="focus:outline-none focus:scale-105"
                          >
                            <img
                              src={
                                cast.profile_path
                                  ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                                  : cast.gender === 1
                                  ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                                  : cast.gender === 2
                                  ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                                  : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                              }
                              alt=""
                              loading="lazy"
                              className="w-full h-44 rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300 bg-white/70"
                            />
                          </Link>
                          <div className="max-w-[200px] px-2 pb-3 text-base space-y-1">
                            <Link
                              to={`/person/${cast.id}`}
                              state={{ id: cast.id }}
                              className="font-bold text-white hover:text-slate-400 focus:outline-dashed focus:outline-white focus:rounded-sm"
                              aria-label="cast-name-link"
                            >
                              {cast.original_name}
                            </Link>
                            <p className="text-sm font-bold text-yellow-500 tracking-tighter">
                              {cast.character}
                            </p>
                          </div>
                        </div>
                      ))
                  : ''}
                {detailData?.credits?.cast?.length > 10 && (
                  <Link
                    to={'/cast&crew'}
                    state={{
                      type: detailData.original_name ? 'tv' : 'movie',
                      id: detailData.id,
                      name: detailData.original_name
                        ? detailData.original_name
                        : detailData.original_title,
                      cast: detailData?.credits?.cast,
                      crew: detailData?.credits?.crew,
                    }}
                    className="min-w-[120px] flex items-center gap-2 font-bold text-white focus:text-slate-400 hover:text-slate-400 focus:outline-none"
                    aria-label="view-more-link"
                  >
                    View more <MdReadMore className="text-2xl" />
                  </Link>
                )}
              </div>
              {detailData.similar?.results?.length > 0 && (
                <div className="mt-14">
                  <p className="text-2xl text-white font-bold tracking-tighter">
                    Similar results
                  </p>
                  <div
                    className={`flex flex-row items-center gap-x-5 overflow-x-auto scroll-smooth pb-5 castScroll max-w-[320px] sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl pt-10`}
                  >
                    {detailData.similar?.results?.length > 0 &&
                      detailData.similar?.results.map((similar, idx) => (
                        <div
                          className="min-w-[300px] min-h-[175px] rounded-md flex flex-col gap-y-3 text-sm overflow-hidden"
                          key={idx}
                        >
                          <Link
                            to={`/detail/${similar.id}`}
                            state={{
                              result: similar,
                              type: similar.original_title ? 'movie' : 'tv',
                            }}
                            className="focus:outline-none focus:scale-105"
                            aria-label="similar-poster-link"
                          >
                            <img
                              src={
                                similar.poster_path
                                  ? `https://image.tmdb.org/t/p/w342/${similar.poster_path}`
                                  : 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/8f2a4a2c9126a9f265fb9e1023b1698a.jpg?compress=1&resize=400x300'
                              }
                              alt=""
                              className="w-full h-52 hover:scale-105 transition-all duration-300"
                              loading="lazy"
                            />
                          </Link>
                          <Link
                            className="text-white tracking-tighter text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none hover:text-yellow-300 focus:text-yellow-300 self-start max-w-[275px]"
                            to={`/detail/${similar.id}`}
                            state={{
                              result: similar,
                              type: similar.original_title ? 'movie' : 'tv',
                            }}
                            aria-label="similar-name-link"
                          >
                            {similar.original_title
                              ? similar.original_title
                              : similar.original_name}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className={`max-w-xs space-y-7 px-2 mt-10 lg:pt-0 self-center ${
                detailData.original_name ? 'text-center' : ''
              } sm:text-center lg:text-left`}
            >
              <p className="text-white text-[15px] font-bold">
                {detailData.first_air_date && detailData.first_air_date !== ''
                  ? 'First Air Date'
                  : 'Release Date'}
                <br />
                <span className="text-sm font-normal opacity-70 tracking-tight">
                  {detailData.first_air_date && detailData.first_air_date !== ''
                    ? new Date(detailData.first_air_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : detailData.release_date && detailData.release_date !== ''
                    ? new Date(detailData.release_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : 'Unknown'}
                </span>
              </p>
              {detailData.last_air_date && detailData.last_air_date !== '' && (
                <p className="text-white text-[15px] font-bold">
                  Last Air Date
                  <br />
                  <span className="text-sm font-normal opacity-70 tracking-tight">
                    {new Date(detailData.last_air_date).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </span>
                </p>
              )}
              {detailData.homepage && (
                <div
                  className={`text-white flex flex-col ${
                    detailData.original_name ? 'items-center' : ''
                  } sm:items-center lg:items-start`}
                >
                  Homepage
                  <a
                    href={detailData.homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineLink className="text-xl mt-1 transition-all duration-300 hover:text-blue-500" />
                  </a>
                </div>
              )}
              <p className="text-white text-[15px] font-bold">
                Original Language
                <br />
                <span className="text-sm font-normal opacity-70 tracking-tight">
                  {detailData.original_language &&
                    new Intl.DisplayNames([detailData.original_language], {
                      type: 'language',
                    })
                      .of(detailData.original_language)
                      .slice(0, 1)
                      .toUpperCase() +
                      new Intl.DisplayNames([detailData.original_language], {
                        type: 'language',
                      })
                        .of(detailData.original_language)
                        .slice(1)}
                </span>
              </p>
              <p className="text-white text-[15px] font-bold">
                Status
                <br />
                <span className="text-sm font-normal opacity-70 tracking-tight">
                  {detailData.status}
                </span>
              </p>
              {detailData.type && (
                <p className="text-white text-[15px] font-bold">
                  Type
                  <br />
                  <span className="text-sm font-normal opacity-70">
                    {detailData.type}
                  </span>
                </p>
              )}
              {detailData.number_of_episodes &&
                detailData.number_of_seasons && (
                  <p className="text-white text-[15px] font-bold">
                    Season & Episode number
                    <br />
                    <span className="text-sm font-normal opacity-70 tracking-tight">
                      Season number: {detailData.number_of_seasons}
                      <br />
                      Episode number: {detailData.number_of_episodes}
                    </span>
                  </p>
                )}
              {detailData.budget > 0 && (
                <p className="text-white text-[15px] font-bold">
                  Budget
                  <br />
                  <span className="text-sm font-normal opacity-70 tracking-tight">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                      .format(detailData.budget)
                      .replace('$', '$ ')}
                  </span>
                </p>
              )}
              {detailData.revenue > 0 && (
                <p className="text-white text-[15px] font-bold">
                  Revenue
                  <br />
                  <span className="text-sm font-normal opacity-70 tracking-tight">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                      .format(detailData.revenue)
                      .replace('$', '$ ')}
                  </span>
                </p>
              )}
              {detailData?.keywords?.keywords?.length > 0 && (
                <div className="text-white flex flex-col max-w-xs">
                  <span className="text-white text-[15px] font-bold">
                    Keywords
                  </span>
                  <div className="flex gap-2 flex-wrap sm:justify-center lg:justify-start text-xs pt-1">
                    {state.type === 'movie'
                      ? detailData?.keywords?.keywords.map((keyword, idx) => (
                          <Link
                            to={`/keyword/${keyword.id}`}
                            state={{
                              id: keyword.id,
                              name: keyword.name,
                              movieName: detailData.original_title,
                              movieId: detailData.id,
                            }}
                            key={idx}
                            className="px-1.5 py-1 text-lg bg-slate-900 hover:bg-white hover:text-black font-bold transition-all duration-300 rounded-md focus:outline-dashed focus:outline-white"
                            aria-label="keyword-link"
                          >
                            {keyword.name.slice(0, 1).toUpperCase() +
                              keyword.name.slice(1)}
                          </Link>
                        ))
                      : detailData?.keywords?.keywords.map((keyword, idx) => (
                          <p
                            key={idx}
                            className="px-1.5 py-1 text-lg bg-slate-900 hover:bg-white hover:text-black font-bold transition-all duration-300 rounded-md"
                          >
                            {keyword.name}
                          </p>
                        ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default DetailsPage;
