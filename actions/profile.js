"use server";

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
