import AdminLayout from '@/components/admin/AdminLayout';
import { RestaurantSettingsProvider } from '@/store/RestaurantSettingsProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import { AdminMenuProvider } from '@/store/AdminMenuProvider';
import { AdminManageTeamProvider } from '@/store/AdminManageTeamProvider';
import { AdminManagementReservationsProvider } from '@/store/AdminManagementReservationsProvider';
import { AdminManageReviewsProvider } from '@/store/AdminManageReviews';
import { AdminManagementCustomersProvider } from '@/store/AdminManagementCustomersProvider';



export default function AdminPageLayout({ children }) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RestaurantSettingsProvider>
        <AdminManageTeamProvider>
          <AdminManagementReservationsProvider>
            <AdminManageReviewsProvider>
              <AdminMenuProvider>
                <AdminManagementCustomersProvider>
                  <AdminLayout>{children}</AdminLayout>
                </AdminManagementCustomersProvider>
              </AdminMenuProvider>
            </AdminManageReviewsProvider>
          </AdminManagementReservationsProvider>
        </AdminManageTeamProvider>
      </RestaurantSettingsProvider>
    </SkeletonTheme>
  );
}
