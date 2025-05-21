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
import { checkReservationSession } from "@/actions/profile";
import { toast } from "react-toastify";
import { useState } from "react";


export default function ReservationCard({ styles, filteredReservations, handelCancelReservation, openDetailsReservationModal, getStatusIcon }) {

    const [payingReservationId, setPayingReservationId] = useState(null);
    async function handelCheckReservationSession(id, name, description, image, reservationId, time, guests) {

        try {

            setPayingReservationId(reservationId);
            const formData = {
                id: id,
                name: name,
                description: description,
                price: 220,
                image_url: image,
                reservationId: reservationId,
                reservationTime: time,
                guest_count: guests,
            }
            const reservationSession = await checkReservationSession(formData);

            if (reservationSession.status === "error") {
                toast.error(reservationSession.message);
            }

            if (reservationSession.status === "success") {
                window.location.href = reservationSession.url;
            }
        } finally {
            setPayingReservationId(null);
        }
    }



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
                        {reservation.status !== "cancelled" && reservation.status !== "confirmed" && (
                            <button
                                className={styles.cancelButton}
                                onClick={() => handelCancelReservation(reservation.id)}>
                                Cancel Reservation
                            </button>
                        )}
                        {reservation.status === "pending" && (
                            <button
                                disabled={payingReservationId === reservation.id}
                                className={`${styles.payButton} ${payingReservationId === reservation.id ? styles.payingButton : ''}`}
                                onClick={() => handelCheckReservationSession(reservation.table_id, reservation.table.name, reservation.table.description, reservation.table.image, reservation.id, reservation.time, reservation.guests)}>
                                {payingReservationId === reservation.id ? "Processing..." : "Pay Now"}
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