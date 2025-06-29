"use client";
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

import EditOrderModal from '@/app/(pages)/admin/orders/EditOrderModal';
import OrdersDetails from '@/app/(pages)/admin/orders/OrdersDetails';
import OrdersTable from '@/app/(pages)/admin/orders/OrdersTable';
import useAdminManageOrders from '@/hooks/useAdminManageOrders';

import styles from '../../../../src/css/admin-orders.module.css';

export default function OrdersContent() {

  // Custom Hook For Admin Manage Orders
  const { orders, initialDisplayCount, searchTerm, statusFilter, selectedOrder, showOrderDetails, editingOrder, showAll, displayedOrders, toggleView, viewOrderDetails, startEditingOrder, saveEditedOrder, deleteOrder, setSearchTerm, setStatusFilter, setShowOrderDetails, setEditingOrder } = useAdminManageOrders();


  // Loading Status When No Orders Found
  if (!orders || orders.length === 0) {
    return (
      <Skeleton height={100} count={3} />
    )
  }

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.dashboardContent}>
        <motion.div
          className={styles.ordersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.ordersHeader}>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Orders Management
            </motion.h3>
            <div className={styles.actions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                  autoComplete='search'
                />
              </div>

              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  name="status"
                  autoComplete='status'
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          {/* Orders Table */}
          <OrdersTable
            styles={styles}
            orders={orders}
            displayedOrders={displayedOrders}
            viewOrderDetails={viewOrderDetails}
            startEditingOrder={startEditingOrder}
            deleteOrder={deleteOrder}
            toggleView={toggleView}
            showAll={showAll}
            initialDisplayCount={initialDisplayCount}
          />
          {/* Order Details Modal */}
          <OrdersDetails
            showOrderDetails={showOrderDetails}
            selectedOrder={selectedOrder}
            setShowOrderDetails={setShowOrderDetails}
            styles={styles}
          />
          {/* Edit Order Modal */}
          <EditOrderModal
            styles={styles}
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            saveEditedOrder={saveEditedOrder}
          />
        </motion.div>
      </div>
    </div>
  );
}
