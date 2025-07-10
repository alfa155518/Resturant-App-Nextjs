import React from 'react';
import SettingsContent from './SettingsContent';
import styles from '../../../../src/css/admin-settings.module.css';


export const metadata = {
  title: 'Settings | Gourmet Haven Restaurant',
  description: 'Manage restaurant settings and configurations',
};

export default function AdminSettingsPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <SettingsContent />
    </div>
  );
}

