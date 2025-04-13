"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaSpinner, FaTrash, FaShoppingCart, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/Profile-favorites.module.css';

export default function ProfileFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Static favorites data
  const staticFavorites = [
    {
      id: 1,
      name: 'Grilled Salmon',
      description: 'Fresh salmon fillet grilled to perfection with herbs and lemon',
      price: 24.99,
      image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/tvb79bc8id6zgixixhq4',
      category: 'main',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 8.99,
      image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jhmch4eohzhltgoxv1bt',
      category: 'dessert',
      rating: 4.9,
      reviews: 87
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with our homemade Caesar dressing, croutons and parmesan',
      price: 12.99,
      image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jtsvnf8nes1d8td73um3',
      category: 'starter',
      rating: 4.5,
      reviews: 56
    },
    {
      id: 4,
      name: 'Beef Wellington',
      description: 'Tender fillet steak coated with pâté and mushroom duxelles, wrapped in puff pastry',
      price: 34.99,
      image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/ohvdvvzieftrjxxwtxxm',
      category: 'main',
      rating: 4.7,
      reviews: 92
    },
    {
      id: 5,
      name: 'Chocolate Mousse',
      description: 'Rich and creamy chocolate mousse topped with whipped cream and chocolate shavings',
      price: 7.99,
      image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/cxiliizfsbfj8wr2vzkq',
      category: 'dessert',
      rating: 4.6,
      reviews: 63
    }
  ];
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setFavorites(staticFavorites);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredFavorites = favorites.filter(item => {
    // Filter by category
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  const removeFromFavorites = (id) => {
    if (confirm('Are you sure you want to remove this item from your favorites?')) {
      setFavorites(favorites.filter(item => item.id !== id));
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your favorites...</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={styles.favoritesContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2>My Favorites</h2>
      
      <div className={styles.favoritesControls}>
        <div className={styles.searchBox}>
          <FaSearch />
          <input 
            type="text" 
            name="search"
            placeholder="Search favorites..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Items
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'starter' ? styles.active : ''}`}
            onClick={() => setActiveCategory('starter')}
          >
            Starters
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'main' ? styles.active : ''}`}
            onClick={() => setActiveCategory('main')}
          >
            Main Courses
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'dessert' ? styles.active : ''}`}
            onClick={() => setActiveCategory('dessert')}
          >
            Desserts
          </button>
        </div>
      </div>
      
      {filteredFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <FaHeart className={styles.emptyIcon} />
          <h3>No favorites found</h3>
          <p>
            {searchTerm 
              ? `No favorites match your search for "${searchTerm}"`
              : `You don't have any ${activeCategory !== 'all' ? activeCategory : ''} favorites yet.`
            }
          </p>
        </div>
      ) : (
        <div className={styles.favoritesList}>
          {filteredFavorites.map((item, index) => (
            <motion.div 
              key={item.id}
              className={styles.favoriteCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.favoriteImageContainer}>
                <Image 
                  src={item.image} 
                  alt={item.name}
                  width={300}
                  height={200}

                  className={styles.favoriteImage}
                />
                <span className={styles.favoriteCategory}>{item.category}</span>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFromFavorites(item.id)}
                  aria-label="Remove from favorites"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className={styles.favoriteContent}>
                <h3>{item.name}</h3>
                <p className={styles.favoriteDescription}>{item.description}</p>
                
                <div className={styles.favoriteRating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(item.rating) ? styles.starFilled : styles.starEmpty} 
                      />
                    ))}
                    <span>{item.rating}</span>
                  </div>
                  <span className={styles.reviews}>({item.reviews} reviews)</span>
                </div>
                
                <div className={styles.favoriteFooter}>
                  <span className={styles.favoritePrice}>${item.price.toFixed(2)}</span>
                  <button className={styles.orderButton}>
                    <FaShoppingCart /> Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}