import Avatar from "@mui/material/Avatar";
import { useState } from "react";

function AvatarImage({ height, userData }) {
  const [imageError, setImageError] = useState(false);
  // Added curly braces around props to correctly destructure them
  const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
  //replace backward slashes of the path if avatar exist in userData
  const avatarWithForwardSlashes = userData.avatar
    ? userData.avatar.replace(/\\/g, "/")
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
          }}
          src={avatarWithForwardSlashes}
          onError={handleImageError}
        />
      )}
    </>
  );
}

export default AvatarImage;
