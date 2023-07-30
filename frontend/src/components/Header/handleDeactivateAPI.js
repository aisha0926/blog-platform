export const handleDeactivateAPI = async (token) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/me/deactivate", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Handle the response
    if (!response.ok) {
      // If the response status is not OK (200), throw an error with the response status and status text
      const errorData = await response.json();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorData.message}`
      );
    }
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling function
  }
};
