import React from 'react';
import SettingsPage from '../../../../admin/pages/Settings';
import { Metadata } from 'next';
import styles from '../../../../src/css/about.module.css';


export const metadata = {
  title: 'Settings | Gourmet Haven Restaurant',
  description: 'Manage restaurant settings and configurations',
};

export default function AdminSettingsPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <SettingsPage />
    </div>
  );
}

