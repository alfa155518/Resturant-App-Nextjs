
import { motion } from 'framer-motion';
import { FaStar, FaFire, FaChild, FaIceCream } from 'react-icons/fa';
import { MdRestaurantMenu, } from 'react-icons/md';
import { GiSideswipe, GiDogBowl, GiSandal, GiMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
export default function Categories({ styles, selectedCategory, setSelectedCategory }) {

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'specials', name: 'Specials' },
    { id: 'kids', name: 'Kids' },
    { id: 'sides', name: 'Sides' },
    { id: 'soups', name: 'Soups' },
    { id: 'salads', name: 'Salads' },
    { id: 'entrees', name: 'Entrees' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' },
  ];

  return (
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
          {category.id === 'specials' && <FaStar className={styles.categoryIcon} />}
          {category.id === 'kids' && <FaChild className={styles.categoryIcon} />}
          {category.id === 'sides' && <GiSideswipe className={styles.categoryIcon} />}
          {category.id === 'soups' && <GiDogBowl className={styles.categoryIcon} />}
          {category.id === 'salads' && <GiSandal className={styles.categoryIcon} />}
          {category.id === 'entrees' && <GiMeal className={styles.categoryIcon} />}
          {category.id === 'beverages' && <BiDrink className={styles.categoryIcon} />}
          {category.id === 'desserts' && <FaIceCream className={styles.categoryIcon} />}
          {category.name}
        </motion.button>
      ))}
    </div>
  )

}