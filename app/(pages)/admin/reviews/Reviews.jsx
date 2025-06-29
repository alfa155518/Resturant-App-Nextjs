"use client";

import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiStar } from 'react-icons/fi';
import styles from '../../../../src/css/admin-reviews.module.css';
import CustomSkeletonLoading from '@/components/CustomSkeletonLoading';
import ReplayModal from '@/app/(pages)/admin/reviews/ReplayModal';
import ReviewsContent from '@/app/(pages)/admin/reviews/ReviewsContent';
import ReviewsStatus from '@/app/(pages)/admin/reviews/ReviewsStatus';
import useAdminManageReviews from '@/hooks/useAdminManageReviews';
import Skeleton from 'react-loading-skeleton';


export default function Reviews() {
  // Reviews custom hook
  const [
    reviews,
    filteredReviews,
    averageRating,
    ratingCounts,
    openReplyModal,
    deleteReview,
    toggleReviewStatus,
    selectedReview,
    replyText,
    searchTerm,
    ratingFilter,
    statusFilter,
    setSearchTerm,
    setRatingFilter,
    setStatusFilter,
    setSelectedReview,
    setReplyText,
    saveReply,
  ] = useAdminManageReviews();

  // Generate star rating display
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FiStar
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
        aria-hidden="true"
        focusable="false"
      />
    ));
  };

  // Show skeleton loading if reviews are not loaded
  if (!reviews || reviews.length === 0) {
    return (
      <>
        <Skeleton count={1} height={150} />
        <p className='pt-5'></p>
        <CustomSkeletonLoading count={10} height={250} />
      </>
    )
  }

  return (
    <div className={styles.adminDashboard} role="main" aria-label="Customer Reviews Management">
      <div className={styles.dashboardContent}>
        <motion.div
          className={styles.reviewsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.reviewsHeader}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Customer Reviews
            </motion.h2>
            <div className={styles.reviewHeaderActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name='search'
                  autoComplete='search'
                />
              </div>

              <div className={styles.filterContainer}>
                <FiStar className={styles.filterIcon + " " + styles.starFilter} />
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  name='ratingFilter'
                  autoComplete='ratingFilter'
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  name='statusFilter'
                  autoComplete='statusFilter'
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews Stats */}
          <div className={styles.reviewsStats}>
            <ReviewsStatus
              styles={styles}
              averageRating={averageRating}
              reviews={reviews}
              ratingCounts={ratingCounts}
              renderStars={renderStars}
            />
          </div>

          {/* Reviews Content */}
          <div className={styles.reviewsGrid}>
            <ReviewsContent
              styles={styles}
              filteredReviews={filteredReviews}
              renderStars={renderStars}
              openReplyModal={openReplyModal}
              deleteReview={deleteReview}
              toggleReviewStatus={toggleReviewStatus}
            />
          </div>

          {/* Reply Modal */}
          {selectedReview && (
            <ReplayModal
              styles={styles}
              selectedReview={selectedReview}
              setSelectedReview={setSelectedReview}
              renderStars={renderStars}
              replyText={replyText}
              setReplyText={setReplyText}
              saveReply={saveReply}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
