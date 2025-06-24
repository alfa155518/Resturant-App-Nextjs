
import { motion } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

export default function EditReservationModal({ styles, editingReservation, setEditingReservation, saveEditedReservation }) {
    return (
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={styles.reservationModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.modalHeader}>
                    <h3>Edit Reservation</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setEditingReservation(null)}
                    >
                        <FiX />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="status">Status</label>
                        <select
                            value={editingReservation.table.status}
                            onChange={(e) => setEditingReservation({ ...editingReservation, status: e.target.value })}
                            name="status"
                            autoComplete='status'
                            id="status"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <div className={styles.modalButtons}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setEditingReservation(null)}
                        >
                            Close
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={saveEditedReservation}
                        >
                            <FiCheck /> Save Changes
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}