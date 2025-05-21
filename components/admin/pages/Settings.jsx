"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiCheck, FiEdit2, FiClock, FiMail, FiDollarSign, FiUser, FiInfo, FiMapPin, FiPhone, FiGlobe } from 'react-icons/fi';
import styles from '../../../src/css/admin-settings.module.css';

export default function Settings() {
  // Restaurant information
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Gourmet Haven',
    address: '123 Culinary Street, Foodville, CA 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@gourmethaven.com',
    website: 'www.gourmethaven.com',
    description: 'A fine dining restaurant offering exquisite culinary experiences with a focus on seasonal ingredients and innovative techniques.'
  });

  // Operating hours
  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', open: '10:00', close: '22:00', closed: false },
    { day: 'Tuesday', open: '10:00', close: '22:00', closed: false },
    { day: 'Wednesday', open: '10:00', close: '22:00', closed: false },
    { day: 'Thursday', open: '10:00', close: '23:00', closed: false },
    { day: 'Friday', open: '10:00', close: '23:00', closed: false },
    { day: 'Saturday', open: '11:00', close: '23:00', closed: false },
    { day: 'Sunday', open: '11:00', close: '22:00', closed: false },
  ]);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Credit Card', enabled: true },
    { id: 2, name: 'Debit Card', enabled: true },
    { id: 3, name: 'Cash', enabled: true },
    { id: 4, name: 'PayPal', enabled: false },
    { id: 5, name: 'Apple Pay', enabled: true },
    { id: 6, name: 'Google Pay', enabled: true },
  ]);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    newOrder: true,
    orderStatus: true,
    newReservation: true,
    reservationReminder: true,
    newReview: true,
    lowInventory: false,
    dailySummary: true,
    weeklySummary: true,
    marketingEmails: false
  });

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
  const [editingRestaurantInfo, setEditingRestaurantInfo] = useState(false);
  const [editingUserSettings, setEditingUserSettings] = useState(false);
  const [editingHours, setEditingHours] = useState(false);

  // Handle restaurant info form submission
  const handleRestaurantInfoSubmit = (e) => {
    e.preventDefault();
    setEditingRestaurantInfo(false);
    // Here you would typically save to backend
    alert('Restaurant information updated successfully!');
  };

  // Handle operating hours form submission
  const handleHoursSubmit = (e) => {
    e.preventDefault();
    setEditingHours(false);
    // Here you would typically save to backend
    alert('Operating hours updated successfully!');
  };

  // Handle user settings form submission
  const handleUserSettingsSubmit = (e) => {
    e.preventDefault();
    setEditingUserSettings(false);
    // Here you would typically save to backend
    alert('User settings updated successfully!');
  };

  // Toggle payment method
  const togglePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method =>
      method.id === id ? { ...method, enabled: !method.enabled } : method
    ));
  };

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  // Update operating hours
  const updateHours = (index, field, value) => {
    const updatedHours = [...operatingHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setOperatingHours(updatedHours);
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
            <h2>Settings</h2>
          </div>

          <div className={styles.settingsGrid}>
            {/* Restaurant Information */}
            <motion.div
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={styles.cardHeader}>
                <h3><FiInfo /> Restaurant Information</h3>
                {!editingRestaurantInfo ? (
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingRestaurantInfo(true)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                ) : (
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingRestaurantInfo(false)}
                  >
                    <FiX /> Cancel
                  </button>
                )}
              </div>

              {!editingRestaurantInfo ? (
                <div className={styles.infoContent}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Restaurant Name</span>
                    <span className={styles.infoValue}>{restaurantInfo.name}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><FiMapPin /> Address</span>
                    <span className={styles.infoValue}>{restaurantInfo.address}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><FiPhone /> Phone</span>
                    <span className={styles.infoValue}>{restaurantInfo.phone}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><FiMail /> Email</span>
                    <span className={styles.infoValue}>{restaurantInfo.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}><FiGlobe /> Website</span>
                    <span className={styles.infoValue}>{restaurantInfo.website}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Description</span>
                    <span className={styles.infoValue}>{restaurantInfo.description}</span>
                  </div>
                </div>
              ) : (
                <form className={styles.formWrapper} onSubmit={handleRestaurantInfoSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Restaurant Name</label>
                    <input className={styles.formInput}
                      type="text"
                      value={restaurantInfo.name}
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Address</label>
                    <input className={styles.formInput}
                      type="text"
                      value={restaurantInfo.address}
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone</label>
                      <input className={styles.formInput}
                        type="text"
                        value={restaurantInfo.phone}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email</label>
                      <input className={styles.formInput}
                        type="email"
                        value={restaurantInfo.email}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Website</label>
                    <input className={styles.formInput}
                      type="text"
                      value={restaurantInfo.website}
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, website: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea className={styles.formTextarea}
                      value={restaurantInfo.description}
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, description: e.target.value })}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn}>
                      <FiSave /> Save Changes
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Operating Hours */}
            <motion.div
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className={styles.cardHeader}>
                <h3><FiClock /> Operating Hours</h3>
                {!editingHours ? (
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingHours(true)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                ) : (
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingHours(false)}
                  >
                    <FiX /> Cancel
                  </button>
                )}
              </div>

              {!editingHours ? (
                <div className={styles.hoursContent}>
                  {operatingHours.map((hours, index) => (
                    <div key={index} className={styles.hourRow}>
                      <span className={styles.dayLabel}>{hours.day}</span>
                      {hours.closed ? (
                        <span className={styles.closedLabel}>Closed</span>
                      ) : (
                        <span className={styles.timeRange}>{hours.open} - {hours.close}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <form className={styles.formWrapper} onSubmit={handleHoursSubmit}>
                  {operatingHours.map((hours, index) => (
                    <div key={index} className={styles.hourInputRow}>
                      <span className={styles.dayLabel}>{hours.day}</span>
                      <div className={styles.hourInputs}>
                        <div className={styles.timeInputs}>
                          <input className={styles.formInput}
                            type="time"
                            value={hours.open}
                            onChange={(e) => updateHours(index, 'open', e.target.value)}
                            disabled={hours.closed}
                          />
                          <span className={styles.timeSeparator}>to</span>
                          <input className={styles.formInput}
                            type="time"
                            value={hours.close}
                            onChange={(e) => updateHours(index, 'close', e.target.value)}
                            disabled={hours.closed}
                          />
                        </div>
                        <div className={styles.closedToggle}>
                          <input className={styles.formInput}
                            type="checkbox"
                            id={`closed-${index}`}
                            checked={hours.closed}
                            onChange={(e) => updateHours(index, 'closed', e.target.checked)}
                          />
                          <label className={styles.toggleLabel} htmlFor={`closed-${index}`}>Closed</label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn}>
                      <FiSave /> Save Changes
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <h3><FiDollarSign /> Payment Methods</h3>
              </div>

              <div className={styles.paymentMethodsContent}>
                {paymentMethods.map(method => (
                  <div key={method.id} className={styles.paymentMethod}>
                    <span className={styles.paymentMethodName}>{method.name}</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id={`payment-${method.id}`}
                        checked={method.enabled}
                        onChange={() => togglePaymentMethod(method.id)}
                      />
                      <label className={styles.toggleLabel} htmlFor={`payment-${method.id}`}></label>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className={styles.cardHeader}>
                <h3><FiMail /> Notification Settings</h3>
              </div>

              <div className={styles.notificationContent}>
                <div className={styles.notificationGroup}>
                  <h4 className={styles.notificationGroupTitle}>Order Notifications</h4>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>New Order Received</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="newOrder"
                        checked={notificationSettings.newOrder}
                        onChange={() => toggleNotification('newOrder')}
                      />
                      <label className={styles.toggleLabel} htmlFor="newOrder"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Order Status Updates</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="orderStatus"
                        checked={notificationSettings.orderStatus}
                        onChange={() => toggleNotification('orderStatus')}
                      />
                      <label className={styles.toggleLabel} htmlFor="orderStatus"></label>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationGroup}>
                  <h4 className={styles.notificationGroupTitle}>Reservation Notifications</h4>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>New Reservation</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="newReservation"
                        checked={notificationSettings.newReservation}
                        onChange={() => toggleNotification('newReservation')}
                      />
                      <label className={styles.toggleLabel} htmlFor="newReservation"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Reservation Reminders</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="reservationReminder"
                        checked={notificationSettings.reservationReminder}
                        onChange={() => toggleNotification('reservationReminder')}
                      />
                      <label className={styles.toggleLabel} htmlFor="reservationReminder"></label>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationGroup}>
                  <h4 className={styles.notificationGroupTitle}>Other Notifications</h4>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>New Customer Review</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="newReview"
                        checked={notificationSettings.newReview}
                        onChange={() => toggleNotification('newReview')}
                      />
                      <label className={styles.toggleLabel} htmlFor="newReview"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Low Inventory Alert</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="lowInventory"
                        checked={notificationSettings.lowInventory}
                        onChange={() => toggleNotification('lowInventory')}
                      />
                      <label className={styles.toggleLabel} htmlFor="lowInventory"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Daily Summary</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="dailySummary"
                        checked={notificationSettings.dailySummary}
                        onChange={() => toggleNotification('dailySummary')}
                      />
                      <label className={styles.toggleLabel} htmlFor="dailySummary"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Weekly Summary</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="weeklySummary"
                        checked={notificationSettings.weeklySummary}
                        onChange={() => toggleNotification('weeklySummary')}
                      />
                      <label className={styles.toggleLabel} htmlFor="weeklySummary"></label>
                    </div>
                  </div>
                  <div className={styles.notificationSetting}>
                    <span className={styles.notificationLabel}>Marketing Emails</span>
                    <div className={styles.toggleSwitch}>
                      <input className={styles.formInput}
                        type="checkbox"
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => toggleNotification('marketingEmails')}
                      />
                      <label className={styles.toggleLabel} htmlFor="marketingEmails"></label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

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
                    <label className={styles.formLabel}>Name</label>
                    <input className={styles.formInput}
                      type="text"
                      value={userSettings.name}
                      onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input className={styles.formInput}
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Role</label>
                    <select className={styles.formSelect}
                      value={userSettings.role}
                      onChange={(e) => setUserSettings({ ...userSettings, role: e.target.value })}
                    >
                      <option value="Restaurant Manager">Restaurant Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <input className={styles.formInput}
                      type="password"
                      value={userSettings.password}
                      onChange={(e) => setUserSettings({ ...userSettings, password: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label className={styles.formLabel}>Two-Factor Authentication</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="twoFactorAuth"
                          checked={userSettings.twoFactorAuth}
                          onChange={(e) => setUserSettings({ ...userSettings, twoFactorAuth: e.target.checked })}
                        />
                        <label className={styles.toggleLabel} htmlFor="twoFactorAuth"></label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label className={styles.formLabel}>Email Notifications</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="emailNotifications"
                          checked={userSettings.emailNotifications}
                          onChange={(e) => setUserSettings({ ...userSettings, emailNotifications: e.target.checked })}
                        />
                        <label className={styles.toggleLabel} htmlFor="emailNotifications"></label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.toggleOption}>
                      <label className={styles.formLabel}>Push Notifications</label>
                      <div className={styles.toggleSwitch}>
                        <input
                          className={styles.closedCheckbox}
                          type="checkbox"
                          id="pushNotifications"
                          checked={userSettings.pushNotifications}
                          onChange={(e) => setUserSettings({ ...userSettings, pushNotifications: e.target.checked })}
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
