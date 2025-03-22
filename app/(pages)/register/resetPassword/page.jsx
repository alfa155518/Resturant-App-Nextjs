"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import styles from "../../../../src/css/reset-password.module.css";
import SubmitButtonWrapper from "@/components/ui/SubmitButton";
import UseResetPassword from "@/hooks/UseResetPassword";

// Loading component for Suspense fallback
function ResetPasswordFormSkeleton() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.skeleton}></div>
        <div className={styles.skeleton} style={{ width: '70%', height: '20px' }}></div>
        <div className={styles.formGroup}>
          <div className={styles.skeleton} style={{ width: '30%', height: '20px' }}></div>
          <div className={styles.skeleton} style={{ height: '40px' }}></div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.skeleton} style={{ width: '30%', height: '20px' }}></div>
          <div className={styles.skeleton} style={{ height: '40px' }}></div>
        </div>
        <div className={styles.skeleton} style={{ width: '100%', height: '45px' }}></div>
        <div className={styles.skeleton} style={{ width: '40%', height: '20px', marginTop: '20px' }}></div>
      </div>
    </div>
  );
}

function ResetPasswordForm() {
  const { 
    formData,
    searchParams,
    handleChange,
    handleSubmit,
    containerVariants,
    itemVariants
  } = UseResetPassword();

  return (
    <motion.div 
      className={styles.authContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles.authCard} variants={itemVariants}>
        <motion.h1 className={styles.authTitle} variants={itemVariants}>
          Reset Your Password
        </motion.h1>
        <motion.p className={styles.authSubtitle} variants={itemVariants}>
          Enter your new password below
        </motion.p>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your email"
              required
              readOnly={!!searchParams.get('email')}
            />
          </motion.div>

          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter new password"
              required
              minLength={8}
            />
          </motion.div>
          <SubmitButtonWrapper text={"Submit"}/>
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

export default function ResetPassword() {
  return (
    <Suspense fallback={<ResetPasswordFormSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}