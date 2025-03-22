"use client";


import styles from "../../../../src/css/auth.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import SendButton from "@/components/ui/SendButton";
import UseLogin from "@/hooks/UseLogin";

export default function Login() {
  // Use the custom hook for login functionality
  const { 
    formData,
    handleChange,
    handleSubmit,
    containerVariants,
    itemVariants
  } = UseLogin();


  return (
    <motion.div 
      className={styles.loginContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3 variants={itemVariants}>Login to Your Account</motion.h3>
      <form onSubmit={handleSubmit}>
        <motion.div className={styles.formGroup} variants={itemVariants}>
          <label htmlFor="email">Email</label>
          <motion.input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="email"
            whileFocus={{ scale: 1.02, borderColor: "#9f643c" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.div className={styles.formGroup} variants={itemVariants}>
          <label htmlFor="password">Password</label>
          <motion.input 
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            autoComplete="current-password"
            whileFocus={{ scale: 1.02, borderColor: "#9f643c" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        <motion.div className={styles.rememberForgot} variants={itemVariants}>
          <div className={styles.remember}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link href="/register/forget-password" className={styles.forgotLink}>Forgot password?</Link>
        </motion.div>
        <div className={styles.submitButton}>
          <SendButton text={"Login"} />
        </div>
      </form>
    </motion.div>
  );
}