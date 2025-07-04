"use server"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getMenu(pageNumber = 1) {
  try {
    const res = await fetch(`${apiUrl}/menu?page=${pageNumber}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      next: {
        cache: "no-store",
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch menu: ${res.status} - ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}