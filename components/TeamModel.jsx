"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../src/css/team-model.module.css';

export default function TeamModel({showModal,setShowModal}) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    salary: '',
    bio: '',
    image: null
  });



  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowModal(false);
  };

  return (
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className={styles.joinForm}>
                <h2>Join Our Team</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="role">Desired Role</label>
                  <select
                    id="role"
                    name="role"
                    autoComplete='role'
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="chef">Chef</option>
                    <option value="server">Server</option>
                    <option value="manager">Manager</option>
                    <option value="bartender">Bartender</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="salary">Expected Salary</label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    autoComplete='salary'
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="bio">About Yourself</label>
                  <textarea
                    id="bio"
                    name="bio"
                    autoComplete='bio'
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="image">Profile Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    autoComplete='image'
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                  />
                </div>
                <div className={styles.formActions}>
                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label='Submit'
                  >
                    Submit Application
                  </motion.button>
                  <motion.button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label='Close'
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );
}