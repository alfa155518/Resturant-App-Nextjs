"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaClock, FaUtensils, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import styles from '../../../../src/css/profile-reservations.module.css';
import Image from 'next/image';

export default function ProfileReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Static reservation data
  const staticReservations = [
    {
      id: 1,
      date: '2023-12-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      table: {
        name: 'Seaside Table',
        image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/tables/jwemklcfv4iixw3jiwro',
        description: 'Elegant table with ocean view'
      }
    },
    {
      id: 2,
      date: '2023-12-20',
      time: '20:30',
      guests: 2,
      status: 'pending',
      table: {
        name: 'Garden Lounge',
        image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/tables/he1mhmwbauyr46ssglkb',
        description: 'Romantic setting in our garden area'
      }
    },
    {
      id: 3,
      date: '2023-11-05',
      time: '18:00',
      guests: 6,
      status: 'cancelled',
      table: {
        name: 'Private Dining Room',
        image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/tables/hwpnduz0vpr4d96bqise',
        description: 'Exclusive private dining experience'
      }
    },
    {
      id: 4,
      date: '2024-01-10',
      time: '19:30',
      guests: 3,
      status: 'confirmed',
      table: {
        name: 'Chef\'s Table',
        image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/tables/dlgmumlve8pkwixwxma3',
        description: 'Special table near the kitchen with chef interaction'
      }
    },
    {
      id: 5,
      date: '2024-01-15',
      time: '21:00',
      guests: 8,
      status: 'pending',
      table: {
        name: 'Grand Hall Table',
        image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/tables/kkn2nwxcek0p2rw48cw0',
        description: 'Large table in our main dining hall'
      }
    }
  ];
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setReservations(staticReservations);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredReservations = reservations.filter(reservation => {
    if (activeFilter === 'all') return true;
    return reservation.status === activeFilter;
  });
  
  const cancelReservation = (id) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    
    // Update the reservation status locally
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: 'cancelled' } : res
    ));
    
    // Show success message
    alert('Reservation cancelled successfully');
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <FaCheck className={styles.confirmedIcon} />;
      case 'pending':
        return <FaSpinner className={styles.pendingIcon} />;
      case 'cancelled':
        return <FaTimes className={styles.cancelledIcon} />;
      default:
        return null;
    }
  };

  const openDetailsModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };
  
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your reservations...</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={styles.reservationsContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2>My Reservations</h2>
      
      <div className={styles.filterButtons}>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'confirmed' ? styles.active : ''}`}
          onClick={() => setActiveFilter('confirmed')}
        >
          Confirmed
        </button>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'pending' ? styles.active : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'cancelled' ? styles.active : ''}`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      {filteredReservations.length === 0 ? (
        <div className={styles.emptyState}>
          <FaCalendarAlt className={styles.emptyIcon} />
          <h3>No reservations found</h3>
          <p>You don't have any {activeFilter !== 'all' ? activeFilter : ''} reservations yet.</p>
        </div>
      ) : (
        <div className={styles.reservationsList}>
          {filteredReservations.map((reservation, index) => (
            <motion.div 
              key={reservation.id}
              className={styles.reservationCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.reservationHeader}>
                <div className={styles.tableImage}>
                  <Image 
                    src={reservation.table.image || '/images/default-table.jpg'} 
                    alt={reservation.table.name}
                    width={100}
                    height={70}
                  />
                </div>
                <div className={styles.reservationInfo}>
                  <h3>{reservation.table.name}</h3>
                  <div className={styles.reservationMeta}>
                    <span className={styles.reservationDate}>
                      <FaCalendarAlt /> {new Date(reservation.date).toLocaleDateString()}
                    </span>
                    <span className={styles.reservationTime}>
                      <FaClock /> {reservation.time}
                    </span>
                    <span className={styles.reservationGuests}>
                      <FaUsers /> {reservation.guests} guests
                    </span>
                  </div>
                </div>
                <div className={`${styles.reservationStatus} ${styles[reservation.status]}`}>
                  {getStatusIcon(reservation.status)}
                  <span>{reservation.status}</span>
                </div>
              </div>
              
              <div className={styles.reservationDetails}>
                <div className={styles.detailItem}>
                  <FaMapMarkerAlt />
                  <span>Restaurant Location</span>
                </div>
                <div className={styles.detailItem}>
                  <FaUtensils />
                  <span>{reservation.table.description}</span>
                </div>
              </div>
              
              <div className={styles.reservationActions}>
                {reservation.status !== 'cancelled' && (
                  <button 
                    className={styles.cancelButton}
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Cancel Reservation
                  </button>
                )}
              <button 
                  className={styles.viewButton}
                  onClick={() => openDetailsModal(reservation)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* Details Modal */}
      {showDetailsModal && selectedReservation && (
        <div className={styles.modalOverlay} onClick={closeDetailsModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeDetailsModal}>
              <FaTimes />
            </button>
            
            <div className={styles.modalHeader}>
              <h3>Reservation Details</h3>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalImageContainer}>
                <Image 
                  src={selectedReservation.table.image || '/images/default-table.jpg'} 
                  alt={selectedReservation.table.name}
                  width={400}
                  height={250}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  className={styles.modalImage}
                />
              </div>
              
              <div className={styles.reservationDetailGrid}>
                <div className={styles.detailGridItem}>
                  <h4>Table</h4>
                  <p>{selectedReservation.table.name}</p>
                </div>
                
                <div className={styles.detailGridItem}>
                  <h4>Date</h4>
                  <p>{new Date(selectedReservation.date).toLocaleDateString()}</p>
                </div>
                
                <div className={styles.detailGridItem}>
                  <h4>Time</h4>
                  <p>{selectedReservation.time}</p>
                </div>
                
                <div className={styles.detailGridItem}>
                  <h4>Guests</h4>
                  <p>{selectedReservation.guests} people</p>
                </div>
                
                <div className={styles.detailGridItem}>
                  <h4>Status</h4>
                  <p className={styles[selectedReservation.status]}>
                    {getStatusIcon(selectedReservation.status)}
                    <span>{selectedReservation.status}</span>
                  </p>
                </div>
                
                <div className={styles.detailGridItem}>
                  <h4>Reservation ID</h4>
                  <p>#{selectedReservation.id}</p>
                </div>
              </div>
              
              <div className={styles.tableDescription}>
                <h4>Table Description</h4>
                <p>{selectedReservation.table.description}</p>
              </div>
              
              <div className={styles.additionalInfo}>
                <h4>Additional Information</h4>
                <ul>
                  <li>Please arrive 10 minutes before your reservation time</li>
                  <li>Your table will be held for 15 minutes after your reservation time</li>
                  <li>Special requests should be made at least 24 hours in advance</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              {selectedReservation.status !== 'cancelled' && (
                <button 
                  className={styles.cancelButton}
                  onClick={() => {
                    cancelReservation(selectedReservation.id);
                    closeDetailsModal();
                  }}
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}