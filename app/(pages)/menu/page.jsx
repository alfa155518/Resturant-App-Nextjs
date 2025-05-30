"use client";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import NewsLetter from "@/components/NewsLetter";
import MenuOffers from "@/components/MenuOffers";
import ChefRecommendations from "@/components/ChefRecommendations";
import PopularProducts from "@/components/PopularProducts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Categories from "@/components/Categories";
import DishDetails from "@/components/DishDetails";
import Dish from "@/components/Dish";
import useMenu from "@/hooks/useMenu";
import styles from "../../../src/css/menu.module.css";
import Pagination from "@/components/ui/pagination";


export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Custom Hook for Menu Data
  const [
    menuDishes,
    setPageNumber,
    selectedItem,
    openItemDetails,
    closeItemDetails,
    favoriteProducts,
    handelAddFavoriteProduct,
    containerVariants,
    itemVariants
  ] = useMenu();

  const dishes = menuDishes?.data?.dishes || [];

  // Filtered Dishes with safe fallback
  const filteredItems =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((item) => item.category === selectedCategory);

  // Popular Dishes Data with safe fallback
  const popularItems = dishes.filter((item) => item.popular);
  return (
    <section className={styles.menuPage}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1>Our Menu</h1>
        <p>Discover our chef's special creations made with fresh ingredients</p>
      </motion.div>

      {/* Popular Items Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <PopularProducts
          styles={styles}
          motion={motion}
          popularItems={popularItems}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          favoriteProducts={favoriteProducts}
          openItemDetails={openItemDetails}
          handelAddFavoriteProduct={handelAddFavoriteProduct}
        />
      </Suspense>

      {/* Menu Categories */}
      <section className={styles.menuSection}>
        <Categories
          styles={styles}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Menu Items */}
        {!menuDishes || !menuDishes.data || !menuDishes.data.dishes ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <motion.div
              className={styles.menuItems}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory}>
              {filteredItems?.map((item) => (
                <Dish
                  key={item.id}
                  styles={styles}
                  item={item}
                  openItemDetails={openItemDetails}
                  itemVariants={itemVariants}
                  handelAddFavoriteProduct={handelAddFavoriteProduct}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            <Pagination
              currentPage={menuDishes?.data.current_page}
              totalPages={menuDishes?.data.last_page}
              onPageChange={setPageNumber}
            />
          </Suspense>
        )}
      </section>

      {/* Special Offers Section */}
      <MenuOffers styles={styles} motion={motion} />
      {/* Dish Detail Modal */}
      <DishDetails
        styles={styles}
        selectedItem={selectedItem}
        closeItemDetails={closeItemDetails}
        favoriteProducts={favoriteProducts}
        handelAddFavoriteProduct={handelAddFavoriteProduct}
      />

      {/* Chef's Recommendations Section */}
      <ChefRecommendations styles={styles} motion={motion} />

      {/* Newsletter Section */}
      <NewsLetter styles={styles} motion={motion} />
    </section>
  );
}
