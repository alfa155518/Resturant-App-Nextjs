import { motion } from 'framer-motion';
import { FiTrash2, FiX, FiCheck, FiMessageSquare, FiUser, FiCalendar } from 'react-icons/fi'
import { formatRelativeTime } from "@/utils/dateUtils";

export default function ReviewsContent({ styles, filteredReviews, renderStars, openReplyModal, deleteReview, toggleReviewStatus }) {
    return (

        filteredReviews.map(review => (
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
                            <h4>{review.client_name}</h4>
                            <p className={styles.reviewerEmail}>{review.client_email}</p>
                        </div>
                    </div>
                    <div className={styles.reviewMeta}>
                        <div className={styles.reviewRating}>
                            {renderStars(review.rating)}
                        </div>
                        <div className={styles.reviewDate}>
                            <FiCalendar /> {review.created_at ? formatRelativeTime(review.created_at) : ''}
                        </div>
                    </div>
                </div>

                <div className={styles.reviewContent}>
                    <p>{review.review}</p>
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
        ))

    );
}