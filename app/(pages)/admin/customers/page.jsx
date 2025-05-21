'use client';

import React from 'react';
import CustomersPage from '@/components/admin/pages/Customers';
import styles from '../../../../src/css/about.module.css';




export default function AdminCustomersPage() {
  return (

    <div className={styles.adminPageWrapper}>
      <CustomersPage />
    </div>

  );
}
