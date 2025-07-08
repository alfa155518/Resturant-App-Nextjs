"use client";

import { useContext, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import styles from '../../src/css/admin-blog.module.css';
import { AdminBlogContext } from '@/store/AdminManagementBlogProvider';
import AddBlogModal from '@/app/(pages)/admin/blog/AddBlogModal';
import EditBlogModal from '@/app/(pages)/admin/blog/EditBlogModal';
import BlogPreview from '@/app/(pages)/admin/blog/BlogPreview';
import BlogsCard from '@/app/(pages)/admin/blog/BlogsCard';

export default function Blog() {
  const { blogPosts, setBlogPosts, handleAddNewBlog, isSubmitting } = useContext(AdminBlogContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author_name: '',
    category: '',
    tags: '',
    status: 'Draft'
  });

  // Unique categories from blog posts
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Filter blog posts based on search term, category, and status filters
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || post.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogPosts, searchTerm, categoryFilter, statusFilter]);

  // Add new blog post
  const handleAddPost = () => {
    const tagsArray = newPost.tags.split(',').map(tag => tag.trim());

    const postToAdd = {
      ...newPost,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
      tags: tagsArray,
    };

    handleAddNewBlog(postToAdd);
    setShowAddPostModal(false);
    // setNewPost({
    //   title: '',
    //   excerpt: '',
    //   content: '',
    //   image: '',
    //   author_name: '',
    //   category: '',
    //   tags: '',
    //   status: 'Draft'
    // });
  };

  // Edit blog post
  const handleEditPost = () => {
    let updatedPost = { ...currentPost };

    // Convert tags string to array if it's a string
    if (typeof updatedPost.tags === 'string') {
      updatedPost.tags = updatedPost.tags.split(',').map(tag => tag.trim());
    }

    setBlogPosts(blogPosts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ));

    setShowEditPostModal(false);
    setCurrentPost(null);
  };

  // Delete blog post
  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    }
  };

  // Preview a blog post
  const handlePreviewPost = (post) => {
    setPreviewPost(post);
    setShowPreviewModal(true);
  };

  // Start editing a post
  const startEditingPost = (post) => {
    // Convert tags array to comma-separated string for editing
    const postForEdit = {
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
    };

    setCurrentPost(postForEdit);
    setShowEditPostModal(true);
  };



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
