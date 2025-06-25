
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { AdminManageReviewsContext } from "@/store/AdminManageReviews";
import { useContext, useState, useMemo } from "react";

export default function useAdminManageReviews() {

    // Admin Manage Reviews Context
    const { reviews, handelUpdateReview, handelDeleteReview } = useContext(AdminManageReviewsContext);

    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Memoized filtered reviews
    const filteredReviews = useMemo(() => {
        if (!reviews) return [];
        return reviews.filter(review => {
            const matchesSearch =
                review.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.review?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.client_email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRating = ratingFilter === 'All' || review.rating === parseInt(ratingFilter);
            const matchesStatus = statusFilter === 'All' || review.status === statusFilter;

            return matchesSearch && matchesRating && matchesStatus;
        });
    }, [reviews, searchTerm, ratingFilter, statusFilter]);

    // Delete review
    const deleteReview = (reviewId) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this review?`,
            onConfirm: () => {
                handelDeleteReview(reviewId);
            },
            confirmText: 'Delete',
            confirmButtonStyle: {
                background: '#ff4444',
            },
            cancelButtonStyle: {
                background: '#6c757d',
            }
        });
        confirmDelete.show();
        if (selectedReview && selectedReview.id === reviewId) {
            setSelectedReview(null);
        }
    };

    // Toggle review status (Published/Hidden)
    const toggleReviewStatus = (reviewId) => {
        let reviewData = {
            status: reviews.find(review => review.id === reviewId).status === 'Published' ? 'Hidden' : 'Published',
            reply: reviews.find(review => review.id === reviewId).reply,
        }
        handelUpdateReview(reviewId, reviewData);
    };

    // Open reply modal
    const openReplyModal = (review) => {
        setSelectedReview(review);
        setReplyText(review.reply || '');
    };

    // Save reply
    const saveReply = () => {
        let reviewData = {
            status: reviews.find(review => review.id === selectedReview.id).status,
            reply: replyText,
        }
        handelUpdateReview(selectedReview.id, reviewData);
        setSelectedReview(null);
        setReplyText('');
    };

    // Memoized average rating
    const averageRating = useMemo(() => {
        if (!reviews?.length) return 0;
        return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    }, [reviews]);

    // Memoized rating counts
    const ratingCounts = useMemo(() => {
        if (!reviews) return {};
        return reviews.reduce((counts, review) => {
            counts[review.rating] = (counts[review.rating] || 0) + 1;
            return counts;
        }, {});
    }, [reviews]);

    return [
        reviews,
        filteredReviews,
        averageRating,
        ratingCounts,
        openReplyModal,
        deleteReview,
        toggleReviewStatus,
        selectedReview,
        replyText,
        searchTerm,
        ratingFilter,
        statusFilter,
        setSearchTerm,
        setRatingFilter,
        setStatusFilter,
        setSelectedReview,
        setReplyText,
        saveReply,
    ]

}

