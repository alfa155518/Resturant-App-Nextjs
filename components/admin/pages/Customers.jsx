"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import styles from '../../../scss/pages/admin/admin-customers.module.scss';

export default function Customers() {
  // Sample customers data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', address: '123 Main St, Anytown, CA 12345', joinDate: '2024-11-15', totalOrders: 12, totalSpent: 458.75, lastOrder: '2025-05-01', status: 'Active' },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', phone: '+1 (555) 234-5678', address: '456 Oak Ave, Somewhere, CA 12346', joinDate: '2024-12-03', totalOrders: 8, totalSpent: 325.20, lastOrder: '2025-04-28', status: 'Active' },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '+1 (555) 345-6789', address: '789 Pine Rd, Nowhere, CA 12347', joinDate: '2025-01-20', totalOrders: 5, totalSpent: 187.50, lastOrder: '2025-05-04', status: 'Active' },
    { id: 4, name: 'Sarah Davis', email: 'sarah.d@example.com', phone: '+1 (555) 456-7890', address: '101 Elm St, Anyplace, CA 12348', joinDate: '2025-02-08', totalOrders: 3, totalSpent: 97.40, lastOrder: '2025-04-15', status: 'Active' },
    { id: 5, name: 'David Wilson', email: 'david.w@example.com', phone: '+1 (555) 567-8901', address: '202 Cedar Ln, Somewhere, CA 12349', joinDate: '2024-10-12', totalOrders: 15, totalSpent: 542.80, lastOrder: '2025-05-03', status: 'Active' },
    { id: 6, name: 'Jennifer Lee', email: 'jennifer.l@example.com', phone: '+1 (555) 678-9012', address: '303 Birch Dr, Nowhere, CA 12350', joinDate: '2025-03-05', totalOrders: 2, totalSpent: 78.30, lastOrder: '2025-04-20', status: 'Active' },
    { id: 7, name: 'Robert Taylor', email: 'robert.t@example.com', phone: '+1 (555) 789-0123', address: '404 Maple Ave, Anytown, CA 12351', joinDate: '2024-09-18', totalOrders: 20, totalSpent: 687.25, lastOrder: '2025-05-02', status: 'Active' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1 (555) 890-1234', address: '505 Walnut St, Somewhere, CA 12352', joinDate: '2025-01-30', totalOrders: 4, totalSpent: 145.60, lastOrder: '2025-04-10', status: 'Inactive' },
    { id: 9, name: 'James Martin', email: 'james.m@example.com', phone: '+1 (555) 901-2345', address: '606 Spruce Rd, Nowhere, CA 12353', joinDate: '2024-12-22', totalOrders: 7, totalSpent: 276.90, lastOrder: '2025-03-25', status: 'Active' },
    { id: 10, name: 'Patricia White', email: 'patricia.w@example.com', phone: '+1 (555) 012-3456', address: '707 Pine St, Anyplace, CA 12354', joinDate: '2024-11-05', totalOrders: 9, totalSpent: 312.45, lastOrder: '2025-04-05', status: 'Inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample order history for customer details
  const orderHistory = [
    { id: 'ORD-7829', date: '2025-05-01', items: 3, total: 78.50, status: 'Completed' },
    { id: 'ORD-7712', date: '2025-04-15', items: 2, total: 45.20, status: 'Completed' },
    { id: 'ORD-7631', date: '2025-03-28', items: 5, total: 125.00, status: 'Completed' },
    { id: 'ORD-7524', date: '2025-03-10', items: 1, total: 18.90, status: 'Completed' },
    { id: 'ORD-7433', date: '2025-02-22', items: 4, total: 92.75, status: 'Completed' },
  ];

  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Validate form
  const validateForm = (customerData) => {
    const errors = {};

    if (!customerData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!customerData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!customerData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]+$/.test(customerData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!customerData.address) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  // Handle adding a new customer
  const handleAddCustomer = (e) => {
    e.preventDefault();

    const errors = validateForm(newCustomer);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        const customerToAdd = {
          id: newId,
          ...newCustomer,
          joinDate: new Date().toISOString().split('T')[0],
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: null
        };

        setCustomers([...customers, customerToAdd]);
        setNewCustomer({
          name: '',
          email: '',
          phone: '',
          address: '',
          status: 'Active'
        });
        setShowAddCustomerModal(false);
        setIsSubmitting(false);

        // Show success message
        alert('Customer added successfully!');
      }, 1000);
    }
  };

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Edit customer
  const startEditingCustomer = (customer) => {
    setEditingCustomer({ ...customer });
  };

  // Save edited customer
  const saveEditedCustomer = () => {
    setCustomers(customers.map(customer =>
      customer.id === editingCustomer.id ? editingCustomer : customer
    ));
    setEditingCustomer(null);
  };

  // Delete customer
  const deleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      if (selectedCustomer && selectedCustomer.id === customerId) {
        setShowCustomerDetails(false);
      }
      if (editingCustomer && editingCustomer.id === customerId) {
        setEditingCustomer(null);
      }
    }
  };

  return (
    <motion.div
      className={styles.customersContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.customersHeader}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={styles.sectionName}
        >
          Customer Management
        </motion.h2>
        <div className={styles.customerActions}>
          <div className={styles.searchBar}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name='search'
            />
          </div>

          <div className={styles.filterContainer}>
            <FiFilter className={styles.filterIcon} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              name='status'
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            className={styles.exportBtn}
            onClick={() => setShowAddCustomerModal(true)}
          >
            <FiPlus /> Add Customer
          </button>
        </div>
      </div>

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
            {filteredCustomers.map(customer => (
              <motion.tr
                key={customer.id}
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
                <td>{customer.phone}</td>
                <td>{customer.joinDate}</td>
                <td>{customer.totalOrders}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{customer.lastOrder}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[customer.status.toLowerCase()]}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => viewCustomerDetails(customer)}
                      title="View Details"
                    >
                      <FiUser />
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => startEditingCustomer(customer)}
                      title="Edit Customer"
                    >
                      <FiEdit2 />
                    </button>
                    <button
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

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setShowAddCustomerModal(false)}
        >
          <motion.form
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onSubmit={handleAddCustomer}
          >
            <div className={styles.modalHeader}>
              <h3>Add New Customer</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShowAddCustomerModal(false)}
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={`${styles.formGroup}`}>
                <label htmlFor="customerName">
                  <FiUser className={styles.inputIcon} />
                  Full Name <span className="required">*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    id="customerName"
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => {
                      setNewCustomer({ ...newCustomer, name: e.target.value });
                    }}
                    placeholder="Enter customer name"
                    autoFocus
                    name='name'
                    required
                    autoComplete='name'
                  />
                </div>
              </div>

              <div className={`${styles.formGroup}`}>
                <label htmlFor="customerEmail">
                  <FiMail className={styles.inputIcon} />
                  Email Address <span className="required">*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    id="customerEmail"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => {
                      setNewCustomer({ ...newCustomer, email: e.target.value });
                    }}
                    placeholder="Enter email address"
                    name='email'
                    required
                    autoComplete='email'
                  />
                </div>
              </div>

              <div className={`${styles.formGroup}`}>
                <label htmlFor="customerPhone">
                  <FiPhone className={styles.inputIcon} />
                  Phone Number <span className="required">*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <FiPhone className={styles.inputIcon} />
                  <input
                    id="customerPhone"
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => {
                      setNewCustomer({ ...newCustomer, phone: e.target.value });
                    }}
                    placeholder="Enter phone number"
                    name='phone'
                    required
                    autoComplete='phone'
                  />
                </div>
              </div>

              <div className={`${styles.formGroup}`}>
                <label htmlFor="customerAddress">
                  <FiMapPin className={styles.inputIcon} />
                  Address <span className="required">*</span>
                </label>
                <div className={styles.inputWithIcon}>
                  <FiMapPin className={styles.inputIcon} />
                  <input
                    id="customerAddress"
                    type="text"
                    value={newCustomer.address}
                    onChange={(e) => {
                      setNewCustomer({ ...newCustomer, address: e.target.value });
                    }}
                    placeholder="Enter full address"
                    name='address'
                    required
                    autoComplete='address'
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="customerStatus">Status</label>
                <div className={styles.inputWithIcon}>
                  <select
                    id="customerStatus"
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                    name='status'
                    required
                    autoComplete='status'
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowAddCustomerModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiPlus /> Add Customer
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
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
                    <span className={`${styles.statusBadge} ${styles[selectedCustomer.status.toLowerCase()]}`}>
                      {selectedCustomer.status}
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
                        <p className={styles.detailValue}>{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <FiMapPin className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Address</p>
                        <p className={styles.detailValue}>{selectedCustomer.address}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <FiCalendar className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Join Date</p>
                        <p className={styles.detailValue}>{selectedCustomer.joinDate}</p>
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
                      {orderHistory.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>{order.items}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                              {order.status}
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
                className={styles.cancelBtn}
                onClick={() => setShowCustomerDetails(false)}
              >
                Close
              </button>
              <button
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
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
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
                  value={editingCustomer.status}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                  name='status'
                  required
                  autoComplete='status'
                  id='customerStatus'
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
      )}
    </motion.div>
  );
}
