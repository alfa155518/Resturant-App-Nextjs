"use server";

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Add Product To Cart
export async function addProductInCart(formData) {
  let serverFormData = new FormData();
  serverFormData.append("user_id", formData["userId"]);
  serverFormData.append("menu_id", formData["menuId"]);
  serverFormData.append("quantity", formData["quantity"]);
  serverFormData.append("price", formData["price"]);
  serverFormData.append("attributes", formData["attributes"]);

  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;

  const response = await fetch(`${apiUrl}/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: serverFormData,
  });
  const data = await response.json();
  if (!response.ok) {
    return data;
  }

  if (response.ok) {
    return data;
  }
  revalidatePath("/cart", "page");
}

// Retrieve To product in Cart
export async function getCartItems() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  try {
    const res = await fetch(`${apiUrl}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
      },
      next: {
        cache: "no-store",
        tags: ["cart"],
      },
    });
    if (!res.ok)
      throw new Error(
        `Failed to fetch menu: ${res.status} - ${res.statusText}`
      );
    let data = await res.json();
    return data.cartItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
}

// Update Product quantity
export async function updateQuantity(productId, quantity) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/cart/${productId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
    body: JSON.stringify({
      quantity,
    }),
  });
  const data = await response.json();
  return data;
}

// Remove Product From Cart
export async function removeItem(productId) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    next: {
      cache: "no-store",
    },
  });
  const data = await response.json();
  return data;
}

// Proceed To Checkout
export async function ProceedToCheckout(cartItems) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(`${apiUrl}/payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItems: cartItems,
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.log(data);
  }
  return data;
}

// verify Payment
export async function verifyPayment(sessionId) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken").value;
  const response = await fetch(
    `${apiUrl}/payment/verify?session_id=${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
