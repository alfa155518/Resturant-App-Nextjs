"use client";
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import CustomSkeletonLoading from '@/components/CustomSkeletonLoading';
import EditReservationModal from '@/app/(pages)/admin/reservations/EditReservationModal';
import NotFoundReservations from '@/app/(pages)/admin/reservations/NotFoundReservations';
import useAdminReservations from '@/hooks/useAdminReservations';
import GroupReservations from '@/app/(pages)/admin/reservations/GroupReservations';
import styles from '../../../src/css/admin-reservations.module.css';

export default function Reservations() {

  // Use Admin Reservations Custom Hook
  const [
    reservations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    startEditingReservation,
    editingReservation,
    setEditingReservation,
    saveEditedReservation,
    deleteReservation,
    groupedReservations,
  ] = useAdminReservations();

  // Skeleton Loading
  if (!reservations || reservations.length === 0) {
    return (
      <CustomSkeletonLoading count={5} height={400} />
    );
  }

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.dashboardContent}>
        <motion.div
          className={styles.reservationsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.reservationsHeader}>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Reservations Management
            </motion.h3>
            <div className={styles.reservationActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search reservations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                  autoComplete='search'
                />
              </div>
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  name="status"
                  autoComplete='status'
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {Object?.keys(groupedReservations)?.length > 0 ? (
            <GroupReservations groupedReservations={groupedReservations} styles={styles} startEditingReservation={startEditingReservation} deleteReservation={deleteReservation} />
          ) : (
            // No Reservations Found
            <NotFoundReservations styles={styles} searchTerm={searchTerm} statusFilter={statusFilter} setSearchTerm={setSearchTerm} setStatusFilter={setStatusFilter} />
          )}
          {/* Edit Reservation Modal */}
          {editingReservation && (
            <EditReservationModal styles={styles} editingReservation={editingReservation} setEditingReservation={setEditingReservation} saveEditedReservation={saveEditedReservation} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
