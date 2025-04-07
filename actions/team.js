const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function allTeamMember(pageNumber = 1) {

  const response = await fetch(`${apiUrl}/team?page=${pageNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.log(response);
  }
  return response.json();
}