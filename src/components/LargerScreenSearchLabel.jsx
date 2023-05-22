import React from 'react';
import { AiOutlineClear, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function LargerScreenSearchLabel({
  inputRef,
  inputCurrentValue,
  setInputCurrentValue,
  isScrolled,
  searchedValue,
  showRecentSearches,
  setShowRecentSearches,
  recentSearchValues,
  multiSearchHandler,
  setSearchedValue,
  handleSearch,
  navigate,
  handleClear,
}) {
  return (
    <label
      className="min-w-[300px] xl:min-w-[400px] space-x-2 items-center flex relative"
      ref={inputRef}
    >
      <input
        type="text"
        value={inputCurrentValue}
        placeholder="Search for a movie, tv show, person"
        className={`shadow-sm shadow-white bg-black ${
          isScrolled ? 'bg-slate-950 focus:bg-black' : 'focus:bg-slate-950'
        } placeholder:text-white text-white outline-none placeholder:text-sm transition-all duration-300 w-full py-1 px-1 rounded-md`}
        onChange={(e) => setInputCurrentValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            multiSearchHandler(inputCurrentValue);
            setSearchedValue(inputCurrentValue);
            handleSearch();
            setInputCurrentValue('');
            navigate('/search');
          }
        }}
        onFocus={() => setShowRecentSearches(true)}
        onBlur={() => setShowRecentSearches(false)}
      />
      <div
        className={`absolute top-10 w-[85%] xl:w-[70%] text-white shadow-sm shadow-white rounded-md max-h-44 historyScroll overflow-auto ${
          showRecentSearches && recentSearchValues.length > 0
            ? 'scale-1'
            : 'scale-0'
        } transition-all duration-300 flex flex-col space-y-3`}
      >
        <div
          className={`border-b rounded-b-lg rounded-t-md flex justify-between px-3 py-1 font-bold  ${
            isScrolled ? 'bg-black' : 'bg-slate-950'
          }`}
        >
          <p className="tracking-tighter text-lg">Recent searches</p>
          <button
            onClick={() => handleClear()}
            onFocus={() => setShowRecentSearches(true)}
            onBlur={() => setShowRecentSearches(false)}
            className="text-sm opacity-80 hover:opacity-100 transition-all duration-200"
            aria-label="clear-history"
          >
            Clear history
          </button>
        </div>
        {recentSearchValues.map((recent, idx) => (
          <Link
            key={idx}
            to={'/search'}
            onFocus={() => setShowRecentSearches(true)}
            onBlur={() => setShowRecentSearches(false)}
            onClick={(e) => {
              multiSearchHandler(recent);
              setSearchedValue(recent);
            }}
            className={`py-1 px-1 rounded-b-md text-slate-300  ${
              isScrolled ? 'bg-black' : 'bg-slate-950'
            } tracking-tighter hover:bg-yellow-500 hover:text-slate-950 transition-all duration-300 font-bold max-w-xs break-words ${
              idx === recentSearchValues.length - 1 ? 'border-none' : 'border-b'
            }`}
          >
            {recent}
          </Link>
        ))}
      </div>
      <button
        onClick={(e) => {
          if (
            inputCurrentValue.trim().length === 0 ||
            inputCurrentValue.trim() === searchedValue.trim()
          ) {
            return;
          }
          multiSearchHandler(inputCurrentValue.trim());
          setSearchedValue(inputCurrentValue.trim());
          handleSearch();
          setInputCurrentValue('');
          navigate('/search');
        }}
        className={`bg-black text-white shadow-sm shadow-white ${
          isScrolled ? 'bg-slate-950 hover:bg-black' : 'hover:bg-slate-950'
        } px-1 py-1 rounded-md transition-all duration-300 hover:text-white `}
        aria-label="search"
      >
        <AiOutlineSearch className="text-lg" />
      </button>
      <button
        onClick={() => {
          setInputCurrentValue('');
        }}
        className={`bg-black text-white shadow-sm shadow-white ${
          isScrolled ? 'bg-slate-950 hover:bg-black' : 'hover:bg-slate-950'
        } px-1 py-1 rounded-md transition-all duration-300 hover:text-white`}
        aria-label="clear-search-value"
      >
        <AiOutlineClear className="text-lg" />
      </button>
    </label>
  );
}

export default LargerScreenSearchLabel;
