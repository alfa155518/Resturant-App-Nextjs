"use client"

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from '../../src/css/pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Calculate visible page range
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      // Adjust start if end is at max
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      
      // Add ellipsis and edge pages
      if (start > 1) {
        pages = [1, '...', ...pages];
      }
      if (end < totalPages) {
        pages = [...pages, '...', totalPages];
      }
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
          ) : (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}