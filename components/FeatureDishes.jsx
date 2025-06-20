"use client"
import { useContext } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaHeart } from 'react-icons/fa';
import styles from '../src/css/feature-dishes.module.css';
import SectionName from './ui/SectionName';
import { MenuContext } from '@/store/MenuProvider';
import LoadingSpinner from './ui/LoadingSpinner';


export default function FeatureDishes() {
  const { menuDishes } = useContext(MenuContext) || [];
  let featuredDishes = menuDishes?.data?.dishes;
  featuredDishes = featuredDishes?.filter(dish => dish.featured);
  console.log(featuredDishes)
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

  if (!featuredDishes) {
    return <LoadingSpinner />;
  }

  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <SectionName title={"Feature Dishes"} description={"Discover our chef's carefully crafted selection of signature dishes"} />
        <motion.div
          className={styles.dishesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredDishes?.map(dish => (
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
                <button className={styles.favoriteBtn} aria-label={`Add ${dish.name} to favorites`}>
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

                <h3 className={styles.dishTitle}>{dish.name}</h3>
                <p>{dish.description}</p>

                {/* <div className={styles.ingredients}>
                  {dish?.ingredients?.map((ingredient, index) => (
                    <span key={index} className={styles.ingredient}>{ingredient}</span>
                  ))}
                </div> */}

                <motion.button
                  className={styles.orderBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Order ${dish.name}`}
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