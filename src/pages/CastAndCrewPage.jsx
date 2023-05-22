import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import { Helmet } from 'react-helmet';

function CastAndCrewPage() {
  const { state } = useLocation();
  const [isShowRestForCastButtonClicked, setIsShowRestForCastButtonClicked] =
    useState(false);
  const [isShowRestForCrewButtonClicked, setIsShowRestForCrewButtonClicked] =
    useState(false);

  return (
    <main className="flex flex-col min-h-screen">
      <Helmet>
        <title>{state.name + ' cast & crew page'}</title>
        <meta
          name="description"
          content="Cast & crew page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      <section className="flex flex-col items-center justify-center mt-32">
        <Link
          className="self-center mb-5 text-white hover:scale-105 hover:text-yellow-300 lg:text-lg transition-all duration-300 max-w-lg text-center"
          to={`/detail/${state.id}`}
          state={{ id: state.id, type: state.type }}
        >
          Go to {state.name}
        </Link>
        <div className="flex w-full min-h-screen justify-evenly text-white">
          <div className="h-full flex flex-col w-[33.3%]">
            <p className="lg:text-3xl text-xl mb-4">
              Cast ({state.cast.length})
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {isShowRestForCastButtonClicked
                ? state.cast.map((cast, idx) => (
                    <div
                      key={idx}
                      className="hover:scale-105 transition-all duration-300"
                    >
                      <Link
                        to={`/person/${cast.id}`}
                        state={{ id: cast.id }}
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
                          className="h-24 sm:h-28 md:h-40 w-full bg-white/70 lg:h-40 xl:h-48 2xl:h-52 rounded-md"
                          loading="lazy"
                        />
                      </Link>
                      <p className="lg:max-w-[128px] max-w-[64px] text-xs font-bold pt-1">
                        {cast.name}
                      </p>
                    </div>
                  ))
                : state.cast.slice(0, 36).map((cast, idx) => (
                    <div
                      key={idx}
                      className="hover:scale-105 transition-all duration-300"
                    >
                      <Link
                        to={`/person/${cast.id}`}
                        state={{ id: cast.id }}
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
                          className="h-24 sm:h-28 md:h-40 w-full bg-white/70 lg:h-40 xl:h-48 2xl:h-52 rounded-md"
                          loading="lazy"
                        />
                      </Link>
                      <p className="lg:max-w-[128px] max-w-[64px] text-xs font-bold pt-1">
                        {cast.name}
                      </p>
                    </div>
                  ))}
            </div>
            {state.cast.length > 36 && (
              <button
                className="self-center shadow-sm shadow-white transition-all duration-300 font-bold py-2 lg:px-2.5 text-sm px-2 lg:text-lg flex items-center justify-center gap-1 rounded-md mt-10 mb-5 tracking-tighter hover:scale-105"
                onClick={() => {
                  setIsShowRestForCastButtonClicked(
                    !isShowRestForCastButtonClicked,
                  );
                }}
              >
                {isShowRestForCastButtonClicked ? 'Show less' : 'Show more'}
                <MdExpandMore
                  className={`text-2xl ${
                    isShowRestForCastButtonClicked ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            )}
          </div>
          <div className="min-h-full border"></div>
          <div className="h-full flex flex-col w-[33.3%]">
            <p className="lg:text-3xl text-xl mb-4">
              Crew ({state.crew.length})
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 h-full">
              {isShowRestForCrewButtonClicked
                ? state.crew.map((crew, idx) => (
                    <div
                      key={idx}
                      className="hover:scale-105 transition-all duration-300"
                    >
                      <Link
                        to={`/person/${crew.id}`}
                        state={{ id: crew.id }}
                        className="hover:scale-105 "
                      >
                        <img
                          src={
                            crew.profile_path
                              ? `https://image.tmdb.org/t/p/w185/${crew.profile_path}`
                              : crew.gender === 1
                              ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                              : crew.gender === 2
                              ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                              : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                          }
                          alt=""
                          className="h-24 sm:h-28 md:h-40 w-full bg-white/70 lg:h-40 xl:h-48 2xl:h-52 rounded-md"
                          loading="lazy"
                        />
                      </Link>
                      <div className="lg:max-w-[128px] max-w-[50px] text-xs pt-1 space-y-1">
                        <p className="font-bold">{crew.name}</p>
                        <p className="opacity-70">{crew.job}</p>
                      </div>
                    </div>
                  ))
                : state.crew.slice(0, 36).map((crew, idx) => (
                    <div
                      key={idx}
                      className="hover:scale-105 transition-all duration-300"
                    >
                      <Link
                        to={`/person/${crew.id}`}
                        state={{ id: crew.id }}
                        className="hover:scale-105"
                      >
                        <img
                          src={
                            crew.profile_path
                              ? `https://image.tmdb.org/t/p/w185/${crew.profile_path}`
                              : crew.gender === 1
                              ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                              : crew.gender === 2
                              ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                              : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                          }
                          alt=""
                          className="h-24 sm:h-28 md:h-40 w-full bg-white/70 lg:h-40 xl:h-48 2xl:h-52 rounded-md"
                          loading="lazy"
                        />
                      </Link>
                      <div className="lg:max-w-[128px] max-w-[64px] text-xs pt-1 space-y-1">
                        <p className="font-bold">{crew.name}</p>
                        <p className="opacity-70">{crew.job}</p>
                      </div>
                    </div>
                  ))}
            </div>
            {state.crew.length > 36 && (
              <button
                className="self-center shadow-sm shadow-white transition-all duration-300 font-bold py-2 lg:px-2.5 text-sm px-2 lg:text-lg flex items-center justify-center gap-1 rounded-md mt-10 mb-5 tracking-tighter hover:scale-105"
                onClick={() => {
                  setIsShowRestForCrewButtonClicked(
                    !isShowRestForCrewButtonClicked,
                  );
                }}
              >
                {isShowRestForCrewButtonClicked ? 'Show less' : 'Show more'}
                <MdExpandMore
                  className={`text-2xl ${
                    isShowRestForCrewButtonClicked ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CastAndCrewPage;
