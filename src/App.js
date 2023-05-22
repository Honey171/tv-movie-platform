import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ContextData } from './context/context';
import ToTopButton from './components/ToTopButton';
import DetailsPage from './pages/DetailsPage';
import GenreResultPage from './pages/GenreResultPage';
import GenresPage from './pages/GenresPage';
import Home from './pages/Home';
import PersonAllCredits from './pages/PersonAllCredits';
import PersonPage from './pages/PersonPage';
import SearchPage from './pages/SearchPage';
import Trending from './pages/Trending';
import PeoplePage from './pages/PeoplePage';
import CastAndCrewPage from './pages/CastAndCrewPage';
import KeywordResultPage from './pages/KeywordResultPage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TopRatedPage from './pages/TopRatedPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    setSearchedValue,
    setShowBiographyButtonClicked,
    setIsTrailerButtonClicked,
    loading,
    setCurrentValue,
  } = useContext(ContextData);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove('overflow-hidden');
    setShowBiographyButtonClicked(false);
    setIsTrailerButtonClicked(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchedValue('');
      setCurrentValue('');
    }
  }, [location.pathname]);

  return (
    <>
      <ToTopButton />
      {!loading && <Navbar />}
      <ToastContainer bodyClassName={() => 'text-sm font-bold p-3'} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/trending"
          element={<Trending />}
        />
        <Route
          path="/detail/:id"
          element={<DetailsPage />}
        />
        <Route
          path="/genre"
          element={<GenresPage />}
        />
        <Route
          path="/genre/:id"
          element={<GenreResultPage />}
        />
        <Route
          path="/search"
          element={<SearchPage />}
        />
        <Route
          path="/person/:id"
          element={<PersonPage />}
        />
        <Route
          path="/person/:id/combined_credits"
          element={<PersonAllCredits />}
        />
        <Route
          path="/people"
          element={<PeoplePage />}
        />
        <Route
          path="/cast&crew"
          element={<CastAndCrewPage />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
        <Route
          path="/topRated"
          element={<TopRatedPage />}
        />
        <Route
          path="/keyword/:keywordId"
          element={<KeywordResultPage />}
        />
      </Routes>
      {!loading && <Footer />}
    </>
  );
}

export default App;
