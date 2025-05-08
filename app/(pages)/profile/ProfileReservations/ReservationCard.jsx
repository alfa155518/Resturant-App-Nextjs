import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaUsers,
    FaUtensils
} from "react-icons/fa";


export default function ReservationCard({ styles, filteredReservations, handelCancelReservation, openDetailsReservationModal, getStatusIcon }) {
    return (
        <div className={styles.reservationsList}>
            {filteredReservations.map((reservation, index) => (
                <motion.div
                    key={reservation.id}
                    className={styles.reservationCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <div className={styles.reservationHeader}>
                        <div className={styles.tableImage}>
                            <Image
                                src={reservation.table.image || "/images/default-table.jpg"}
                                alt={reservation.table.name}
                                width={100}
                                height={70}
                            />
                        </div>
                        <div className={styles.reservationInfo}>
                            <h3>{reservation.table.name}</h3>
                            <div className={styles.reservationMeta}>
                                <span className={styles.reservationDate}>
                                    <FaCalendarAlt />{" "}
                                    {new Date(reservation.date).toLocaleDateString()}
                                </span>
                                <span className={styles.reservationTime}>
                                    <FaClock /> {reservation.time}
                                </span>
                                <span className={styles.reservationGuests}>
                                    <FaUsers /> {reservation.guests} guests
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.reservationStatus} ${styles[reservation.status]
                                }`}>
                            {getStatusIcon(reservation.status)}
                            <span>{reservation.status}</span>
                        </div>
                    </div>

                    <div className={styles.reservationDetails}>
                        <div className={styles.detailItem}>
                            <FaMapMarkerAlt />
                            <span>
                                <Link
                                    href={"https://maps.app.goo.gl/rBWEtcXXPpy6ETbw7"}
                                    target="_blank">
                                    Restaurant Location
                                </Link>
                            </span>
                        </div>
                        <div className={styles.detailItem}>
                            <FaUtensils />
                            <span>{reservation.table.description}</span>
                        </div>
                    </div>

                    <div className={styles.reservationActions}>
                        {reservation.status !== "cancelled" && (
                            <button
                                className={styles.cancelButton}
                                onClick={() => handelCancelReservation(reservation.id)}>
                                Cancel Reservation
                            </button>
                        )}
                        <button
                            className={styles.viewButton}
                            onClick={() => openDetailsReservationModal(reservation)}>
                            View Details
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}