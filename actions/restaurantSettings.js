'use server'

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Get Restaurant Settings
export async function getRestaurantSettingsInfo() {
    const response = await fetch(`${apiUrl}/restaurant/info`, {
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            cache: "no-store",
        },
    });
    const restaurantSettings = await response.json();
    return restaurantSettings.data;
}

// Update Restaurant Settings
export async function updateRestaurantSettingsInfo(data) {
    const userToken = await getCookieStore();

    let serverData = new FormData();
    serverData.append("_method", "PATCH");
    serverData.append("name", data.name);
    serverData.append("address", data.address);
    serverData.append("phone", data.phone);
    serverData.append("email", data.email);
    serverData.append("website", data.website);
    serverData.append("logo_public_id", data.logo_public_id);
    serverData.append("message", data.message);
    serverData.append("description", data.description);
    serverData.append("timezone", data.timezone);
    serverData.append("is_active", Boolean(data.is_active));
    // Only append the logo if it's a file (not a URL string)
    if (data.logoFile) {
        serverData.append("logo", data.logoFile);
    } else if (data.logo_public_id) {
        serverData.append("logo_public_id", data.logo_public_id);
    }

    const response = await fetch(`${adminApiUrl}/restaurant/settings/1`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: serverData,
        next: {
            cache: "no-store",
        },
    });
    const restaurantSettings = await response.json();
    return restaurantSettings;
}



// Get Operating Hours
export async function getOperatingHours() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/openingHours`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
        next: {
            cache: "no-store",
        },
    });
    const operatingHours = await response.json();
    return operatingHours.data;
}

// Update Operating Hours
export async function updateOperatingHours(data) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/openingHours`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hours: data }),
        next: {
            cache: "no-store",
        },
    });
    const operatingHours = await response.json();
    return operatingHours;
}


// Get Payment Methods
export async function getPaymentMethods() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/paymentMethods`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
        next: {
            cache: "no-store",
        },
    });
    const paymentMethods = await response.json();
    return paymentMethods.data;
}

// Update Payment Methods
export async function updatePaymentMethods(data) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/paymentMethods`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_methods: data }),
        cache: "no-store",
    });
    const paymentMethods = await response.json();
    return paymentMethods;
}


// Get Notification Settings
export async function getNotificationSettings() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/settings/notifications`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
        next: {
            cache: "no-store",
        },
    });
    const notificationSettings = await response.json();
    return notificationSettings;
}

// Update Notification Settings
export async function updateNotificationSettings(data) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/restaurant/settings/notifications/1`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });
    const notificationSettings = await response.json();
    return notificationSettings;
}
