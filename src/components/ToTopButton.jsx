import React, { useEffect, useState } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

function ToTopButton() {
  const [showToTopButton, setShowToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 125) {
        setShowToTopButton(true);
      } else {
        setShowToTopButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    const scrollOptions = {
      top: 0,
      behavior: 'smooth',
    };
    window.scrollTo(scrollOptions);
  }

  return (
    <button
      className={`fixed bottom-20 right-10 z-50 ${
        showToTopButton ? 'block' : 'hidden'
      }`}
      tabIndex={1}
      onClick={scrollToTop}
      aria-label="to-top"
    >
      <BsFillArrowUpSquareFill className="text-4xl text-white cursor-pointer" />
    </button>
  );
}

export default ToTopButton;
