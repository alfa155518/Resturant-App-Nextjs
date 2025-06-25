"use client"

import { getReviews, updateReview, deleteReview } from '@/actions/adminReviews';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const AdminManageReviewsContext = createContext();

export function AdminManageReviewsProvider({ children }) {
    const [reviews, setReviews] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

    // Fetch menu data
    useEffect(() => {
        async function handelMenuData() {
            const items = await getReviews();
            if (items.status === "error") {
                toast.error(items.message);
                return;
            }
            setReviews(items.data);
        }
        handelMenuData();
        router.refresh();
    }, [needsRefresh]);

    // Update Review
    const handelUpdateReview = async (reviewId, reviewData) => {
        const updatedData = await updateReview(reviewId, reviewData);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
            setNeedsRefresh(!needsRefresh);
        }
    };

    // Delete Review
    const handelDeleteReview = async (reviewId) => {
        const deletedData = await deleteReview(reviewId);
        if (deletedData.status === "error") {
            toast.error(deletedData.message);
            return;
        }
        if (deletedData.status === "success") {
            toast.success(deletedData.message);
            setNeedsRefresh(!needsRefresh);
        }
    };

    const value = {
        reviews,
        handelUpdateReview,
        handelDeleteReview,
    };

    return (
        <AdminManageReviewsContext.Provider value={value}>
            {children}
        </AdminManageReviewsContext.Provider>
    );
}
