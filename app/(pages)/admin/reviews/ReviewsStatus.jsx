
export default function ReviewsStatus({ styles, averageRating, reviews, ratingCounts, renderStars }) {
    return (
        <>
            <div className={styles.averageRating}>
                <div className={styles.ratingNumber}>{averageRating}</div>
                <div className={styles.ratingStars}>
                    {renderStars(Math.round(averageRating))}
                    <p>{reviews?.length} reviews</p>
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
                                    width: `${reviews?.length > 0 ? (ratingCounts[rating] || 0) / reviews.length * 100 : 0}%`
                                }}
                            ></div>
                        </div>
                        <div className={styles.ratingCount}>{ratingCounts[rating] || 0}</div>
                    </div>
                ))}
            </div>
        </>
    )
}