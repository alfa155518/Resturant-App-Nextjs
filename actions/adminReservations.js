'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Get Reservations
export async function getReservations() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reservations`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: 'no-store',
        },
    });
    const reservations = await response.json();
    return reservations;
}

// Update Reservation
export async function updateReservation(reservationId, updatedData) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reservations/${reservationId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        next: {
            cache: 'no-store',
        },
    });
    const updatedReservation = await response.json();
    return updatedReservation;
}

// Delete Reservation
export async function deleteReservation(reservationId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: 'no-store',
        },
    });
    const deletedReservation = await response.json();
    return deletedReservation;
}

