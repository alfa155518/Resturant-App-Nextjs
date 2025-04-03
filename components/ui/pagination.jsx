
import { motion } from 'framer-motion';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
export default function Pagination({
  styles,
  pageNumber,
  setPageNumber,
  menuDishes,
}) {

  const paginate = (pageNumber) => setPageNumber(pageNumber);

  const handelPreviousPage = () => {
    setPageNumber(pageNumber - 1);
  }

  const handelNextPage = () => {
    setPageNumber(pageNumber + 1);
  }

  return (
    <motion.div
      className={styles.pagination}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <button
        onClick={handelPreviousPage}
        disabled={menuDishes?.data.current_page === 1}
        className={`${styles.paginationButton} ${menuDishes?.data?.current_page === 1 ? styles.disabled : ''}`}
        aria-label="Previous page"
      >
        <IoIosArrowBack />
      </button>

      <div className={styles.pageNumbers}>
        {[...Array(menuDishes?.data.last_page)].map((_, index) => {
          const pageNumber = index + 1;
          // Show limited page numbers with ellipsis for better UX
          if (
            pageNumber === 1 ||
            pageNumber === menuDishes?.data.last_page ||
            (pageNumber >= menuDishes?.data.current_page - 1 && pageNumber <= menuDishes?.data.current_page + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`${styles.pageNumber} ${menuDishes?.data.current_page === pageNumber ? styles.activePage : ''}`}
                aria-label={`Page ${pageNumber}`}
                aria-current={menuDishes?.data.current_page === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === menuDishes?.data.current_page - 2 && pageNumber > 1) ||
            (pageNumber === menuDishes?.data.current_page + 2 && pageNumber < menuDishes?.data.total)
          ) {
            return <span key={pageNumber} className={styles.ellipsis}>...</span>;
          }
          return null;
        })}
      </div>

      <button
        onClick={handelNextPage}
        disabled={menuDishes?.data.current_page === menuDishes?.data.last_page}
        className={`${styles.paginationButton} ${menuDishes?.data.current_page === menuDishes?.data.last_page ? styles.disabled : ''}`}
        aria-label="Next page"
      >
        <IoIosArrowForward />
      </button>
    </motion.div>
  )
}