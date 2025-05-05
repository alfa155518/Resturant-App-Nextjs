"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/store/CartProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaReceipt } from "react-icons/fa";
import styles from "@/src/css/payment-success.module.css";
import confetti from "canvas-confetti";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
      delay: 0.3,
    },
  },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const circleVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export default function SuccessPayment() {
  const { paymentDetails } = useContext(CartContext);
  const [lastPayment, setLastPayment] = useState(null);
  const [hasLaunched, setHasLaunched] = useState(false);

  // Get the last payment details from the array
  useEffect(() => {
    if (
      paymentDetails &&
      Array.isArray(paymentDetails) &&
      paymentDetails.length > 0
    ) {
      setLastPayment(paymentDetails[paymentDetails.length - 1]);
    }
  }, [paymentDetails]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Launch confetti effect
  useEffect(() => {
    if (!hasLaunched) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const launchConfetti = () => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return;
        }

        const particleCount = 50;

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: randomInRange(0.1, 0.5),
          },
          colors: ["#4CAF50", "#FFC107", "#2196F3", "#9C27B0", "#FF5722"],
          disableForReducedMotion: true,
        });

        requestAnimationFrame(launchConfetti);
      };

      launchConfetti();
      setHasLaunched(true);
    }
  }, [hasLaunched]);

  return (
    <div className={styles.successContainer}>
      <motion.div
        className={styles.card}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <motion.div className={styles.successIcon} variants={iconVariants}>
          <svg viewBox="0 0 52 52">
            <motion.circle
              className={styles.checkmarkCircle}
              cx="26"
              cy="26"
              r="24"
              variants={circleVariants}
            />
            <motion.path
              className={styles.checkmark}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              variants={checkmarkVariants}
            />
          </svg>
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Payment Successful!
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Thank you for your order. Your payment has been processed
          successfully.
        </motion.p>

        {lastPayment ? (
          <motion.div className={styles.orderDetails} variants={itemVariants}>
            <div className={styles.orderItem}>
              <span className={styles.label}>Session ID:</span>
              <span className={styles.value}>
                {lastPayment.session_id || "N/A"}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.label}>Date:</span>
              <span className={styles.value}>
                {formatDate(lastPayment.payment_date || lastPayment.created_at)}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.label}>Payment Method:</span>
              <span className={styles.value}>
                {lastPayment.payment_method || "Credit Card"}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.label}>Payment Status:</span>
              <span className={styles.value}>
                {lastPayment.payment_status || "N/A"}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.label}>Currency:</span>
              <span className={styles.value}>
                {lastPayment.currency?.toUpperCase() || "USD"}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.label}>Total Amount:</span>
              <span className={`${styles.value} ${styles.highlight}`}>
                $
                {lastPayment.amount_total ||
                  lastPayment.total_price ||
                  (lastPayment.amount
                    ? (lastPayment.amount / 100).toFixed(2)
                    : "N/A")}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div className={styles.orderDetails} variants={itemVariants}>
            <p>Loading payment details...</p>
          </motion.div>
        )}

        <motion.div className={styles.actions} variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/profile"
              className={`${styles.button} ${styles.primary}`}>
              <FaReceipt />
              View Orders
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className={`${styles.button} ${styles.secondary}`}>
              <FaHome />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
