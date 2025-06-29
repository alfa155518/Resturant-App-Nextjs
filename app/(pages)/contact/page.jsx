"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import useContact from '@/hooks/useContact';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactCategories from './ContactCategories';
import styles from '../../../src/css/contact.module.css';

export default function Contact() {

  // use contact Custom Hook
  const { formData,
    handleChange,
    handleSubmit,
    loading,
    containerVariants,
    itemVariants } = useContact();

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
          {/* Contact Form */}
          <ContactForm styles={styles} itemVariants={itemVariants} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} loading={loading} />
        </motion.div>

        {/* Contact Info */}
        <ContactInfo styles={styles} containerVariants={containerVariants} itemVariants={itemVariants} />
      </div>

      {/* Contact Categories */}
      <ContactCategories styles={styles} />
    </div>
  );
}