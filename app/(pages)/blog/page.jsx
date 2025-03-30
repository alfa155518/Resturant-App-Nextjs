"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../src/css/blog.module.css';
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from 'react-icons/fa';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Seasonal Ingredients: Summer Edition",
      excerpt: "Discover the vibrant flavors of summer with our guide to seasonal ingredients that will elevate your culinary experience.",
      image: "/images/blog/blog-1.webp",
      date: "June 15, 2023",
      author: "Chef John Doe",
      category: "Food",
      tags: ["seasonal", "ingredients", "summer", "cooking"]
    },
    {
      id: 2,
      title: "The Art of Wine Pairing",
      excerpt: "Learn the secrets of perfect wine pairing from our expert sommelier and enhance your dining experience.",
      image: "/images/blog/blog-2.webp",
      date: "May 28, 2023",
      author: "David Wilson",
      category: "Drinks",
      tags: ["wine", "pairing", "dining", "experience"]
    },
    {
      id: 3,
      title: "Behind the Scenes: A Day in Our Kitchen",
      excerpt: "Take a peek behind the curtain and discover what goes into creating our award-winning dishes.",
      image: "/images/blog/blog-3.webp",
      date: "May 10, 2023",
      author: "Chef Michael Chen",
      category: "Kitchen",
      tags: ["behind-the-scenes", "kitchen", "cooking", "chefs"]
    },
    {
      id: 4,
      title: "Hosting the Perfect Dinner Party",
      excerpt: "Tips and tricks from our event specialists on how to host a memorable dinner party for your guests.",
      image: "/images/blog/blog-4.webp",
      date: "April 22, 2023",
      author: "Sarah Johnson",
      category: "Events",
      tags: ["hosting", "dinner", "party", "tips"]
    },
    {
      id: 5,
      title: "Sustainable Practices in Modern Restaurants",
      excerpt: "How we're working to reduce our environmental footprint while maintaining exceptional quality.",
      image: "/images/blog/blog-5.webp",
      date: "April 5, 2023",
      author: "Emily Rodriguez",
      category: "Sustainability",
      tags: ["sustainable", "eco-friendly", "environment", "practices"]
    },
    {
      id: 6,
      title: "Cocktail Trends for 2023",
      excerpt: "Explore the latest trends in mixology and discover new favorite cocktails to enjoy this year.",
      image: "/images/blog/blog-6.webp",
      date: "March 18, 2023",
      author: "Lisa Park",
      category: "Drinks",
      tags: ["cocktails", "trends", "mixology", "drinks"]
    },
    {
      id: 7,
      title: "The History of Classic French Cuisine",
      excerpt: "Dive into the rich history of French culinary traditions that influence our menu.",
      image: "/images/blog/blog-7.webp",
      date: "March 3, 2023",
      author: "Chef John Doe",
      category: "Food",
      tags: ["french", "cuisine", "history", "culinary"]
    },
    {
      id: 8,
      title: "Customer Stories: Memorable Celebrations",
      excerpt: "Heartwarming stories from our guests about special moments celebrated at our restaurant.",
      image: "/images/blog/blog-8.webp",
      date: "February 14, 2023",
      author: "Sarah Johnson",
      category: "Stories",
      tags: ["customers", "celebrations", "memories", "experiences"]
    },
    {
      id: 9,
      title: "Mastering the Perfect Steak",
      excerpt: "Chef's tips on how to select, prepare, and cook the perfect steak every time.",
      image: "/images/blog/blog-9.webp",
      date: "January 30, 2023",
      author: "Chef Michael Chen",
      category: "Food",
      tags: ["steak", "cooking", "tips", "techniques"]
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 3);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className={styles.blogContainer}>
      <motion.div 
        className={styles.blogHeader}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Culinary Journal</h1>
        <p>Insights, stories, and expertise from our kitchen to yours</p>
      </motion.div>

      <div className={styles.blogContent}>
        <section className={styles.mainContent}>
          <motion.div 
            className={styles.searchBar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              name='search'
              placeholder="Search articles..." 
              value={searchTerm}
              autoComplete='search'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div 
            className={styles.categoryFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                aria-label='category'
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className={styles.blogGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <motion.article 
                  key={post.id} 
                  className={styles.blogCard}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className={styles.blogImageContainer}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.blogImage}
                      priority={post.id <= 3} 
                    />
                    <div className={styles.blogCategory}>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <div className={styles.blogInfo}>
                    <div className={styles.blogMeta}>
                      <span><FaCalendarAlt /> {post.date}</span>
                      <span><FaUser /> {post.author}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className={styles.blogTags}>
                      {post.tags.map(tag => (
                        <span key={tag} className={styles.tag}>
                          <FaTag /> {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.id}`} className={styles.readMoreLink}>
                      Read More
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                className={styles.noResults}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </motion.div>

          {filteredPosts.length > visiblePosts && (
            <motion.div 
              className={styles.loadMoreContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button 
                className={styles.loadMoreButton}
                onClick={loadMorePosts}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label='Load More'
              >
                Load More Articles
              </motion.button>
            </motion.div>
          )}
        </section>

        <motion.aside 
          className={styles.sidebar}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <section className={styles.sidebarSection}>
            <h3>Popular Posts</h3>
            <div className={styles.popularPosts}>
              {blogPosts.slice(0, 3).map(post => (
                <div key={post.id} className={styles.popularPost}>
                  <div className={styles.popularPostImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.popularPostInfo}>
                    <h4>{post.title}</h4>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sidebarSection}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.filter(cat => cat !== 'All').map(category => (
                <li key={category}>
                  <button aria-label='category' onClick={() => setActiveCategory(category)}>
                    {category}
                    <span>{blogPosts.filter(post => post.category === category).length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.sidebarSection}>
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with our latest culinary adventures</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" required name='email' autoComplete='email' />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label='Subscribe'
              >
                Subscribe
              </motion.button>
            </form>
          </section>
        </motion.aside>
      </div>
    </div>
  );
}