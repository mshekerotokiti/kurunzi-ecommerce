import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Create an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)} href="#!">Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a className="page-link" onClick={() => onPageChange(number)} href="#!">
              {number}
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