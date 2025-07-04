import Image from "next/image";
import { FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { CartContext } from "@/store/CartProvider";

export default function Dish({
  styles,
  item,
  openItemDetails,
  itemVariants,
  handelAddFavoriteProduct
}) {
  const { handleAddToCart } = useContext(CartContext);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const addToCart = async (item) => {
    setIsItemLoading(true);
    await handleAddToCart(item);
    setIsItemLoading(false);
  };

  return (
    <motion.div
      className={styles.menuItem}
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      }}>
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
          className={`${styles.favoriteButton}`}
          onClick={() => handelAddFavoriteProduct(item.id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Favorite">
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

        {(() => {
          const dietaryItems = typeof item?.dietary === 'string' 
            ? item.dietary.split(',').map(tag => tag.trim())
            : Array.isArray(item?.dietary) 
              ? item.dietary 
              : [];
          
          return dietaryItems.length > 0 && (
            <div className={styles.dietaryTags}>
              {dietaryItems.map((tag) => (
                <span key={tag} className={styles.dietaryTag}>
                  {tag}
                </span>
              ))}
            </div>
          );
        })()}

        <div className={styles.actionButtons}>
          <motion.button
            className={styles.detailsButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openItemDetails(item)}
            aria-label="View Details">
            View Details
          </motion.button>

          <motion.button
            className={styles.orderButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(item)}
            aria-label="Add to Order"
            disabled={isItemLoading}>
            {isItemLoading ? "Adding..." : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
