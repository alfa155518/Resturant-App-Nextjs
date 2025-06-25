import React from 'react';
import ReservationsContent from '@/app/(pages)/admin/reservations/ReservationsContent';
import styles from '../../../../src/css/about.module.css';


export const metadata = {
  title: 'Reservations Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant table reservations and bookings',
};

export default function AdminReservationsPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <ReservationsContent />
    </div>
  );
}
