"use client";
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';
import styles from '../../../../src/css/profile-add-review.module.css';

import OverlayOfLoading from '@/components/OverlayOfLoading';
import useUserReviews from '@/hooks/userReviews';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
};

const starVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } }
};

const buttonVariants = {
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 }
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 }
    }
};

export default function AddReview() {
    // User Reviews Custom Hook
    const {
        formData,
        handleChange,
        handleRatingChange,
        handleSubmit,
        isSubmitting,
        hover,
        setHover
    } = useUserReviews();


    if (isSubmitting) {
        return <OverlayOfLoading />
    }


    return (
        <motion.div
            className={styles.reviewContainer}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h1>Write a Review</h1>
            <p className={styles.subtitle}>Share your experience with us</p>

            <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="client_name">Your Name *</label>
                    <input
                        type="text"
                        id="client_name"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter your name"
                        autoComplete='name'
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="client_email">Your Email</label>
                    <input
                        type="email"
                        id="client_email"
                        name="client_email"
                        value={formData.client_email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter your email"
                        autoComplete='email'
                        required
                    />
                </div>

                <div className={`${styles.formGroup} ${styles.ratingGroup}`}>
                    <label>Your Rating *</label>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <motion.label
                                    key={index}
                                    variants={starVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => handleRatingChange(ratingValue)}
                                        className={styles.radioInput}
                                        autoComplete='rating'

                                    />
                                    {ratingValue <= (hover || formData.rating) ? (
                                        <FaStar
                                            className={styles.star}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    ) : (
                                        <FaRegStar
                                            className={styles.star}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    )}
                                </motion.label>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="review">Your Review *</label>
                    <motion.textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        placeholder="Share details of your experience..."
                        className={styles.textarea}
                        whileFocus={{ boxShadow: '0 0 0 2px $primary-color' }}
                        rows={5}
                        autoComplete='review'
                        required
                    />
                </div>
                <motion.button
                    type="submit"
                    className={`${styles.submitButton} ${isSubmitting ? styles.disabled : ''}`}
                    disabled={isSubmitting}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {isSubmitting ? (
                        'Submitting...'
                    ) : (
                        <>
                            <FaPaperPlane />
                            <span>Submit Review</span>
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}