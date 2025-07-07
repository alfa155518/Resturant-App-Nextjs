'use server'
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    return userToken;
}

// Get All Blogs
export async function allBlog() {
    const response = await fetch(`${apiUrl}/blogs`, {
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}


// Like Blog
export async function likeBlog(blogId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${apiUrl}/blogs/${blogId}/like`, {
        method: "PATCH",
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


// Dislike Blog
export async function dislikeBlog(blogId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${apiUrl}/blogs/${blogId}/dislike`, {
        method: "PATCH",
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
