"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiEdit2, FiUser } from 'react-icons/fi';
import styles from '../../../src/css/admin-settings.module.css';
import { useContext } from 'react';
import { RestaurantSettingsContext } from '@/store/RestaurantSettingsProvider';
import SettingsInfo from '@/app/(pages)/admin/settings/Info';
import OperatingHours from '@/app/(pages)/admin/settings/OperatingHours';
import PaymentMethods from '@/app/(pages)/admin/settings/PaymentMethods';
import Notification from '@/app/(pages)/admin/settings/Notification';

export default function Settings() {

  // const { notificationSettings, setNotificationSettings } = useContext(RestaurantSettingsContext);


  // User settings
  const [userSettings, setUserSettings] = useState({
    name: 'Admin User',
    email: 'admin@gourmethaven.com',
    role: 'Restaurant Manager',
    password: '********',
    twoFactorAuth: true,
    emailNotifications: true,
    pushNotifications: false
  });

  // Edit states
  const [editingUserSettings, setEditingUserSettings] = useState(false);

  // Handle user settings form submission
  const handleUserSettingsSubmit = (e) => {
    e.preventDefault();
    setEditingUserSettings(false);
    // Here you would typically save to backend
    alert('User settings updated successfully!');
  };


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
            {/* User Settings */}
            <motion.div
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className={styles.cardHeader}>
                <h3><FiUser /> User Settings</h3>
                {!editingUserSettings ? (
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingUserSettings(true)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                ) : (
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingUserSettings(false)}
                  >
                    <FiX /> Cancel
                  </button>
                )}
              </div>

              {!editingUserSettings ? (
                <div className={styles.userContent}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Name</span>
                    <span className={styles.infoValue}>{userSettings.name}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Email</span>
                    <span className={styles.infoValue}>{userSettings.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Role</span>
                    <span className={styles.infoValue}>{userSettings.role}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Password</span>
                    <span className={styles.infoValue}>{userSettings.password}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Two-Factor Authentication</span>
                    <span className={`${styles.statusBadge} ${userSettings.twoFactorAuth ? styles.enabled : styles.disabled}`}>
                      {userSettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Email Notifications</span>
                    <span className={`${styles.statusBadge} ${userSettings.emailNotifications ? styles.enabled : styles.disabled}`}>
                      {userSettings.emailNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Push Notifications</span>
                    <span className={`${styles.statusBadge} ${userSettings.pushNotifications ? styles.enabled : styles.disabled}`}>
                      {userSettings.pushNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ) : (
                <form className={styles.formWrapper} onSubmit={handleUserSettingsSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Name</label>
                    <input className={styles.formInput}
                      type="text"
                      id="name"
                      value={userSettings.name}
                      onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                      required
                      name='name'
                      autoComplete='name'
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input className={styles.formInput}
                      type="email"
                      id="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                      required
                      name='email'
                      autoComplete='email'
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="role" className={styles.formLabel}>Role</label>
                    <select className={styles.formSelect}
                      value={userSettings.role}
                      onChange={(e) => setUserSettings({ ...userSettings, role: e.target.value })}
                      required
                      name='role'
                      id='role'
                    >
                      <option value="Restaurant Manager">Restaurant Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input className={styles.formInput}
                      type="password"
                      id="password"
                      value={userSettings.password}
                      onChange={(e) => setUserSettings({ ...userSettings, password: e.target.value })}
                      required
                      name='password'
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label htmlFor="twoFactorAuth" className={styles.formLabel}>Two-Factor Authentication</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="twoFactorAuth"
                          checked={userSettings.twoFactorAuth}
                          onChange={(e) => setUserSettings({ ...userSettings, twoFactorAuth: e.target.checked })}
                          required
                          name='two-factor-auth'
                        />
                        <label className={styles.toggleLabel} htmlFor="twoFactorAuth"></label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label htmlFor="emailNotifications" className={styles.formLabel}>Email Notifications</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="emailNotifications"
                          checked={userSettings.emailNotifications}
                          onChange={(e) => setUserSettings({ ...userSettings, emailNotifications: e.target.checked })}
                          required
                          name='email-notifications'
                        />
                        <label className={styles.toggleLabel} htmlFor="emailNotifications"></label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label htmlFor="pushNotifications" className={styles.formLabel}>Push Notifications</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="pushNotifications"
                          checked={userSettings.pushNotifications}
                          onChange={(e) => setUserSettings({ ...userSettings, pushNotifications: e.target.checked })}
                          required
                          name='push-notifications'
                        />
                        <label className={styles.toggleLabel} htmlFor="pushNotifications"></label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn}>
                      <FiSave /> Save Changes
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
