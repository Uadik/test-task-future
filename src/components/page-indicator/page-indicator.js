import React from 'react';

import './page-indicator.css';

const PageIindicator = props => {
  const { currentPage, handlePage, maxPage } = props;
  return (
    <div className="nav-bar">
      <button
        disabled={currentPage <= 0}
        onClick={() => {
          handlePage(currentPage - 1);
        }}
      >
        Previous
      </button>
      <input
        className="page-indicator"
        type="number"
        min="1"
        value={currentPage + 1}
        max={maxPage}
        onChange={e => {
          handlePage(e.target.value - 1);
          e.target.value = `${currentPage + 1}`;
        }}
      />
      <button
        disabled={currentPage >= maxPage}
        onClick={() => {
          handlePage(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default PageIindicator;
