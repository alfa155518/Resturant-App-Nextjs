"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../src/css/hero.module.css";
import { useEffect } from "react";

// Shared animation variants to reduce JS overhead
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Hero() {
    // Preload hero background image for better LCP
    useEffect(() => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = '/images/hero-background.jpg'; // Update with your actual image path
        document.head.appendChild(preloadLink);
        
        return () => {
            if (document.head.contains(preloadLink)) {
                document.head.removeChild(preloadLink);
            }
        };
    }, []);

    return (
        <section className={styles.heroContainer}>
          <motion.div 
            className={styles.text}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Welcome to Gourmet Haven restaurant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              We are a family-owned restaurant that serves delicious food and drinks.
            </motion.p>
          </motion.div>
          <motion.div 
            className={styles.action}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/"} className={styles.tableBtn}>
                Book a Table
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/"} className={styles.menuBtn}>
                View Menu
              </Link>
            </motion.div>
          </motion.div>
        </section>
    );
}