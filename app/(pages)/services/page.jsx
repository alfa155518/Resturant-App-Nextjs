"use client";
import { motion ,AnimatePresence} from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../../src/css/services.module.css';
import { FaUtensils, FaGlassCheers, FaBirthdayCake, FaUsers } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdDeliveryDining, MdEventAvailable } from 'react-icons/md';

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });


  const services = [
    {
      id: 1,
      title: "Fine Dining",
      description: "Experience culinary excellence with our carefully crafted dishes served in an elegant atmosphere.",
      icon: <FaUtensils />,
      image: "/images/services/fine-dining.webp"
    },
    {
      id: 2,
      title: "Private Events",
      description: "Host your special occasions in our sophisticated private dining spaces.",
      icon: <MdEventAvailable />,
      image: "/images/services/private-events.webp"
    },
    {
      id: 3,
      title: "Catering",
      description: "Let us bring our exceptional cuisine to your location for any event or celebration.",
      icon: <FaUsers />,
      image: "/images/services/catering.webp"
    },
    {
      id: 4,
      title: "Bar & Lounge",
      description: "Enjoy craft cocktails and fine wines in our sophisticated lounge setting.",
      icon: <FaGlassCheers />,
      image: "/images/services/bar-lounge.webp"
    },
    {
      id: 5,
      title: "Delivery",
      description: "Savor our delicious meals in the comfort of your home with our delivery service.",
      icon: <MdDeliveryDining />,
      image: "/images/services/delivery.webp"
    },
    {
      id: 6,
      title: "Special Occasions",
      description: "Make your celebrations memorable with our custom celebration packages.",
      icon: <FaBirthdayCake />,
      image: "/images/services/special-occasions.webp"
    }
  ];

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
        stiffness: 100
      }
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your interest! We will contact you soon.');
    setShowContactModal(false);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.servicesContainer}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <h1>Our Services</h1>
        <p>Discover the exceptional services we offer to enhance your dining experience</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.servicesGrid}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            className={styles.serviceCard}
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setActiveService(service.id)}
            onHoverEnd={() => setActiveService(null)}
          >
            <div className={styles.serviceIcon}>
              {service.icon}
            </div>
            <div className={styles.serviceContent}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
            <motion.div 
              className={styles.serviceImage}
              animate={{
                opacity: activeService === service.id ? 0.3 : 1,
                scale: activeService === service.id ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
          <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div 
              className={styles.overlay}
              animate={{
                opacity: activeService === service.id ? 0.7 : 0.5
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={styles.ctaSection}
      >
        <h2>Ready to Experience Our Services?</h2>
        <p>Contact us to learn more about how we can enhance your dining experience</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.ctaButton}
          onClick={() => setShowContactModal(true)}
        >
          Contact Us
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
            />
            <motion.div
              className={styles.contactModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className={styles.modalHeader}>
                <h2>Contact Us</h2>
              </div>
              <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    required
                    autoComplete='name'
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    required
                    autoComplete='email'
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactInputChange}
                    required
                    autoComplete='tel'
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="service">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={contactForm.service}
                    onChange={handleContactInputChange}
                    required
                    autoComplete='service'
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    required
                    autoComplete='message'
                  ></textarea>
                </div>
                <div className={styles.formActions}>
                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label='Send Message'
                  >
                    Send Message
                  </motion.button>
                  <motion.button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setShowContactModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}