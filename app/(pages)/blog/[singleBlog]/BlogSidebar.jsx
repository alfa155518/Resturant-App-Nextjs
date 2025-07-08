import Link from 'next/link';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
export default function BlogSidebar({ styles, relatedPosts }) {
    return (
        <aside className={styles.sidebar}>
            <h3>Related Posts</h3>
            <div className={styles.relatedPosts}>
                {relatedPosts.length === 0 ? (
                    <p className={styles.noPosts}>No related posts found.</p>
                ) : (
                    relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className={styles.relatedPost}>
                            <div className={styles.relatedImageContainer}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={300}
                                    height={200}
                                    className={styles.relatedImage}
                                />
                            </div>
                            <div className={styles.relatedContent}>
                                <h4>{post.title}</h4>
                                <p>{post.excerpt}</p>
                                <span className={styles.relatedDate}>
                                    <FaCalendarAlt /> {formatDate(post.created_at)}
                                </span>
                            </div>
                        </Link>
                    )))}
            </div>
        </aside>
    )
}