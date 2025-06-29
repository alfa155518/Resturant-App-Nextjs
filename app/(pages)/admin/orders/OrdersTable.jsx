
import { motion } from 'framer-motion';
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';
import { formatDate } from '@/utils/dateUtils';
export default function OrdersTable({ styles, orders, displayedOrders, viewOrderDetails, startEditingOrder, deleteOrder, toggleView, showAll, initialDisplayCount }) {
    return (
        <div className={styles.ordersTableContainer}>
            <table className={styles.ordersTable}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Delivery Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrders.map(order => (
                        <motion.tr
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <td>ORD-{order.id}</td>
                            <td className={styles.customerName}>{order.customer_name}</td>
                            <td className={styles.itemCount}>{JSON.parse(order.metadata.cart_items).length} items</td>
                            <td className={styles.orderTotal}>${order.amount_total}</td>
                            <td className={styles.orderTime}>{formatDate(order.payment_date)}</td>
                            <td>
                                <span className={`${styles.statusBadge} ${styles[order.delivery_status.toLowerCase()]}`}>
                                    {order.delivery_status}
                                </span>
                            </td>
                            <td>
                                <div className={styles.actionBtns}>
                                    <button
                                        className={styles.viewBtn}
                                        onClick={() => viewOrderDetails(order)}
                                        title="View Details"
                                        aria-label="View Details"
                                    >
                                        <FiEye />
                                    </button>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => startEditingOrder(order)}
                                        title="Edit Order"
                                        aria-label="Edit Order"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteOrder(order.id)}
                                        title="Delete Order"
                                        aria-label="Delete Order"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
            {orders.length > initialDisplayCount && (
                <div className={styles.viewAll}>
                    <button onClick={toggleView} aria-label="Toggle View">
                        {showAll ? 'View Less Orders' : 'View All Orders'}
                    </button>
                </div>
            )}
        </div>
    );
}