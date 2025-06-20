
import { FiTag, FiInfo, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
export default function Item({ styles, filteredItems, startEditingItem, toggleFeatured, toggleAvailability, deleteItem }) {

    if (!filteredItems || filteredItems.length === 0) {
        return (
            Array.from({ length: 25 }).map((_, index) => (
                <Skeleton key={index} height={200} />
            ))
        );
    }

    return (
        filteredItems?.map(item => (
            <motion.div
                key={item.id}
                className={styles.menuItemCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.menuItemImage}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.itemBadges}>
                        {item.featured && (
                            <span className={styles.featuredBadge}>Featured</span>
                        )}
                        {!item.available && (
                            <span className={styles.unavailableBadge}>Unavailable</span>
                        )}
                    </div>
                </div>
                <div className={styles.menuItemContent}>
                    <div className={styles.menuItemHeader}>
                        <h3>{item.name}</h3>
                        <span className={styles.price}>${item.price.toFixed(2)}</span>
                    </div>
                    <p className={styles.category}>{item.category}</p>
                    <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.menuItemActions}>
                    <button
                        className={`${styles.toggleBtn} ${item.featured ? styles.active : ''}`}
                        onClick={() => toggleFeatured(item.id)}
                        title={item.featured ? "Remove from featured" : "Add to featured"}
                    >
                        <FiTag /> {item.featured ? "Featured" : "Feature"}
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${item.available ? styles.available : styles.unavailable}`}
                        onClick={() => toggleAvailability(item.id)}
                        title={item.available ? "Mark as unavailable" : "Mark as available"}
                    >
                        <FiInfo /> {item.available ? "Available" : "Unavailable"}
                    </button>
                    <div className={styles.actionButtons}>
                        <button
                            className={styles.editBtn}
                            onClick={() => startEditingItem(item)}
                            title="Edit Item"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => deleteItem(item.id)}
                            title="Delete Item"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
            </motion.div>
        ))
    );
}