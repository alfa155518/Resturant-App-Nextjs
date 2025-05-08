import Image from "next/image";
import {
    FaTimes,
} from "react-icons/fa";


export default function ReservationDetailsModal({ styles, selectedReservation, closeDetailsReservationModal, handelCancelReservation, getStatusIcon }) {
    return (
        <div className={styles.modalOverlay} onClick={closeDetailsReservationModal}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeDetailsReservationModal}>
                    <FaTimes />
                </button>

                <div className={styles.modalHeader}>
                    <h3>Reservation Details</h3>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.modalImageContainer}>
                        <Image
                            src={
                                selectedReservation.table.image ||
                                "/images/default-table.jpg"
                            }
                            alt={selectedReservation.table.name}
                            width={400}
                            height={250}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            className={styles.modalImage}
                        />
                    </div>

                    <div className={styles.reservationDetailGrid}>
                        <div className={styles.detailGridItem}>
                            <h4>Table</h4>
                            <p>{selectedReservation.table.name}</p>
                        </div>

                        <div className={styles.detailGridItem}>
                            <h4>Date</h4>
                            <p>
                                {new Date(selectedReservation.date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className={styles.detailGridItem}>
                            <h4>Time</h4>
                            <p>{selectedReservation.time}</p>
                        </div>

                        <div className={styles.detailGridItem}>
                            <h4>Guests</h4>
                            <p>{selectedReservation.guests} people</p>
                        </div>

                        <div className={styles.detailGridItem}>
                            <h4>Status</h4>
                            <p className={styles[selectedReservation.status]}>
                                {getStatusIcon(selectedReservation.status)}
                                <span>{selectedReservation.status}</span>
                            </p>
                        </div>

                        <div className={styles.detailGridItem}>
                            <h4>Reservation ID</h4>
                            <p>#{selectedReservation.id}</p>
                        </div>
                    </div>

                    <div className={styles.tableDescription}>
                        <h4>Table Description</h4>
                        <p>{selectedReservation.table.description}</p>
                    </div>

                    <div className={styles.additionalInfo}>
                        <h4>Additional Information</h4>
                        <ul>
                            <li>Please arrive 10 minutes before your reservation time</li>
                            <li>
                                Your table will be held for 15 minutes after your
                                reservation time
                            </li>
                            <li>
                                Special requests should be made at least 24 hours in advance
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    {selectedReservation.status !== "cancelled" && (
                        <button
                            className={styles.cancelButton}
                            onClick={() => {
                                handelCancelReservation(selectedReservation.id);
                                closeDetailsReservationModal();
                            }}>
                            Cancel Reservation
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}