"use client"

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "../../../src/css/register.module.css";

// Lazy load components with loading fallback
const Login = dynamic(() => import('./login/page'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Signup = dynamic(() => import('./signup/page'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Move animations to a separate file
const animations = {
  rightSideVariants: {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  textVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5, duration: 0.6 }
    }
  }
};

export default function Register() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <section className={styles.register}>
      <div className={styles.left_side}>
        <h1>Welcome to Gourmet Haven</h1>
        <nav className="flex gap-4 mb-4">
          <ul>
            <li 
              className={`${activeTab === "login" ? styles.active : ""}`}
              onClick={() => setActiveTab("login")}>
              Login
            </li>
            <li 
              className={`${activeTab === "signup" ? styles.active : ""}`}
              onClick={() => setActiveTab("signup")}>
              Signup
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === "login" ? <Login /> : <Signup />}
          </Suspense>
        </div>
      </div>
      <motion.div 
        className={styles.right_side}
        initial="hidden"
        animate="visible"
        variants={animations.rightSideVariants}
      >
        <motion.div 
          className={styles.text}
          variants={animations.textVariants}
        >
          <motion.h2>Gourmet Haven</motion.h2>
          <motion.p>
            Join our culinary community to discover exquisite dining experiences and connect with fellow food enthusiasts.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}