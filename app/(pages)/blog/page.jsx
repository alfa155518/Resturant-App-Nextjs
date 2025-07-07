"use client";
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import BlogsSidebar from './BlogsSidebar';
import { BlogContext } from '@/store/BlogProvider';
import BlogCard from './BlogCard';
import BlogSkeletonLoading from './BlogSkeletonLoading';
import useBlog from '@/hooks/useBlog';
import styles from '../../../src/css/blog.module.css';



const Blog = () => {
  // Blog Context
  const { blogPosts, handleLikeBlog, userId, handleDislikeBlog } = useContext(BlogContext);

  // Use Blog Custom Hook
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    visiblePosts,
    categories,
    filteredPosts,
    loadMore } = useBlog(blogPosts);

  // Skeleton Loading Layout
  if (!blogPosts || blogPosts.length === 0) {
    return <BlogSkeletonLoading />;
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogHeader}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Culinary Stories & Updates
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover the latest culinary trends, seasonal menus, and behind-the-scenes stories from our kitchen
        </motion.p>
      </div>

      <div className={styles.blogContent}>
        <div className={styles.mainContent}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search articles..."
                name='searchTerm'
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards */}
          {filteredPosts.length > 0 ? (
            <BlogCard styles={styles} filteredPosts={filteredPosts} visiblePosts={visiblePosts} loadMore={loadMore} handleLikeBlog={handleLikeBlog} handleDislikeBlog={handleDislikeBlog} userId={userId} />
          ) : (
            <div className={styles.noResults}>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogsSidebar styles={styles} categories={categories} blogPosts={blogPosts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
    </div>
  );
};

export default Blog;