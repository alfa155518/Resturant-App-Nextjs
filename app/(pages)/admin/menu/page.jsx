
import MenuItemsPage from '@/app/(pages)/admin/menu/MenuItems';
import styles from '../../../../src/css/about.module.css';

export const metadata = {
  title: 'Menu Management | Gourmet Haven Restaurant',
  description: 'Admin Menu Management | Manage restaurant menu items and categories',
};

export default function AdminMenuPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <MenuItemsPage />
    </div>
  );
}
