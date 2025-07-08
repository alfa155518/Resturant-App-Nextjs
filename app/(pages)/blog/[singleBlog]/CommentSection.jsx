import { formatDate } from '@/utils/dateUtils';
export default function CommentSection({ styles, blogPost, handleCommentSubmit, formData, handleChange, isSubmitting }) {

    return (
        <section className={styles.commentsSection}>
            <h3>Comments ({blogPost.comments.length})</h3>

            {/* Comment form */}
            <form onSubmit={(e) => handleCommentSubmit(e, blogPost.id, formData)} className={styles.commentForm}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        autoComplete='name'
                    />
                </div>
                <div className={styles.formGroup}>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Write your comment..."
                        rows="4"
                        required
                        autoComplete='comment'
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {/* Comments list */}
            <div className={styles.commentsList}>
                {blogPost.comments.length > 0 ? (
                    blogPost.comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.name}</strong>
                                <span>{formatDate(comment.created_at)}</span>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </section>
    )

}