import Avatar from "@mui/material/Avatar";
import { useState } from "react";

function AvatarImage({ height, userData }) {
  const [imageError, setImageError] = useState(false);
  // Added curly braces around props to correctly destructure them
  const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
  const avatarWithForwardSlashes = userData.avatar.replace(/\\/g, "/");
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Avatar
      sx={{
        bgcolor: "#FF5733", // Customize the background color here
        width: height,
        height: height,
        fontSize: 15,
        marginLeft: "10px",
      }}
    >
      {imageError ? (
        initials
      ) : (
        <img
          src={avatarWithForwardSlashes}
          alt="Avatar"
          onError={handleImageError}
        />
      )}
    </Avatar>
  );
}

export default AvatarImage;
