import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/offers.module.css';
import SectionName from './ui/SectionName';
import offers from '@/json/offers.json';
export default function Offers() {
  const [activeTab, setActiveTab] = useState('daily');
  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
      <SectionName title={"Special Offers"} description={"Discover our exclusive deals and seasonal specialties crafted with love and passion"}/>

        <div className={styles.offersTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'daily' ? styles.active : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily Specials
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'seasonal' ? styles.active : ''}`}
            onClick={() => setActiveTab('seasonal')}
          >
            Seasonal Menu
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'combo' ? styles.active : ''}`}
            onClick={() => setActiveTab('combo')}
          >
            Family Combos
          </button>
        </div>

        <div className={styles.offersGrid}>
          {offers[activeTab].map((offer, index) => (
            <motion.div 
              key={index}
              className={styles.offerCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
            >
              <div className={styles.offerImageContainer}>
                <Image 
                  src={offer.image} 
                  alt={offer.title} 
                  width={400} 
                  height={250}
                  priority
                  className={styles.offerImage}
                />
                {offer.discount && (
                  <div className={styles.discountBadge}>
                    {offer.discount}% OFF
                  </div>
                )}
              </div>
              <div className={styles.offerContent}>
                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <p className={styles.offerDescription}>{offer.description}</p>
                <div className={styles.offerPricing}>
                  {offer.oldPrice && (
                    <span className={styles.oldPrice}>${offer.oldPrice}</span>
                  )}
                  <span className={styles.currentPrice}>${offer.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.subscriptionBanner}>
          <div className={styles.bannerContent}>
            <h4>Get Exclusive Offers</h4>
            <p>Subscribe to our newsletter and receive special deals directly to your inbox</p>
            <div className={styles.subscriptionForm}>
              <input type="email" name='email' placeholder="Your email address" autoComplete="email" className={styles.emailInput} />
              <motion.button 
                className={styles.subscribeButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
