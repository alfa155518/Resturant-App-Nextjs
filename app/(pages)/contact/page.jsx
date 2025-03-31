"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from '../../../src/css/contact.module.css';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className={styles.contactContainer}>
  <motion.div 
        className={styles.contactHeader}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.headerImageContainer}>
          <Image 
            src="/images/contact-us.webp" 
            alt="Contact Us"
            priority
            fill
            style={{ objectFit: 'cover' }}
            className={styles.headerImage}
          />
        </div>
        <div className={styles.headerContent}>
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Drop us a line or visit our restaurant.</p>
        </div>
      </motion.div>

      <div className={styles.contactContent}>
        <motion.div 
          className={styles.contactFormSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.formContainer} variants={itemVariants}>
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required 
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <motion.button 
                type="submit" 
                className={styles.submitButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
              
              {formStatus.submitted && (
                <motion.div 
                  className={`${styles.formMessage} ${formStatus.success ? styles.success : styles.error}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {formStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.contactInfoSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <motion.div className={styles.infoCard} variants={itemVariants}>
        <div className={styles.infoIcon}>
          <FaMapMarkerAlt />
        </div>
        <div className={styles.infoContent}>
          <h3>Our Location</h3>
          <p>123 Gourmet Street, Culinary District</p>
          <p>Foodville, FC 12345</p>
          <div className={styles.locationImageContainer}>
            <Image 
              src="/images/restaurant-exterio.webp" 
              alt="Restaurant Exterior" 
              width={280} 
              height={160} 
              className={styles.locationImage}
            />
          </div>
        </div>
      </motion.div>

          <motion.div className={styles.infoCard} variants={itemVariants}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <div className={styles.infoContent}>
              <h3>Phone Number</h3>
              <p>Reservations: (555) 123-4567</p>
              <p>Takeout: (555) 765-4321</p>
            </div>
          </motion.div>

          <motion.div className={styles.infoCard} variants={itemVariants}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <div className={styles.infoContent}>
              <h3>Email Address</h3>
              <p>info@yourrestaurant.com</p>
              <p>reservations@yourrestaurant.com</p>
            </div>
          </motion.div>

          <motion.div className={styles.infoCard} variants={itemVariants}>
            <div className={styles.infoIcon}>
              <FaClock />
            </div>
            <div className={styles.infoContent}>
              <h3>Opening Hours</h3>
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
          </motion.div>

          <motion.div className={styles.socialLinks} variants={itemVariants}>
            <h3>Connect With Us</h3>
            <div className={styles.socialIcons}>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#3b5998' }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#1da1f2' }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#e1306c' }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: '#0077b5' }}
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.mapSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Find Us on the Map</h2>
        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55611.045857631936!2d31.217264623773602!3d30.059556316911856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sEl%20Cairo%2C%20Gobernaci%C3%B3n%20de%20El%20Cairo!5e1!3m2!1ses!2seg!4v1743378852726!5m2!1ses!2seg" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Location"
          ></iframe>
        </div>
      </motion.div>

   
      <motion.div 
        className={styles.ctaSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className={styles.ctaImageContainer}>
          <Image 
            src="/images/dining-experience.webp" 
            alt="Dining Experience" 
            fill
            className={styles.ctaImage}
          />
        </div>
        <div className={styles.ctaContent}>
          <h2>Ready to Experience Our Cuisine?</h2>
          <p>Make a reservation today and enjoy a memorable dining experience.</p>
          <Link href={"/tables"}>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Book a Table
          </motion.button>
            </Link>
        </div>
      </motion.div>
    </div>
  );
}