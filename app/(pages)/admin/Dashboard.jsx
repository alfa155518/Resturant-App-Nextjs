"use client"
import { useContext } from 'react';
import { motion } from 'framer-motion';
import StatCards from '../../../components/ui/StatCards';
import RevenueChart from '../../../charts/RevenueChart';
import OrdersChart from '../../../charts/OrdersChart';
import RecentOrders from '../../../components/ui/RecentOrders';
import PopularItems from '../../../components/ui/PopularItems';
import CustomerReviews from '../../../components/ui/CustomerReviews';

import { AdminManageRecentContext } from '@/store/AdminManageRecentProvider';
import styles from '../../../src/css/admin-dashboard.module.css';



export default function Dashboard() {

  const { recentItems, statsCardData } = useContext(AdminManageRecentContext)

  return (
    <motion.div
      className={styles.dashboardMain}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StatCards stats={statsCardData} />

      <div className={styles.chartsContainer}>
        <motion.div
          className={`${styles.chartCard} ${styles.revenueChart}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={styles.sectionName}
          >
            Revenue Overview
          </motion.h3>
          <RevenueChart />
        </motion.div>

        <motion.div
          className={`${styles.chartCard} ${styles.ordersChart}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={styles.sectionName}

          >
            Weekly Orders
          </motion.h3>
          <OrdersChart />
        </motion.div>
      </div>

      <div className={styles.dashboardBottom}>
        <motion.div
          className={styles.recentOrdersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={styles.sectionName}
          >
            Recent Orders
          </motion.h3>
          <RecentOrders orders={recentItems.recentOrders} />
        </motion.div>

        <div className={styles.dashboardSide}>
          <motion.div
            className={styles.popularItemsContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className={styles.sectionName}
            >
              Popular Menu Items
            </motion.h3>
            <PopularItems items={recentItems.popularItems} />
          </motion.div>

          <motion.div
            className={styles.customerReviewsContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className={styles.sectionName}
            >
              Recent Customer Reviews
            </motion.h3>
            <CustomerReviews reviews={recentItems.recentReviews} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
