"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../src/css/navbar.module.css";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Tables", path: "/tables" },
    { name: "Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/b" },
    { name: "Contact", path: "/c" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    // Close menu when clicking outside
    const closeMenu = (e) => {
      if (e.target.classList.contains(styles.mobileNavOverlay)) {
        setIsMenuOpen(false);
      }
    };

  return (
    <motion.header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.logo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <Image 
            src="/images/logo.webp" 
            alt="logo" 
            width={60} 
            height={60} 
            priority
          />
        </Link>
      </motion.div>
      
      {/* Desktop Navigation */}
      <nav className={`${styles.nav} ${styles.desktopNav}`}>
        <ul>
          {navItems.map((item) => (
            <motion.li 
              key={item.path}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link 
                href={item.path} 
                className={pathname === item.path ? styles.active : ""}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.actions}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.iconContainer}
        >
          <Link href="/">
            <strong className={styles.number}>0</strong>
            <BsCart4 />
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.iconContainer}
        >
          <Link href="/">
            <strong className={styles.number}>0</strong>
            <FaRegHeart />
          </Link>
        </motion.div>
        
        {/* Mobile Menu Toggle */}
        <motion.div 
          className={styles.menuToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
        </motion.div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
            className={styles.mobileNavOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          >
         <motion.nav 
              className={styles.mobileNav}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                 <motion.div 
                className={styles.closeButton}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <IoClose size={28} />
              </motion.div>
              <ul>
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.path} 
                      className={pathname === item.path ? styles.active : ""}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                className={styles.mobileNavFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p>Follow Us</p>
                <div className={styles.socialIcons}>
                  <motion.a href="#" whileHover={{ y: -3 }}>FB</motion.a>
                  <motion.a href="#" whileHover={{ y: -3 }}>IG</motion.a>
                  <motion.a href="#" whileHover={{ y: -3 }}>TW</motion.a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}