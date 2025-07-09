"use client";

import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import AddBlogModal from '@/app/(pages)/admin/blog/AddBlogModal';
import EditBlogModal from '@/app/(pages)/admin/blog/EditBlogModal';
import BlogPreview from '@/app/(pages)/admin/blog/BlogPreview';
import BlogsCard from '@/app/(pages)/admin/blog/BlogsCard';
import OverlayOfLoading from '@/components/OverlayOfLoading';
import styles from '../../../../src/css/admin-blog.module.css';
import CustomSkeletonLoading from '@/components/CustomSkeletonLoading';
import useAdminManageBlogs from '@/hooks/useAdminManageBlogs';

export default function BlogContent() {

  // Use Admin Manage Blogs Custom Hook
  const [
    categories,
    filteredPosts,
    handlePreviewPost,
    startEditingPost,
    handleAddPost,
    handleEditPost,
    handleDeletePost,
    showAddPostModal,
    showEditPostModal,
    showPreviewModal,
    currentPost,
    previewPost,
    newPost,
    setSearchTerm,
    setCategoryFilter,
    setStatusFilter,
    setShowAddPostModal,
    setShowEditPostModal,
    setShowPreviewModal,
    setCurrentPost,
    setNewPost,
    isSubmitting,
    blogPosts,
    statusFilter,
    categoryFilter,
    searchTerm,
  ] = useAdminManageBlogs();

  // Show Loading When Submitting
  if (isSubmitting) {
    return <OverlayOfLoading isLoading={isSubmitting} message="Submitting..." />
  }

  // Show Skeleton When No Data
  if (!blogPosts || blogPosts.length === 0) {
    return <CustomSkeletonLoading count={8} height={200} />
  }

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.dashboardContent}>
        <motion.div
          className={styles.blogContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.blogHeader}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Blog Management
            </motion.h2>
            <div className={styles.blogHeaderActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  name="search"
                  autoComplete='search'
                />
              </div>

              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={styles.filterSelect}
                  name="category"
                  autoComplete='category'
                >
                  <option value="All">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.filterSelect}
                  name="status"
                  autoComplete='status'
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <button
                className={styles.exportBtn}
                onClick={() => setShowAddPostModal(true)}
              >
                <FiPlus /> New Post
              </button>
            </div>
          </div>
          {/* Blogs Card */}
          <BlogsCard styles={styles} filteredPosts={filteredPosts} handlePreviewPost={handlePreviewPost} startEditingPost={startEditingPost} handleDeletePost={handleDeletePost} />

          {/* Add New Post Modal */}
          {showAddPostModal && <AddBlogModal styles={styles} newPost={newPost} setNewPost={setNewPost} setShowAddPostModal={setShowAddPostModal} handleAddPost={handleAddPost} />}

          {/* Edit Post Modal */}
          {showEditPostModal && currentPost && <EditBlogModal styles={styles} currentPost={currentPost} setCurrentPost={setCurrentPost} setShowEditPostModal={setShowEditPostModal} handleEditPost={handleEditPost} />}

          {/* Preview Post Modal */}
          {showPreviewModal && previewPost && <BlogPreview styles={styles} previewPost={previewPost} setShowPreviewModal={setShowPreviewModal} />}
        </motion.div>
      </div>
    </div>
  );
}
