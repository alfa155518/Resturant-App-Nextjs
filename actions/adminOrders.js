'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    return userToken;
}

// Get Orders
export async function getOrders() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/orders`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

// Update Order
export async function updateOrder(orderId, orderData) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

// Delete Single Order
export async function deleteOrder(orderId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}
