import AdminLayout from '@/components/admin/AdminLayout';
import { RestaurantSettingsProvider } from '@/store/RestaurantSettingsProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import { AdminMenuProvider } from '@/store/AdminMenuProvider';
import { AdminManageTeamProvider } from '@/store/AdminManageTeamProvider';


export default function AdminPageLayout({ children }) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RestaurantSettingsProvider>
        <AdminManageTeamProvider>
          <AdminMenuProvider>
            <AdminLayout>{children}</AdminLayout>
          </AdminMenuProvider>
        </AdminManageTeamProvider>
      </RestaurantSettingsProvider>
    </SkeletonTheme>
  );
}
