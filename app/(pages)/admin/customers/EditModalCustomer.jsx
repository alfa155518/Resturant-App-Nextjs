
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
export default function EditModalCustomer({ styles, editingCustomer, setEditingCustomer, saveEditedCustomer }) {
    return (
        editingCustomer && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.modalHeader}>
                        <h3>Edit Customer</h3>
                        <button
                            aria-label="Close Modal"
                            className={styles.closeBtn}
                            onClick={() => setEditingCustomer(null)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label htmlFor="customerName">
                                <FiUser className={styles.inputIcon} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={editingCustomer.name}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                                placeholder="Enter customer name"
                                name='name'
                                required
                                autoComplete='name'
                                id='customerName'
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerEmail">
                                <FiMail className={styles.inputIcon} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={editingCustomer.email}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                                placeholder="Enter email address"
                                name='email'
                                required
                                autoComplete='email'
                                id='customerEmail'
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerPhone">
                                <FiPhone className={styles.inputIcon} />
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={editingCustomer.phone}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                                placeholder="Enter phone number"
                                name='phone'
                                required
                                autoComplete='phone'
                                id='customerPhone'
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerAddress">
                                <FiMapPin className={styles.inputIcon} />
                                Address
                            </label>
                            <input
                                type="text"
                                value={editingCustomer.address}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                                placeholder="Enter address"
                                name='address'
                                required
                                autoComplete='address'
                                id='customerAddress'
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="customerStatus" >
                                Status
                            </label>
                            <select
                                value={editingCustomer.is_active ? '1' : '0'}
                                onChange={(e) => setEditingCustomer({
                                    ...editingCustomer,
                                    is_active: e.target.value === '1' ? 1 : 0
                                })}
                                name='is_active'
                                required
                                id='customerStatus'
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="customerRole" >
                                Role
                            </label>
                            <select
                                value={editingCustomer.role || 'customer'}
                                onChange={(e) => setEditingCustomer({
                                    ...editingCustomer,
                                    role: e.target.value
                                })}
                                name='role'
                                required
                                id='customerRole'
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setEditingCustomer(null)}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={saveEditedCustomer}
                        >
                            <FiCheck /> Save Changes
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    )
}