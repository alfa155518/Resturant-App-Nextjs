import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from '../../src/css/admin-recent-orders.module.css';
import Skeleton from 'react-loading-skeleton';
import { formatRelativeTime } from '@/utils/dateUtils';

export default function RecentOrders({ orders }) {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 4;
  const displayedOrders = showAll ? orders : orders?.slice(0, initialDisplayCount);

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

  // Parse cart items for all orders
  const cartItems = orders?.map(order => {
    const metadata = typeof order.metadata === 'string' ? JSON.parse(order.metadata) : order.metadata;
    return typeof metadata.cart_items === 'string'
      ? JSON.parse(metadata.cart_items)
      : metadata.cart_items || [];
  });

  if (!orders || orders.length === 0) {
    return (
      <Skeleton count={4} height={100} />
    )
  }

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
          {displayedOrders?.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <td className={styles.orderId}>{order.id}</td>
              <td className={styles.customerName}>{order.customer_name}</td>
              <td className={styles.itemCount}>
                {cartItems[index].length}
              </td>
              <td className={styles.orderTotal}>
                ${order.metadata.total_price}
              </td>
              <td>
                <span className={`${styles.orderStatus} ${getStatusClass(order.payment_status)}`}>
                  {order.payment_status}
                </span>
              </td>
              <td className={styles.orderTime}>{formatRelativeTime(order.payment_date)}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
      {orders?.length > initialDisplayCount && (
        <div className={styles.viewAll}>
          <button onClick={toggleView}>
            {showAll ? 'View Less Orders' : 'View All Orders'}
          </button>
        </div>
      )}
    </div>
  );
}