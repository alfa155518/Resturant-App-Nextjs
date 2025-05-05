"use client";

import { useState,useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaHeart, FaCreditCard, FaCog, FaSignOutAlt, FaHistory, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../../../src/css/profile.module.css';
import ProfileReservations from './ProfileReservations/page';
import ProfileOrders from './ProfileOrders/page';
import ProfileFavorites from './ProfileFavorites/page';
import ProfileBilling from './ProfileBilling/page';
import ProfileSettings from './ProfileSettings/page';
import { UserContext } from '@/store/UserProvider';
import LoadingSpinner from '@/components/ui/LoadingSpinner';


export default function Profile() {
  const {user,submitLogout,isLoading} = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  

  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <>
    {
     !user || Object.keys(user).length === 0 ? (
      <LoadingSpinner/>
     ) :
    <div className={styles.profileContainer}>
      <motion.div 
        className={styles.profileHeader}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className={styles.profileImageContainer}>
          <Image 
            src={user.avatar || '/images/default-avatar.png'} 
            alt={"user"} 
            width={150} 
            height={150}
            className={styles.profileImage}
            priority
          />
          {user.role !== 'customer' && (
            <span className={styles.roleBadge}>{user.role}</span>
          )}
        </div>
        <div className={styles.profileInfo}>
          <h1>{user.name}</h1>
          <div className={styles.userDetails}>
            <p><FaEnvelope /> {user.email}</p>
            {user.phone && <p><FaPhone /> {user.phone}</p>}
            {user.address && <p><FaMapMarkerAlt /> {user.address}</p>}
          </div>
          <p className={styles.memberSince}>Member since {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </motion.div>
      <div className={styles.profileContent}>
        <motion.div 
          className={styles.sidebar}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
            variants={fadeIn}
          >
            <FaUser /> Profile Overview
          </motion.button>
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'reservations' ? styles.active : ''}`}
            onClick={() => setActiveTab('reservations')}
            variants={fadeIn}
          >
            <FaCalendarAlt /> My Reservations
          </motion.button>
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
            variants={fadeIn}
          >
            <FaHistory /> Order History
          </motion.button>
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'favorites' ? styles.active : ''}`}
            onClick={() => setActiveTab('favorites')}
            variants={fadeIn}
          >
            <FaHeart /> Favorites
          </motion.button>
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'billing' ? styles.active : ''}`}
            onClick={() => setActiveTab('billing')}
            variants={fadeIn}
          >
            <FaCreditCard /> Billing & Payments
          </motion.button>
          <motion.button 
            className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
            variants={fadeIn}
          >
            <FaCog /> Account Settings
          </motion.button>
          <motion.button 
            className={styles.logoutButton + " " + (isLoading? styles.loading : "") }
            onClick={(e) => submitLogout(e)}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <FaSignOutAlt /> {isLoading ? "Deleting..." :"Logout"}
          </motion.button>
        </motion.div>
        
        <motion.div 
          className={styles.mainContent}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          key={activeTab}
        >
          {activeTab === 'profile' && (
            <div className={styles.profileOverview}>
              <h2>Profile Overview</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>Reservations</h3>
                  <p className={styles.statNumber}>12</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Orders</h3>
                  <p className={styles.statNumber}>24</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Favorites</h3>
                  <p className={styles.statNumber}>8</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Reviews</h3>
                  <p className={styles.statNumber}>5</p>
                </div>
              </div>
              
              <div className={styles.recentActivity}>
                <h3>Recent Activity</h3>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}><FaCalendarAlt /></div>
                    <div className={styles.activityContent}>
                      <h4>Table Reservation</h4>
                      <p>Reserved Table #12 for 4 people</p>
                      <span className={styles.activityTime}>2 days ago</span>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}><FaHistory /></div>
                    <div className={styles.activityContent}>
                      <h4>Food Order</h4>
                      <p>Ordered Pasta Carbonara and Tiramisu</p>
                      <span className={styles.activityTime}>1 week ago</span>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}><FaHeart /></div>
                    <div className={styles.activityContent}>
                      <h4>Added to Favorites</h4>
                      <p>Added Grilled Salmon to favorites</p>
                      <span className={styles.activityTime}>2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reservations' && <ProfileReservations />}
          {activeTab === 'orders' && <ProfileOrders />}
          {activeTab === 'favorites' && <ProfileFavorites />}
          {activeTab === 'billing' && <ProfileBilling />}
          {activeTab === 'settings' && <ProfileSettings user={user}  />}
        </motion.div>
      </div>
    </div>
  }
    </>
  );
}