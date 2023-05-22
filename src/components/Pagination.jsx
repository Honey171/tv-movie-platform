import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

function Pagination({
  loading,
  pageNumber,
  setPageNumber,
  inputNumber,
  setInputNumber,
  data,
  isClicked,
  setIsClicked,
  inputError,
  setInputError,
  nextPageFunction,
  maxPages,
}) {
  return (
    <>
      {data.total_pages && data.total_pages > 1 && (
        <div
          className={`flex flex-col space-y-3 items-center text-white text-sm ${
            loading ? 'hidden' : 'visible'
          }`}
        >
          <div className="flex flex-col gap-1 text-center relative mt-7">
            <span className="text-lg">{`${
              'Page ' +
              pageNumber +
              '/' +
              String(
                maxPages
                  ? maxPages
                  : data.total_pages && data.total_pages <= 500
                  ? data.total_pages
                  : 500,
              )
            }`}</span>
            {isClicked ? (
              <div className="space-x-1 flex self-center justify-center">
                <input
                  type="number"
                  className="w-[25%] rounded-md text-black outline-none pl-1 font-bold"
                  onChange={(e) => setInputNumber(e.target.value)}
                />
                <button
                  className="bg-black hover:bg-white hover:text-black transition-all duration-300 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    if (inputNumber < 1 || inputNumber > 500) {
                      setInputError(
                        'The input number should be between 1 and 500, inclusive',
                      );
                      return;
                    } else if (inputNumber > data.total_pages) {
                      setInputError(
                        'Please enter a number smaller than total pages or equal',
                      );
                      return;
                    } else if (Number(inputNumber) === Number(pageNumber)) {
                      setInputError(
                        'Same page number entered try different one',
                      );
                    } else {
                      setInputError('');
                      setPageNumber(inputNumber);
                      nextPageFunction(inputNumber);
                    }
                  }}
                >
                  <MdOutlineNavigateNext className="text-xl" />
                </button>
                <button
                  onClick={() => {
                    if (inputNumber) {
                      setInputError('');
                    }
                    setIsClicked(false);
                  }}
                  className="bg-black hover:bg-white hover:text-black transition-all duration-300 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ) : (
              <span onClick={() => setIsClicked(true)}>
                Click for enter a page number
              </span>
            )}
            <p className="">{inputError}</p>
          </div>
          <ReactPaginate
            pageCount={
              maxPages
                ? maxPages
                : data.total_pages && data.total_pages <= 500
                ? data.total_pages
                : 500
            }
            className="flex items-center space-x-1 font-bold text-white transition-all duration-300 text-[11.7px] lg:text-[14px]"
            pageClassName="bg-slate-950 shadow-white shadow-sm px-2 py-0.5 rounded-md"
            activeClassName="bg-white shadow-yellow-300"
            activeLinkClassName="text-black"
            pageLinkClassName="focus:px-1"
            pageRangeDisplayed={1}
            forcePage={pageNumber - 1}
            onPageChange={(currentPage) => {
              nextPageFunction(currentPage.selected + 1);
              setPageNumber(currentPage.selected + 1);
            }}
          />
        </div>
      )}
    </>
  );
}

export default Pagination;
