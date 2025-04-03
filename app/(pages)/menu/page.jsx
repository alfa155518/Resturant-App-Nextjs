"use client";
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NewsLetter from '@/components/NewsLetter';
import MenuOffers from '@/components/MenuOffers';
import ChefRecommendations from '@/components/ChefRecommendations';
import PopularProducts from '@/components/PopularProducts';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/pagination';
import Categories from '@/components/Categories';
import DishDetails from '@/components/DishDetails';
import Dish from '@/components/Dish';
import useMenu from '@/hooks/useMenu';
import styles from '../../../src/css/menu.module.css';


export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Custom Hook for Menu Data
  const [
    menuDishes,
    pageNumber,
    setPageNumber,
    selectedItem,
    openItemDetails,
    closeItemDetails,
    favorites,
    toggleFavorite,
    handleAddToCart,
    containerVariants,
    itemVariants] = useMenu();
    if (!menuDishes) {
      return <div>Failed to load menu. Please try again later.</div>;
    }

    console.log(menuDishes);
  // Add the same properties to the rest of your menu items
 // Process menu items safely
 const dishes = menuDishes?.data?.dishes || [];
  
 // Process dish properties
 useEffect(() => {
   if (dishes.length > 0) {
     dishes.forEach(item => {
       if (!item.rating) item.rating = (4 + Math.random()).toFixed(1);
       if (!item.prepTime) item.prepTime = `${Math.floor(Math.random() * 20) + 10} min`;
       if (!item.calories) item.calories = Math.floor(Math.random() * 500) + 200;
       if (!item.dietary) item.dietary = [];
       if (!item.ingredients) item.ingredients = [];
     });
   }
 }, [dishes]);

  // Filtered Dishes with safe fallback
  const filteredItems = selectedCategory === 'all'
    ? dishes
    : dishes.filter(item => item.category === selectedCategory);

  // Popular Dishes Data with safe fallback
  const popularItems = dishes.filter(item => item.popular);
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
      <Suspense fallback={<LoadingSpinner/>}>
      <PopularProducts styles={styles} motion={motion} popularItems={popularItems} containerVariants={containerVariants} itemVariants={itemVariants} favorites={favorites} openItemDetails={openItemDetails} toggleFavorite={toggleFavorite}/>
      </Suspense>

      {/* Menu Categories */}
      <section className={styles.menuSection}>
        <Categories styles={styles} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        {/* Menu Items */}
        {/* {!menuDishes || !menuDishes.data || !menuDishes.data.dishes ? (
          <LoadingSpinner />
        ) : ( */}
          <Suspense fallback={<LoadingSpinner />}>
            <motion.div
              className={styles.menuItems}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory}
            >
              {filteredItems?.map((item) => (
                <Dish key={item.id} styles={styles} item={item} favorites={favorites} openItemDetails={openItemDetails} itemVariants={itemVariants} />
              ))}
            </motion.div>
            
            {/* Pagination */}
            {menuDishes?.data?.total > 1 && (
              <Pagination styles={styles} pageNumber={pageNumber} setPageNumber={setPageNumber} menuDishes={menuDishes} />
            )}
          </Suspense>
        {/* )} */}
      </section>

      {/* Special Offers Section */}
      <MenuOffers styles={styles} motion={motion} />
      {/* Dish Detail Modal */}
      <DishDetails styles={styles} selectedItem={selectedItem} closeItemDetails={closeItemDetails} handleAddToCart={handleAddToCart} favorites={favorites} toggleFavorite={toggleFavorite} />

      {/* Chef's Recommendations Section */}
      <ChefRecommendations styles={styles} motion={motion} />

      {/* Newsletter Section */}
      <NewsLetter styles={styles} motion={motion} />
    </section>
  );
}