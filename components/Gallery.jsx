import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/gallery.module.css';
import SectionName from './ui/SectionName';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filterImages = (category) => {
    setActiveCategory(category);
  };

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
  <SectionName title={"Our Gallery"} description={" Take a visual tour of our restaurant and delicious creations"}/>
        <div className={styles.galleryFilter}>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`}
            onClick={() => filterImages('all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'interior' ? styles.active : ''}`}
            onClick={() => filterImages('interior')}
          >
            Interior
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'food' ? styles.active : ''}`}
            onClick={() => filterImages('food')}
          >
            Food
          </button>
          <button 
            className={`${styles.filterButton} ${activeCategory === 'events' ? styles.active : ''}`}
            onClick={() => filterImages('events')}
          >
            Events
          </button>
        </div>

        <div className={styles.galleryGrid}>
          {filteredImages.map((image, index) => (
            <motion.div 
              key={index}
              className={styles.galleryItem}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  width={400} 
                  height={300}
                  priority
                  className={styles.galleryImage}
                />
                <div className={styles.imageOverlay}>
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery images data
const galleryImages = [
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Restaurant Interior",
    title: "Elegant Dining Area",
    description: "Our main dining space with ambient lighting",
    category: "interior"
  },
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Signature Dish",
    title: "Chef's Special",
    description: "Our award-winning signature dish",
    category: "food"
  },
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Private Event",
    title: "Private Celebrations",
    description: "Perfect venue for your special occasions",
    category: "events"
  },
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Dessert Platter",
    title: "Sweet Endings",
    description: "Handcrafted desserts to complete your meal",
    category: "food"
  },
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Bar Area",
    title: "Sophisticated Bar",
    description: "Enjoy our selection of fine wines and cocktails",
    category: "interior"
  },
  {
    src: "/images/feature/create-grilled-salmon-dish.png",
    alt: "Corporate Event",
    title: "Business Gatherings",
    description: "Professional setting for corporate events",
    category: "events"
  }
];