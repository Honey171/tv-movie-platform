import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ContextData = createContext();

export const ContextProvider = ({ children }) => {
  const [pageData, setPageData] = useState('Movie');
  const [loading, setLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [trending, setTrending] = useState({});
  const [chosenGenre, setChosenGenre] = useState({
    id: null,
    name: null,
  });
  const [genreResult, setGenreResult] = useState({});
  const [trendingDate, setTrendingDate] = useState('today');
  const [searchedMovieResults, setSearchedMovieResults] = useState({});
  const [searchedTvResults, setSearchedTvResults] = useState({});
  const [searchedPersonResults, setSearchedPersonResults] = useState({});
  const [showBiographyButtonClicked, setShowBiographyButtonClicked] =
    useState(false);
  const [isTrailerButtonClicked, setIsTrailerButtonClicked] = useState(false);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);
  const [userFavoriteSeries, setUserFavoriteSeries] = useState([]);
  const [userFavoritePeople, setUserFavoritePeople] = useState([]);
  const [recentSearchValues, setRecentSearchValues] = useState([]);

  const [movieGenres] = useState([
    {
      id: 28,
      name: 'Action',
      image: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
    },
    {
      id: 12,
      name: 'Adventure',
      image: 'https://image.tmdb.org/t/p/w500/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg',
    },
    {
      id: 16,
      name: 'Animation',
      image: 'https://image.tmdb.org/t/p/w500/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg',
    },
    {
      id: 35,
      name: 'Comedy',
      image: 'https://image.tmdb.org/t/p/w500/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg',
    },
    {
      id: 80,
      name: 'Crime',
      image: 'https://image.tmdb.org/t/p/w500/bvAMLx00BOr6vkSQWZscwGrPdGI.jpg',
    },
    {
      id: 99,
      name: 'Documentary',
      image: 'https://image.tmdb.org/t/p/w500/sGE6N1vJjxZLkOJEXdIOqTslxuL.jpg',
    },
    {
      id: 18,
      name: 'Drama',
      image: 'https://image.tmdb.org/t/p/w500/2Eewgp7o5AU1xCataDmiIL2nYxd.jpg',
    },
    {
      id: 10751,
      name: 'Family',
      image: 'https://image.tmdb.org/t/p/w500/fHWUxzEgCqIfToLjlY9UrR6uQtz.jpg',
    },
    {
      id: 14,
      name: 'Fantasy',
      image: 'https://image.tmdb.org/t/p/w500/wybmSmviUXxlBmX44gtpow5Y9TB.jpg',
    },
    {
      id: 36,
      name: 'History',
      image: 'https://image.tmdb.org/t/p/w500/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg',
    },
    {
      id: 27,
      name: 'Horror',
      image: 'https://image.tmdb.org/t/p/w500/dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg',
    },
    {
      id: 10402,
      name: 'Music',
      image: 'https://image.tmdb.org/t/p/w500/tsjXBo4LmzV0Bb9hdrz25tzX5GD.jpg',
    },
    {
      id: 9648,
      name: 'Mystery',
      image: 'https://image.tmdb.org/t/p/w500/kQW6UMeIfuDmYV6Dse9uKIu3IKg.jpg',
    },
    {
      id: 10749,
      name: 'Romance',
      image: 'https://image.tmdb.org/t/p/w500/wVxlmhk4OS2eCr0wTQcM4zJ20ml.jpg',
    },
    {
      id: 878,
      name: 'Science Fiction',
      image: 'https://image.tmdb.org/t/p/w500/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',
    },
    {
      id: 10770,
      name: 'Tv Movie',
      image: 'https://image.tmdb.org/t/p/w500/96SADhPnkXnVN3KaRKsDeBovLcm.jpg',
    },
    {
      id: 53,
      name: 'Thriller',
      image: 'https://image.tmdb.org/t/p/w500/22z44LPkMyf5nyyXvv8qQLsbom.jpg',
    },
    {
      id: 10752,
      name: 'War',
      image: 'https://image.tmdb.org/t/p/w500/4B6bYj7gr5wQBvQQhDwr6tzJyGR.jpg',
    },
    {
      id: 37,
      name: 'Western',
      image: 'https://image.tmdb.org/t/p/w500/15BnuDQ8pYRmLqPZKAk5vIhUu9J.jpg',
    },
  ]);
  const [tvGenres] = useState([
    {
      id: 10759,
      name: 'Action & Adventure',
      image: 'https://image.tmdb.org/t/p/w500/6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg',
    },
    {
      id: 16,
      name: 'Animation',
      image: 'https://image.tmdb.org/t/p/w500/41neXsH222hV2zrsTyw8h7javon.jpg',
    },
    {
      id: 35,
      name: 'Comedy',
      image: 'https://image.tmdb.org/t/p/w500/uGy4DCmM33I7l86W7iCskNkvmLD.jpg',
    },
    {
      id: 80,
      name: 'Crime',
      image: 'https://image.tmdb.org/t/p/w500/gQxaF79LUTtopdYHsuS8lUr9rvF.jpg',
    },
    {
      id: 99,
      name: 'Documentary',
      image: 'https://image.tmdb.org/t/p/w500/zocVz88wzfCd2y3RPKxI8qjhRKc.jpg',
    },
    {
      id: 18,
      name: 'Drama',
      image: 'https://image.tmdb.org/t/p/w500/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    },
    {
      id: 10751,
      name: 'Family',
      image: 'https://image.tmdb.org/t/p/w500/uNyEVSPeAtJgUBehuQJ8WEFwatN.jpg',
    },
    {
      id: 10762,
      name: 'Kids',
      image: 'https://image.tmdb.org/t/p/w500/7OrV2aAH5Yp7hA9zCCvUloLvZtl.jpg',
    },
    {
      id: 9648,
      name: 'Mystery',
      image: 'https://image.tmdb.org/t/p/w500/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    },
    {
      id: 10763,
      name: 'News',
      image: 'https://image.tmdb.org/t/p/w500/uyilhJ7MBLjiaQXboaEwe44Z0jA.jpg',
    },
    {
      id: 10764,
      name: 'Reality',
      image: 'https://image.tmdb.org/t/p/w500/ykbaElzavtSbsYG5KbG3pEpREtK.jpg',
    },
    {
      id: 10765,
      name: 'Sci-Fi & Fantasy',
      image: 'https://image.tmdb.org/t/p/w500/4cyuWjdg73OwxaNxg6iBqFWntWM.jpg',
    },
    {
      id: 10766,
      name: 'Soap',
      image: 'https://image.tmdb.org/t/p/w500/iN9uULLaSx7h21tcR9io2dnARjw.jpg',
    },
    {
      id: 10767,
      name: 'Talk',
      image: 'https://image.tmdb.org/t/p/w500/uOPVhgfljgOM1SNz7eXuPHti9oK.jpg',
    },
    {
      id: 10768,
      name: 'War & Politics',
      image: 'https://image.tmdb.org/t/p/w500/k47JEUTQsSMN532HRg6RCzZKBdB.jpg',
    },
    {
      id: 37,
      name: 'Western',
      image: 'https://image.tmdb.org/t/p/w500/uQUHCqxHsG9blvtCoL7vluMG9Jp.jpg',
    },
  ]);

  const addedNotify = (name) =>
    toast(`${name} added to favorites!`, {
      role: 'alert',
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'dark',
    });
  const removedNotify = (name) =>
    toast(`${name} removed from favorites!`, {
      role: 'alert',
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'dark',
    });
  const errorNotify = () =>
    toast(`Something went wrong try to refresh page`, {
      role: 'alert',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'dark',
      type: 'error',
    });

  useEffect(() => {
    const recentSearches = JSON.parse(
      localStorage.getItem('recentSearchValues'),
    );
    const storedFavoriteMovies = JSON.parse(
      localStorage.getItem('userFavoriteMovies'),
    );
    const storedFavoriteSeries = JSON.parse(
      localStorage.getItem('userFavoriteSeries'),
    );
    const storedFavoritePeople = JSON.parse(
      localStorage.getItem('userFavoritePeople'),
    );
    if (recentSearches) {
      setRecentSearchValues(recentSearches);
    }
    if (storedFavoriteMovies) {
      setUserFavoriteMovies(storedFavoriteMovies);
    }
    if (storedFavoriteSeries) {
      setUserFavoriteSeries(storedFavoriteSeries);
    }
    if (storedFavoritePeople) {
      setUserFavoritePeople(storedFavoritePeople);
    }
  }, []);

  const addFavoriteMoviesHandler = (item) => {
    if (!userFavoriteMovies.some((favorite) => favorite.id === item.id)) {
      setUserFavoriteMovies((prevFavorites) => [...prevFavorites, item]);
      localStorage.setItem(
        'userFavoriteMovies',
        JSON.stringify([...userFavoriteMovies, item]),
      );
    }
  };

  const addFavoriteSeriesHandler = (item) => {
    if (!userFavoriteSeries.some((favorite) => favorite.id === item.id)) {
      setUserFavoriteSeries((prevFavorites) => [...prevFavorites, item]);
      localStorage.setItem(
        'userFavoriteSeries',
        JSON.stringify([...userFavoriteSeries, item]),
      );
    }
  };

  const addFavoritePeopleHandler = (item) => {
    if (!userFavoritePeople.some((favorite) => favorite.id === item.id)) {
      setUserFavoritePeople((prevFavorites) => [...prevFavorites, item]);
      localStorage.setItem(
        'userFavoritePeople',
        JSON.stringify([...userFavoritePeople, item]),
      );
    }
  };

  const removeFavoriteMoviesHandler = (item) => {
    const newFavorites = userFavoriteMovies.filter(
      (favorite) => favorite.id !== item.id,
    );
    setUserFavoriteMovies(newFavorites);
    localStorage.setItem('userFavoriteMovies', JSON.stringify(newFavorites));
  };

  const removeFavoriteSeriesHandler = (item) => {
    const newFavorites = userFavoriteSeries.filter(
      (favorite) => favorite.id !== item.id,
    );
    setUserFavoriteSeries(newFavorites);
    localStorage.setItem('userFavoriteSeries', JSON.stringify(newFavorites));
  };

  const removeFavoritePeopleHandler = (item) => {
    const newFavorites = userFavoritePeople.filter(
      (favorite) => favorite.id !== item.id,
    );
    setUserFavoritePeople(newFavorites);
    localStorage.setItem('userFavoritePeople', JSON.stringify(newFavorites));
  };

  function handleSearch() {
    setRecentSearchValues([...recentSearchValues, currentValue]);

    localStorage.setItem(
      'recentSearchValues',
      JSON.stringify([...recentSearchValues, currentValue]),
    );
  }

  function handleClear() {
    setRecentSearchValues([]);
    localStorage.removeItem('recentSearchValues');
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const trendingFetchHandler = async () => {
      setLoading(true);
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`,
          { signal },
        ),
        fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=1`,
          { signal },
        ),
      ])
        .then(([response1, response2]) =>
          Promise.all([response1.json(), response2.json()]),
        )
        .then((data) => {
          setTrending(data[0].results.concat(data[1].results));
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            setLoading(false);
            return;
          } else {
            setLoading(false);
            errorNotify();
          }
        });
    };
    trendingFetchHandler();

    return () => {
      controller.abort();
    };
  }, []);

  const multiSearchHandler = async (inputValue) => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=yes`,
        { signal },
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=yes`,
        { signal },
      ),
      fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=yes`,
        { signal },
      ),
    ])
      .then(([response1, response2, response3]) =>
        Promise.all([response1.json(), response2.json(), response3.json()]),
      )
      .then((data) => {
        setSearchedMovieResults(data[0]);
        setSearchedTvResults(data[1]);
        setSearchedPersonResults(data[2]);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          setLoading(false);
          return;
        } else {
          setLoading(false);
          errorNotify();
        }
      });

    return () => {
      controller.abort();
    };
  };

  return (
    <ContextData.Provider
      value={{
        searchedValue,
        setSearchedValue,
        movieGenres,
        tvGenres,
        pageData,
        setPageData,
        searchResult,
        trending,
        chosenGenre,
        setChosenGenre,
        genreResult,
        setGenreResult,
        loading,
        setSearchResult,
        currentValue,
        setCurrentValue,
        trendingDate,
        setTrendingDate,
        setLoading,
        multiSearchHandler,
        searchedMovieResults,
        searchedTvResults,
        searchedPersonResults,
        setSearchedMovieResults,
        setSearchedTvResults,
        setSearchedPersonResults,
        showBiographyButtonClicked,
        setShowBiographyButtonClicked,
        setTrending,
        isTrailerButtonClicked,
        setIsTrailerButtonClicked,
        addedNotify,
        removedNotify,
        recentSearchValues,
        setRecentSearchValues,
        handleSearch,
        handleClear,
        errorNotify,
        addFavoriteMoviesHandler,
        addFavoriteSeriesHandler,
        addFavoritePeopleHandler,
        removeFavoriteMoviesHandler,
        removeFavoriteSeriesHandler,
        removeFavoritePeopleHandler,
        userFavoriteMovies,
        userFavoriteSeries,
        userFavoritePeople,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
