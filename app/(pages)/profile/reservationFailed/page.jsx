'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  FaTimesCircle,
  FaExclamationTriangle,
  FaRegSadTear,
  FaRedoAlt,
  FaHome
} from 'react-icons/fa'
import styles from '@/scss/pages/reservation-failed.module.scss'

export default function ReservationFailed() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 120
      }
    }
  }

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, -10, 10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  return (
    <motion.div
      className={styles.reservationFailedContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.iconContainer}>
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          <FaExclamationTriangle className={styles.warningIcon} />
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          <FaTimesCircle className={styles.failedIcon} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          <FaRegSadTear className={styles.sadIcon} />
        </motion.div>
      </div>

      <motion.h1
        className={styles.failedTitle}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Reservation Failed
      </motion.h1>

      <motion.p
        className={styles.failedMessage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We apologize, but there was an issue processing your reservation.
        Please check your details and try again or contact support.
      </motion.p>

      <div className={styles.actionContainer}>
        <motion.button
          className={styles.retryButton}
          onClick={() => router.push('/profile')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaRedoAlt /> Retry Reservation
        </motion.button>

        <motion.button
          className={styles.homeButton}
          onClick={() => router.push('/')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaHome /> Back to Home
        </motion.button>
      </div>
    </motion.div>
  )
}
