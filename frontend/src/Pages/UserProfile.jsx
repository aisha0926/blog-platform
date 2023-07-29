import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import AvatarImage from "../components/Avatar/AvatarImage";

function UserProfile() {
  const profileId = "userId23";
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileData, setProfileData] = useState({});

  // Fetch profile data from the backend based on the profileId
  useEffect(() => {
    // Make an API call to your backend to fetch the user profile data using profileId
    // Set the fetched data in the state variable (profileData)
    // Example:
    // fetch(`/api/users/${profileId}`)
    //   .then((response) => response.json())
    //   .then((data) => setProfileData(data))
    //   .catch((error) => console.log("Error fetching profile data: ", error));

    // example, dummy data
    setProfileData({
      userId: "userId123",
      username: "JohnDoe",
      lastName: "Doe",
      firstName: "John",
      bio: "Web Developer  .",
      createdDate: "2023-07-28",
      avatar: "https://one1onehomeschooling.co.uk/images/female-avatar.jpg",
    });
  }, [profileId]);

  useEffect(() => {
    // Get the current logged-in user ID from your authentication state (e.g., JWT, local storage, etc.)
    // Set the isCurrentUser state variable accordingly

    // For the purpose of this example, let's assume the logged-in user's ID is "userId123"
    const loggedInUserId = "userId13";
    setIsCurrentUser(loggedInUserId === profileData.userId);
  }, [profileData]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 1,
          border: "1px solid #ccc", // Border for the form field
          padding: 5, // Padding inside the form field
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)", // Shadow for the form field
          display: "flex",
          marginTop: "70px",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {isCurrentUser && (
          <Button
            color="inherit"
            size="small"
            variant="contained"
            placement="right-start"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              // marginTop: "-10px", // Adjust this value to fine-tune the button's position
            }}
          >
            Edit Profile
          </Button>
        )}

        <Stack direction="column" spacing={1}>
          <AvatarImage
            height={150}
            userData={profileData}
            sx={{ border: "2px solid #ccc" }}
          />
          <Typography variant="h4">{profileData.username}</Typography>
          <Typography variant="subtitle1">
            Member since {profileData.createdDate}
          </Typography>
          <Typography variant="body2">{profileData.bio}</Typography>
        </Stack>
      </Box>
    </Container>
  );
}

export default UserProfile;
