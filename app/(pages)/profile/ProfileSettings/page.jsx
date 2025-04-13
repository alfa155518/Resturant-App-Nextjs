"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBell, FaCamera, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/profile-settings.module.css';

export default function ProfileSettings({ user, setUser }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false
  });
  // Update form data when user object changes
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, [user]);
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePersonalInfo()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user state with new data
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        avatar: previewImage || user.avatar
      });
      
      setSuccess('Personal information updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccess('Password changed successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Notification preferences updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to update notification preferences. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };


    if (!isClient || !user) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading settings...</p>
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
      
      {success && (
        <div className={styles.successMessage}>
          <FaCheck /> {success}
        </div>
      )}
      
      {errors.submit && (
        <div className={styles.errorMessage}>
          <FaExclamationTriangle /> {errors.submit}
        </div>
      )}
      
      {activeSection === 'personal' && (
        <form className={styles.settingsForm} onSubmit={handlePersonalInfoSubmit}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <Image 
                src={previewImage || user?.avatar || '/images/default-avatar.png'} 
                alt={user.name} 
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
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              autoComplete='email'
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              autoComplete='tel'
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? styles.inputError : ''}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea 
              id="address" 
              name="address" 
              autoComplete='address'
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
      
      {activeSection === 'password' && (
        <form className={styles.settingsForm} onSubmit={handlePasswordSubmit}>
              <input 
            type="text" 
            id="username" 
            name="username" 
            autoComplete="username"
            value={formData.email} // Use email as username
            style={{ display: 'none' }} // Hide this field visually
            aria-hidden="true"
            tabIndex="-1"
            readOnly
          />
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input 
              type="password" 
              id="currentPassword" 
              name="currentPassword" 
              autoComplete='current-password'
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={errors.currentPassword ? styles.inputError : ''}
            />
            {errors.currentPassword && <span className={styles.errorText}>{errors.currentPassword}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              autoComplete='new-password'
              value={formData.newPassword}
              onChange={handleInputChange}
              className={errors.newPassword ? styles.inputError : ''}
            />
            {errors.newPassword && <span className={styles.errorText}>{errors.newPassword}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              autoComplete='new-password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? styles.inputError : ''}
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>
      )}
      
      {activeSection === 'notifications' && (
        <form className={styles.settingsForm} onSubmit={handleNotificationsSubmit}>
          <div className={styles.notificationGroup}>
            <div className={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                id="emailNotifications" 
                name="emailNotifications" 
                checked={formData.emailNotifications}
                onChange={handleInputChange}
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
                checked={formData.smsNotifications}
                onChange={handleInputChange}
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
                checked={formData.marketingEmails}
                onChange={handleInputChange}
              />
              <label htmlFor="marketingEmails">Marketing Emails</label>
            </div>
            <p className={styles.notificationDescription}>
              Receive special offers, promotions, and newsletters about our latest menu items and events.
            </p>
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Saving Preferences...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}