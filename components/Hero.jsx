"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../src/css/hero.module.css";

export default function Hero() {
    return (
        <section className={styles.heroContainer}>
          <motion.div 
            className={styles.text}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to Gourmet Haven restaurant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              We are a family-owned restaurant that serves delicious food and drinks.
            </motion.p>
          </motion.div>
          <motion.div 
            className={styles.action}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/tables"} className={styles.tableBtn}>
                Book a Table
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/menu"} className={styles.menuBtn}>
                View Menu
              </Link>
            </motion.div>
          </motion.div>
        </section>
    );
}