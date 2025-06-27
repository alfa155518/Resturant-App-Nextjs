const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function allTeamMember(pageNumber = 1) {

  const response = await fetch(`${apiUrl}/team?page=${pageNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      cache: "no-store",
    },
  });
  const team = await response.json()
  return team;
}