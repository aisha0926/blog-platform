export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("images", file);

  try {
    const response = await fetch("https://post-it-xmk0.onrender.com/api/v1/image-upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error("Upload Failed", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
