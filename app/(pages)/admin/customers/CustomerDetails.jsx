import { motion } from 'framer-motion';
import { FiEdit2, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { formatRelativeTime } from '@/utils/dateUtils';

export default function CustomerDetails({ styles, showCustomerDetails, selectedCustomer, setShowCustomerDetails }) {
    return (
        showCustomerDetails && selectedCustomer && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.customerDetailsModal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.modalHeader}>
                        <h3>Customer Details</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowCustomerDetails(false)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        <div className={styles.customerDetailsHeader}>
                            <div className={styles.customerDetailsAvatar}>
                                <FiUser />
                            </div>
                            <div className={styles.customerDetailsInfo}>
                                <h4>{selectedCustomer.name}</h4>
                                <p className={styles.customerStatus}>
                                    <span className={`${styles.statusBadge} ${styles[selectedCustomer.is_active === 1 ? 'active' : 'inactive']}`}>
                                        {selectedCustomer.is_active === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className={styles.customerDetailsContent}>
                            <div className={styles.detailsSection}>
                                <h5>Contact Information</h5>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <FiMail className={styles.detailIcon} />
                                        <div>
                                            <p className={styles.detailLabel}>Email</p>
                                            <p className={styles.detailValue}>{selectedCustomer.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FiPhone className={styles.detailIcon} />
                                        <div>
                                            <p className={styles.detailLabel}>Phone</p>
                                            <p className={styles.detailValue}>{selectedCustomer.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FiMapPin className={styles.detailIcon} />
                                        <div>
                                            <p className={styles.detailLabel}>Address</p>
                                            <p className={styles.detailValue}>{selectedCustomer.address || 'Not Available'}</p>
                                        </div>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FiCalendar className={styles.detailIcon} />
                                        <div>
                                            <p className={styles.detailLabel}>Join Date</p>
                                            <p className={styles.detailValue}>{
                                                formatRelativeTime(selectedCustomer.created_at)
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailsSection}>
                                <h5>Order History</h5>
                                <table className={styles.orderHistoryTable}>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedCustomer.orders.map((order) => (
                                            <tr key={`order-${order.id}`}>
                                                <td>{order.id}</td>
                                                <td>{formatRelativeTime(order.created_at)}</td>
                                                <td>{order.cart_items_count}</td>
                                                <td>${order.amount_total}</td>
                                                <td>
                                                    <span className={`${styles.statusBadge} ${styles[order?.payment_status === 'paid' ? 'paid' : 'unpaid']}`}>
                                                        {order.payment_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <button
                            aria-label="Close Modal"
                            className={styles.cancelBtn}
                            onClick={() => setShowCustomerDetails(false)}
                        >
                            Close
                        </button>
                        <button
                            aria-label="Edit Customer"
                            className={styles.editBtn}
                            onClick={() => {
                                setShowCustomerDetails(false);
                                startEditingCustomer(selectedCustomer);
                            }}
                        >
                            <FiEdit2 /> Edit Customer
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}