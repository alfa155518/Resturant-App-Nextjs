"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import styles from '../../src/css/admin-customer-reviews.module.css';
import { formatRelativeTime } from '@/utils/dateUtils';
import Skeleton from 'react-loading-skeleton';

export default function CustomerReviews({ reviews }) {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 2;
  const displayedOrders = showAll ? reviews : reviews?.slice(0, initialDisplayCount);
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

  const toggleView = () => {
    setShowAll(!showAll);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Skeleton count={4} height={100} />
    )
  }

  return (
    <div className={styles.customerReviews}>
      {displayedOrders?.map((review, index) => (
        <motion.div
          key={review.id}
          className={styles.reviewCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={styles.reviewHeader}>
            <h4 className={styles.customerName}>{review.client_name}</h4>
            <div className={styles.reviewDate}>{formatRelativeTime(review.created_at)}</div>
          </div>
          <div className={styles.rating}>
            {renderStars(review.rating)}
          </div>
          <p className={styles.reviewComment}>{review.review}</p>
        </motion.div>
      ))}
      {reviews?.length > initialDisplayCount && (
        <div className={styles.viewAllReviews}>
          <button onClick={toggleView}>View All Reviews</button>
        </div>
      )}
    </div>
  );
}
