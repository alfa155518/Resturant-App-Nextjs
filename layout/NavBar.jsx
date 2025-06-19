"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../src/css/navbar.module.css";
import { usePathname } from "next/navigation";
import { UserContext } from "@/store/UserProvider";
import { CartContext } from "@/store/CartProvider";
import { RestaurantSettingsContext } from "@/store/RestaurantSettings";

export default function NavBar() {
  const pathname = usePathname();
  const isCurrentPathAdmin = pathname.startsWith('/admin');
  const { restaurantInfo } = useContext(RestaurantSettingsContext);
  if (isCurrentPathAdmin) return null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userData, userToken } = useContext(UserContext);
  const { cartItems, setNeedsRefresh, needsRefresh, router } =
    useContext(CartContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handel Refresh page to synchronization cart number
  useEffect(() => {
    router.refresh();
  }, [needsRefresh]);

  // Navigation items for non-admin sections
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Tables", path: "/tables" },
    { name: "Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Return null if we're in the admin section
  if (isCurrentPathAdmin) return null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setNeedsRefresh(!needsRefresh);
  };

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (e.target.classList.contains(styles.mobileNavOverlay)) {
      setIsMenuOpen(false);
      setNeedsRefresh(!needsRefresh);
    }
  };

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <motion.div
        className={styles.logo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <Link href="/">
          <Image
            src={restaurantInfo.logo || "/images/logo.webp"}
            alt="logo"
            width={60}
            height={60}
            priority={true}
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
              whileTap={{ y: 0 }}>
              <Link
                href={item.path}
                className={pathname === item.path ? styles.active : ""}>
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
          className={styles.iconContainer}>
          <Link href="/cart">
            <strong className={styles.number}>{cartItems.length}</strong>
            <BsCart4 />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={styles.iconContainer}>
          <Link href="/favorite">
            <strong className={styles.number}>0</strong>
            <FaRegHeart />
          </Link>
        </motion.div>

        {/* User Profile or Register Button */}
        {user && userData && userToken && user.length !== 0 ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={styles.userProfile}>
            <Link href="/profile">
              <Image
                src={user.avatar || "/images/default-reviewer.webp"}
                alt="User Profile"
                width={40}
                height={40}
                className={styles.userAvatar}
              />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.registerButton}>
            <Link href="/register" className={styles.registerLink}>
              Register
            </Link>
          </motion.div>
        )}

        {/* Mobile Menu Toggle */}
        <motion.div
          className={styles.menuToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}>
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
            onClick={closeMenu}>
            <motion.nav
              className={styles.mobileNav}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}>
              <motion.div
                className={styles.closeButton}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}>
                <IoClose size={28} />
              </motion.div>
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.path}
                      className={pathname === item.path ? styles.active : ""}
                      onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className={styles.mobileNavFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}>
                <p>Follow Us</p>
                <div className={styles.socialIcons}>
                  <motion.a href="#" whileHover={{ y: -3 }}>
                    FB
                  </motion.a>
                  <motion.a href="#" whileHover={{ y: -3 }}>
                    IG
                  </motion.a>
                  <motion.a href="#" whileHover={{ y: -3 }}>
                    TW
                  </motion.a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
