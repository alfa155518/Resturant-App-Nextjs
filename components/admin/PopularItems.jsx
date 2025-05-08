"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './PopularItems.module.scss';

export default function PopularItems({ items }) {
  return (
    <div className={styles.popularItems}>
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          className={styles.popularItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={styles.itemImage}>
            <Image 
              src={item.image} 
              alt={item.name}
              width={60}
              height={60}
              className={styles.roundedImage}
            />
          </div>
          <div className={styles.itemDetails}>
            <h4 className={styles.itemName}>{item.name}</h4>
            <div className={styles.itemStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Orders:</span>
                <span className={styles.statValue}>{item.orders}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Revenue:</span>
                <span className={styles.statValue}>${item.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
