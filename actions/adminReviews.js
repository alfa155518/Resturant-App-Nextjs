'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    return userToken;
}



// Get Reviews
export async function getReviews() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reviews`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: 'no-store',
        },
    });
    const reviews = await response.json();
    // console.log(reviews);
    return reviews;
}


// Update Review
export async function updateReview(reviewId, reviewData) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });
    const updatedReview = await response.json()
    return updatedReview;
}

// Delete Review
export async function deleteReview(reviewId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
    });
    const deletedReview = await response.json()
    return deletedReview;
}
