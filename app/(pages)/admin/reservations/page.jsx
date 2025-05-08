import React from 'react';
import ReservationsPage from '@/components/admin/pages/Reservations';
import { Metadata } from 'next';
import styles from '../admin.module.css';

export const metadata = {
  title: 'Reservations Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant table reservations and bookings',
};

export default function AdminReservationsPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <ReservationsPage />
    </div>
  );
}
