import React from 'react';
import { Link } from 'react-router-dom';

function FullName({ showFullNameIndex, setShowFullNameIndex, result, idx }) {
  return (
    <div className="relative flex flex-col">
      <Link
        to={`/${result.name ? 'person' : 'detail'}/${result.id}`}
        aria-label="name-link"
        state={{
          id: result.id,
          result,
          type: result.media_type
            ? result.media_type
            : result.original_name
            ? 'tv'
            : 'movie',
        }}
        className="max-w-[150px] sm:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-white tracking-tighter text-lg self-start hover:text-yellow-300 transition-all duration-200 focus:outline-dashed focus:rounded-md focus:outline-white"
        onTouchStart={() => {
          setShowFullNameIndex(idx);
        }}
        onTouchCancel={() => {
          setShowFullNameIndex(-1);
        }}
        onMouseEnter={() => {
          setShowFullNameIndex(idx);
        }}
        onMouseLeave={() => setShowFullNameIndex(-1)}
      >
        {result.original_name
          ? result.original_name
          : result.name
          ? result.name
          : result.original_title}
      </Link>
      <span
        className={`absolute left-0 top-6 bg-black px-1 py-1 max-w-[200px] text-white ${
          showFullNameIndex === idx ? 'scale-100' : 'scale-0'
        } transition-all duration-200 rounded-md font-bold z-10 tracking-tighter text-[14.5px]`}
      >
        {result.original_name
          ? result.original_name
          : result.name
          ? result.name
          : result.original_title}
      </span>
    </div>
  );
}

export default FullName;
