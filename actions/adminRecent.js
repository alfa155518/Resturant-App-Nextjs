'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    return userToken;
}

export default async function getRecentItems() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/recent`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: "no-store",
        },
    });
    const data = await response.json();
    return data;
}