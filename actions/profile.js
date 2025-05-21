"use server";

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// User Checkout Products
export async function userCheckoutProducts() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/checkouts/products`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });

  const products = await response.json();
  return products;
}


// Reserve Table
export async function reserveTable(clientData, id) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;

  const serverFormData = new FormData();

  serverFormData.append("arrival_day", clientData["day"]);
  serverFormData.append("reservation_time", clientData["time"]);
  // Ensure guest_count is sent as an integer
  serverFormData.append("guest_count", parseInt(clientData["guests"], 10));
  serverFormData.append("reservation_date", clientData["date"]);

  const response = await fetch(`${apiUrl}/reservations/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: serverFormData,
    next: {
      cache: "no-store",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}


// Reservations
export async function reservations() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/reservations`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });
  const reservations = await response.json();
  return reservations.data;
}

// Cancel Reservation
export async function cancelReservation(id) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/reservations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });
  const reservations = await response.json();
  return reservations;
}

// Check Reservation Session
export async function checkReservationSession(clientData) {

  const serverFormData = new FormData();

  serverFormData.append("id", clientData.id);
  serverFormData.append("name", clientData.name);
  serverFormData.append("description", clientData.description);
  serverFormData.append("price", clientData.price);
  serverFormData.append("image_url", clientData.image_url);
  serverFormData.append("reservation_id", clientData.reservationId);
  serverFormData.append("reservation_time", clientData.reservationTime);
  serverFormData.append("guest_count", clientData.guest_count);

  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;

  const response = await fetch(`${apiUrl}/checkouts/reservation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: serverFormData,
    next: {
      cache: "no-store",
    },
  });
  const reservationSession = await response.json();
  return reservationSession;
}

// Verify Payment Session
export async function verifyPaymentSession(sessionId, reservationId) {

  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(
    `${apiUrl}/checkouts/reservation/verify?session_id=${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        "reservation_id": reservationId || ''
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// Get Favorite Products
export async function getFavoriteProducts() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/favoriteProducts`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });
  const favoriteProducts = await response.json();
  return favoriteProducts.data;
}

// Add Favorite Product
export async function addFavoriteProduct(productId) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  console.log(productId);
  const response = await fetch(`${apiUrl}/favoriteProducts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
    }),
    next: {
      cache: "no-store",
    },
  });
  const favoriteProducts = await response.json();
  console.log(favoriteProducts);
  return favoriteProducts;
}

// Remove Favorite Product
export async function removeFavoriteProduct(productId) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/favoriteProducts/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });
  console.log(response);
  const favoriteProducts = await response.json();
  return favoriteProducts;
}


