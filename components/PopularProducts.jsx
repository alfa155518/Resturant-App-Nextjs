import Image from "next/image";
import { FaStar, FaHeart } from 'react-icons/fa';
export default function PopularProducts({styles,motion,popularItems,containerVariants,itemVariants,favorites}) {
  return (
    <section className={styles.popularSection}>
    <motion.h2 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      Most Popular
    </motion.h2>
    <motion.div 
      className={styles.popularItems}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {popularItems.map((item) => (
        <motion.div 
          key={item.id} 
          className={styles.popularItem}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}
          onClick={() => openItemDetails(item)}
        >
          <div className={styles.popularBadge}>Popular</div>
          <div className={styles.imageContainer}>
            <Image 
              src={item.image} 
              alt={item.name} 
              width={300} 
              height={200} 
              priority
              className={styles.itemImage}
            />
            <motion.button
            aria-label="Favorite"
              className={`${styles.favoriteButton} ${favorites.includes(item.id) ? styles.favorited : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              
            >
              <FaHeart />
            </motion.button>
          </div>
          <div className={styles.itemInfo}>
            <h3>{item.name}</h3>
            <div className={styles.itemMeta}>
              <span className={styles.rating}>
                <FaStar className={styles.starIcon} /> {item.rating}
              </span>
              <span className={styles.prepTime}>{item.prepTime}</span>
            </div>
            <p className={styles.price}>${item.price.toFixed(2)}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section> 
  )
}