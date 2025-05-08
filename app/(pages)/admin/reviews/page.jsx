import React from 'react';
import ReviewsPage from '@/components/admin/pages/Reviews';
import { Metadata } from 'next';
import styles from '../admin.module.css';

export const metadata = {
  title: 'Reviews Management | Gourmet Haven Restaurant',
  description: 'Manage customer reviews and feedback',
};

export default function AdminReviewsPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <ReviewsPage />
    </div>
  );
}
