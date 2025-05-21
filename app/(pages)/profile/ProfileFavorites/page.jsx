"use client";

import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaSpinner, FaTrash, FaShoppingCart, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/Profile-favorites.module.css';
import { CartContext } from '@/store/CartProvider';
import useProfileFavorites from '@/hooks/useProfileFavorites';

export default function ProfileFavorites() {
  const { handleAddToCart } = useContext(CartContext);


  // Custom Hook Profile Favorites
  const {
    loading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredFavorites,
    categories,
    handelRemoveFavoriteProduct,
    fadeIn
  } = useProfileFavorites();

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
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All Items' :
                category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {!filteredFavorites || filteredFavorites.length === 0 ? (
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
          {filteredFavorites.map((item, index) => {
            const product = item.product;
            return (
              <motion.div
                key={item.id}
                className={styles.favoriteCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.favoriteImageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className={styles.favoriteImage}
                  />
                  <span className={styles.favoriteCategory}>{product.category}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handelRemoveFavoriteProduct(product.id)}
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className={styles.favoriteContent}>
                  <h3>{product.name}</h3>
                  <p className={styles.favoriteDescription}>{product.description}</p>

                  <div className={styles.favoriteRating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                        />
                      ))}
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <span className={styles.reviews}></span>
                  <div className={styles.favoriteFooter}>
                    <span className={styles.favoritePrice}>${product.price.toFixed(2)}</span>
                    <button className={styles.orderButton} onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}