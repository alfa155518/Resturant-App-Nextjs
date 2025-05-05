"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "@/src/css/payment-cancel.module.css";

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

export default function Cancel() {
  return (
    <div className={styles.cancelContainer}>
      <motion.div
        className={styles.card}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <motion.div className={styles.cancelIcon} variants={iconVariants}>
          <FaExclamationTriangle size={80} />
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Payment Cancelled
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Your payment was not completed. No charges have been made to your
          account.
        </motion.p>

        <motion.div className={styles.message} variants={itemVariants}>
          <p>
            If you experienced any issues during checkout or have questions
            about your order, please contact our customer support team. Your
            cart items are still saved and you can try again when you're ready.
          </p>
        </motion.div>

        <motion.div className={styles.actions} variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/cart" className={`${styles.button} ${styles.primary}`}>
              <FaShoppingCart />
              Return to Cart
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
