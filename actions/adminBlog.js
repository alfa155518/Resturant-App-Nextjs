'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    return userToken;
}

// Get All Blog
export async function getAllBlog() {
    const userToken = await getCookieStore();
    const response = await fetch(`${apiUrl}/blogs`, {
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

// Add New Blog
export async function addNewBlog(newPost) {
    const userToken = await getCookieStore();

    const serverData = new FormData();
    serverData.set("title", newPost.title);
    serverData.set("excerpt", newPost.excerpt);
    serverData.set("content", newPost.content);
    serverData.set("image", newPost.image);
    serverData.set("author_name", newPost.author_name);
    serverData.set("category", newPost.category);
    serverData.set("tags", newPost.tags);
    serverData.set("status", newPost.status);

    const response = await fetch(`${adminApiUrl}/blogs`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: serverData,
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

// Update Blog
export async function updateBlog(postId, updatedPost) {
    const userToken = await getCookieStore();

    const serverData = new FormData();
    serverData.set("title", updatedPost.title);
    serverData.set("excerpt", updatedPost.excerpt);
    serverData.set("content", updatedPost.content);
    serverData.set("image", updatedPost.image);
    serverData.set("author_name", updatedPost.author_name);
    serverData.set("category", updatedPost.category);
    serverData.set("tags", updatedPost.tags);
    serverData.set("status", updatedPost.status);
    serverData.set("_method", "PATCH");

    const response = await fetch(`${adminApiUrl}/blogs/${postId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: serverData,
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}


// Delete Blog
export async function deleteBlog(postId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/blogs/${postId}`, {
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
