"use server"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// menu Dishes
export async function getMenu(dishesNumber = 1) {
  const res = await fetch(`${apiUrl}/menu?page=${dishesNumber}`, {
    // cache: 'force-cache'
  });
  if (!res.ok) {
    console.log(res)
  }
  let data = await res.json();
  return data;
}

