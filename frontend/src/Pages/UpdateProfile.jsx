import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";
// import { fetchUserMeData } from "../components/Header/fetchUserMeData";
import { uploadImage } from "../Helper/uploadImages";
import { AuthContext } from "../Context/AuthContext";

function UpdateProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    avatar: "",
  });
  // const [profileData, setProfileData] = useState({});

  const { authToken, userData } = useContext(AuthContext);

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

  const isLoggedIn = !!authToken;

  const handleFileChange = (e) => {
    setSelectedFile(e.currentTarget.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      bio: userData.bio,
      avatar: userData.avatar,
    });
    setSelectedFile(null);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Fetch backend to updateProfile
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("bio", formData.bio);

      // Check if a new avatar is selected and save it first before updating the profile
      if (selectedFile) {
        const avatarLink = await uploadImage(selectedFile);
        data.append("avatar", avatarLink.url[0]);
      }

      const response = await fetch(
        "http://localhost:4000/api/v1/user/updateProfile",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken,
          },
          body: data,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Profile update successful", responseData);
        alert("Profile update successful");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Profile update failed: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  //Avatar Preview
  const avatarPreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : userData?.avatar || "";

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: "70px" }}>
      {isLoggedIn ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              border: "1px solid #ccc", // Border for the form field
              borderRadius: 5, // Rounded corners for the form field
              padding: 5, // Padding inside the form field
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)", // Shadow for the form field
            }}
          >
            {/* Avatar preview */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {avatarPreview && (
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  sx={{
                    width: 180,
                    height: 180,
                    marginBottom: 3,
                    border: "2px solid #ccc",
                  }}
                />
              )}
            </Box>

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="avatarInput"
              onChange={handleFileChange}
            />
            <label htmlFor="avatarInput">
              <Button
                variant="outlined"
                component="span"
                sx={{ marginBottom: 2 }}
                size="medium"
              >
                Change Avatar
              </Button>
            </label>
            {selectedFile && (
              <>
                <Button
                  variant="text"
                  onClick={handleClearFile}
                  sx={{ marginBottom: 2 }}
                  size="medium"
                >
                  Clear
                </Button>
              </>
            )}

            <TextField
              margin="normal"
              variant="standard"
              id="outlined-firstName"
              label="First Name"
              name="firstName"
              fullWidth
              multiline
              defaultValue={userData.firstName}
              onChange={handleChange}
              placeholder="Enter your First Name"
              InputLabelProps={{
                shrink: true,
                style: {
                  position: "absolute",
                  top: -10,
                  background: "#FFF",
                  paddingRight: 5,
                },
              }}
            />
            <TextField
              margin="normal"
              variant="standard"
              id="outlined-lastName"
              label="Last Name"
              name="lastName"
              fullWidth
              multiline
              defaultValue={userData.lastName}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              InputLabelProps={{
                shrink: true,
                style: {
                  position: "absolute",
                  top: -10,
                  background: "#FFF",
                  paddingRight: 5,
                },
              }}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="outlined-email"
              label="Email"
              name="email"
              type="email"
              multiline
              fullWidth
              defaultValue={userData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              InputLabelProps={{
                shrink: true,
                style: {
                  position: "absolute",
                  top: -10,
                  background: "#FFF",
                  paddingRight: 5,
                },
              }}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="outlined-bio"
              label="Bio"
              name="bio"
              multiline
              fullWidth
              rows={5}
              defaultValue={userData.bio}
              onChange={handleChange}
              placeholder="Introduce yourself"
              InputLabelProps={{
                shrink: true,
                style: {
                  position: "absolute",
                  top: -10,
                  background: "#FFF",
                  paddingRight: 5,
                },
              }}
            />

            <Grid container justifyContent="center">
              <Stack direction="row" spacing={10}>
                {" "}
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="medium"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Typography variant="h1">Page Not Found</Typography>
      )}
    </Container>
  );
}

export default UpdateProfile;
