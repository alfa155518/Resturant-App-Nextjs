import React from 'react';
import AdminDashboard from '@/components/admin/Dashboard';
import { Metadata } from 'next';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin Dashboard | Gourmet Haven Restaurant',
  description: 'Admin dashboard for Gourmet Haven Restaurant management',
};

export default function AdminPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <AdminDashboard />
    </div>
  );
}
