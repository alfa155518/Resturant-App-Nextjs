// "use server"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// menu Dishes
export async function getMenu(pageNumber = 1) {
  try {
    // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error('API URL is not defined');
    const res = await fetch(`${apiUrl}/v1/menu?page=${pageNumber}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to fetch menu: ${res.status} - ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}