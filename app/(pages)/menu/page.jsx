"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaFire, FaLeaf, FaHeart } from 'react-icons/fa';
import { MdRestaurantMenu, } from 'react-icons/md';
import styles from '../../../src/css/menu.module.css';
import NewsLetter from '@/components/NewsLetter';
import MenuOffers from '@/components/MenuOffers';
import ChefRecommendations from '@/components/ChefRecommendations';
import PopularProducts from '@/components/PopularProducts';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'main', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];
  
  const menuItems = [
    {
      id: 1,
      name: 'Crispy Calamari',
      description: 'Tender calamari rings, lightly battered and fried to perfection, served with our signature dipping sauce.',
      price: 12.99,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'appetizers',
      popular: true,
      rating: 4.7,
      prepTime: '15 min',
      calories: 320,
      dietary: ['seafood'],
      ingredients: ['calamari', 'flour', 'herbs', 'lemon', 'dipping sauce']
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet, grilled to perfection with herbs and lemon, served with seasonal vegetables.',
      price: 24.99,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'main',
      popular: true,
      rating: 4.9,
      prepTime: '25 min',
      calories: 450,
      dietary: ['gluten-free', 'high-protein'],
      ingredients: ['salmon fillet', 'olive oil', 'lemon', 'herbs', 'seasonal vegetables']
    },
    {
      id: 3,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.',
      price: 9.99,
      image: '/images/feature/create-grilled-salmon-dish.png',
      category: 'desserts',
      popular: true,
      rating: 4.8,
      prepTime: '20 min',
      calories: 580,
      dietary: ['vegetarian'],
      ingredients: ['chocolate', 'flour', 'sugar', 'eggs', 'vanilla ice cream', 'berries']
    },
    // ... other menu items remain the same with added properties
  ];

  // Add the same properties to the rest of your menu items
  menuItems.forEach(item => {
    if (!item.rating) item.rating = (4 + Math.random()).toFixed(1);
    if (!item.prepTime) item.prepTime = `${Math.floor(Math.random() * 20) + 10} min`;
    if (!item.calories) item.calories = Math.floor(Math.random() * 500) + 200;
    if (!item.dietary) item.dietary = [];
    if (!item.ingredients) item.ingredients = [];
  });

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);
  
  const popularItems = menuItems.filter(item => item.popular);

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
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    // Show toast notification
    alert(`Added ${item.name} to cart!`);
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <section className={styles.menuPage}>

      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Menu</h1>
        <p>Discover our chef's special creations made with fresh ingredients</p>
      </motion.div>

      {/* Popular Items Section */}
      <PopularProducts styles={styles} motion={motion} popularItems={popularItems} containerVariants={containerVariants} itemVariants={itemVariants} favorites={favorites}/>

      {/* Menu Categories */}
      <section className={styles.menuSection}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.id === 'all' && <MdRestaurantMenu className={styles.categoryIcon} />}
              {category.id === 'appetizers' && <FaFire className={styles.categoryIcon} />}
              {category.id === 'main' && <MdRestaurantMenu className={styles.categoryIcon} />}
              {category.id === 'desserts' && <FaHeart className={styles.categoryIcon} />}
              {category.id === 'drinks' && <FaLeaf className={styles.categoryIcon} />}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div 
          className={styles.menuItems}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory} // Re-render animation when category changes
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id} 
              className={styles.menuItem}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}
            >
              <div className={styles.imageContainer}>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={400} 
                  height={250} 
                  priority
                  className={styles.itemImage}
                />
                <motion.button
                  className={`${styles.favoriteButton} ${favorites.includes(item.id) ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(item.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label='Favorite'
                >
                  <FaHeart />
                </motion.button>
                {item.popular && <div className={styles.popularTag}>Popular</div>}
              </div>
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <h3>{item.name}</h3>
                  <p className={styles.price}>${item.price.toFixed(2)}</p>
                </div>
                
                <div className={styles.itemMeta}>
                  <span className={styles.rating}>
                    <FaStar className={styles.starIcon} /> {item.rating}
                  </span>
                  <span className={styles.prepTime}>{item.prepTime}</span>
                  <span className={styles.calories}>{item.calories} cal</span>
                </div>
                
                <p className={styles.description}>{item.description}</p>
                
                {item.dietary && item.dietary.length > 0 && (
                  <div className={styles.dietaryTags}>
                    {item.dietary.map(tag => (
                      <span key={tag} className={styles.dietaryTag}>{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className={styles.actionButtons}>
                  <motion.button 
                    className={styles.detailsButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openItemDetails(item)}
                    aria-label='View Details'
                  >
                    View Details
                  </motion.button>
                  
                  <motion.button 
                    className={styles.orderButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(item)}
                    aria-label='Add to Order'
                  >
                    Add to Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Special Offers Section */}
      <MenuOffers styles={styles} motion={motion}/>
      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeItemDetails}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className={styles.closeButton}
                onClick={closeItemDetails}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label='Close'
              >
                &times;
              </motion.button>
              
              <div className={styles.modalImageContainer}>
                <Image 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  width={500} 
                  height={300}
                  priority
                  className={styles.modalImage}
                />
                <motion.button
                  className={`${styles.favoriteButton} ${favorites.includes(selectedItem.id) ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(selectedItem.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label='Favorite'
                >
                  <FaHeart />
                </motion.button>
                {selectedItem.popular && <div className={styles.popularTag}>Popular</div>}
              </div>
              
              <div className={styles.modalDetails}>
                <div className={styles.modalHeader}>
                  <h2>{selectedItem.name}</h2>
                  <p className={styles.modalPrice}>${selectedItem.price.toFixed(2)}</p>
                </div>
                
                <div className={styles.modalMeta}>
                  <span className={styles.rating}>
                    <FaStar className={styles.starIcon} /> {selectedItem.rating}
                  </span>
                  <span className={styles.prepTime}>{selectedItem.prepTime}</span>
                  <span className={styles.calories}>{selectedItem.calories} cal</span>
                </div>
                
                <p className={styles.modalDescription}>{selectedItem.description}</p>
                
                {selectedItem.dietary && selectedItem.dietary.length > 0 && (
                  <div className={styles.modalSection}>
                    <h3>Dietary Information</h3>
                    <div className={styles.dietaryTags}>
                      {selectedItem.dietary.map(tag => (
                        <span key={tag} className={styles.dietaryTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div className={styles.modalSection}>
                    <h3>Ingredients</h3>
                    <ul className={styles.ingredientsList}>
                      {selectedItem.ingredients.map(ingredient => (
                        <li key={ingredient} className={styles.ingredientItem}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className={styles.modalSection}>
                  <h3>Customize Your Order</h3>
                  <div className={styles.customizeOptions}>
                    <div className={styles.customizeOption}>
                      <label>
                        <input type="checkbox" name='sauce'/> Extra sauce
                      </label>
                      <span>+$1.50</span>
                    </div>
                    <div className={styles.customizeOption}>
                      <label>
                        <input type="checkbox" name='Double portion'/> Double portion
                      </label>
                      <span>+${(selectedItem.price * 0.8).toFixed(2)}</span>
                    </div>
                    <div className={styles.customizeOption}>
                      <label>
                        <input type="checkbox" name='instructions'/> Special instructions
                      </label>
                    </div>
                    <textarea 
                      className={styles.specialInstructions}
                      placeholder="Any special requests or allergies we should know about?"
                      rows={3}
                      autoComplete='options' name='options'
                    />
                  </div>
                </div>
                
                
                <motion.button 
                  className={styles.addToCartButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    closeItemDetails();
                  }}
                  aria-label='Add to Order'
                >
                  Add to Order - ${selectedItem.price.toFixed(2)}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chef's Recommendations Section */}
      <ChefRecommendations styles={styles} motion={motion}/>
      
      {/* Newsletter Section */}
      <NewsLetter styles={styles} motion={motion}/>
    </section>
  );
}