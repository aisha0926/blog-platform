export async function fetchUserMeData(authToken) {
  try {
    const userDataResponse = await fetch(
      "https://post-it-xmk0.onrender.com/api/v1/user/me",
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      }
    );
    const user = await userDataResponse.json();
    return user.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
}
