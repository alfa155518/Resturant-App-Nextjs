"use server"

import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//* Signup user *//
export async function signupUser(formData) {
  const serverFormData = new FormData();
  serverFormData.append('name', formData['name']);
  serverFormData.append('email', formData['email']);
  serverFormData.append('password', formData['password']);
  serverFormData.append('phone', formData['phone']);

  // Add avatar file to the FormData object
  if (formData.avatar) {
    serverFormData.append('avatar', formData['avatar']);
  }

  try {
    const response = await fetch(`${apiUrl}/signup/user`, {
      method: "POST",
      body: serverFormData,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return {
        error: data.error,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      error: "Network error occurred. Please try again.",
      data: null
    };
  }
}

//* Login user *//
export async function loginUser(formData) {
  const serverFormData = new FormData();
  serverFormData.append('email', formData['email']);
  serverFormData.append('password', formData['password']);
  try {
    const response = await fetch(`${apiUrl}/login/user`, {
      method: "POST",
      body: serverFormData,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return {
        error: data.error,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      error: "Network error occurred. Please try again.",
      data: null
    };
  }
}

//* Forget Password *//
export async function forgetPasswordAction(email) {
  try {
    const serverFormData = new FormData();
    serverFormData.append('email', email);
    console.log(serverFormData);
    const response = await fetch(`${apiUrl}/auth/forget-password`, {
      method: "POST",
      body: serverFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error,
        errorMessage: data.message,
      }
    }
    if (response.ok) {
      return data;
    }
  } catch (error) {
    return { error: error.message };
  }
}



//* Reset Password *//
export async function resetPasswordAction(formData) {
  try {
    const serverFormData = new FormData();
    serverFormData.append('email', formData['email']);
    serverFormData.append('password', formData['password']);
    const response = await fetch(`${apiUrl}/auth/reset-password`, {
      method: "POST",
      body: serverFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error,
        errorMessage: data.message,
      };
    }
    if (response.ok) {
      const cookieStore = await cookies();
      cookieStore.set('user', JSON.stringify(data.user));
      cookieStore.set('userToken', formData['token']);
      return data;
    }
  } catch (error) {
    return { error: error.message };
  }
}


//* Logout User *//

export async function logoutUser() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken")?.value;
  try {

    let response = await fetch(`${apiUrl}/logout/user`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!userToken) {
      return data;
    }

    if (!response.ok) {
      return data;
    }

    if (response.ok) {
      cookieStore.delete('user');
      cookieStore.delete('userToken');
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
