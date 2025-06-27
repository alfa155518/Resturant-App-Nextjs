'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Get All Customers
export async function allCustomer() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/customers`, {
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

// Get Single Customer
export async function singleCustomer(customerId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/customers/${customerId}`, {
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

// Update Customer
export async function updateCustomer(customerId, customerData) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/customers/${customerId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

// Delete Customer
export async function deleteCustomer(customerId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/customers/${customerId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

