"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiDownload, FiEdit2, FiEye, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import Sidebar from '../Sidebar';
import Header from '../Header';
import styles from './Orders.module.scss';

export default function Orders() {
  // Sample order data
  const [orders, setOrders] = useState([
    { id: 'ORD-7829', customer: 'John Smith', items: 3, total: 78.50, status: 'Completed', date: '2025-05-06', time: '18:30', phone: '+1 (555) 123-4567' },
    { id: 'ORD-7830', customer: 'Emily Johnson', items: 2, total: 45.20, status: 'Processing', date: '2025-05-06', time: '19:15', phone: '+1 (555) 234-5678' },
    { id: 'ORD-7831', customer: 'Michael Brown', items: 5, total: 125.00, status: 'Completed', date: '2025-05-06', time: '17:45', phone: '+1 (555) 345-6789' },
    { id: 'ORD-7832', customer: 'Sarah Davis', items: 1, total: 18.90, status: 'Delivered', date: '2025-05-05', time: '20:00', phone: '+1 (555) 456-7890' },
    { id: 'ORD-7833', customer: 'David Wilson', items: 4, total: 92.75, status: 'Preparing', date: '2025-05-05', time: '19:30', phone: '+1 (555) 567-8901' },
    { id: 'ORD-7834', customer: 'Jennifer Lee', items: 3, total: 67.30, status: 'Cancelled', date: '2025-05-05', time: '18:45', phone: '+1 (555) 678-9012' },
    { id: 'ORD-7835', customer: 'Robert Taylor', items: 2, total: 35.80, status: 'Completed', date: '2025-05-04', time: '19:00', phone: '+1 (555) 789-0123' },
    { id: 'ORD-7836', customer: 'Lisa Anderson', items: 6, total: 145.20, status: 'Processing', date: '2025-05-04', time: '20:15', phone: '+1 (555) 890-1234' },
    { id: 'ORD-7837', customer: 'James Martin', items: 2, total: 42.60, status: 'Delivered', date: '2025-05-04', time: '18:30', phone: '+1 (555) 901-2345' },
    { id: 'ORD-7838', customer: 'Patricia White', items: 3, total: 58.90, status: 'Completed', date: '2025-05-03', time: '19:45', phone: '+1 (555) 012-3456' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Order details sample data
  const orderDetails = {
    items: [
      { id: 1, name: 'Truffle Pasta', quantity: 1, price: 24.50 },
      { id: 2, name: 'Caesar Salad', quantity: 1, price: 12.00 },
      { id: 3, name: 'Sparkling Water', quantity: 2, price: 6.00 }
    ],
    subtotal: 42.50,
    tax: 3.40,
    deliveryFee: 5.00,
    discount: 0,
    total: 50.90,
    deliveryAddress: '123 Main St, Anytown, CA 12345',
    paymentMethod: 'Credit Card (****4567)',
    notes: 'Please include extra napkins.'
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle order status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (editingOrder && editingOrder.id === orderId) {
      setEditingOrder({ ...editingOrder, status: newStatus });
    }
  };

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Edit order
  const startEditingOrder = (order) => {
    setEditingOrder({ ...order });
  };

  // Save edited order
  const saveEditedOrder = () => {
    setOrders(orders.map(order => 
      order.id === editingOrder.id ? editingOrder : order
    ));
    setEditingOrder(null);
  };

  // Delete order
  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) {
        setShowOrderDetails(false);
      }
    }
  };

  // Export orders as CSV
  const exportOrders = () => {
    // In a real application, this would generate a CSV file
    alert('Orders exported successfully!');
  };

  return (
    <div className={styles.adminDashboard}>
      <Sidebar />

      <div className={styles.dashboardContent}>
        <Header />

        <motion.div
          className={styles.ordersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.ordersHeader}>
            <h2>Orders Management</h2>
            <div className={styles.orderActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <button className={styles.exportBtn} onClick={exportOrders}>
                <FiDownload /> Export
              </button>
            </div>
          </div>

          <div className={styles.ordersTableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items} items</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.date} at {order.time}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button 
                          className={styles.viewBtn} 
                          onClick={() => viewOrderDetails(order)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button 
                          className={styles.editBtn} 
                          onClick={() => startEditingOrder(order)}
                          title="Edit Order"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className={styles.deleteBtn} 
                          onClick={() => deleteOrder(order.id)}
                          title="Delete Order"
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

          {/* Order Details Modal */}
          {showOrderDetails && selectedOrder && (
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
              >
                <div className={styles.modalHeader}>
                  <h3>Order Details - {selectedOrder.id}</h3>
                  <button 
                    className={styles.closeBtn}
                    onClick={() => setShowOrderDetails(false)}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className={styles.modalContent}>
                  <div className={styles.orderInfo}>
                    <div className={styles.infoRow}>
                      <div className={styles.infoColumn}>
                        <h4>Customer Information</h4>
                        <p><strong>Name:</strong> {selectedOrder.customer}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                        <p><strong>Address:</strong> {orderDetails.deliveryAddress}</p>
                      </div>
                      
                      <div className={styles.infoColumn}>
                        <h4>Order Information</h4>
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                        <p><strong>Time:</strong> {selectedOrder.time}</p>
                        <p><strong>Status:</strong> 
                          <span className={`${styles.statusBadge} ${styles[selectedOrder.status.toLowerCase()]}`}>
                            {selectedOrder.status}
                          </span>
                        </p>
                        <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
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
                          {orderDetails.items.map(item => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>${item.price.toFixed(2)}</td>
                              <td>${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className={styles.orderSummary}>
                      <div className={styles.summaryRow}>
                        <span>Subtotal:</span>
                        <span>${orderDetails.subtotal.toFixed(2)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Tax:</span>
                        <span>${orderDetails.tax.toFixed(2)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Delivery Fee:</span>
                        <span>${orderDetails.deliveryFee.toFixed(2)}</span>
                      </div>
                      {orderDetails.discount > 0 && (
                        <div className={styles.summaryRow}>
                          <span>Discount:</span>
                          <span>-${orderDetails.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span>Total:</span>
                        <span>${orderDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {orderDetails.notes && (
                      <div className={styles.orderNotes}>
                        <h4>Notes</h4>
                        <p>{orderDetails.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <div className={styles.statusActions}>
                    <span>Update Status:</span>
                    <div className={styles.statusButtons}>
                      <button 
                        className={`${styles.statusBtn} ${styles.processing}`}
                        onClick={() => handleStatusChange(selectedOrder.id, 'Processing')}
                      >
                        Processing
                      </button>
                      <button 
                        className={`${styles.statusBtn} ${styles.preparing}`}
                        onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}
                      >
                        Preparing
                      </button>
                      <button 
                        className={`${styles.statusBtn} ${styles.delivered}`}
                        onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                      >
                        Delivered
                      </button>
                      <button 
                        className={`${styles.statusBtn} ${styles.completed}`}
                        onClick={() => handleStatusChange(selectedOrder.id, 'Completed')}
                      >
                        Completed
                      </button>
                      <button 
                        className={`${styles.statusBtn} ${styles.cancelled}`}
                        onClick={() => handleStatusChange(selectedOrder.id, 'Cancelled')}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                  <button 
                    className={styles.closeModalBtn}
                    onClick={() => setShowOrderDetails(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Edit Order Modal */}
          {editingOrder && (
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
              >
                <div className={styles.modalHeader}>
                  <h3>Edit Order - {editingOrder.id}</h3>
                  <button 
                    className={styles.closeBtn}
                    onClick={() => setEditingOrder(null)}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className={styles.modalContent}>
                  <div className={styles.formGroup}>
                    <label>Customer Name</label>
                    <input 
                      type="text" 
                      value={editingOrder.customer}
                      onChange={(e) => setEditingOrder({...editingOrder, customer: e.target.value})}
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Date</label>
                      <input 
                        type="date" 
                        value={editingOrder.date}
                        onChange={(e) => setEditingOrder({...editingOrder, date: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Time</label>
                      <input 
                        type="time" 
                        value={editingOrder.time}
                        onChange={(e) => setEditingOrder({...editingOrder, time: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input 
                        type="text" 
                        value={editingOrder.phone}
                        onChange={(e) => setEditingOrder({...editingOrder, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Status</label>
                      <select 
                        value={editingOrder.status}
                        onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Items Count</label>
                      <input 
                        type="number" 
                        value={editingOrder.items}
                        onChange={(e) => setEditingOrder({...editingOrder, items: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Total Amount</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={editingOrder.total}
                        onChange={(e) => setEditingOrder({...editingOrder, total: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button 
                    className={styles.cancelBtn}
                    onClick={() => setEditingOrder(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className={styles.saveBtn}
                    onClick={saveEditedOrder}
                  >
                    <FiCheck /> Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
