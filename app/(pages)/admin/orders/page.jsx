import React from 'react';
import OrdersPage from '@/components/admin/pages/Orders';
import { Metadata } from 'next';
import styles from '../admin.module.css';

export const metadata = {
  title: 'Orders Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant orders and order status',
};

export default function AdminOrdersPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <OrdersPage />
    </div>
  );
}
