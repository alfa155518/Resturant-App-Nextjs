import { motion } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import { formatRelativeTime } from '@/utils/dateUtils';

export default function ReplayModal({ styles, selectedReview, setSelectedReview, renderStars, replyText, setReplyText, saveReply }) {
    return (
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
                                <h4>{selectedReview.client_name}</h4>
                                <div className={styles.previewRating}>
                                    {renderStars(selectedReview.rating)}
                                    <span className={styles.previewDate}>{formatRelativeTime(selectedReview.created_at)}</span>
                                </div>
                            </div>
                        </div>
                        <p className={styles.previewComment}>{selectedReview.review.review}</p>
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
    );
}