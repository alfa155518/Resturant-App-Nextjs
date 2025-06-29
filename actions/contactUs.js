'use server'
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Contact Us
export async function contactUs(formData) {
    const userToken = await getCookieStore();
    const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        next: {
            cache: "no-store",
        },
    });
    const data = await response.json();
    return data;
}
