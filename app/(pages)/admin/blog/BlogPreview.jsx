import { motion } from 'framer-motion';
import { FiX, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { formatDate } from '@/utils/dateUtils';

export default function BlogPreview({ styles, previewPost, setShowPreviewModal }) {


    return (
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowPreviewModal(false)}
        >
            <motion.div
                className={styles.previewModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.previewHeader}>
                    <h3>Preview Blog Post</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <FiX />
                    </button>
                </div>

                <div className={styles.previewContent}>
                    {previewPost.image && (
                        <div className={styles.previewImage}>
                            <img src={previewPost.image || "/images/default-favorite.png"} alt={previewPost.title} />
                        </div>
                    )}

                    <div className={styles.previewBody}>
                        <h1 className={styles.previewTitle}>{previewPost.title}</h1>

                        <div className={styles.previewMeta}>
                            <span className={styles.previewAuthor}>
                                <FiUser /> {previewPost.author_name}
                            </span>
                            <span className={styles.previewDate}>
                                <FiCalendar /> {formatDate(previewPost.created_at)}
                            </span>
                            <span className={styles.previewCategory}>
                                <FiTag /> {previewPost.category}
                            </span>
                        </div>

                        <div
                            className={styles.previewText}
                            dangerouslySetInnerHTML={{ __html: previewPost.content }}
                        />

                        {Array.isArray(previewPost.tags) && previewPost.tags.length > 0 && (
                            <div className={styles.previewTags}>
                                {previewPost.tags.map((tag, index) => (
                                    <span key={index} className={styles.tagBadge}>{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )

}
