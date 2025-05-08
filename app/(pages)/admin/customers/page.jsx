import React from 'react';
import CustomersPage from '@/components/admin/pages/Customers';
import { Metadata } from 'next';
import styles from '../admin.module.css';

export const metadata = {
  title: 'Customer Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant customers and their information',
};

export default function AdminCustomersPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <CustomersPage />
    </div>
  );
}
