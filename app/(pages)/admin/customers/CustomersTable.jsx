
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import { formatDate } from '@/utils/dateUtils';
export default function CustomersTable({ styles, filteredCustomers, viewCustomerDetails, startEditingCustomer, deleteCustomer }) {
    return (
        <div className={styles.customersTableContainer}>
            <table className={styles.customersTable}>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Join Date</th>
                        <th>Orders</th>
                        <th>Total Spent</th>
                        <th>Last Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer, index) => (
                        <motion.tr
                            key={`customer-${customer.id}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <td className={styles.customerCell}>
                                <div className={styles.customerAvatar}>
                                    <FiUser />
                                </div>
                                <div className={styles.customerInfo}>
                                    <p className={styles.customerName}>{customer.name}</p>
                                    <p className={styles.customerEmail}>{customer.email}</p>
                                </div>
                            </td>
                            <td>{customer.phone || 'N/A'}</td>
                            <td>{formatDate(customer.created_at)}</td>
                            <td> <span className={styles.ordersCount}>{customer.orders_count}</span></td>
                            <td><span className={styles.ordersCount}>${customer.amount_total}</span></td>
                            <td>{formatDate(customer.last_order)}</td>
                            <td>
                                <span className={`${styles.statusBadge} ${styles[customer.is_active ? 'active' : 'inactive']}`}>
                                    {customer.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <div className={styles.actionBtns}>
                                    <button
                                        aria-label="View Customer"
                                        className={styles.viewBtn}
                                        onClick={() => viewCustomerDetails(customer)}
                                        title="View Details"
                                    >
                                        <FiUser />
                                    </button>
                                    <button
                                        aria-label="Edit Customer"
                                        className={styles.editBtn}
                                        onClick={() => startEditingCustomer(customer)}
                                        title="Edit Customer"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        aria-label="Delete Customer"
                                        className={styles.deleteBtn}
                                        onClick={() => deleteCustomer(customer.id)}
                                        title="Delete Customer"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}