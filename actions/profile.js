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
