"use client";

import Image from "next/image";
import styles from "../../../../src/css/auth.module.css";
import { motion } from "framer-motion";
import SendButton from "@/components/ui/SendButton";
import useSignup from "@/hooks/UseSignup";
import GoogleLogin from "@/auth/GoogleLogin";

export default function Signup() {
  const { 
    formData,
    handleChange,
    photoPreview,
    handlePhotoChange,
    handleSubmit,containerVariants,
    itemVariants} = useSignup()
  return (
    <motion.div 
    className={styles.loginContainer}
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.h1 variants={itemVariants}>Signup to Your Account</motion.h1>
      <form onSubmit={handleSubmit}>
        <motion.div className={styles.formGroup} variants={itemVariants}>
          <label htmlFor="name">Username</label>
          <motion.input 
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            autoComplete="name"
            whileFocus={{ scale: 1.02, borderColor: "#9f643c" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
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
        <motion.div className={styles.formGroup} variants={itemVariants}>
          <label htmlFor="phone">Phone</label>
          <motion.input 
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone"
            autoComplete="tel"
            whileFocus={{ scale: 1.02, borderColor: "#9f643c" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
        <motion.div className={styles.formGroup} variants={itemVariants}>
          <label htmlFor="avatar">Profile Photo</label>
          <motion.input 
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={styles.fileInput}
            required
            autoComplete="off"
            whileTap={{ scale: 0.98 }}
          />
          
          {photoPreview && (
            <motion.div 
              className={styles.profilePreview}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className={styles.profileImage}>
                <Image 
                  src={photoPreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
        <div className={styles.submitButton}>
      <SendButton text={"Signup"} />
      </div>
       {/* Social login options */}
       <motion.div className={styles.socialLogin} variants={itemVariants}>

          <GoogleLogin/>
       </motion.div>
      </form>
    </motion.div>
  );
}
