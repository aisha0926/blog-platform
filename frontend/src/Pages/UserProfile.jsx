import { useState, useEffect } from "react";
import "./Styles.css";
import { Box, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import AvatarImage from "../components/Avatar/AvatarImage";
import { RiCake2Fill } from "react-icons/ri";

function UserProfile({ profileId, loggedInUsernme }) {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileData, setProfileData] = useState({});

  // Fetch profile data from the backend based on the profileId

  useEffect(() => {
    // Make an API call to your backend to fetch the user profile data using profileId
    // Set the fetched data in the state variable (profileData)
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/user/${profileId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const user = await response.json();
        setProfileData(user.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData().finally(() => {});
    console.log(profileData);
  }, [profileId]);

  useEffect(() => {
    // Get the current logged-in user ID/username from your authentication state (e.g., JWT, local storage, etc.)
    // Set the isCurrentUser state variable accordingly

    setIsCurrentUser(loggedInUsernme === profileData.username);
  }, [profileData]);

  //Format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date"; // Handle error
    }
  };

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AvatarImage height={150} userData={profileData} hasBorder={true} />
            <Typography variant="username">{profileData.username}</Typography>
            <Typography variant="body2">
              <RiCake2Fill /> <span />
              Member since {formatDate(profileData.createdAt)}
            </Typography>
            <Typography variant="subtitle1">{profileData.bio}</Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
// to call <UserProfile profileId={profileId} loggedInUsernme={loggedInUsernme} />
export default UserProfile;
