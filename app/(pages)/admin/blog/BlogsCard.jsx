
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCalendar, FiUser, FiImage, FiEye, FiTag, FiMessageSquare, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Image from 'next/image';
import { formatDate } from '@/utils/dateUtils';
export default function BlogsCard({ styles, filteredPosts, handlePreviewPost, startEditingPost, handleDeletePost }) {

    return (
        <div className={styles.blogGrid}>
            {filteredPosts.map(post => (
                <motion.div
                    key={post.id}
                    className={styles.blogCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.blogImageContainer}>
                        <div className={styles.blogImage}>
                            {post.image ? (
                                <Image width={200} height={200} priority src={post.image || "/images/default-favorite.png"} alt={post.title} />
                            ) : (
                                <div className={styles.placeholderImage}>
                                    <FiImage />
                                </div>
                            )}
                        </div>
                        <div className={styles.blogStatus}>
                            <span className={`${styles.statusBadge} ${styles[post.status.toLowerCase()]}`}>
                                {post.status}
                            </span>
                        </div>
                    </div>

                    <div className={styles.blogContent}>
                        <h3 className={styles.blogTitle}>{post.title}</h3>

                        <p className={styles.blogExcerpt}>{post.excerpt}</p>

                        <div className={styles.blogCategory}>
                            <FiTag /> {post.category}
                        </div>

                        <div className={styles.blogTags}>
                            {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                                <span key={index} className={styles.tagBadge}>{tag}</span>
                            ))}
                        </div>
                        <div className={styles.postFooter}>
                            <div className={styles.postMeta}>
                                <span><FiCalendar /> {formatDate(post.created_at)}</span>
                                <span><FiUser /> {post.author_name}</span>
                                <span><FiMessageSquare /> {post.comments.length} comments</span>
                            </div>
                            <div className={styles.postReactions}>
                                <strong
                                    className={styles.reactionButton}
                                    aria-label="Like this post"
                                >
                                    <FiThumbsUp />
                                    <span>{post.likes.length}</span>
                                </strong>
                                <strong
                                    className={styles.reactionButton}
                                    aria-label="Dislike this post"
                                >
                                    <FiThumbsDown />
                                    <span>{post.dislikes.length}</span>
                                </strong>
                            </div>
                        </div>

                    </div>

                    <div className={styles.blogActions}>
                        <button
                            className={styles.viewBtn}
                            onClick={() => handlePreviewPost(post)}
                            title="Preview Post"
                        >
                            <FiEye />
                        </button>
                        <button
                            className={styles.editBtn}
                            onClick={() => startEditingPost(post)}
                            title="Edit Post"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete Post"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )

}