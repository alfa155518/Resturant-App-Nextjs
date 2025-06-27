import CustomersContent from '@/app/(pages)/admin/customers/CustomersContent';
import styles from '../../../../src/css/about.module.css';

export const metadata = {
  title: 'Customer Management | Gourmet Haven Restaurant',
  description: 'Admin Customer Management | Manage restaurant customers',
};

export default function AdminCustomersPage() {
  return (

    <div className={styles.adminPageWrapper}>
      <CustomersContent />
    </div>

  );
}
