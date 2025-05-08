'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../admin.module.css';

const BlogPage = dynamic(() => import('../../../../components/admin/pages/Blog'), { ssr: false });

export default function ClientBlogPage() {
  return (
    <div className={styles.adminPageWrapper}>
      <BlogPage />
    </div>
  );
}
