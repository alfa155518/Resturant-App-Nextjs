import Image from 'next/image';
import {
    FaTag,
    FaShare,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaHeart,
    FaRegHeart,
    FaThumbsDown,
    FaRegThumbsDown
} from 'react-icons/fa';
import CommentSection from "./CommentSection";
export default function BlogContent({ styles, blogPost, handleLikeBlog, handleDislikeBlog, userId, setShowShareOptions, showShareOptions, handleCommentSubmit, formData, handleChange, isSubmitting }) {
    return (
        <main className={styles.mainContent}>
            {/* Featured image */}
            <div className={styles.featuredImage}>
                <Image
                    src={blogPost.image || "/images/default-favorite.png"}
                    alt={blogPost.title}
                    width={1200}
                    height={600}
                    priority
                    className={styles.blogImage}
                />
            </div>

            {/* Blog content */}
            <article className={styles.blogContent}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                {blogPost.tags && blogPost.tags.length > 0 && (
                    <div className={styles.tags}>
                        {blogPost.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                <FaTag /> {tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>

            {/* Like/Dislike and Share */}
            <div className={styles.interactionBar}>
                <div className={styles.reactions}>
                    <button
                        onClick={() => handleLikeBlog(blogPost.id)}
                        className={`${styles.reactionButton} ${blogPost.likes.includes(userId) ? styles.active : ''}`}
                        aria-label="Like this post"
                    >
                        {blogPost.likes.includes(userId) ? <FaHeart /> : <FaRegHeart />}
                        <span>{blogPost.likes.length}</span>
                    </button>
                    <button
                        onClick={() => handleDislikeBlog(blogPost.id)}
                        className={`${styles.reactionButton} ${blogPost.dislikes.includes(userId) ? styles.active : ''}`}
                        aria-label="Dislike this post"
                    >
                        {blogPost.dislikes.includes(userId) ? <FaThumbsDown /> : <FaRegThumbsDown />}
                        <span>{blogPost.dislikes.length}</span>
                    </button>
                </div>
                <div className={styles.share}>
                    <button
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className={styles.shareButton}
                    >
                        <FaShare /> Share
                    </button>
                    {showShareOptions && (
                        <div className={styles.shareOptions}>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                                <FaFacebookF />
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blogPost.title)}`} target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blogPost.title)}`} target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn />
                            </a>
                            <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(blogPost.title)}`} target="_blank" rel="noopener noreferrer">
                                <FaPinterestP />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Comments section */}
            <CommentSection styles={styles} blogPost={blogPost} handleCommentSubmit={handleCommentSubmit} formData={formData} handleChange={handleChange} isSubmitting={isSubmitting} />
        </main>
    )
}