"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiCalendar, FiUser, FiImage, FiEye, FiTag, FiSave } from 'react-icons/fi';
import styles from '../../src/css/admin-blog.module.css';

export default function Blog() {
  // Sample blog posts data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Seasonal Menu: Spring Delights',
      excerpt: 'Discover our new spring menu featuring fresh, seasonal ingredients and innovative dishes.',
      content: '<p>Spring has arrived, and with it comes a bounty of fresh, seasonal ingredients that inspire our chefs to create innovative and delightful dishes.</p><p>Our new spring menu celebrates the vibrant flavors of the season, featuring locally-sourced produce, tender spring vegetables, and aromatic herbs.</p><p>From our delicate asparagus risotto to our succulent lamb with mint pesto, each dish is crafted to showcase the best of spring\'s offerings.</p><p>Join us for a culinary journey through the season\'s finest ingredients and experience the freshness and vitality of spring on your plate.</p>',
      image: '/images/blog/blog-1.1.webp',
      author: 'Chef Maria Rodriguez',
      publishDate: '2025-04-15',
      category: 'Menu Updates',
      tags: ['spring', 'seasonal', 'fresh ingredients'],
      status: 'Published'
    },
    {
      id: 2,
      title: 'Behind the Scenes: Meet Our Pastry Chef',
      excerpt: 'Get to know the creative mind behind our delectable desserts and pastries.',
      content: '<p>In this exclusive behind-the-scenes look, we introduce you to the creative genius behind our award-winning desserts, Pastry Chef Thomas Laurent.</p><p>With over 15 years of experience in some of the world\'s most prestigious kitchens, Chef Thomas brings a unique blend of classical technique and innovative vision to our dessert menu.</p><p>"Dessert should be a memorable finale to the dining experience," says Chef Thomas. "I aim to create desserts that surprise and delight, while honoring traditional flavors."</p><p>His signature chocolate soufflé has become our most requested dessert, with its perfectly crisp exterior and molten, velvety center.</p><p>Join us for dinner and experience the magic of Chef Thomas\'s creations for yourself.</p>',
      image: '/images/chief.webp',
      author: 'Emma Thompson',
      publishDate: '2025-04-02',
      category: 'Staff Spotlight',
      tags: ['pastry', 'desserts', 'chef interview'],
      status: 'Published'
    },
    {
      id: 3,
      title: 'Wine Pairing: Enhancing Your Dining Experience',
      excerpt: 'Learn the art of wine pairing from our sommelier to elevate your meal.',
      content: '<p>The right wine can transform a great meal into an unforgettable dining experience. In this guide, our head sommelier James Wilson shares his expertise on the art of wine pairing.</p><p>"Wine pairing isn\'t about rigid rules," James explains. "It\'s about finding harmonious combinations that enhance both the food and the wine."</p><p>For lighter dishes like our seafood selections, James recommends crisp white wines such as Sauvignon Blanc or Albariño. Their bright acidity complements the delicate flavors of the sea.</p><p>With our robust meat dishes, bold red wines like Cabernet Sauvignon or Syrah create a perfect balance, their tannins cutting through the richness of the meat.</p><p>Don\'t be afraid to experiment and discover your own perfect pairings. Our staff is always happy to offer recommendations based on your preferences and meal selection.</p>',
      image: '/images/auhers/auther-1.webp',
      author: 'James Wilson',
      publishDate: '2025-03-20',
      category: 'Wine & Beverages',
      tags: ['wine', 'pairing', 'sommelier tips'],
      status: 'Published'
    },
    {
      id: 4,
      title: 'Upcoming Event: Summer Barbecue Festival',
      excerpt: 'Join us for a weekend of grilling, music, and summer fun in our garden.',
      content: '<p>We\'re excited to announce our first annual Summer Barbecue Festival, taking place in our garden terrace on June 15-16, 2025.</p><p>This two-day event will feature a variety of grilling stations where our chefs will showcase different barbecue techniques from around the world, from American slow-smoked brisket to Argentine asado and Japanese yakitori.</p><p>Live music from local bands will create the perfect summer atmosphere, while our mixologists will be serving up refreshing cocktails designed specifically for the event.</p><p>Tickets are $75 per person and include food tastings from all stations and two complimentary drinks. Space is limited, so we recommend booking early to avoid disappointment.</p>',
      image: '/images/offers/autumn-risotto.webp',
      author: 'Event Team',
      publishDate: '2025-05-10',
      category: 'Events',
      tags: ['summer', 'barbecue', 'festival', 'event'],
      status: 'Draft'
    },
    {
      id: 5,
      title: 'Sustainable Practices in Our Kitchen',
      excerpt: 'Discover how we\'re reducing our environmental footprint through sustainable kitchen practices.',
      content: '<p>At Gourmet Haven, we\'re committed to reducing our environmental impact through sustainable practices in every aspect of our operation.</p><p>Our journey toward sustainability begins with sourcing. We partner with local farmers who practice sustainable agriculture, reducing food miles and supporting our local economy.</p><p>In the kitchen, we\'ve implemented a comprehensive waste reduction program. Vegetable scraps become flavorful stocks, while unavoidable food waste is composted and returned to the farms that supply our produce.</p><p>We\'ve also invested in energy-efficient equipment and water-saving technologies, significantly reducing our resource consumption.</p><p>These efforts not only benefit the environment but also enhance the quality and flavor of our dishes. When ingredients are fresh, local, and produced with care, you can taste the difference.</p>',
      image: '/images/gallery/restaurant-interior.webp',
      author: 'Chef Daniel Park',
      publishDate: '2025-03-05',
      category: 'Sustainability',
      tags: ['eco-friendly', 'sustainable', 'local sourcing'],
      status: 'Published'
    },
  ]);

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
    author: '',
    category: '',
    tags: '',
    status: 'Draft'
  });

  // Unique categories from blog posts
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Filter blog posts based on search term, category, and status filters
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Add new blog post
  const handleAddPost = () => {
    const tagsArray = newPost.tags.split(',').map(tag => tag.trim());

    const postToAdd = {
      ...newPost,
      id: blogPosts.length + 1,
      publishDate: new Date().toISOString().split('T')[0],
      tags: tagsArray
    };

    setBlogPosts([...blogPosts, postToAdd]);
    setShowAddPostModal(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      category: '',
      tags: '',
      status: 'Draft'
    });
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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

          <div className={styles.blogGrid}>
            {filteredPosts.map(post => (
              <motion.div
                key={post.id}
                className={styles.blogCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.blogImageContainer}>
                  <div className={styles.blogImage}>
                    {post.image ? (
                      <img src={post.image} alt={post.title} />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <FiImage />
                      </div>
                    )}
                  </div>
                  <div className={styles.blogStatus}>
                    <span className={`${styles.statusBadge} ${styles[post.status.toLowerCase()]}`}>
                      {post.status}
                    </span>
                  </div>
                </div>

                <div className={styles.blogContent}>
                  <h3 className={styles.blogTitle}>{post.title}</h3>

                  <div className={styles.blogMeta}>
                    <span className={styles.blogAuthor}>
                      <FiUser /> {post.author}
                    </span>
                    <span className={styles.blogDate}>
                      <FiCalendar /> {formatDate(post.publishDate)}
                    </span>
                  </div>

                  <p className={styles.blogExcerpt}>{post.excerpt}</p>

                  <div className={styles.blogCategory}>
                    <FiTag /> {post.category}
                  </div>

                  <div className={styles.blogTags}>
                    {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                      <span key={index} className={styles.tagBadge}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.blogActions}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handlePreviewPost(post)}
                    title="Preview Post"
                  >
                    <FiEye />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => startEditingPost(post)}
                    title="Edit Post"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeletePost(post.id)}
                    title="Delete Post"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add New Post Modal */}
          {showAddPostModal && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.blogModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <h3>Create New Blog Post</h3>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShowAddPostModal(false)}
                  >
                    <FiX />
                  </button>
                </div>

                <div className={styles.modalContent}>
                  <form className={styles.formWrapper}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title" className={styles.formLabel}>Title</label>
                      <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        placeholder="Enter post title"
                        name="title"
                        autoComplete='title'
                        id="title"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="excerpt" className={styles.formLabel}>Excerpt</label>
                      <textarea
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                        placeholder="Enter a short excerpt or summary"
                        rows="2"
                        name="excerpt"
                        autoComplete='excerpt'
                        id="excerpt"
                        className={styles.formTextarea}
                      ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="content" className={styles.formLabel}>Content</label>
                      <textarea
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        placeholder="Enter post content (HTML supported)"
                        name="content"
                        autoComplete='content'
                        id="content"
                        rows="10"
                        className={styles.formTextarea}
                      ></textarea>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="author" className={styles.formLabel}>Author</label>
                        <input
                          type="text"
                          value={newPost.author}
                          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                          placeholder="Enter author name"
                          name="author"
                          autoComplete='author'
                          id="author"
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.formLabel}>Category</label>
                        <input
                          type="text"
                          value={newPost.category}
                          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                          placeholder="Enter post category"
                          name="category"
                          autoComplete='category'
                          id="category"
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="tags" className={styles.formLabel}>Tags</label>
                      <input
                        type="text"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                        placeholder="Enter tags separated by commas"
                        name="tags"
                        autoComplete='tags'
                        id="tags"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="image" className={styles.formLabel}>Featured Image URL</label>
                      <div className={styles.imageInputContainer}>
                        <input
                          type="text"
                          value={newPost.image}
                          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                          placeholder="Enter image URL or upload"
                          name="image"
                          autoComplete='image'
                          id="image"
                          className={styles.formInput}
                        />
                        <button className={styles.uploadBtn}>
                          <FiImage /> Upload
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="status" className={styles.formLabel}>Status</label>
                      <select
                        value={newPost.status}
                        onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                        name="status"
                        autoComplete='status'
                        id="status"
                        className={styles.formSelect}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setShowAddPostModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleAddPost}
                    disabled={!newPost.title || !newPost.content || !newPost.author}
                  >
                    <FiSave /> Save Post
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Edit Post Modal */}
          {showEditPostModal && currentPost && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.blogModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <h3>Edit Blog Post</h3>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShowEditPostModal(false)}
                  >
                    <FiX />
                  </button>
                </div>

                <div className={styles.modalContent}>
                  <form className={styles.formWrapper}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title" className={styles.formLabel}>Title</label>
                      <input
                        type="text"
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                        name="title"
                        autoComplete='title'
                        id="title"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="excerpt" className={styles.formLabel}>Excerpt</label>
                      <textarea
                        value={currentPost.excerpt}
                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                        name="excerpt"
                        autoComplete='excerpt'
                        id="excerpt"
                        rows="2"
                        className={styles.formTextarea}
                      ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="content" className={styles.formLabel}>Content</label>
                      <textarea
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                        name="content"
                        autoComplete='content'
                        id="content"
                        rows="10"
                        className={styles.formTextarea}
                      ></textarea>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="author" className={styles.formLabel}>Author</label>
                        <input
                          type="text"
                          value={currentPost.author}
                          onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                          name="author"
                          autoComplete='author'
                          id="author"
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.formLabel}>Category</label>
                        <input
                          type="text"
                          value={currentPost.category}
                          onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                          name="category"
                          autoComplete='category'
                          id="category"
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="tags" className={styles.formLabel}>Tags</label>
                      <input
                        type="text"
                        value={currentPost.tags}
                        onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value })}
                        name="tags"
                        autoComplete='tags'
                        id="tags"
                        placeholder="Enter tags separated by commas"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="image" className={styles.formLabel}>Featured Image URL</label>
                      <div className={styles.imageInputContainer}>
                        <input
                          type="text"
                          value={currentPost.image}
                          onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                          name="image"
                          autoComplete='image'
                          id="image"
                          className={styles.formInput}
                        />
                        <button className={styles.uploadBtn}>
                          <FiImage /> Upload
                        </button>
                      </div>
                      {currentPost.image && (
                        <div className={styles.imagePreview}>
                          <img src={currentPost.image} alt={currentPost.title} />
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="status" className={styles.formLabel}>Status</label>
                      <select
                        value={currentPost.status}
                        onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value })}
                        name="status"
                        autoComplete='status'
                        id="status"
                        className={styles.formSelect}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setShowEditPostModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleEditPost}
                  >
                    <FiSave /> Update Post
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Preview Post Modal */}
          {showPreviewModal && previewPost && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowPreviewModal(false)}
            >
              <motion.div
                className={styles.previewModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.previewHeader}>
                  <h3>Preview Blog Post</h3>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShowPreviewModal(false)}
                  >
                    <FiX />
                  </button>
                </div>

                <div className={styles.previewContent}>
                  {previewPost.image && (
                    <div className={styles.previewImage}>
                      <img src={previewPost.image} alt={previewPost.title} />
                    </div>
                  )}

                  <div className={styles.previewBody}>
                    <h1 className={styles.previewTitle}>{previewPost.title}</h1>

                    <div className={styles.previewMeta}>
                      <span className={styles.previewAuthor}>
                        <FiUser /> {previewPost.author}
                      </span>
                      <span className={styles.previewDate}>
                        <FiCalendar /> {formatDate(previewPost.publishDate)}
                      </span>
                      <span className={styles.previewCategory}>
                        <FiTag /> {previewPost.category}
                      </span>
                    </div>

                    <div
                      className={styles.previewText}
                      dangerouslySetInnerHTML={{ __html: previewPost.content }}
                    />

                    {Array.isArray(previewPost.tags) && previewPost.tags.length > 0 && (
                      <div className={styles.previewTags}>
                        {previewPost.tags.map((tag, index) => (
                          <span key={index} className={styles.tagBadge}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
