'use server'

import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Get Menu
export async function getMenu(pageNumber = 1) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/menu?page=${pageNumber}`, {
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

// Update Menu
export async function updateMenu(itemId, data) {
    const userToken = await getCookieStore();
    let formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('calories', data.calories);
    formData.append('rating', data.rating);
    formData.append('prepTime', data.prepTime);
    formData.append('dietary', data.dietary);
    formData.append('ingredients', data.ingredients);
    formData.append('stock', data.stock);
    formData.append('available', data.available);
    formData.append('popular', data.popular);
    formData.append('featured', data.featured);
    const response = await fetch(`${adminApiUrl}/menu/${itemId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}


// Add Item
export async function addItem(data) {
    const userToken = await getCookieStore();
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('calories', data.calories);
    formData.append('rating', data.rating);
    formData.append('prepTime', data.prepTime);
    formData.append('dietary', data.dietary);
    formData.append('ingredients', data.ingredients);
    formData.append('stock', data.stock);
    formData.append('available', data.available);
    formData.append('popular', data.popular);
    formData.append('featured', data.featured);
    const response = await fetch(`${adminApiUrl}/menu`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    return result;
}

// Delete Item
export async function deleteItem(itemId) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/menu/${itemId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        next: {
            cache: "no-store",
        },
    });
    const result = await response.json();
    console.log(result)
    return result;
}
