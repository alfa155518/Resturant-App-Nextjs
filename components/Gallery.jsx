import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/gallery.module.css';
import SectionName from './ui/SectionName';
import galleryData from '@/json/gallery.json';
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filterImages = (category) => {
    setActiveCategory(category);
  };

  const filteredImages = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(img => img.category === activeCategory);

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