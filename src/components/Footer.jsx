import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

function Footer() {
  return (
    <footer className="bg-transparent/60 shadow-lg w-full py-3 mt-10">
      <div className="flex flex-col items-center justify-center text-white space-y-2">
        <div className="flex text-3xl space-x-4  rounded-md py-1">
          <a
            href="https://github.com/Honey171"
            target="_blank"
            rel="noreferrer"
            aria-label="my-github"
            className="bg-white rounded-md px-0.5 text-black hover:bg-black hover:text-white transition-all duration-300 focus:outline-dashed focus:outline-2 focus:outline-white"
          >
            <AiFillGithub />{' '}
          </a>
          <a
            href="https://www.linkedin.com/in/mehmet-taha-baloglu-3a2b881a8/"
            target="_blank"
            rel="noreferrer"
            aria-label="my-linkedin"
            className="bg-white rounded-md px-0.5 text-blue-500 hover:bg-black transition-all duration-300 focus:outline-dashed focus:outline-2 focus:outline-white"
          >
            <AiFillLinkedin />
          </a>
        </div>
        <p>Made by Honey</p>
      </div>
    </footer>
  );
}

export default Footer;
