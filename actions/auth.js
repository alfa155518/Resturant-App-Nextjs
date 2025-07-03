"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Change Password
export async function changePassword(formData) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;


  const serverFormData = new FormData();
  serverFormData.append('current_password', formData['current_password']);
  serverFormData.append('password', formData['password']);
  serverFormData.append('password_confirmation', formData['password_confirmation']);

  try {
    const response = await fetch(`${apiUrl}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        current_password: formData['current_password'],
        password: formData['password'],
        password_confirmation: formData['password_confirmation'],
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message,
      };
    }
    if (response.ok) {
      return data;
    }
  } catch (error) {
  }

}

// Change Personal Data
export async function changePersonalData(formData) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;

  const serverFormData = new FormData();
  serverFormData.append('name', formData['name']);
  serverFormData.append('email', formData['email']);
  serverFormData.append('address', formData['address']);
  serverFormData.append('phone', formData['phone']);
  serverFormData.append('avatar', formData['avatar']);
  serverFormData.append('_method', 'PATCH');

  try {
    const response = await fetch(`${apiUrl}/auth/change-personalData`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      },
      body: serverFormData,
    });
    const data = await response.json();

    if (!response.ok) {
      return data;
    }
    if (response.ok) {
      revalidatePath('/profile');
      return data;
    }
  } catch (error) {
  }
}

// Enable Two Factor Auth
export async function enableTwoFactorAuth() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;

  const response = await fetch(`${apiUrl}/auth/enable-2fa`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  return data;

}

// Verify Two Factor Auth
export async function verifyTwoFactorAuth(verificationCode) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;

  const response = await fetch(`${apiUrl}/auth/verify-2fa`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      one_time_password: verificationCode,
    }),
  });
  const data = await response.json();
  if (data.status === 'success') {
    const userData = JSON.parse(cookieStore.get("user").value);
    userData.google2fa_secret = data.google2fa_secret;
    cookieStore.set("user", JSON.stringify(userData));
    revalidatePath('/profile');
  }
  return data;
}


// Disable Two Factor Auth
export async function disableTwoFactorAuth() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;

  const response = await fetch(`${apiUrl}/auth/disable-2fa`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.status === 'success') {
    const userData = JSON.parse(cookieStore.get("user").value);
    userData.google2fa_secret = null;
    cookieStore.set("user", JSON.stringify(userData));
    revalidatePath('/profile');
  }
  return data;
}

