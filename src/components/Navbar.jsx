import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContextData } from '../context/context';
import {
  AiFillFire,
  AiFillHeart,
  AiFillHome,
  AiOutlineClose,
  AiOutlineSearch,
} from 'react-icons/ai';
import { SiPlaywright } from 'react-icons/si';
import { IoIosPeople } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsStars } from 'react-icons/bs';
import Logo from '../assets/myLogo.png';
import MobileSearchLabel from './MobileSearchLabel';
import LargerScreenSearchLabel from './LargerScreenSearchLabel';

function Navbar() {
  const {
    setSearchedValue,
    searchedValue,
    currentValue,
    setCurrentValue,
    multiSearchHandler,
    showBiographyButtonClicked,
    isTrailerButtonClicked,
    recentSearchValues,
    handleSearch,
    handleClear,
  } = useContext(ContextData);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSearchClicked, setIsMobileSearchClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (inputRef.current) {
        if (
          !inputRef.current.contains(e.target) &&
          e.target !== inputRef.current
        ) {
          setShowRecentSearches(false);
        }
      }
    });
    return () =>
      document.body.removeEventListener('click', (e) => {
        if (inputRef.current) {
          if (
            !inputRef.current.contains(e.target) &&
            e.target !== inputRef.current
          ) {
            setShowRecentSearches(false);
          }
        }
      });
  }, [inputRef]);

  useEffect(() => {
    setIsMenuClicked(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      setPageWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`flex items-center justify-around h-14 py-2  ${
        isScrolled || isMenuClicked
          ? 'bg-black shadow-sm shadow-teal-300'
          : 'bg-transparent'
      } fixed top-0 left-0 w-full transition-colors duration-300 z-50 ${
        showBiographyButtonClicked ? 'pointer-events-none opacity-80' : ''
      } ${isTrailerButtonClicked ? 'pointer-events-none opacity-80' : ''} `}
    >
      <div
        className={`absolute top-14 w-full ${
          isMenuClicked && !isMobileSearchClicked ? 'scale-1' : 'scale-0'
        } transition-all duration-300 navbarMenu`}
      >
        <Link
          to={'/'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 border-b transition-all duration-300 hover:bg-slate-800 ${
            location.pathname === '/' && 'bg-slate-800'
          }`}
        >
          <AiFillHome className="text-3xl" /> <span>Home</span>
        </Link>
        <Link
          to={'/genre'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 border-b transition-all duration-300 hover:bg-slate-800 ${
            location.pathname.includes('/genre') && 'bg-slate-800'
          }`}
        >
          <SiPlaywright className="text-3xl" /> <span>Genres</span>
        </Link>
        <Link
          to={'/people'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 border-b transition-all duration-300 hover:bg-slate-800 ${
            location.pathname === '/people' && 'bg-slate-800'
          }`}
        >
          <IoIosPeople className="text-3xl" /> <span>People</span>
        </Link>
        <Link
          to={'/trending'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 border-b transition-all duration-300 hover:bg-slate-800 ${
            location.pathname === '/trending' && 'bg-slate-800'
          }`}
        >
          <AiFillFire className="text-3xl" /> <span>Trending</span>
        </Link>
        <Link
          to={'/topRated'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 border-b transition-all duration-300 hover:bg-slate-800 ${
            location.pathname === '/topRated' && 'bg-slate-800'
          }`}
        >
          <BsStars className="text-3xl" /> <span>Top rated</span>
        </Link>
        <Link
          to={'/favorites'}
          className={`bg-black text-white flex font-bold gap-2 items-center py-3.5 pl-3.5 transition-all duration-300 hover:bg-slate-800 ${
            location.pathname === '/favorites' && 'bg-slate-800'
          }`}
        >
          <AiFillHeart className="text-3xl" /> <span>Favorites</span>
        </Link>
      </div>
      {isMobileSearchClicked && pageWidth < 1024 && (
        <MobileSearchLabel
          inputRef={inputRef}
          inputCurrentValue={currentValue}
          setInputCurrentValue={setCurrentValue}
          isScrolled={isScrolled}
          searchedValue={searchedValue}
          showRecentSearches={showRecentSearches}
          setShowRecentSearches={setShowRecentSearches}
          recentSearchValues={recentSearchValues}
          multiSearchHandler={multiSearchHandler}
          setSearchedValue={setSearchedValue}
          handleClear={handleClear}
          navigate={navigate}
          handleSearch={handleSearch}
          isMobileSearchClicked={isMobileSearchClicked}
          setIsMobileSearchClicked={setIsMobileSearchClicked}
        />
      )}
      {!isMobileSearchClicked && (
        <button
          onClick={() => setIsMenuClicked(!isMenuClicked)}
          className="hover:scale-110 duration-300 ease-out text-white lg:hidden"
          aria-label="menu-toggle"
        >
          {!isMenuClicked ? (
            <GiHamburgerMenu className={`text-2xl`} />
          ) : (
            <AiOutlineClose className={`text-2xl`} />
          )}
        </button>
      )}
      {!isMobileSearchClicked && (
        <Link to={'/'}>
          <img
            src={Logo}
            alt="logo"
            className="w-20 h-20 "
          />
        </Link>
      )}
      {!isMobileSearchClicked && (
        <button
          className="text-white lg:hidden"
          onClick={() => setIsMobileSearchClicked(true)}
          aria-label="search-toggle"
        >
          {' '}
          <AiOutlineSearch className="text-2xl cursor-pointer" />
        </button>
      )}
      <div className="items-center space-x-3 hidden lg:flex">
        <Link
          to={'/genre'}
          className={`flex items-center space-x-1 font-bold transition-all duration-100 cursor-pointer ${
            location.pathname.includes('/genre') && !isScrolled
              ? 'text-teal-200'
              : location.pathname.includes('/genre') && isScrolled
              ? 'text-yellow-400'
              : 'text-white hover:text-teal-300'
          }`}
        >
          <SiPlaywright className="text-3xl" />{' '}
          <span
            className={`${
              location.pathname.includes('/genre') && !isScrolled
                ? 'border-b rounded-b-md border-teal-300 pb-0.5'
                : location.pathname.includes('/genre') && isScrolled
                ? 'border-b rounded-b-md border-yellow-400 pb-0.5'
                : ''
            } transition-all duration-300 tracking-tighter`}
          >
            Genres
          </span>
        </Link>
        <Link
          to={'/people'}
          className={`flex items-center space-x-1 font-bold transition-all duration-100 cursor-pointer ${
            location.pathname.includes('/people') && !isScrolled
              ? 'text-teal-200'
              : location.pathname.includes('/people') && isScrolled
              ? 'text-yellow-400'
              : 'text-white hover:text-teal-300'
          }`}
        >
          <IoIosPeople className="text-3xl" />{' '}
          <div
            className={`${
              location.pathname.includes('/people') && !isScrolled
                ? 'border-b rounded-b-md border-teal-300 pb-0.5'
                : location.pathname.includes('/people') && isScrolled
                ? 'border-b rounded-b-md border-yellow-400 pb-0.5'
                : ''
            } transition-all duration-300 tracking-tighter`}
          >
            People
          </div>
        </Link>
        <Link
          to={'/trending'}
          className={`flex items-center space-x-1 font-bold transition-all duration-100 cursor-pointer ${
            location.pathname.includes('/trending') && !isScrolled
              ? 'text-teal-200'
              : location.pathname.includes('/trending') && isScrolled
              ? 'text-yellow-400'
              : 'text-white hover:text-teal-300'
          }`}
        >
          <AiFillFire className="text-3xl" />{' '}
          <span
            className={`${
              location.pathname.includes('/trending') && !isScrolled
                ? 'border-b rounded-b-md border-teal-300 pb-0.5'
                : location.pathname.includes('/trending') && isScrolled
                ? 'border-b rounded-b-md border-yellow-400 pb-0.5'
                : ''
            } transition-all duration-300 tracking-tighter`}
          >
            Trending
          </span>
        </Link>
        <Link
          to={'/topRated'}
          className={`flex items-center space-x-1 font-bold transition-all duration-100 cursor-pointer ${
            location.pathname.includes('/topRated') && !isScrolled
              ? 'text-teal-200'
              : location.pathname.includes('/topRated') && isScrolled
              ? 'text-yellow-400'
              : 'text-white hover:text-teal-300'
          }`}
        >
          <BsStars className="text-3xl" />{' '}
          <span
            className={`${
              location.pathname.includes('/topRated') && !isScrolled
                ? 'border-b rounded-b-md border-teal-300 pb-0.5'
                : location.pathname.includes('/topRated') && isScrolled
                ? 'border-b rounded-b-md border-yellow-400 pb-0.5'
                : ''
            } transition-all duration-300 tracking-tighter`}
          >
            Top rated
          </span>
        </Link>
        <Link
          to={'/favorites'}
          className={`flex items-center space-x-1 font-bold transition-all duration-100 cursor-pointer ${
            location.pathname.includes('/favorites') && !isScrolled
              ? 'text-teal-200'
              : location.pathname.includes('/favorites') && isScrolled
              ? 'text-yellow-400'
              : 'text-white hover:text-teal-300'
          }`}
        >
          <AiFillHeart className="text-3xl" />{' '}
          <span
            className={`${
              location.pathname.includes('/favorites') && !isScrolled
                ? 'border-b rounded-b-md border-teal-300 pb-0.5'
                : location.pathname.includes('/favorites') && isScrolled
                ? 'border-b rounded-b-md border-yellow-400 pb-0.5'
                : ''
            } transition-all duration-300 tracking-tighter`}
          >
            Favorites
          </span>
        </Link>
      </div>
      {pageWidth >= 1024 && (
        <LargerScreenSearchLabel
          inputRef={inputRef}
          inputCurrentValue={currentValue}
          setInputCurrentValue={setCurrentValue}
          isScrolled={isScrolled}
          searchedValue={searchedValue}
          showRecentSearches={showRecentSearches}
          setShowRecentSearches={setShowRecentSearches}
          recentSearchValues={recentSearchValues}
          multiSearchHandler={multiSearchHandler}
          setSearchedValue={setSearchedValue}
          handleClear={handleClear}
          navigate={navigate}
          handleSearch={handleSearch}
        />
      )}
    </nav>
  );
}

export default Navbar;
