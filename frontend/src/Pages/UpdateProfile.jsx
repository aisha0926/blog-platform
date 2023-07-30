import React from "react";
import { useState } from "react";
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

function UpdateProfile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

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

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      //Fetch backend to updateProfile

      //Create a FormData object to send the form data including the new avatar
      const data = new FormData();
      for (let avatar in formData) {
        data.append(avatar, selectedFile);
      }
    } catch (error) {
      console.log("Error updating profile", error.message);
    }
  };

  //Avatar Preview
  const avatarPreview = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <Container component="main" maxWidth="lg">
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
                  width: 100,
                  height: 100,
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
            <Button
              variant="text"
              onClick={handleClearFile}
              sx={{ marginBottom: 2 }}
              size="medium"
            >
              Clear
            </Button>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="outlined-uncontrolled"
            label="First Name"
            defaultValue="foo"
          />

          <TextField
            margin="normal"
            fullWidth
            id="outlined-uncontrolled"
            label="Last Name"
            defaultValue="foo"
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="outlined-uncontrolled"
            label="Email"
            defaultValue="foo"
            onChange={handleChange}
            type="email"
          />

          <TextField
            margin="normal"
            fullWidth
            id="outlined-uncontrolled"
            label="Username"
            defaultValue="foo"
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            id="bio"
            label="Bio"
            multiline
            fullWidth
            rows={5}
            defaultValue="Default Value"
            onChange={handleChange}
          />

          <Grid container justifyContent="center">
            <Stack direction="row" spacing={10}>
              {" "}
              <Button variant="contained" type="submit" size="medium">
                Update
              </Button>
              <Button
                variant="text"
                type="submit"
                color="inherit"
                size="medium"
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default UpdateProfile;
