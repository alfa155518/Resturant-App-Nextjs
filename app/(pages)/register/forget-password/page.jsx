"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../../../../src/css/forget-password.module.css";
import SubmitButton from "@/components/ui/SubmitButton";
import { toast } from "react-toastify";
import { forgetPasswordAction } from "@/actions/user";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await forgetPasswordAction(email);
      if (data.error) {
        toast.error(data.errorMessage);
      }
      if (data.message) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("An error occurred, Try again later");
    } 
  };

  return (
    <motion.div 
      className={styles.authContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles.authCard} variants={itemVariants}>
        <motion.h1 className={styles.authTitle} variants={itemVariants}>
          Reset Password
        </motion.h1>
        <motion.p className={styles.authSubtitle} variants={itemVariants}>
          Enter your email address and we'll send you a link to reset your password
        </motion.p>
        <form action={handleSubmit} className={styles.authForm}>
      <motion.div className={styles.formGroup} variants={itemVariants}>
        <label htmlFor="email" className={styles.formLabel}>
          Email Address
        </label>
        <motion.input
          name="email"
          id="email"
          type="email"
          className={styles.formInput}
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.div>
      <SubmitButton text="Submit" />
    </form>
        <motion.div className={styles.authLinks} variants={itemVariants}>
          <Link href="/register" className={styles.authLink}>
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}