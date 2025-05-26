"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiStar, FiEdit2, FiTrash2, FiX, FiCheck, FiMessageSquare, FiUser, FiCalendar } from 'react-icons/fi';
import styles from '../../../src/css/admin-reviews.module.css';

export default function Reviews() {
  // Sample reviews data
  const [reviews, setReviews] = useState([
    { id: 1, customer: 'John Smith', email: 'john.smith@example.com', rating: 5, comment: 'Absolutely amazing experience! The food was exceptional and the service was impeccable.', date: '2025-05-01', status: 'Published', reply: '' },
    { id: 2, customer: 'Emily Johnson', email: 'emily.j@example.com', rating: 4, comment: 'Great food and atmosphere. Will definitely come back again.', date: '2025-04-28', status: 'Published', reply: 'Thank you for your kind words, Emily! We look forward to serving you again soon.' },
    { id: 3, customer: 'Michael Brown', email: 'michael.brown@example.com', rating: 5, comment: 'The chef\'s special was out of this world. Highly recommend!', date: '2025-04-25', status: 'Published', reply: '' },
    { id: 4, customer: 'Sarah Davis', email: 'sarah.d@example.com', rating: 3, comment: 'Food was good but service was a bit slow. Would give another chance.', date: '2025-04-20', status: 'Published', reply: 'We appreciate your feedback, Sarah. We\'re working on improving our service speed and hope to provide a better experience next time.' },
    { id: 5, customer: 'David Wilson', email: 'david.w@example.com', rating: 5, comment: 'Best Italian food in town! The pasta dishes are authentic and delicious.', date: '2025-04-18', status: 'Published', reply: '' },
    { id: 6, customer: 'Jennifer Lee', email: 'jennifer.l@example.com', rating: 2, comment: 'Disappointed with my meal. The steak was overcooked and the sides were cold.', date: '2025-04-15', status: 'Hidden', reply: 'We\'re very sorry to hear about your experience, Jennifer. We\'d like to make it right. Please contact our manager at manager@restaurant.com.' },
    { id: 7, customer: 'Robert Taylor', email: 'robert.t@example.com', rating: 5, comment: 'The wine selection is impressive and the sommelier was very knowledgeable.', date: '2025-04-10', status: 'Published', reply: '' },
    { id: 8, customer: 'Lisa Anderson', email: 'lisa.a@example.com', rating: 4, comment: 'Lovely ambiance and great cocktails. Food was delicious too.', date: '2025-04-05', status: 'Published', reply: '' },
    { id: 9, customer: 'James Martin', email: 'james.m@example.com', rating: 1, comment: 'Terrible experience. Will not be returning.', date: '2025-04-01', status: 'Hidden', reply: '' },
    { id: 10, customer: 'Patricia White', email: 'patricia.w@example.com', rating: 5, comment: 'The desserts are to die for! Especially the chocolate souffle.', date: '2025-03-28', status: 'Published', reply: 'Thank you, Patricia! Our pastry chef will be delighted to hear that.' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Filter reviews based on search term, rating and status filters
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === 'All' || review.rating === parseInt(ratingFilter);
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;

    return matchesSearch && matchesRating && matchesStatus;
  });

  // Delete review
  const deleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
      if (selectedReview && selectedReview.id === reviewId) {
        setSelectedReview(null);
      }
    }
  };

  // Toggle review status (Published/Hidden)
  const toggleReviewStatus = (reviewId) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ?
        { ...review, status: review.status === 'Published' ? 'Hidden' : 'Published' } :
        review
    ));
  };

  // Open reply modal
  const openReplyModal = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply);
  };

  // Save reply
  const saveReply = () => {
    setReviews(reviews.map(review =>
      review.id === selectedReview.id ?
        { ...review, reply: replyText } :
        review
    ));
    setSelectedReview(null);
    setReplyText('');
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 ?
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) :
    0;

  // Count reviews by rating
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {});

  // Generate star rating display
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FiStar
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      />
    ));
  };

  return (
    <div className={styles.adminDashboard}>


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

          <div className={styles.reviewsStats}>
            <div className={styles.averageRating}>
              <div className={styles.ratingNumber}>{averageRating}</div>
              <div className={styles.ratingStars}>
                {renderStars(Math.round(averageRating))}
                <p>{reviews.length} reviews</p>
              </div>
            </div>

            <div className={styles.ratingDistribution}>
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className={styles.ratingBar}>
                  <div className={styles.ratingLabel}>{rating} star</div>
                  <div className={styles.ratingBarContainer}>
                    <div
                      className={styles.ratingBarFill}
                      style={{
                        width: `${reviews.length > 0 ? (ratingCounts[rating] || 0) / reviews.length * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <div className={styles.ratingCount}>{ratingCounts[rating] || 0}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {filteredReviews.map(review => (
              <motion.div
                key={review.id}
                className={styles.reviewCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>
                      <FiUser />
                    </div>
                    <div>
                      <h4>{review.customer}</h4>
                      <p className={styles.reviewerEmail}>{review.email}</p>
                    </div>
                  </div>
                  <div className={styles.reviewMeta}>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                    <div className={styles.reviewDate}>
                      <FiCalendar /> {review.date}
                    </div>
                  </div>
                </div>

                <div className={styles.reviewContent}>
                  <p>{review.comment}</p>
                </div>

                {review.reply && (
                  <div className={styles.reviewReply}>
                    <h5>Our Reply:</h5>
                    <p>{review.reply}</p>
                  </div>
                )}

                <div className={styles.reviewActions}>
                  <div className={styles.reviewStatus}>
                    <span className={`${styles.statusBadge} ${styles[review.status.toLowerCase()]}`}>
                      {review.status}
                    </span>
                  </div>

                  <div className={styles.actionBtns}>
                    <button
                      className={styles.replyBtn}
                      onClick={() => openReplyModal(review)}
                      title={review.reply ? "Edit Reply" : "Reply"}
                    >
                      <FiMessageSquare />
                      {review.reply ? "Edit Reply" : "Reply"}
                    </button>
                    <button
                      className={`${styles.toggleBtn} ${review.status === 'Hidden' ? styles.publishBtn : styles.hideBtn}`}
                      onClick={() => toggleReviewStatus(review.id)}
                      title={review.status === 'Hidden' ? "Publish" : "Hide"}
                    >
                      {review.status === 'Hidden' ? <FiCheck /> : <FiX />}
                      {review.status === 'Hidden' ? "Publish" : "Hide"}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteReview(review.id)}
                      title="Delete Review"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reply Modal */}
          {selectedReview && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.replyModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <h3>Reply to Review</h3>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setSelectedReview(null)}
                  >
                    <FiX />
                  </button>
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.reviewPreview}>
                    <div className={styles.previewHeader}>
                      <div>
                        <h4>{selectedReview.customer}</h4>
                        <div className={styles.previewRating}>
                          {renderStars(selectedReview.rating)}
                          <span className={styles.previewDate}>{selectedReview.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.previewComment}>{selectedReview.comment}</p>
                  </div>

                  <div className={styles.replyForm}>
                    <label htmlFor="replyText">Your Reply</label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply here..."
                      rows="5"
                      name='replyText'
                      autoComplete='replyText'
                      id='replyText'
                    ></textarea>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setSelectedReview(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={saveReply}
                  >
                    <FiCheck /> Save Reply
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
