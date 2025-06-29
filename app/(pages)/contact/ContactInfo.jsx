
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
export default function ContactInfo({ styles, containerVariants, itemVariants }) {
    return (
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

            {/* Socials Contact */}
            <motion.div className={styles.socialLinks} variants={itemVariants}>
                <h3>Connect With Us</h3>
                <div className={styles.socialIcons}>
                    <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: '#3b5998' }}
                        aria-label="Visit our Facebook page"
                    >
                        <FaFacebookF />
                    </motion.a>
                    <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: '#1da1f2' }}
                        aria-label="Visit our Twitter profile"
                    >
                        <FaTwitter />
                    </motion.a>
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: '#e1306c' }}
                        aria-label="Visit our Instagram page"
                    >
                        <FaInstagram />
                    </motion.a>
                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: '#0077b5' }}
                        aria-label="Visit our LinkedIn profile"
                    >
                        <FaLinkedinIn />
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    )
}