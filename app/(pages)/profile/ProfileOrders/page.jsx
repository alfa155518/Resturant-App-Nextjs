"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaSpinner, FaShoppingBag } from "react-icons/fa";
import styles from "../../../../src/css/profile-orders.module.css";
import { UserContext } from "@/store/UserProvider";
import OrderControls from "./OrderControls";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderHistoryContent from "./OrderHistoryContent";

export default function ProfileOrders() {
  const [loading, setLoading] = useState(true);

  // user Context
  const { checkoutHistory, setCheckoutHistory, searchTerm, activeFilter } = useContext(UserContext);

  // Simulate API loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckoutHistory(checkoutHistory);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!checkoutHistory || checkoutHistory.items?.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FaShoppingBag className={styles.emptyIcon} />
        <h3>No orders found</h3>
        <p>
          {searchTerm
            ? `No orders match your search for "${searchTerm}"`
            : `You don't have any ${activeFilter !== "all" ? activeFilter : ""
            } orders yet.`}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className={styles.ordersContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}>
      <h2>Order History</h2>

      {/**** Order Controllers ****/}
      <OrderControls styles={styles} />

      {/* Order History Content */}
      <OrderHistoryContent styles={styles} />

      {/* Order Details Modal */}
      <OrderDetailsModal styles={styles} />
    </motion.div>
  );
}
