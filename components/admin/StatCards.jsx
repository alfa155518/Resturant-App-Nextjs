"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiShoppingBag, FiUsers, FiStar } from 'react-icons/fi';
import styles from '../../src/css/admin-stat-cards.module.css';

export default function StatCards({ stats }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: <FiDollarSign />,
      color: 'blue',
      percentage: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <FiShoppingBag />,
      color: 'green',
      percentage: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: <FiUsers />,
      color: 'purple',
      percentage: '+5.7%',
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: <FiStar />,
      color: 'orange',
      percentage: '+0.3',
      trend: 'down'
    }
  ];

  return (
    <div className={styles.statCards}>
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`${styles.statCard} ${styles[card.color]}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <div className={styles.cardIcon}>
            {card.icon}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardValue}>{card.value}</p>
            <p className={`${styles.cardTrend} ${styles[card.trend]}`}>
              {card.percentage} from last month
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
