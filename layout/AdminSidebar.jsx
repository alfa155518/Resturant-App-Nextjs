
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiMenu, FiUsers, FiShoppingBag, FiSettings, FiCalendar, FiMessageSquare, FiPieChart, FiLogOut, FiEdit } from 'react-icons/fi';
import styles from '../src/css/admin-sidebar.module.css';

export default function AdminSidebar({ isCollapsed = false, toggleSidebar }) {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/admin' && pathname === '/admin') {
      return true;
    }
    return path !== '/admin' && pathname.startsWith(path);
  };

  return (
    <motion.div
      className={`${styles.adminSidebar} ${isCollapsed ? styles.collapsed : ''}`}
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.sidebarHeader}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!isCollapsed && <h2>Gourmet Haven</h2>}
        </motion.div>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <div className={styles.sidebarContent}>
        <nav className={styles.sidebarMenu}>
          <ul>
            <motion.li
              className={isActive('/admin') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/admin">
                <FiHome className={styles.menuIcon} />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/orders') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/admin/orders">
                <FiShoppingBag className={styles.menuIcon} />
                {!isCollapsed && <span>Orders</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/menu') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/admin/menu">
                <FiPieChart className={styles.menuIcon} />
                {!isCollapsed && <span>Menu Items</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/customers') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/admin/customers">
                <FiUsers className={styles.menuIcon} />
                {!isCollapsed && <span>Customers</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/team') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/admin/team">
                <FiUsers className={styles.menuIcon} />
                {!isCollapsed && <span>Team</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/reservations') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/admin/reservations">
                <FiCalendar className={styles.menuIcon} />
                {!isCollapsed && <span>Reservations</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/reviews') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/admin/reviews">
                <FiMessageSquare className={styles.menuIcon} />
                {!isCollapsed && <span>Reviews</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/blog') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/admin/blog">
                <FiEdit className={styles.menuIcon} />
                {!isCollapsed && <span>Blog</span>}
              </Link>
            </motion.li>
            <motion.li
              className={isActive('/admin/settings') ? styles.active : ''}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/admin/settings">
                <FiSettings className={styles.menuIcon} />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </motion.li>
          </ul>
        </nav>
      </div>

      <div className={styles.sidebarFooter}>
        <motion.div
          className={styles.logoutBtn}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/">
            <FiLogOut className={styles.menuIcon} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
