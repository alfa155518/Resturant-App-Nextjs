import React from 'react';
import OrdersContent from '@/app/(pages)/admin/orders/OrdersContent';
import styles from '../../../../src/css/about.module.css';

export const metadata = {
  title: 'Orders Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant orders and order status',
};

export default function AdminOrdersPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <OrdersContent />
    </div>
  );
}
