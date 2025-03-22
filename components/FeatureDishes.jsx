"use client"
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaHeart } from 'react-icons/fa';
import styles from '../src/css/feature-dishes.module.css';
import SectionName from './ui/SectionName';


export default function FeatureDishes() {
  const [activeTab, setActiveTab] = useState('all');
  
  const dishes = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon, grilled to perfection with lemon herb butter, served with seasonal vegetables and wild rice.",
      price: 24.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "seafood",
      rating: 4.8,
      isNew: true,
      ingredients: ["Salmon", "Lemon", "Herbs", "Butter", "Vegetables", "Rice"]
    },
    {
      id: 2,
      name: "Truffle Risotto",
      description: "Creamy Arborio rice slowly cooked with mushrooms, finished with truffle oil and parmesan cheese.",
      price: 19.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "vegetarian",
      rating: 4.7,
      isNew: false,
      ingredients: ["Arborio Rice", "Mushrooms", "Truffle Oil", "Parmesan", "Vegetable Stock"]
    },
    {
      id: 3,
      name: "Beef Wellington",
      description: "Tender filet mignon wrapped in puff pastry with mushroom duxelles, served with red wine reduction.",
      price: 34.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "meat",
      rating: 4.9,
      isNew: true,
      ingredients: ["Beef Tenderloin", "Puff Pastry", "Mushrooms", "Prosciutto", "Red Wine"]
    },
    {
      id: 4,
      name: "Mediterranean Salad",
      description: "Fresh mixed greens with feta cheese, olives, tomatoes, cucumbers, and red onions, dressed with olive oil and lemon.",
      price: 14.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "vegetarian",
      rating: 4.5,
      isNew: false,
      ingredients: ["Mixed Greens", "Feta Cheese", "Olives", "Tomatoes", "Cucumbers", "Red Onions"]
    },
    {
      id: 5,
      name: "Lobster Ravioli",
      description: "Handmade pasta filled with fresh lobster meat, served with a saffron cream sauce.",
      price: 29.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "seafood",
      rating: 4.9,
      isNew: true,
      ingredients: ["Pasta", "Lobster", "Saffron", "Cream", "Shallots", "White Wine"]
    },
    {
      id: 6,
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with a molten center, served with vanilla ice cream.",
      price: 12.99,
      image: "/images/feature/create-grilled-salmon-dish.png",
      category: "dessert",
      rating: 4.8,
      isNew: false,
      ingredients: ["Dark Chocolate", "Eggs", "Butter", "Sugar", "Vanilla Ice Cream"]
    }
  ];

  const filteredDishes = activeTab === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === activeTab);

  const categories = [
    { id: 'all', name: 'All Dishes' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'meat', name: 'Meat' },
    { id: 'dessert', name: 'Desserts' }
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={styles.featured}>
      <div className={styles.container}>
    
          <SectionName title={"Feature Dishes"} description={"Discover our chef's carefully crafted selection of signature dishes"}/>
        
        <motion.div 
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`${styles.tab} ${activeTab === category.id ? styles.active : ''}`}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.dishesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredDishes.map(dish => (
            <motion.div 
              key={dish.id} 
              className={styles.dishCard}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={styles.imageContainer}>
                <Image 
                  src={dish.image} 
                  alt={dish.name} 
                  width={400} 
                  height={300}
                  priority
                  className={styles.dishImage}
                />
                <div className={styles.price}>${dish.price.toFixed(2)}</div>
                {dish.isNew && <div className={styles.newBadge}>New</div>}
                <button className={styles.favoriteBtn}>
                  <FaHeart />
                </button>
              </div>
              
              <div className={styles.content}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(dish.rating) ? styles.filled : styles.empty} />
                  ))}
                  <span>{dish.rating}</span>
                </div>
                
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                
                <div className={styles.ingredients}>
                  {dish.ingredients.map((ingredient, index) => (
                    <span key={index} className={styles.ingredient}>{ingredient}</span>
                  ))}
                </div>
                
                <motion.button 
                  className={styles.orderBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}