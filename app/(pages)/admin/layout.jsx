import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { RestaurantSettingsProvider } from '@/store/RestaurantSettingsProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import { AdminMenuProvider } from '@/store/AdminMenuProvider';


export default function AdminPageLayout({ children }) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RestaurantSettingsProvider>
        <AdminMenuProvider>
          <AdminLayout>{children}</AdminLayout>
        </AdminMenuProvider>
      </RestaurantSettingsProvider>
    </SkeletonTheme>
  );
}
