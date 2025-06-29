
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { formatDate } from '@/utils/dateUtils';
export default function OrdersDetails({ showOrderDetails, selectedOrder, setShowOrderDetails, styles }) {
    return (
        showOrderDetails && selectedOrder && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.orderDetailsModal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    tabIndex="-1"
                >
                    <div className={styles.modalHeader}>
                        <h3>Order Details - {selectedOrder.id}</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowOrderDetails(false)}
                            aria-label='Close Order Details'
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.modalContent}>
                        <div className={styles.orderInfo}>
                            <div className={styles.infoRow}>
                                <div className={styles.infoColumn}>
                                    <h4>Order Information</h4>
                                    <p><strong>Date:</strong> {formatDate(selectedOrder.payment_date, 'MMM D, YYYY')}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`${styles.statusBadge} ${styles[selectedOrder.delivery_status.toLowerCase()]}`}>
                                            {selectedOrder.delivery_status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.orderItems}>
                                <h4>Order Items</h4>
                                <table className={styles.itemsTable}>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {JSON.parse(selectedOrder.metadata.cart_items).map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}