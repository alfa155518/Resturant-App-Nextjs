"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import styles from "../../../../src/css/profile-orders.module.css";
import { UserContext } from "@/store/UserProvider";
import OrderControls from "./OrderControls";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderHistoryContent from "./OrderHistoryContent";

export default function ProfileOrders() {
  const [loading, setLoading] = useState(true);

  // user Context
  const { checkoutHistory, setCheckoutHistory } = useContext(UserContext);

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
