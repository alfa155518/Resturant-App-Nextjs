"use client";

import { useState, useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from '../../../src/css/team.module.css';

export default function Team() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Show success message or redirect
    alert('Application submitted successfully!');
    setShowModal(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: ''
    });
  };
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Executive Chef',
      image: '/images/person-1.png',
      bio: 'With over 15 years of culinary experience, John brings creativity and passion to every dish.',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Restaurant Manager',
      image: '/images/person-1.png',
      bio: 'Sarah ensures our restaurant runs smoothly while maintaining the highest standards of service.',
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Sous Chef',
      image: '/images/person-1.png',
      bio: 'Michael specializes in fusion cuisine and has trained in top restaurants across Asia and Europe.',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      position: 'Pastry Chef',
      image: '/images/person-1.png',
      bio: 'Emily creates exquisite desserts that are as beautiful as they are delicious.',
    },
    {
      id: 5,
      name: 'David Wilson',
      position: 'Sommelier',
      image: '/images/person-1.png',
      bio: "David's expertise in wine pairing elevates the dining experience for our guests.",
    },
    {
      id: 6,
      name: 'Lisa Park',
      position: 'Head Server',
      image: '/images/person-1.png',
      bio: 'Lisa leads our service team with attention to detail and a warm, welcoming approach.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className={styles.teamContainer}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.teamHeader}
      >
        <h1>Our Team</h1>
        <p>Meet the talented individuals who make our restaurant exceptional</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className={styles.teamGrid}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={styles.teamCard}
          >
            <div className={styles.imageContainer}>
            <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className={styles.memberImage}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              />
            </div>
            <div className={styles.memberInfo}>
              <h2>{member.name}</h2>
              <h3>{member.position}</h3>
              <p>{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={styles.joinTeam}
      >
        <h2>Join Our Team</h2>
        <p>We're always looking for passionate individuals to join our family.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={styles.joinButton}
          onClick={() => setShowModal(true)}
        >
          View Openings
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              className={styles.modalBackdrop}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.modalHeader}>
                <h2>Apply to Join Our Team</h2>
              </div>
              <div className={styles.modalBody}>
                <form onSubmit={handleSubmit} className={styles.applicationForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      autoComplete="name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      autoComplete="email"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      autoComplete="tel"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="position">Position Interested In</label>
                    <select 
                      id="position" 
                      name="position" 
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      autoComplete="position"
                    >
                      <option value="">Select a position</option>
                      <option value="chef">Chef</option>
                      <option value="server">Server</option>
                      <option value="bartender">Bartender</option>
                      <option value="host">Host/Hostess</option>
                      <option value="manager">Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="experience">Years of Experience</label>
                    <input 
                      type="number" 
                      id="experience" 
                      name="experience" 
                      min="0" 
                      max="50"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      autoComplete="experience"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Tell us about yourself</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      autoComplete="message"
                    ></textarea>
                  </div>
                  <div className={styles.formActions}>
                    <motion.button 
                      type="submit"
                      className={styles.submitButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Submit Application"
                    >
                      Submit Application
                    </motion.button>
                    <motion.button 
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => setShowModal(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Cancel"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}