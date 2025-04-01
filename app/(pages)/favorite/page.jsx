"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowLeft, FaStar } from 'react-icons/fa';
import styles from '../../../src/css/favorite.module.css';

export default function Favorites() {
  // State for favorite items
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Grilled Salmon',
      price: 24.99,
      rating: 4.8,
      reviews: 124,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'Seafood',
      description: 'Fresh salmon fillet grilled to perfection with herbs and lemon'
    },
    {
      id: 2,
      name: 'Beef Tenderloin',
      price: 29.99,
      rating: 4.9,
      reviews: 86,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'Meat',
      description: 'Premium cut beef tenderloin with red wine reduction'
    },
    {
      id: 3,
      name: 'Vegetable Pasta',
      price: 18.99,
      rating: 4.6,
      reviews: 92,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'Vegetarian',
      description: 'Fresh pasta with seasonal vegetables and pesto sauce'
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      price: 12.99,
      rating: 4.9,
      reviews: 156,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'Dessert',
      description: 'Warm chocolate cake with a molten chocolate center'
    }
  ]);
  
  // State for filter
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(favorites.map(item => item.category))];
  
  // Filtered favorites
  const filteredFavorites = activeFilter === 'All' 
    ? favorites 
    : favorites.filter(item => item.category === activeFilter);
  
  // Handle remove from favorites
  const handleRemoveFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };
  
  // Handle add to cart
  const handleAddToCart = (id) => {
    // In a real app, this would add the item to the cart
    alert(`Added ${favorites.find(item => item.id === id).name} to cart!`);
  };
  
  // Animation variants
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
  
  // Empty favorites check
  const isFavoritesEmpty = favorites.length === 0;
  
  return (
    <div className={styles.favoritesPageContainer}>
      <motion.div 
        className={styles.favoritesHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContent}>
          <h1>Your Favorites</h1>
          <p>Dishes you've fallen in love with</p>
        </div>
      </motion.div>
      
      <div className={styles.favoritesContent}>
        {isFavoritesEmpty ? (
          <motion.div 
            className={styles.emptyFavoritesContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.emptyFavoritesImage}>
              <FaHeart size={80} />
            </div>
            <h2>Your favorites list is empty</h2>
            <p>Explore our menu and add items to your favorites!</p>
            <Link href="/menu">
              <motion.button 
                className={styles.exploreMenuBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft /> Explore Menu
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className={styles.filterContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div 
              className={styles.favoritesGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredFavorites.map(item => (
                <motion.div 
                  key={item.id} 
                  className={styles.favoriteItem}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                >
                  <div className={styles.favoriteImageContainer}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={300} 
                      height={200}
                      className={styles.favoriteImage}
                    />
                    <motion.button 
                      className={styles.removeButton}
                      onClick={() => handleRemoveFavorite(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label='Remove from Favorites'
                    >
                      <FaTrash />
                    </motion.button>
                    <div className={styles.categoryTag}>
                      {item.category}
                    </div>
                  </div>
                  
                  <div className={styles.favoriteDetails}>
                    <h2>{item.name}</h2>
                    <p className={styles.favoriteDescription}>{item.description}</p>
                    
                    <div className={styles.ratingContainer}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(item.rating) ? styles.starFilled : styles.starEmpty} 
                          />
                        ))}
                      </div>
                      <span className={styles.ratingText}>
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className={styles.favoriteFooter}>
                      <div className={styles.favoritePrice}>${item.price.toFixed(2)}</div>
                      <motion.button 
                        className={styles.addToCartButton}
                        onClick={() => handleAddToCart(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaShoppingCart /> Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
      
      {!isFavoritesEmpty && (
        <motion.div 
          className={styles.recommendedSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>You Might Also Like</h3>
          <div className={styles.recommendedItems}>
            {[1, 2, 3, 4].map(id => (
              <motion.div 
                key={id} 
                className={styles.recommendedItem}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              >
                <div className={styles.recommendedImageContainer}>
                  <Image 
                    src={`/images/feature/create-grilled-salmon-dish.png`} 
                    alt={`Recommended Item ${id}`} 
                    width={150} 
                    height={150}
                    className={styles.recommendedImage}
                  />
                </div>
                <h3>Delicious Dish {id}</h3>
                <div className={styles.recommendedPrice}>${(15.99 + id).toFixed(2)}</div>
                <div className={styles.recommendedActions}>
                  <motion.button 
                    className={styles.recommendedFavoriteBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label='Add to Favorites'
                  >
                    <FaHeart />
                  </motion.button>
                  <motion.button 
                    className={styles.recommendedCartBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label='Add to Cart'
                  >
                    <FaShoppingCart />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className={styles.ctaContent}>
          <h2>Discover More Delicious Options</h2>
          <p>Explore our full menu to find your next favorite dish</p>
          <Link href="/menu">
            <motion.button 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Full Menu
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}