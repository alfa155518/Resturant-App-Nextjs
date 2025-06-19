"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaBell, FaCamera, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/profile-settings.module.css';
import SendButton from '@/components/ui/SendButton';
import useProfileSettings from '@/hooks/useProfileSettings';
import LoadingSpinner from '@/components/ui/LoadingSpinner';



export default function ProfileSettings({ user }) {
  const { avatar = "/images/default-reviewer.webp", email = "", name = "", phone = "" } = user || {}
  const [activeSection, setActiveSection] = useState('personal');

  // Custom hook for profile settings
  const [isClient, passwordFormData, handlePasswordInputChange, handlePasswordSubmit,
    previewImage,
    setPreviewImage,
    personalFormData,
    setPersonaFormData, handlePersonalInputChange, handleImageChange, handlePersonalInfoSubmit, fadeIn] = useProfileSettings()

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false
  });

  // Effect to initialize/update form data from user prop
  useEffect(() => {
    if (user) {
      setPersonaFormData(
        prevData => ({
          name: name || '',
          email: email || '',
          phone: phone || '',
          address: user.address || '',
          avatar: prevData.avatar || avatar || null
        }));
      if (!previewImage && user.avatar && !personalFormData.avatar) {
        setPreviewImage(avatar);
      }
    }
  }, [user, previewImage, personalFormData.avatar]);


  const handleNotificationInputChange = (e) => {
    const { type, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: value,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (!isClient || !user) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <motion.div
      className={styles.settingsContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2>Account Settings</h2>

      <div className={styles.settingsTabs}>
        <button
          className={`${styles.tabButton} ${activeSection === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveSection('personal')}
        >
          <FaUser /> Personal Information
        </button>
        <button
          className={`${styles.tabButton} ${activeSection === 'password' ? styles.active : ''}`}
          onClick={() => setActiveSection('password')}
        >
          <FaLock /> Change Password
        </button>
        <button
          className={`${styles.tabButton} ${activeSection === 'notifications' ? styles.active : ''}`}
          onClick={() => setActiveSection('notifications')}
        >
          <FaBell /> Notification Preferences
        </button>
      </div>


      {/* Personal Section */}
      {activeSection === 'personal' && (
        <form className={styles.settingsForm} onSubmit={handlePersonalInfoSubmit}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <Image
                src={previewImage || user?.avatar || '/images/default-avatar.png'}
                alt={"user"}
                width={100}
                height={100}
                className={styles.avatarImage}
              />
              <label className={styles.avatarUpload}>
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  autoComplete='image'
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
              </label>
            </div>
            <p className={styles.avatarHint}>Click the camera icon to upload a new profile picture</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete='name'
              value={personalFormData.name}
              onChange={handlePersonalInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete='email'
              value={personalFormData.email}
              onChange={handlePersonalInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete='tel'
              value={personalFormData.phone}
              onChange={handlePersonalInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              autoComplete='address'
              value={personalFormData.address}
              onChange={handlePersonalInputChange}
              rows="3"
            />
          </div>
          <SendButton text={"Save"} />
        </form>
      )}

      {/* Password Section */}
      {activeSection === 'password' && (
        <form className={styles.settingsForm} onSubmit={handlePasswordSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={passwordFormData.email} // Use email as username
            style={{ display: 'none' }} // Hide this field visually
            aria-hidden="true"
            tabIndex="-1"
            readOnly
          />
          <div className={styles.formGroup}>
            <label htmlFor="current_password">Current Password</label>
            <input
              type="password"
              id="current_password"
              name="current_password"
              autoComplete='current-password'
              value={passwordFormData.current_password}
              onChange={handlePasswordInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete='new-password'
              value={passwordFormData.password}
              onChange={handlePasswordInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password_confirmation">Confirm New Password</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              autoComplete='new-password'
              value={passwordFormData.password_confirmation}
              onChange={handlePasswordInputChange}
            />
          </div>
          <SendButton text={"Change"} />
        </form>
      )}

      {activeSection === 'notifications' && (
        <form className={styles.settingsForm}>
          <div className={styles.notificationGroup}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationInputChange}
              />
              <label htmlFor="emailNotifications">Email Notifications</label>
            </div>
            <p className={styles.notificationDescription}>
              Receive order updates, reservation confirmations, and important account notifications via email.
            </p>
          </div>

          <div className={styles.notificationGroup}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationInputChange}
              />
              <label htmlFor="smsNotifications">SMS Notifications</label>
            </div>
            <p className={styles.notificationDescription}>
              Receive text messages for order status updates and reservation reminders.
            </p>
          </div>

          <div className={styles.notificationGroup}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="marketingEmails"
                name="marketingEmails"
                checked={notifications.marketingEmails}
                onChange={handleNotificationInputChange}
              />
              <label htmlFor="marketingEmails">Marketing Emails</label>
            </div>
            <p className={styles.notificationDescription}>
              Receive special offers, promotions, and newsletters about our latest menu items and events.
            </p>
          </div>

          <SendButton text={"Save"} />
        </form>
      )}
    </motion.div>
  );
}