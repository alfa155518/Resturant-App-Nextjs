"use client"
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../src/css/footer.module.css';
import { useContext } from 'react';
import { RestaurantSettingsContext } from '@/store/RestaurantSettingsProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { restaurantInfo } = useContext(RestaurantSettingsContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Logo and About */}
            <motion.div
              className={styles.footerColumn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={styles.footerLogo}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={restaurantInfo.logo || "/images/logo.webp"}
                  alt="Restaurant Logo"
                  width={150}
                  height={60}
                  priority
                />
              </motion.div>
              <motion.p
                className={styles.footerAbout}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Experience the perfect blend of tradition and innovation with our
                exceptional cuisine, warm atmosphere, and impeccable service.
              </motion.p>
              <div className={styles.socialLinks}>
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href={["https://facebook.com", "https://twitter.com", "https://instagram.com", "https://youtube.com"][index]}
                    className={styles.socialIcon}
                    aria-label={["Facebook", "Twitter", "Instagram", "YouTube"][index]}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className={styles.footerColumn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className={styles.footerHeading}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h3>
              <ul className={styles.footerLinks}>
                {["Home", "Menu", "About Us", "Reservations", "Gallery", "Contact"].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover={{ x: 5 }}>
                      <Link href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}>
                        {item}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              className={styles.footerColumn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className={styles.footerHeading}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Opening Hours
              </motion.h3>
              <ul className={styles.openingHours}>
                {[
                  { day: "Monday - Friday", hours: "8:00 AM - 10:00 PM" },
                  { day: "Saturday", hours: "9:00 AM - 11:00 PM" },
                  { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
                  { special: "* Special holiday hours may apply" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={item.special ? {} : { x: 5 }}
                  >
                    {item.special ? (
                      <span className={styles.specialNote}>{item.special}</span>
                    ) : (
                      <>
                        <span className={styles.day}>{item.day}</span>
                        <span className={styles.hours}>{item.hours}</span>
                      </>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className={styles.footerColumn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className={styles.footerHeading}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.h3>
              <ul className={styles.contactInfo}>
                {[
                  { Icon: FaMapMarkerAlt, text: restaurantInfo.address },
                  { Icon: FaPhone, text: restaurantInfo.phone },
                  { Icon: FaEnvelope, text: restaurantInfo.email }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <item.Icon className={styles.contactIcon} />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className={styles.newsletterForm}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4>Subscribe to our newsletter</h4>
                <div className={styles.formGroup}>
                  <motion.input
                    type="email"
                    placeholder="ahmedhassob@gmial.com"
                    required
                    name='"email'
                    autoComplete='email'
                    className={styles.emailInput}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.button
                    className={styles.subscribeBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className={styles.footerBottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              &copy; {currentYear} Gourmet Haven restaurant. All rights reserved.
            </p>
            <div className={styles.footerBottomLinks}>
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>{item}</Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}