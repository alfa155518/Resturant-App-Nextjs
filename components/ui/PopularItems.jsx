"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../../src/css/admin-popularItems.module.css';
import Skeleton from 'react-loading-skeleton';

export default function PopularItems({ items }) {

  if (!items || items.length === 0) {
    return (
      <Skeleton count={4} height={100} />
    )
  }

  return (
    <div className={styles.popularItems}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={styles.popularItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={styles.itemImage}>
            <Image
              src={item.image || "/images/default-order.png"}
              alt={item.name}
              width={60}
              height={60}
              className={styles.roundedImage}
              priority
            />
          </div>
          <div className={styles.itemDetails}>
            <h4 className={styles.itemName}>{item.name}</h4>
            <div className={styles.itemStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Rating:</span>
                <span className={styles.statValue}>{item.rating}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Price:</span>
                <span className={styles.statValue}>${item.price}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
