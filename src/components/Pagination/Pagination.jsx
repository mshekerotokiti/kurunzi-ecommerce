import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisiblePages = 5; // Maximum visible pages in the pagination bar

  // Function to calculate pagination range with breaks and ellipsis
  const paginationRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push('...');
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push('...');
      }
      range.push(totalPages);
    }

    return range;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)} href="#!">Previous</a>
        </li>
        {paginationRange().map((page, index) => (
          <li key={index} className={`page-item ${page === '...' ? 'disabled' : ''} ${currentPage === page ? 'active' : ''}`}>
            <a className="page-link" onClick={() => onPageChange(page)} href="#!">
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage + 1)} href="#!">Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
