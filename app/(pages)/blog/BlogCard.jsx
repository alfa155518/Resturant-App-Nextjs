import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaHeart, FaRegHeart, FaThumbsDown, FaRegThumbsDown, FaComment } from 'react-icons/fa';
import { formatDate } from '@/utils/dateUtils';
export default function BlogCard({ styles, filteredPosts, visiblePosts, loadMore, handleLikeBlog, handleDislikeBlog, userId }) {
    return (
        <>
            <div className={styles.blogGrid}>
                {filteredPosts.slice(0, visiblePosts).map((post) => (
                    <motion.article
                        key={post.id}
                        className={styles.blogCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.cardImage}>
                            <Image
                                src={post.image || "/images/default-favorite.png"}
                                alt={post.title}
                                width={400}
                                height={250}
                                priority
                                className={styles.image}
                            />
                            <span className={styles.categoryBadge}>{post.category}</span>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.postMeta}>
                                <span className={styles.metaItem}>
                                    <FaUser className={styles.metaIcon} />
                                    {post.author_name}
                                </span>
                                <span className={styles.metaDivider}>•</span>
                                <span className={styles.metaItem}>
                                    <FaCalendarAlt className={styles.metaIcon} />
                                    {formatDate(post.created_at)}
                                </span>
                            </div>
                            <h2 className={styles.postTitle}>
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className={styles.postExcerpt}>{post.excerpt}</p>
                            <div className={styles.tags}>
                                {post.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        <FaTag className={styles.tagIcon} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.interactions}>
                                <button
                                    className={`${styles.interactionButton} ${post.likes.includes(userId) ? styles.liked : ''
                                        }`}
                                    onClick={() => handleLikeBlog(post.id)}
                                >
                                    {post.likes.includes(userId) ? (
                                        <FaHeart className={styles.icon} />
                                    ) : (
                                        <FaRegHeart className={styles.icon} />
                                    )}
                                    <span>{post.likes.length}</span>
                                </button>
                                <button
                                    className={`${styles.interactionButton} ${post.dislikes.includes(userId) ? styles.disliked : ''
                                        }`}
                                    onClick={() => handleDislikeBlog(post.id)}
                                >
                                    {post.dislikes.includes(userId) ? (
                                        <FaThumbsDown className={styles.icon} />
                                    ) : (
                                        <FaRegThumbsDown className={styles.icon} />
                                    )}
                                    <span>{post.dislikes.length}</span>
                                </button>
                                <span className={styles.commentCount}>
                                    <FaComment className={styles.icon} />
                                    {post.comments.length}
                                </span>
                            </div>
                            <Link href={`/blog/${post.id}`} className={styles.readMore}>
                                Read More →
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>

            {visiblePosts < filteredPosts.length && (
                <div className={styles.loadMoreContainer}>
                    <button className={styles.loadMore} onClick={loadMore}>
                        Load More
                    </button>
                </div>
            )}
        </>
    )
}