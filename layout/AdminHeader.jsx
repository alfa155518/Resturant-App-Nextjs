"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import styles from '../src/css/admin-header.module.css';

export default function AdminHeader() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received', time: '5 minutes ago' },
    { id: 2, message: 'Customer review submitted', time: '30 minutes ago' },
    { id: 3, message: 'Inventory alert: Low stock on wine', time: '1 hour ago' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <motion.header
      className={styles.adminHeader}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.headerLeft}>
        <h1>Dashboard</h1>
        <p className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search..." name='search' autoComplete='search' />
        </div>

        <div className={styles.notifications}>
          <button
            className={styles.notificationBtn}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell />
            <span className={styles.notificationBadge}>{notifications.length}</span>
          </button>

          {showNotifications && (
            <motion.div
              className={styles.notificationDropdown}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Notifications</h3>
              <ul>
                {notifications.map(notification => (
                  <li key={notification.id}>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <p className={styles.notificationTime}>{notification.time}</p>
                  </li>
                ))}
              </ul>
              <button className={styles.viewAll}>View All</button>
            </motion.div>
          )}
        </div>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <FiUser />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin</p>
            <p className={styles.userRole}>Restaurant Manager</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
