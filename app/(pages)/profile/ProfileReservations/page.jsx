"use client";

import { UserContext } from "@/store/UserProvider";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import styles from "../../../../src/css/profile-reservations.module.css";
import ReservationDetailsModal from "./ReservationDetailsModal";
import ReservationCard from "./ReservationCard";
import FilterReservationButtons from "./FilterReservationButtons";

export default function ProfileReservations() {
  const [loading, setLoading] = useState(true);

  // User Context
  const { userReservations, setUserReservations, setActiveFilterReservation, activeFilterReservation, filteredReservations, selectedReservation, showDetailsReservationModal, handelCancelReservation, openDetailsReservationModal, closeDetailsReservationModal } = useContext(UserContext);


  // Simulate API loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserReservations(userReservations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  // Status Icon for Reservations
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheck className={styles.confirmedIcon} />;
      case "pending":
        return <FaSpinner className={styles.pendingIcon} />;
      case "cancelled":
        return <FaTimes className={styles.cancelledIcon} />;
      default:
        return null;
    }
  };


  // Fade In Animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your reservations...</p>
      </div>
    );
  }

  if (!filteredReservations || filteredReservations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FaCalendarAlt className={styles.emptyIcon} />
        <h3>No reservations found</h3>
        <p>
          You don't have any {activeFilterReservation !== "all" ? activeFilterReservation : ""}{" "}
          reservations yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.reservationsContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}>
      <h2>My Reservations</h2>
      {/* * Filter Reservations * */}
      <FilterReservationButtons styles={styles} activeFilterReservation={activeFilterReservation} setActiveFilterReservation={setActiveFilterReservation} />
      {/* * Filter Reservations * */}
      {filteredReservations?.length > 0 && (
        <ReservationCard styles={styles} filteredReservations={filteredReservations} handelCancelReservation={handelCancelReservation} openDetailsReservationModal={openDetailsReservationModal} getStatusIcon={getStatusIcon} />
      )}
      {/* Details Modal */}
      {showDetailsReservationModal && selectedReservation && (
        <ReservationDetailsModal styles={styles} selectedReservation={selectedReservation} closeDetailsReservationModal={closeDetailsReservationModal} handelCancelReservation={handelCancelReservation} getStatusIcon={getStatusIcon} />
      )}
    </motion.div>
  );
}
