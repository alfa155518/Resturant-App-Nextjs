const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function tablesData(pageNumber = 1) {
  const response = await fetch(`${apiUrl}/tables?page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
  }
  return response.json();
}
