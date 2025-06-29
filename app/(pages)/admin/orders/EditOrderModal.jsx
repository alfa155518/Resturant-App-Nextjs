
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';


export default function EditOrderModal({ styles, editingOrder, setEditingOrder, saveEditedOrder }) {
    const statusOptions = [
        { value: 'selected', label: 'Select Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];
    return (
        editingOrder && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.editOrderModal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    tabIndex="-1"
                >
                    <div className={styles.modalHeader}>
                        <h3>Edit Order - {editingOrder.id}</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setEditingOrder(null)}
                            aria-label='Close Edit Order'
                        >
                            <FiX />
                        </button>
                    </div>

                    <form className={styles.modalContentForm}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="status">Status</label>
                                <select
                                    value={editingOrder.status}
                                    onChange={(e) => setEditingOrder({ ...editingOrder, delivery_status: e.target.value })}
                                    name="status"
                                    id="status"
                                    autoComplete='status'
                                    aria-label='Order Status'
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={styles.modalFooter}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setEditingOrder(null)}
                            aria-label='Cancel Edit Order'
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={() => saveEditedOrder(editingOrder.id, editingOrder)}
                            aria-label='Save Order Changes'
                        >
                            <FiCheck /> Save Changes
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}