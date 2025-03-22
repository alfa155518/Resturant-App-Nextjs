import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../src/css/offers.module.css';
import SectionName from './ui/SectionName';

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
                <motion.button 
                  className={styles.orderButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.subscriptionBanner}>
          <div className={styles.bannerContent}>
            <h3>Get Exclusive Offers</h3>
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

// Offer data
const offers = {
  daily: [
    {
      title: "Chef's Special Pasta",
      description: "Handcrafted pasta with our signature sauce, fresh herbs, and premium ingredients",
      price: "18.99",
      oldPrice: "24.99",
      discount: 25,
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Lunch Combo Deal",
      description: "Any main course with soup or salad and a soft drink. Available weekdays 11am-3pm",
      price: "15.99",
      oldPrice: "21.99",
      discount: 30,
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Happy Hour Appetizers",
      description: "Half-price appetizers and $5 signature cocktails. Daily from 4pm-6pm",
      price: "8.99",
      oldPrice: "16.99",
      discount: 50,
      image: "/images/feature/create-grilled-salmon-dish.png"
    }
  ],
  seasonal: [
    {
      title: "Summer Harvest Salad",
      description: "Fresh seasonal vegetables, berries, and house-made vinaigrette with grilled chicken option",
      price: "14.99",
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Autumn Risotto",
      description: "Creamy risotto with wild mushrooms, truffle oil, and seasonal vegetables",
      price: "19.99",
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Winter Comfort Bowl",
      description: "Hearty stew with tender beef, root vegetables, and fresh herbs served with artisan bread",
      price: "22.99",
      image: "/images/feature/create-grilled-salmon-dish.png"
    }
  ],
  combo: [
    {
      title: "Family Feast",
      description: "Serves 4-6: Choice of two main courses, three sides, and a dessert platter",
      price: "79.99",
      oldPrice: "99.99",
      discount: 20,
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Date Night Package",
      description: "Two entrées, shared appetizer, two glasses of wine, and a dessert to share",
      price: "59.99",
      oldPrice: "75.99",
      discount: 20,
      image: "/images/feature/create-grilled-salmon-dish.png"
    },
    {
      title: "Weekend Brunch Bundle",
      description: "Brunch for 4: Includes pastries, egg dishes, coffee, and mimosas",
      price: "65.99",
      image: "/images/feature/create-grilled-salmon-dish.png"
    }
  ]
};