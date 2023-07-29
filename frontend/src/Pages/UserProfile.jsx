import { Box, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import AvatarImage from "../components/Avatar/AvatarImage";

function UserProfile() {
  const profileData = {
    username: "JohnDoe",
    lastName: "Doe",
    firstName: "John",
    bio: "Web Developer  .",
    createdDate: "2023-07-28",
    avatar: "https://one1onehomeschooling.co.uk/images/female-avatar.jpg",
    userId: "userId123",
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
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
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
