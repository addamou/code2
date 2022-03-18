import React from "react";

export const Pagination = ({ ParPage, total, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / ParPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination justify-content-end'>
        {pageNumbers.map((num) => (
          <li key={num} className='page-item'>
            <button
              className='btn mt-2 me-1 page-link'
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
