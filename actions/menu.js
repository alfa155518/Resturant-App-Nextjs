"use server"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// menu Dishes
export async function getMenu(dishesNumber = 1) {
  try {
    if (!apiUrl) {
      console.error('API URL is not defined');
      return { data: { dishes: [] }, error: 'API URL is not configured' };
    }
    
    const res = await fetch(`${apiUrl}/menu?page=${dishesNumber}`, {
      next: { revalidate: 60 }, // Cache for 1 minute
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error(`Error fetching menu: ${res.status} ${res.statusText}`);
      return { data: { dishes: [] }, error: `Failed to fetch: ${res.status}` };
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Menu fetch error:', error);
    return { data: { dishes: [] }, error: error };
  }
}