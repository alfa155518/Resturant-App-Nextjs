
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiClock, FiUsers } from 'react-icons/fi';
import { FiCalendar } from 'react-icons/fi';
export default function GroupReservations({ groupedReservations, styles, startEditingReservation, deleteReservation }) {
    return (
        <div className={styles.reservationsContent}>
            {Object?.entries(groupedReservations)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, reservations]) => (
                    <motion.div
                        key={date}
                        className={styles.dateGroup}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.dateHeader}>
                            <h3>
                                <FiCalendar />
                                {reservations[0]?.formatted_reservation_date || new Date(date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </h3>
                            <span className={styles.reservationCount}>
                                {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className={styles.reservationsTableContainer}>
                            <table className={styles.reservationsTable}>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Customer</th>
                                        <th>Guests</th>
                                        <th>Table</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reservations
                                            .sort((a, b) => a.reservation_time.localeCompare(b.reservation_time))
                                            .map(reservation => (
                                                <motion.tr
                                                    key={reservation.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <td className={styles.timeCell}>
                                                        <FiClock className={styles.timeIcon} />
                                                        {reservation.reservation_time}
                                                    </td>
                                                    <td className={styles.customerCell}>
                                                        {reservation.user.name}
                                                    </td>
                                                    <td className={styles.guestsCell}>
                                                        <FiUsers className={styles.guestsIcon} />
                                                        {reservation.guest_count}
                                                    </td>
                                                    <td className={styles.tableCell}>
                                                        {reservation.table.table_number}
                                                    </td>
                                                    <td className={styles.contactCell}>
                                                        <div>{reservation.phone}</div>
                                                        <div className={styles.emailText}>{reservation.user.email}</div>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.statusBadge} ${styles[reservation.status.toLowerCase()]}`}>
                                                            {reservation.status}

                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actionBtns}>
                                                            <button
                                                                className={styles.editBtn}
                                                                onClick={() => startEditingReservation(reservation)}
                                                                title="Edit Reservation"
                                                            >
                                                                <FiEdit2 />
                                                            </button>
                                                            <button
                                                                className={styles.deleteBtn}
                                                                onClick={() => deleteReservation(reservation.id)}
                                                                title="Delete Reservation"
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ))}
        </div>
    );
}