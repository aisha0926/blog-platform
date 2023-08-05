import { useState, useEffect } from "react";
import "./Styles.css";
import { Box, Typography, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import AvatarImage from "../components/Avatar/AvatarImage";
import { RiCake2Fill } from "react-icons/ri";
import { fetchUserMeData } from "../components/Header/fetchUserMeData";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function UserProfileMe() {
  // const [profileData, setProfileData] = useState({});
  // const [authToken, setAuthToken] = useState(() =>
  //   localStorage.getItem("token")
  // );

  // useEffect(() => {
  //   // Make an API call to your backend to fetch the user profile data using authToken
  //   // Set the fetched data in the state variable (profileData)

  //   // Check for the authToken in localStorage on component mount
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setAuthToken(storedToken);
  //     const fetchUserData = async () => {
  //       const user = await fetchUserMeData(storedToken);
  //       if (user) {
  //         setProfileData(user);
  //       }
  //     };
  //     fetchUserData();
  //   }
  // }, []);
  const { authToken, userData } = useContext(AuthContext);

  const isLoggedIn = !!authToken;

  //Format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Invalid date string, return a default value or handle the error gracefully
        return "Invalid Date";
      }
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date"; // Handle error
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "70px" }}>
      {isLoggedIn ? (
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
            backgroundColor: "whitesmoke",
          }}
        >
          <Button
            color="inherit"
            size="small"
            variant="contained"
            placement="right-start"
            component={Link}
            to="/editProfile"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              // marginTop: "-10px", // Adjust this value to fine-tune the button's position
            }}
          >
            Edit Profile
          </Button>

          <Stack direction="column" spacing={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AvatarImage height={150} userData={userData} hasBorder={true} />
              <Typography variant="username">
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body2">
                <RiCake2Fill /> <span />
                Member since {formatDate(userData.createdAt)}
              </Typography>
              <Typography variant="subtitle1">{userData.bio}</Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Typography variant="h1">Page Not Found</Typography>
      )}
    </Container>
  );
}

export default UserProfileMe;
