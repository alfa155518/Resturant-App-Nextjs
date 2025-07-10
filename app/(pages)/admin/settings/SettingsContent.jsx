"use client";


import { motion } from 'framer-motion';
import { useContext } from 'react';
import { RestaurantSettingsContext } from '@/store/RestaurantSettingsProvider';
import SettingsInfo from '@/app/(pages)/admin/settings/Info';
import OperatingHours from '@/app/(pages)/admin/settings/OperatingHours';
import PaymentMethods from '@/app/(pages)/admin/settings/PaymentMethods';
import Notification from '@/app/(pages)/admin/settings/Notification';
import OverlayOfLoading from '@/components/OverlayOfLoading';
import styles from '../../../../src/css/admin-settings.module.css';

export default function SettingsContent() {
  // admin settings context
  const { isSubmitting } = useContext(RestaurantSettingsContext);


  // overlay loading of actions
  if (isSubmitting) {
    return <OverlayOfLoading />;
  }


  return (
    <div className={styles.adminDashboard}>
      <div className={styles.dashboardContent}>
        <motion.div
          className={styles.settingsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.settingsHeader}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Settings
            </motion.h2>
          </div>

          <div className={styles.settingsGrid}>
            {/* Restaurant Information */}
            <SettingsInfo styles={styles} />

            {/* Operating Hours */}
            <OperatingHours styles={styles} />

            {/* Payment Methods */}
            <PaymentMethods styles={styles} />

            {/* Notification Settings */}
            <Notification styles={styles} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
