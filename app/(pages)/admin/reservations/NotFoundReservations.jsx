import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';
export default function NotFoundReservations({ styles, searchTerm, statusFilter, setSearchTerm, setStatusFilter }) {
    return (
        <motion.div
            className={styles.noReservations}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <FiInfo className={styles.noDataIcon} />
            <h3>No reservations found</h3>
            <p>There are no reservations matching your search criteria.</p>
            {(searchTerm || statusFilter !== 'All') && (
                <button
                    className={styles.clearFiltersBtn}
                    onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                    }}
                >
                    Clear Filters
                </button>
            )}
        </motion.div>
    );
}