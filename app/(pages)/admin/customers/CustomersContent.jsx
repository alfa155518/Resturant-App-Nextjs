"use client";

import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import styles from '../../../../src/css/admin-customers.module.css';
import EditModalCustomer from '@/app/(pages)/admin/customers/EditModalCustomer';
import CustomerDetails from '@/app/(pages)/admin/customers/CustomerDetails';
import CustomersTable from '@/app/(pages)/admin/customers/CustomersTable';
import useAdminManageCustomers from '@/hooks/useAdminManageCustomers';
import Skeleton from 'react-loading-skeleton';

export default function CustomersContent() {
  const [
    // State
    customers,
    selectedCustomer,
    searchTerm,
    statusFilter,
    editingCustomer,
    showCustomerDetails,
    filteredCustomers,

    // Actions
    setSearchTerm,
    setStatusFilter,
    setEditingCustomer,
    setShowCustomerDetails,
    viewCustomerDetails,
    startEditingCustomer,
    saveEditedCustomer,
    deleteCustomer
  ] = useAdminManageCustomers();

  // skeleton loading customers
  if (!customers || customers.length === 0) {
    return (
      <Skeleton count={3} height={100} />
    )
  }
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
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <CustomersTable
        styles={styles}
        filteredCustomers={filteredCustomers}
        viewCustomerDetails={viewCustomerDetails}
        startEditingCustomer={startEditingCustomer}
        deleteCustomer={deleteCustomer}
      />

      {/* Customer Details Modal */}
      <CustomerDetails
        styles={styles}
        showCustomerDetails={showCustomerDetails}
        selectedCustomer={selectedCustomer}
        setShowCustomerDetails={setShowCustomerDetails}
      />

      {/* Edit Customer Modal */}
      <EditModalCustomer
        styles={styles}
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
        saveEditedCustomer={saveEditedCustomer}
      />
    </motion.div >
  );
}
