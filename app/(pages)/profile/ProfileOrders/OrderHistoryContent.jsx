import { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "@/store/UserProvider";
import Image from "next/image";
import {
  FaShoppingBag,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
export default function OrderHistoryContent({ styles }) {
  const {
    searchTerm,
    openOrderDetails,
    getStatusText,
    filteredOrders,
    activeFilter,
    getStatusIcon,
    checkoutHistory,
  } = useContext(UserContext);

  return checkoutHistory.items?.length === 0 ? (
    <div className={styles.emptyState}>
      <FaShoppingBag className={styles.emptyIcon} />
      <h3>No orders found</h3>
      <p>
        {searchTerm
          ? `No orders match your search for "${searchTerm}"`
          : `You don't have any ${
              activeFilter !== "all" ? activeFilter : ""
            } orders yet.`}
      </p>
    </div>
  ) : (
    <div className={styles.ordersList}>
      {filteredOrders?.map((order, index) => (
        <motion.div
          key={order.id}
          className={styles.orderCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}>
          {/* Order Header */}
          <div className={styles.orderHeader}>
            <div className={styles.orderInfo}>
              <h3>{`ORD-${new Date(
                order.checkout?.payment_date
              ).toLocaleDateString()}-00${order.id}`}</h3>
              <div className={styles.orderMeta}>
                <span className={styles.orderDate}>
                  <FaCalendarAlt />{" "}
                  {new Date(order.checkout?.payment_date).toLocaleDateString()}
                </span>
                <span className={styles.orderTime}>
                  <FaClock /> {order.checkout.payment_date}
                </span>
                <span className={styles.orderTotal}>
                  <FaMoneyBillWave /> ${order.checkout.amount_total}
                </span>
              </div>
            </div>
            <div
              className={`${styles.orderStatus} ${
                styles[order.checkout.payment_status]
              }`}>
              {getStatusIcon(order.checkout.payment_status)}
              <span>{getStatusText(order.checkout.payment_status)}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className={styles.orderItems}>
            <div className={styles.orderItem}>
              <div className={styles.itemImage}>
                <Image
                  src={order.image}
                  alt={order.product_name}
                  width={70}
                  height={70}
                  className={styles.foodImg}
                />
              </div>
              <div className={styles.itemDetails}>
                <h4>{order.product_name}</h4>
                <div className={styles.itemMeta}>
                  <span>${order.price}</span>
                  <span>×</span>
                  <span>{order.quantity}</span>
                </div>
              </div>
              <div className={styles.itemTotal}>
                ${(order.price * order.quantity).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Order Footer */}
          <div className={styles.orderFooter}>
            <div className={styles.orderPayment}>
              <span>Payment Method:</span>
              <strong>{order.checkout.payment_method}</strong>
            </div>
            <div className={styles.orderActions}>
              <button
                className={styles.viewDetailsButton}
                onClick={() => openOrderDetails(order)}>
                View Details
              </button>
              {order.checkout.payment_status === "paid" && (
                <button className={styles.reorderButton}>Reorder</button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
