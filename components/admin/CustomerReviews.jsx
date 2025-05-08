"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import styles from './CustomerReviews.module.scss';

export default function CustomerReviews({ reviews }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`${styles.star} ${i <= rating ? styles.filled : ''}`}>
          <FiStar />
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.customerReviews}>
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          className={styles.reviewCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={styles.reviewHeader}>
            <h4 className={styles.customerName}>{review.customer}</h4>
            <div className={styles.reviewDate}>{review.date}</div>
          </div>
          <div className={styles.rating}>
            {renderStars(review.rating)}
          </div>
          <p className={styles.reviewComment}>{review.comment}</p>
        </motion.div>
      ))}
      <div className={styles.viewAllReviews}>
        <button>View All Reviews</button>
      </div>
    </div>
  );
}
