import { CartContext } from "@/store/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
export default function DishDetails({
  styles,
  selectedItem,
  closeItemDetails,
  favoriteProducts,
  handelAddFavoriteProduct,
}) {
  const { handleAddToCart, setAttributes } = useContext(CartContext);

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeItemDetails}>
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}>
            <motion.button
              className={styles.closeButton}
              onClick={closeItemDetails}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close">
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
                className={styles.favoriteButton}
                onClick={() => handelAddFavoriteProduct(selectedItem.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Favorite">
                <FaHeart />
              </motion.button>
              {selectedItem.popular && (
                <div className={styles.popularTag}>Popular</div>
              )}
            </div>

            <div className={styles.modalDetails}>
              <div className={styles.modalHeader}>
                <h2>{selectedItem.name}</h2>
                <p className={styles.modalPrice}>
                  ${selectedItem.price.toFixed(2)}
                </p>
              </div>

              <div className={styles.modalMeta}>
                <span className={styles.rating}>
                  <FaStar className={styles.starIcon} /> {selectedItem.rating}
                </span>
                <span className={styles.prepTime}>{selectedItem.prepTime}</span>
                <span className={styles.calories}>
                  {selectedItem.calories} cal
                </span>
              </div>

              <p className={styles.modalDescription}>
                {selectedItem.description}
              </p>

              {(() => {
                const dietaryList = typeof selectedItem?.dietary === 'string' 
                  ? selectedItem.dietary.split(',').map(item => item.trim())
                  : Array.isArray(selectedItem?.dietary)
                    ? selectedItem.dietary
                    : [];
                
                return dietaryList.length > 0 && (
                  <div className={styles.modalSection}>
                    <h3>Dietary Information</h3>
                    <div className={styles.dietaryTags}>
                      {dietaryList.map((tag, index) => (
                        <span key={`${tag}-${index}`} className={styles.dietaryTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {(() => {
                const ingredientsList = typeof selectedItem?.ingredients === 'string' 
                  ? selectedItem.ingredients.split(',').map(item => item.trim())
                  : Array.isArray(selectedItem?.ingredients)
                    ? selectedItem.ingredients
                    : [];
                
                return ingredientsList.length > 0 && (
                  <div className={styles.modalSection}>
                    <h3>Ingredients</h3>
                    <ul className={styles.ingredientsList}>
                      {ingredientsList.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`} className={styles.ingredientItem}>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              <div className={styles.modalSection}>
                <h3>Customize Your Order</h3>
                <div className={styles.customizeOptions}>
                  <div className={styles.customizeOption}>
                    <label>
                      <input
                        type="checkbox"
                        name="sauce"
                        value={1.5}
                        onChange={(e) => {
                          setAttributes((prev) => ({
                            ...prev,
                            extraSauce: e.target.checked
                              ? parseFloat(e.target.value)
                              : 0,
                          }));
                        }}
                      />{" "}
                      Extra sauce
                    </label>
                    <span>+$1.50</span>
                  </div>
                  <div className={styles.customizeOption}>
                    <label>
                      <input
                        type="checkbox"
                        name="Double portion"
                        value={(selectedItem.price * 0.8).toFixed(2)}
                        onChange={(e) => {
                          setAttributes((prev) => ({
                            ...prev,
                            doublePortion: e.target.checked
                              ? parseFloat(e.target.value)
                              : 0,
                          }));
                        }}
                      />{" "}
                      Double portion
                    </label>
                    <span>+${(selectedItem.price * 0.8).toFixed(2)}</span>
                  </div>
                  <textarea
                    className={styles.specialInstructions}
                    placeholder="Any special requests or allergies we should know about?"
                    rows={3}
                    autoComplete="options"
                    name="options"
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
                aria-label="Add to Order">
                Add to Order - ${selectedItem.price.toFixed(2)}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
