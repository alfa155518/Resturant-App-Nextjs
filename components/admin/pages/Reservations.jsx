"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiCalendar, FiClock, FiUsers, FiInfo } from 'react-icons/fi';
import Sidebar from '../Sidebar';
import Header from '../Header';
import styles from './Reservations.module.scss';

export default function Reservations() {
  // Sample reservations data
  const [reservations, setReservations] = useState([
    { id: 1, customer: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', date: '2025-05-10', time: '19:00', guests: 4, tableNo: 'T12', specialRequests: 'Window seat preferred', status: 'Confirmed' },
    { id: 2, customer: 'Emily Johnson', email: 'emily.j@example.com', phone: '+1 (555) 234-5678', date: '2025-05-10', time: '20:30', guests: 2, tableNo: 'T5', specialRequests: 'Anniversary celebration', status: 'Confirmed' },
    { id: 3, customer: 'Michael Brown', email: 'michael.brown@example.com', phone: '+1 (555) 345-6789', date: '2025-05-11', time: '18:30', guests: 6, tableNo: 'T8', specialRequests: '', status: 'Pending' },
    { id: 4, customer: 'Sarah Davis', email: 'sarah.d@example.com', phone: '+1 (555) 456-7890', date: '2025-05-11', time: '19:45', guests: 3, tableNo: 'T15', specialRequests: 'Allergic to nuts', status: 'Confirmed' },
    { id: 5, customer: 'David Wilson', email: 'david.w@example.com', phone: '+1 (555) 567-8901', date: '2025-05-12', time: '20:00', guests: 5, tableNo: 'T7', specialRequests: '', status: 'Confirmed' },
    { id: 6, customer: 'Jennifer Lee', email: 'jennifer.l@example.com', phone: '+1 (555) 678-9012', date: '2025-05-12', time: '18:00', guests: 2, tableNo: 'T3', specialRequests: 'Quiet area preferred', status: 'Cancelled' },
    { id: 7, customer: 'Robert Taylor', email: 'robert.t@example.com', phone: '+1 (555) 789-0123', date: '2025-05-13', time: '19:30', guests: 8, tableNo: 'T20', specialRequests: 'Birthday celebration', status: 'Confirmed' },
    { id: 8, customer: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1 (555) 890-1234', date: '2025-05-13', time: '20:15', guests: 4, tableNo: 'T10', specialRequests: '', status: 'Pending' },
    { id: 9, customer: 'James Martin', email: 'james.m@example.com', phone: '+1 (555) 901-2345', date: '2025-05-14', time: '19:00', guests: 2, tableNo: 'T6', specialRequests: '', status: 'Confirmed' },
    { id: 10, customer: 'Patricia White', email: 'patricia.w@example.com', phone: '+1 (555) 012-3456', date: '2025-05-14', time: '20:45', guests: 6, tableNo: 'T18', specialRequests: 'Wheelchair access needed', status: 'Confirmed' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddReservationModal, setShowAddReservationModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [newReservation, setNewReservation] = useState({
    customer: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tableNo: '',
    specialRequests: '',
    status: 'Pending'
  });

  // Available time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Available tables
  const availableTables = [
    'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10',
    'T11', 'T12', 'T13', 'T14', 'T15', 'T16', 'T17', 'T18', 'T19', 'T20'
  ];

  // Filter reservations based on search term, date and status filters
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm);
    
    const matchesDate = !dateFilter || reservation.date === dateFilter;
    const matchesStatus = statusFilter === 'All' || reservation.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Add new reservation
  const handleAddReservation = () => {
    const reservationToAdd = {
      ...newReservation,
      id: reservations.length + 1
    };

    setReservations([...reservations, reservationToAdd]);
    setShowAddReservationModal(false);
    setNewReservation({
      customer: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      tableNo: '',
      specialRequests: '',
      status: 'Pending'
    });
  };

  // Edit reservation
  const startEditingReservation = (reservation) => {
    setEditingReservation({ ...reservation });
  };

  // Save edited reservation
  const saveEditedReservation = () => {
    setReservations(reservations.map(reservation => 
      reservation.id === editingReservation.id ? editingReservation : reservation
    ));
    setEditingReservation(null);
  };

  // Delete reservation
  const deleteReservation = (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      if (editingReservation && editingReservation.id === reservationId) {
        setEditingReservation(null);
      }
    }
  };

  // Update reservation status
  const updateReservationStatus = (reservationId, newStatus) => {
    setReservations(reservations.map(reservation => 
      reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
    ));
  };

  // Group reservations by date
  const groupedReservations = filteredReservations.reduce((groups, reservation) => {
    const date = reservation.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(reservation);
    return groups;
  }, {});

  return (
    <div className={styles.adminDashboard}>
      <Sidebar />

      <div className={styles.dashboardContent}>
        <Header />

        <motion.div
          className={styles.reservationsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.reservationsHeader}>
            <h2>Reservations Management</h2>
            <div className={styles.reservationActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search reservations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className={styles.dateFilter}>
                <FiCalendar className={styles.filterIcon} />
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <button 
                className={styles.addReservationBtn}
                onClick={() => setShowAddReservationModal(true)}
              >
                <FiPlus /> Add Reservation
              </button>
            </div>
          </div>

          {Object.keys(groupedReservations).length > 0 ? (
            <div className={styles.reservationsContent}>
              {Object.entries(groupedReservations)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, reservations]) => (
                  <motion.div 
                    key={date}
                    className={styles.dateGroup}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.dateHeader}>
                      <h3>
                        <FiCalendar /> 
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <span className={styles.reservationCount}>
                        {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className={styles.reservationsTableContainer}>
                      <table className={styles.reservationsTable}>
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Customer</th>
                            <th>Guests</th>
                            <th>Table</th>
                            <th>Contact</th>
                            <th>Special Requests</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map(reservation => (
                              <motion.tr 
                                key={reservation.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td className={styles.timeCell}>
                                  <FiClock className={styles.timeIcon} />
                                  {reservation.time}
                                </td>
                                <td className={styles.customerCell}>
                                  {reservation.customer}
                                </td>
                                <td className={styles.guestsCell}>
                                  <FiUsers className={styles.guestsIcon} />
                                  {reservation.guests}
                                </td>
                                <td className={styles.tableCell}>
                                  {reservation.tableNo}
                                </td>
                                <td className={styles.contactCell}>
                                  <div>{reservation.phone}</div>
                                  <div className={styles.emailText}>{reservation.email}</div>
                                </td>
                                <td className={styles.requestsCell}>
                                  {reservation.specialRequests || <span className={styles.noRequests}>None</span>}
                                </td>
                                <td>
                                  <span className={`${styles.statusBadge} ${styles[reservation.status.toLowerCase()]}`}>
                                    {reservation.status}
                                  </span>
                                </td>
                                <td>
                                  <div className={styles.actionBtns}>
                                    <button 
                                      className={styles.editBtn} 
                                      onClick={() => startEditingReservation(reservation)}
                                      title="Edit Reservation"
                                    >
                                      <FiEdit2 />
                                    </button>
                                    <button 
                                      className={styles.deleteBtn} 
                                      onClick={() => deleteReservation(reservation.id)}
                                      title="Delete Reservation"
                                    >
                                      <FiTrash2 />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <motion.div 
              className={styles.noReservations}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiInfo className={styles.noDataIcon} />
              <h3>No reservations found</h3>
              <p>There are no reservations matching your search criteria.</p>
              {(searchTerm || dateFilter || statusFilter !== 'All') && (
                <button 
                  className={styles.clearFiltersBtn}
                  onClick={() => {
                    setSearchTerm('');
                    setDateFilter('');
                    setStatusFilter('All');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}

          {/* Add Reservation Modal */}
          {showAddReservationModal && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={styles.reservationModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <h3>Add New Reservation</h3>
                  <button 
                    className={styles.closeBtn}
                    onClick={() => setShowAddReservationModal(false)}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className={styles.modalContent}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Customer Name</label>
                      <input 
                        type="text" 
                        value={newReservation.customer}
                        onChange={(e) => setNewReservation({...newReservation, customer: e.target.value})}
                        placeholder="Enter customer name"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input 
                        type="text" 
                        value={newReservation.phone}
                        onChange={(e) => setNewReservation({...newReservation, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={newReservation.email}
                      onChange={(e) => setNewReservation({...newReservation, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Reservation Date</label>
                      <input 
                        type="date" 
                        value={newReservation.date}
                        onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Reservation Time</label>
                      <select 
                        value={newReservation.time}
                        onChange={(e) => setNewReservation({...newReservation, time: e.target.value})}
                      >
                        <option value="" disabled>Select time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Number of Guests</label>
                      <input 
                        type="number" 
                        min="1"
                        max="20"
                        value={newReservation.guests}
                        onChange={(e) => setNewReservation({...newReservation, guests: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Table Number</label>
                      <select 
                        value={newReservation.tableNo}
                        onChange={(e) => setNewReservation({...newReservation, tableNo: e.target.value})}
                      >
                        <option value="" disabled>Select table</option>
                        {availableTables.map(table => (
                          <option key={table} value={table}>{table}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Special Requests</label>
                    <textarea 
                      value={newReservation.specialRequests}
                      onChange={(e) => setNewReservation({...newReservation, specialRequests: e.target.value})}
                      placeholder="Enter any special requests"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select 
                      value={newReservation.status}
                      onChange={(e) => setNewReservation({...newReservation, status: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button 
                    className={styles.cancelBtn}
                    onClick={() => setShowAddReservationModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className={styles.saveBtn}
                    onClick={handleAddReservation}
                    disabled={!newReservation.customer || !newReservation.phone || !newReservation.date || !newReservation.time || !newReservation.tableNo}
                  >
                    <FiCheck /> Add Reservation
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Edit Reservation Modal */}
          {editingReservation && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={styles.reservationModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <h3>Edit Reservation</h3>
                  <button 
                    className={styles.closeBtn}
                    onClick={() => setEditingReservation(null)}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className={styles.modalContent}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Customer Name</label>
                      <input 
                        type="text" 
                        value={editingReservation.customer}
                        onChange={(e) => setEditingReservation({...editingReservation, customer: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input 
                        type="text" 
                        value={editingReservation.phone}
                        onChange={(e) => setEditingReservation({...editingReservation, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={editingReservation.email}
                      onChange={(e) => setEditingReservation({...editingReservation, email: e.target.value})}
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Reservation Date</label>
                      <input 
                        type="date" 
                        value={editingReservation.date}
                        onChange={(e) => setEditingReservation({...editingReservation, date: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Reservation Time</label>
                      <select 
                        value={editingReservation.time}
                        onChange={(e) => setEditingReservation({...editingReservation, time: e.target.value})}
                      >
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Number of Guests</label>
                      <input 
                        type="number" 
                        min="1"
                        max="20"
                        value={editingReservation.guests}
                        onChange={(e) => setEditingReservation({...editingReservation, guests: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Table Number</label>
                      <select 
                        value={editingReservation.tableNo}
                        onChange={(e) => setEditingReservation({...editingReservation, tableNo: e.target.value})}
                      >
                        {availableTables.map(table => (
                          <option key={table} value={table}>{table}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Special Requests</label>
                    <textarea 
                      value={editingReservation.specialRequests}
                      onChange={(e) => setEditingReservation({...editingReservation, specialRequests: e.target.value})}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select 
                      value={editingReservation.status}
                      onChange={(e) => setEditingReservation({...editingReservation, status: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <div className={styles.statusActions}>
                    <button 
                      className={`${styles.statusBtn} ${styles.confirmed}`}
                      onClick={() => setEditingReservation({...editingReservation, status: 'Confirmed'})}
                    >
                      Confirm
                    </button>
                    <button 
                      className={`${styles.statusBtn} ${styles.cancelled}`}
                      onClick={() => setEditingReservation({...editingReservation, status: 'Cancelled'})}
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <div className={styles.modalButtons}>
                    <button 
                      className={styles.cancelBtn}
                      onClick={() => setEditingReservation(null)}
                    >
                      Close
                    </button>
                    <button 
                      className={styles.saveBtn}
                      onClick={saveEditedReservation}
                    >
                      <FiCheck /> Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
