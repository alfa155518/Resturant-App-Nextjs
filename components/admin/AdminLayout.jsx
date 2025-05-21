"use client";

import React, { useState } from 'react';
import styles from '../../scss/pages/admin/admin-layout.module.scss';
import AdminSidebar from '@/layout/AdminSidebar';
import AdminHeader from '@/layout/AdminHeader';

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.adminDashboard} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className={styles.dashboardContent}>
        <AdminHeader />

        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
