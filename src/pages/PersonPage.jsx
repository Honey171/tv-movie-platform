import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextData } from '../context/context';
import Spinner from '../components/Spinner';
import PersonGridTemplate from '../components/PersonGridTemplate';
import { Helmet } from 'react-helmet';

function PersonPage() {
  const {
    showBiographyButtonClicked,
    setShowBiographyButtonClicked,
    setLoading,
    loading,
    errorNotify,
    userFavoriteArray,
    addFavoriteHandler,
    removeFavoriteHandler,
    removedNotify,
    addedNotify,
  } = useContext(ContextData);
  const { state } = useLocation();
  const allBiographyContainerRef = useRef();
  const allBiographyButtonRef = useRef();
  const [personDetailData, setPersonDetailData] = useState([]);
  const [sortedPersonDetailData, setSortedPersonDetailData] = useState([]);
  const [favoriteHeartHoveredIdx, setFavoriteHeartHoveredIdx] = useState(-1);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const personDetailFetch = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${state.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=combined_credits`,
          { signal },
        );
        const data = await response.json();
        setPersonDetailData(data);
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

    personDetailFetch();

    return () => {
      controller.abort();
    };
  }, [state.id]);

  useEffect(() => {
    const scrollDownOptions = {
      top: allBiographyContainerRef.current.offsetTop - 150,
      behavior: 'smooth',
    };
    const scrollTopOptions = {
      top: 0,
      behavior: 'smooth',
    };
    if (allBiographyContainerRef && showBiographyButtonClicked) {
      window.scrollTo(scrollDownOptions);
    } else {
      window.scrollTo(scrollTopOptions);
    }
  }, [showBiographyButtonClicked]);

  useEffect(() => {
    if (showBiographyButtonClicked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showBiographyButtonClicked]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        allBiographyContainerRef.current &&
        !allBiographyContainerRef.current.contains(event.target) &&
        !allBiographyButtonRef.current.contains(event.target)
      ) {
        setShowBiographyButtonClicked(false);
      }
    }
    function handleButtonClick(event) {
      setShowBiographyButtonClicked(true);
    }

    document.body.addEventListener('click', handleClickOutside);

    allBiographyButtonRef?.current?.addEventListener(
      'click',
      handleButtonClick,
    );

    return () => {
      document.body.removeEventListener('click', handleClickOutside);

      allBiographyButtonRef?.current?.removeEventListener(
        'click',
        handleButtonClick,
      );
    };
  }, [showBiographyButtonClicked]);

  useEffect(() => {
    if (
      personDetailData?.combined_credits?.cast?.length > 0 ||
      personDetailData?.combined_credits?.crew?.length > 0
    ) {
      setSortedPersonDetailData(
        personDetailData.combined_credits.cast
          .concat(personDetailData.combined_credits.crew)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12),
      );
    }
  }, [
    personDetailData?.combined_credits?.cast,
    personDetailData?.combined_credits?.crew,
  ]);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center">
      <Helmet>
        <title>{personDetailData?.name + "'s page"}</title>
        <meta
          name="description"
          content="Person detail page"
        />
        <meta
          property="og:title"
          content="Movie/Tv series platform"
        />
      </Helmet>

      {loading && <Spinner />}
      <div
        ref={allBiographyContainerRef}
        className="absolute top-[40%] max-w-xl z-50"
      >
        {showBiographyButtonClicked && (
          <span
            className="absolute -top-10 right-2 text-white bg-black hover:bg-white hover:text-black font-bold w-8 h-8 text-lg flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setShowBiographyButtonClicked(false)}
          >
            X
          </span>
        )}
        <div
          className={`bg-black/80 text-white ${
            showBiographyButtonClicked ? 'inline-block' : 'hidden'
          } transition-all duration-300 text-center rounded-md overflow-y-auto h-72 px-2.5 py-2.5 mx-2 biographyScroll`}
        >
          {personDetailData.biography}
        </div>
      </div>
      {!loading && (
        <section
          className={`min-h-screen w-full flex flex-col justify-evenly items-center ${
            showBiographyButtonClicked
              ? 'opacity-30 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <div
            className={`relative flex items-center justify-center border-b lg:min-h-[625px] w-full lg:w-[90%] xl:w-[80%] lg:rounded-b-2xl pt-20 ${
              personDetailData?.biography &&
              personDetailData?.biography?.length >= 450
                ? 'min-h-[825px]'
                : 'min-h-[725px]'
            }`}
          >
            <div className="absolute max-w-4xl flex items-center lg:gap-x-10 gap-y-4 lg:gap-y-0 px-3 flex-col lg:flex-row">
              <img
                src={
                  personDetailData.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${personDetailData.profile_path}`
                    : personDetailData.gender === 1
                    ? 'https://cdn-icons-png.flaticon.com/512/634/634761.png'
                    : personDetailData.gender === 2
                    ? 'https://cdn-icons-png.flaticon.com/512/634/634788.png'
                    : 'https://cdn-icons-png.flaticon.com/512/3524/3524344.png'
                }
                alt=""
                className="lg:w-64 lg:h-96 w-48 h-64 md:w-60 md:h-72 rounded-md bg-white/80"
                loading="lazy"
              />
              <div className="flex flex-col gap-y-8 text-white font-bold">
                <p className="text-4xl text-yellow-400 tracking-tighter">
                  {personDetailData.name}
                </p>
                <div className="space-y-5">
                  <p className="text-yellow-400 tracking-tighter">Biography</p>
                  <p className="text-sm leading-5">
                    {personDetailData?.biography &&
                    personDetailData?.biography?.length >= 500
                      ? personDetailData?.biography?.slice(0, 500) + '...'
                      : !personDetailData.biography
                      ? 'Biography cannot found!'
                      : personDetailData.biography}
                  </p>
                </div>
                <button
                  className={`self-start bg-slate-950 shadow-sm shadow-white px-2 py-2 rounded-md hover:scale-y-110 hover:scale-x-105 transition-all duration-300 ${
                    personDetailData?.biography?.length >= 500
                      ? 'inline-block'
                      : 'hidden'
                  }`}
                  onClick={() => setShowBiographyButtonClicked(true)}
                  ref={allBiographyButtonRef}
                >
                  See all biography
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 mb-7 flex flex-col-reverse lg:flex-row lg:space-x-16 px-3">
            <div className="space-y-10 flex flex-col">
              <p className="text-3xl text-white font-bold tracking-tighter">
                Credits
              </p>
              {personDetailData?.combined_credits?.cast?.length <= 0 &&
                personDetailData?.combined_credits?.crew?.length <= 0 && (
                  <p className="text-white font-bold">There is no credits!</p>
                )}
              <PersonGridTemplate
                loading={loading}
                data={sortedPersonDetailData}
                userFavorites={userFavoriteArray}
                removeFavoriteItemFunction={removeFavoriteHandler}
                removedNotify={removedNotify}
                addFavoriteItemFunction={addFavoriteHandler}
                addedNotify={addedNotify}
                showFullNameIndex={favoriteHeartHoveredIdx}
                setShowFullNameIndex={setFavoriteHeartHoveredIdx}
              />
              {personDetailData?.combined_credits?.cast?.concat(
                personDetailData?.combined_credits?.crew,
              ).length > 12 && (
                <Link
                  to={`/person/${state.id}/combined_credits`}
                  state={{
                    credits: personDetailData.combined_credits,
                    personDetail: personDetailData,
                  }}
                  className="self-center px-2.5 py-2 bg-slate-950 shadow-sm shadow-white text-white font-bold rounded-md tracking-tighter text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  View all credits
                </Link>
              )}
            </div>
            <div className="max-w-xs space-y-5 text-white pb-10">
              <p className="font-semibold">
                Birthday <br />
                <span className="text-sm font-medium text-gray-400">
                  {personDetailData.birthday
                    ? new Date(personDetailData.birthday).toLocaleDateString(
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
              <p className="font-semibold">
                Place of birth <br />
                <span className="text-sm font-medium text-gray-400">
                  {personDetailData.place_of_birth
                    ? personDetailData.place_of_birth
                    : 'Unknown'}
                </span>
              </p>
              <p className="font-semibold">
                Known for <br />
                <span className="text-sm font-medium text-gray-400">
                  {personDetailData.known_for_department
                    ? personDetailData.known_for_department
                    : 'Unknown'}
                </span>
              </p>
              <p className="font-semibold">
                Gender <br />
                <span className="text-sm font-medium text-gray-400">
                  {personDetailData.gender === 1
                    ? 'Female'
                    : personDetailData.gender === 2
                    ? 'Male'
                    : 'Not specified'}
                </span>
              </p>
              <p className="font-semibold">
                Also known as <br />
                <span className="text-sm font-medium text-gray-400">
                  {personDetailData?.also_known_as?.length > 0 &&
                  personDetailData.also_known_as
                    ? personDetailData?.also_known_as[0]
                    : 'Unknown'}
                </span>
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default PersonPage;
