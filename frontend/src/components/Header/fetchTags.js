export async function fetchTags() {
  const request = await fetch("https://post-it-xmk0.onrender.com/api/v1/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await request.json();
  return response.tags;
}
