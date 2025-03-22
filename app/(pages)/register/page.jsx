"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "../../../src/css/register.module.css";

// Use dynamic imports with ssr: false to prevent hydration mismatch
const Login = dynamic(() => import('./login/page'), { ssr: false });
const Signup = dynamic(() => import('./signup/page'), { ssr: false });

export default function Register() {
  const [activeTab, setActiveTab] = useState("signup");
  
  // Animation variants for the right side
  const rightSideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // Animation variants for the text content
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.6,
        staggerChildren: 0.3,
        delayChildren: 0.7
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={styles.register}>
      <div className={styles.left_side}>
        <h1>Welcome to Gourmet Haven</h1>
        <nav className="flex gap-4 mb-4">
          <ul>
            <li className={`${activeTab === "login" ? styles.active : ""}`}
              onClick={() => setActiveTab("login")}>
              Login
            </li>
            <li className={`${activeTab === "signup" ? styles.active : ""}`}
              onClick={() => setActiveTab("signup")}>
              Signup
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
      <motion.div 
        className={styles.right_side}
        initial="hidden"
        animate="visible"
        variants={rightSideVariants}
      >
        <motion.div 
          className={styles.text}
          variants={textVariants}
        >
          <motion.h2 variants={itemVariants}>Gourmet Haven</motion.h2>
          <motion.p variants={itemVariants}>
            Join our culinary community to discover exquisite dining experiences and connect with fellow food enthusiasts.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}