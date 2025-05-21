import React from 'react';
import MenuItemsPage from '@/components/admin/pages/MenuItems';
import { Metadata } from 'next';
import styles from '../../../../src/css/about.module.css';

export const metadata = {
  title: 'Menu Management | Gourmet Haven Restaurant',
  description: 'Manage restaurant menu items and categories',
};

export default function AdminMenuPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <MenuItemsPage />
    </div>
  );
}
