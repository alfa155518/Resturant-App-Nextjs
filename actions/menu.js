"use server"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// menu Dishes
export async function getMenu(dishesNumber = 1) {
  try {
    const res = await fetch(`${apiUrl}/menu?page=${dishesNumber}`, {
      next: { 
        revalidate: 60 // Revalidate cache every minute
      }
    });
    
    if (!res.ok) {
      console.error(`Error fetching menu: ${res.status} ${res.statusText}`);
      return { error: true, status: res.status, message: 'Failed to fetch menu data' };
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Menu fetch error:', error);
    return { error: true, message: 'An error occurred while fetching menu data' };
  }
}