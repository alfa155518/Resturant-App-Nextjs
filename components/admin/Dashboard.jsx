"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCards from './StatCards';
import RevenueChart from './charts/RevenueChart';
import OrdersChart from './charts/OrdersChart';
import RecentOrders from './RecentOrders';
import PopularItems from './PopularItems';
import CustomerReviews from './CustomerReviews';

// Import CSS Module
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  // Static data for the dashboard
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 125680,
      totalOrders: 1458,
      totalCustomers: 892,
      averageRating: 4.7
    },
    revenueData: [
      { month: 'Jan', revenue: 12500 },
      { month: 'Feb', revenue: 15800 },
      { month: 'Mar', revenue: 14200 },
      { month: 'Apr', revenue: 16900 },
      { month: 'May', revenue: 18500 },
      { month: 'Jun', revenue: 17800 },
      { month: 'Jul', revenue: 19200 },
      { month: 'Aug', revenue: 20100 },
      { month: 'Sep', revenue: 19800 },
      { month: 'Oct', revenue: 21500 },
      { month: 'Nov', revenue: 22800 },
      { month: 'Dec', revenue: 25600 }
    ],
    ordersData: [
      { day: 'Mon', orders: 85 },
      { day: 'Tue', orders: 92 },
      { day: 'Wed', orders: 78 },
      { day: 'Thu', orders: 95 },
      { day: 'Fri', orders: 110 },
      { day: 'Sat', orders: 135 },
      { day: 'Sun', orders: 120 }
    ],
    recentOrders: [
      { id: 'ORD-7829', customer: 'John Smith', items: 3, total: 78.50, status: 'Completed', time: '10 min ago' },
      { id: 'ORD-7830', customer: 'Emily Johnson', items: 2, total: 45.20, status: 'Processing', time: '25 min ago' },
      { id: 'ORD-7831', customer: 'Michael Brown', items: 5, total: 125.00, status: 'Completed', time: '45 min ago' },
      { id: 'ORD-7832', customer: 'Sarah Davis', items: 1, total: 18.90, status: 'Delivered', time: '1 hour ago' },
      { id: 'ORD-7833', customer: 'David Wilson', items: 4, total: 92.75, status: 'Preparing', time: '1.5 hours ago' },
    ],
    popularItems: [
      { id: 1, name: 'Truffle Pasta', orders: 245, revenue: 4900, image: '/images/menu/pasta.jpg' },
      { id: 2, name: 'Wagyu Steak', orders: 198, revenue: 7920, image: '/images/menu/steak.jpg' },
      { id: 3, name: 'Seafood Paella', orders: 187, revenue: 5610, image: '/images/menu/paella.jpg' },
      { id: 4, name: 'Chocolate Souffle', orders: 176, revenue: 2640, image: '/images/menu/dessert.jpg' },
    ],
    customerReviews: [
      { id: 1, customer: 'Jessica Miller', rating: 5, comment: 'Absolutely amazing experience! The food was exceptional and the service was impeccable.', date: '2 days ago' },
      { id: 2, customer: 'Robert Taylor', rating: 4, comment: 'Great food and atmosphere. Will definitely come back again.', date: '3 days ago' },
      { id: 3, customer: 'Amanda Clark', rating: 5, comment: 'The chef\'s special was out of this world. Highly recommend!', date: '5 days ago' },
    ]
  });

  return (
    <div className={styles.adminDashboard}>
      <Sidebar />

      <div className={styles.dashboardContent}>
        <Header />

        <motion.div
          className={styles.dashboardMain}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCards stats={dashboardData.stats} />

          <div className={styles.chartsContainer}>
            <motion.div
              className={`${styles.chartCard} ${styles.revenueChart}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Revenue Overview</h3>
              <RevenueChart data={dashboardData.revenueData} />
            </motion.div>

            <motion.div
              className={`${styles.chartCard} ${styles.ordersChart}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>Weekly Orders</h3>
              <OrdersChart data={dashboardData.ordersData} />
            </motion.div>
          </div>

          <div className={styles.dashboardBottom}>
            <motion.div
              className={styles.recentOrdersContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3>Recent Orders</h3>
              <RecentOrders orders={dashboardData.recentOrders} />
            </motion.div>

            <div className={styles.dashboardSide}>
              <motion.div
                className={styles.popularItemsContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3>Popular Menu Items</h3>
                <PopularItems items={dashboardData.popularItems} />
              </motion.div>

              <motion.div
                className={styles.customerReviewsContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3>Recent Customer Reviews</h3>
                <CustomerReviews reviews={dashboardData.customerReviews} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
