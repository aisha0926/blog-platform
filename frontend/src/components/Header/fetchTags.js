export async function fetchTags() {
  const request = await fetch("http://localhost:4000/api/v1/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await request.json();
  return response.tags;
}
