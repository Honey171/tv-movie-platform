import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContextData } from '../context/context';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import {
  AiFillStar,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function SliderContainer() {
  const { trending, movieGenres, tvGenres } = useContext(ContextData);
  const thumbRef = useRef(null);
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [selectedSliderItem, setSelectedSliderItem] = useState(null);
  const [showingSliderItem, setShowingSliderItem] = useState(0);
  const [carouselAutoSwipe, setCarouselAutoSwipe] = useState(true);

  useEffect(() => {
    if (trending.length > 0) {
      setFilteredTrending(
        trending.filter(
          (obj, idx, self) =>
            idx ===
            self.findIndex((t) => t.id === obj.id && t.title === obj.title),
        ),
      );
    }
  }, [trending]);

  useEffect(() => {
    const selectedThumbItem = thumbRef.current?.children[showingSliderItem];
    if (selectedThumbItem) {
      const thumbContainerWidth = thumbRef.current.offsetWidth;
      const thumbItemWidth = selectedThumbItem.offsetWidth;
      const thumbItemLeft = selectedThumbItem.offsetLeft;
      const thumbItemRight = thumbItemLeft + thumbItemWidth;
      const containerScrollLeft = thumbRef.current.scrollLeft;

      let scrollLeft = containerScrollLeft;
      if (thumbItemLeft < containerScrollLeft) {
        scrollLeft = thumbItemLeft - thumbContainerWidth / 2;
      } else if (thumbItemRight > containerScrollLeft + thumbContainerWidth) {
        scrollLeft = thumbItemRight - thumbContainerWidth / 2;
      }

      const scrollHandler = () => {
        thumbRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      };
      requestAnimationFrame(scrollHandler);
    }
  }, [showingSliderItem]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="absolute text-white z-40 sm:bottom-[405px] sm:right-40 bottom-[25rem] right-32">
        <div className="flex flex-col translate-y-5 space-y-1">
          <span
            className="flex items-center gap-2 cursor-pointer font-bold text-sm sm:text-base"
            onClick={() => setCarouselAutoSwipe(!carouselAutoSwipe)}
          >
            Auto swipe:{' '}
            {carouselAutoSwipe ? (
              <AiOutlineCheck className="text-xl bg-green-600 rounded-sm" />
            ) : (
              <AiOutlineClose className="text-xl bg-red-600 rounded-sm" />
            )}
          </span>
          <span className="text-sm text-slate-300">Auto swipe time: 5s</span>
        </div>
      </div>
      <Carousel
        autoPlay={carouselAutoSwipe ? true : false}
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeable={false}
        selectedItem={selectedSliderItem && selectedSliderItem}
        useKeyboardArrows={true}
        onChange={(index) => {
          setShowingSliderItem(index);
          setSelectedSliderItem(null);
        }}
        transitionTime={500}
        interval={5000}
        renderArrowPrev={(clickHandler) => {
          return (
            <div
              className={`absolute sm:h-10 h-8 w-8 bottom-10 right-20 sm:right-24 cursor-pointer z-20 text-black text-xl bg-white rounded-full hover:scale-105 transition-all duration-300 items-center justify-center sm:w-10 flex`}
              onClick={clickHandler}
            >
              <AiOutlineLeft />
            </div>
          );
        }}
        renderArrowNext={(clickHandler) => {
          return (
            <div
              className={`absolute sm:h-10 h-8 w-8 bottom-10 right-10 cursor-pointer z-20 text-black text-xl bg-white rounded-full hover:scale-105 duration-300 items-center justify-center sm:w-10 flex`}
              onClick={clickHandler}
            >
              <AiOutlineRight />
            </div>
          );
        }}
      >
        {filteredTrending?.length > 0 &&
          filteredTrending?.map((result, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center justify-center"
            >
              <div className="w-full h-[825px] bg-gray-950 block md:hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${result.backdrop_path}`}
                  alt=""
                  className="brightness-[1] shadow-md shadow-white h-[275px] md:h-[900px] block md:hidden"
                  loading="lazy"
                />
              </div>
              <div className="w-full hidden md:block">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${result.backdrop_path}`}
                  alt=""
                  className="w-full brightness-[0.3] md:h-[600px] xl:h-[700px] 2xl:h-[900px]"
                  loading="lazy"
                />
              </div>

              <div className="absolute text-white md:flex-row flex-col-reverse flex items-center xl:space-x-40 lg:space-x-20 md:space-x-20 px-3 max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                <div className="flex flex-col items-start space-y-3 md:space-y-5">
                  <p className="text-2xl sm:text-3xl xl:text-4xl text-left tracking-tighter">
                    {result.name ? result.name : result.original_title}
                  </p>
                  <p
                    className={`px-1 py-1 bg-slate-950 border-l-2 rounded-tl-md rounded-br-md flex items-center gap-1 font-bold ${
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
                  <div className="text-sm text-slate-200 tracking-tighter xl:text-lg">
                    {result.media_type === 'movie'
                      ? result.genre_ids
                          .map((id) => {
                            return (
                              <Link
                                key={id}
                                to={`/genre/${id}`}
                                state={{
                                  id: id,
                                  type: 'movie',
                                  genre: movieGenres.find(
                                    (genre) => genre.id === id,
                                  )?.name,
                                }}
                                tabIndex="-1"
                                className="hover:text-yellow-400 rounded-full transition-all duration-300 outline-none"
                              >
                                {
                                  movieGenres.find((genre) => genre.id === id)
                                    ?.name
                                }
                              </Link>
                            );
                          })
                          .reduce((prev, curr) => [prev, ' / ', curr])
                      : result.genre_ids
                          .map((id) => {
                            return (
                              <Link
                                key={id}
                                to={`/genre/${id}`}
                                state={{
                                  id: id,
                                  type: 'tv',
                                  genre: tvGenres.find(
                                    (genre) => genre.id === id,
                                  )?.name,
                                }}
                                tabIndex="-1"
                                className="hover:text-yellow-400 rounded-full transition-all duration-300 outline-none"
                              >
                                {
                                  tvGenres.find((genre) => genre.id === id)
                                    ?.name
                                }
                              </Link>
                            );
                          })
                          .reduce((prev, curr) => [prev, ' / ', curr])}
                  </div>
                  <p
                    className={`text-sm xl:text-lg text-white text-left ${
                      result.overview.length > 300
                        ? 'text-xs md:text-sm xl:text-base'
                        : ''
                    }`}
                  >
                    {result.overview}
                  </p>
                  <p className="md:text-lg text-yellow-400">
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
                      : 'Unknown'}
                  </p>
                  <Link
                    to={`/detail/${result.id}`}
                    state={{ result, type: result.media_type }}
                    tabIndex="-1"
                    className="bg-slate-950 shadow-sm shadow-white text-white font-bold hover:scale-x-105 hover:scale-y-110 px-4 py-2 rounded-md transition-all duration-300"
                  >
                    See details
                  </Link>
                </div>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w342${result.poster_path}`}
                    alt=""
                    className="max-w-[200px] max-h-[250px] sm:min-w-[200px] sm:min-h-[200px] md:min-h-[250px] lg:min-w-[220px] lg:min-h-[300px] xl:min-w-[275px] xl:min-h-[375px] rounded-md mb-2"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
      </Carousel>
      <div>
        <p className="text-white text-xl font-bold my-3 tracking-tighter">
          Trending Thumbs
        </p>
        <div
          className="flex flex-row gap-5 pb-10 xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-[350px] overflow-x-auto sliderContentScroll scroll-smooth px-2 pt-2"
          ref={thumbRef}
        >
          {filteredTrending?.length > 0 &&
            filteredTrending?.map((result, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`flex flex-col min-w-[190px] hover:scale-y-95 transition-all duration-300 cursor-pointer outline-none focus:scale-y-95`}
                onClick={() => setSelectedSliderItem(idx)}
                onFocus={() => setSelectedSliderItem(idx)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w342${result.poster_path}`}
                  alt=""
                  className={`w-full h-48 rounded-b-lg rounded-t-sm ${
                    showingSliderItem === idx
                      ? 'shadow-lg shadow-yellow-400 transition-all duration-300'
                      : ''
                  }`}
                  loading="lazy"
                />
                <p className="max-w-[190px] font-bold text-white tracking-tighter translate-y-3">
                  {result.original_title
                    ? result.original_title
                    : result.original_name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SliderContainer;
