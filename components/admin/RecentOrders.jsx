import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from '../../src/css/admin-recent-orders.module.css';

export default function RecentOrders({ orders }) {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 4;
  const displayedOrders = showAll ? orders : orders.slice(0, initialDisplayCount);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return styles.statusCompleted;
      case 'processing':
        return styles.statusProcessing;
      case 'preparing':
        return styles.statusPreparing;
      case 'delivered':
        return styles.statusDelivered;
      default:
        return '';
    }
  };

  const toggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles.recentOrders}>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayedOrders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className={styles.orderId}>{order.id}</td>
              <td className={styles.customerName}>{order.customer}</td>
              <td className={styles.itemCount}>{order.items}</td>
              <td className={styles.orderTotal}>${order.total.toFixed(2)}</td>
              <td>
                <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className={styles.orderTime}>{order.time}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
      {orders.length > initialDisplayCount && (
        <div className={styles.viewAll}>
          <button onClick={toggleView}>
            {showAll ? 'View Less Orders' : 'View All Orders'}
          </button>
        </div>
      )}
    </div>
  );
}