import Avatar from "@mui/material/Avatar";
import { useState } from "react";

function AvatarImage({ height, userData, hasBorder }) {
  const [imageError, setImageError] = useState(false);

  // Set default values for userData if it's null or undefined
  const defaultUserData = {
    firstName: null,
    lastName: null,
    username: "Guest",
    avatar: null,
  };
  const combinedUserData = { ...defaultUserData, ...userData };

  // Check if userData FN and LN is available, otherwise provide default values
  const firstName = combinedUserData.firstName
    ? combinedUserData.firstName
    : combinedUserData.username;
  const lastName = combinedUserData.lastName ? combinedUserData.lastName : null;
  const initials = `${firstName ? firstName[0] : ""}${
    lastName ? lastName[0] : ""
  }`;

  //replace backward slashes of the path if avatar exist in userData
  const avatarWithForwardSlashes = combinedUserData.avatar
    ? combinedUserData.avatar.replace(/\\/g, "/")
    : null;
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!avatarWithForwardSlashes || imageError ? (
        <Avatar
          sx={{
            bgcolor: "#FF5733", // Customize the background color here
            width: height,
            height: height,
            fontSize: height / 2, // Adjust the font size based on the avatar height
            marginLeft: "10px",
          }}
        >
          {initials}
        </Avatar>
      ) : (
        <Avatar
          sx={{
            bgcolor: "#FF5733", // Customize the background color here
            width: height,
            height: height,
            fontSize: 15,
            marginLeft: "10px",
            ...(hasBorder && { border: "5px solid #272829" }), // Apply border if hasBorder is true
          }}
          src={avatarWithForwardSlashes}
          onError={handleImageError}
        />
      )}
    </>
  );
}

export default AvatarImage;