import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  List,
  // Slide,
  Toolbar,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import { Button } from "@mui/material";
// import { MdSearch, MdLink } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { AiOutlineHome, AiOutlineTags, AiOutlineBulb } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { Stack } from "@mui/system";
import {
  // Search,
  // SearchIconWrapper,
  // StyledInputBase,
  StyledLogo,
} from "./headerStyle.js";
import AvatarImage from "../Avatar/AvatarImage.jsx";
import { handleDeactivateAPI } from "./handleDeactivateAPI.js";
// import { fetchUserMeData } from "./fetchUserMeData.js";
import ConfirmationDialog from "../Confirmation Dialog/ConfirmationDialog.jsx";
import { AuthContext } from "../../Context/AuthContext.jsx";

function Header() {
  // const [authToken, setAuthToken] = useState(() =>
  //   localStorage.getItem("token")
  // );
  // const [userData, setUserData] = useState(null);
  // const [showSearchBox, setShowSearchBox] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { authToken, logout, userData } = useContext(AuthContext);

  // useEffect(() => {
  //   // Check for the authToken in localStorage on component mount
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setAuthToken(storedToken);
  //     const fetchUserData = async () => {
  //       const user = await fetchUserMeData(storedToken);
  //       if (user) {
  //         setUserData(user);
  //       }
  //     };
  //     fetchUserData();
  //   }
  // }, []);

  const isLoggedIn = !!authToken;

  const handleDeactivateConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDeactivate = async () => {
    // Call the backend API to handle account deactivation
    try {
      await handleDeactivateAPI(authToken);
      alert("Your account is now deactivated");
      setShowConfirmation(false);
      // setLoggedIn(false);
      // navigate("/");
      localStorage.removeItem("token");
      window.location.reload(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to deactivate");
    }
  };

  // const toggleSearchBox = () => {
  //   setShowSearchBox(!showSearchBox);
  // };

  const toggMobileMenuOpen = () => {
    setIsDrawerOpen(true);
  };

  const toggMobileMenuClose = () => {
    setIsDrawerOpen(false);
  };

  const toggleAvatarMenuOpen = (event) => {
    setShowAvatarMenu(event.currentTarget);
  };

  const toggleAvatarMenuClose = () => {
    setShowAvatarMenu(null);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/"; // Redirect to the home page
  // };

  const avatarMenuItems = [
    { to: "/profile", text: "View Profile" },
    { to: "/editprofile", text: "Edit Profile" },
    { to: "/user/privateposts", text: "Private Posts" },
    { to: "/user/publicposts", text: "Public Posts" },
  ];
  const logoutMenuItems = [
    {
      text: "Deactivate Account",
      onClick: () => {
        toggleAvatarMenuClose();
        handleDeactivateConfirmation();
      },
    },
    {
      text: "Logout",
      onClick: () => {
        toggleAvatarMenuClose();
        logout();
      },
    },
  ];

  const loginMobileItem = [
    {
      text: "Login",
      to: "/login",
    },
    {
      text: "Register",
      to: "/register",
    },
  ];

  const mobileMenuItems = [
    { to: "/", text: "Home", icon: <AiOutlineHome /> },
    { to: "/tags", text: "Tags", icon: <AiOutlineTags /> },
    { to: "/FAQ", text: "FAQ", icon: <AiOutlineBulb /> },
    { to: "/about", text: "About", icon: <GrCircleInformation /> },
  ];
  return (
    <>
      <AppBar sx={{ backgroundColor: "#2D4356" }}>
        <Toolbar>
          {/*Mobile Navigation with hamburger icon */}
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" }, marginRight: "5px" }}
            onClick={toggMobileMenuOpen}
          >
            <MdMenu />
          </IconButton>

          {/*Logo*wrap this in Link*/}
          <Link to="/">
            <StyledLogo src="/assets/logo.png" alt="PostIT" />
          </Link>

          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, marginRight: "10px" }}
          ></Typography>

          {/* Search Icon */}
          {/* <IconButton
            color="inherit"
            arial-label="search"
            sx={{
              display: { xs: "block", sm: "none" },
              marginLeft: "auto",
            }}
            onClick={toggleSearchBox}
          >
            <MdSearch />
          </IconButton> */}

          {/*Search box */}
          {/* <Search
            showSearchBox={showSearchBox}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <SearchIconWrapper>
              <MdSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}

          <Stack spacing={1} direction="row">
            {isLoggedIn ? (
              <>
                {/* Display user avatar and menu */}
                <Button
                  color="inherit"
                  size="medium"
                  variant="outlined"
                  component={Link}
                  to="/create"
                >
                  Create Post
                </Button>
                <div
                  onClick={toggleAvatarMenuOpen}
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage
                    height={45}
                    userData={userData}
                    hasBorder={false}
                  />
                </div>
              </>
            ) : (
              <>
                {/*Login and Register buttons */}

                <Button
                  color="inherit"
                  size="medium"
                  variant="text"
                  sx={{ display: { xs: "none", sm: "block" } }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>

                <Button
                  color="inherit"
                  size="medium"
                  variant="outlined"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Search box */}
      {/* <Slide direction="down" in={showSearchBox} mountOnEnter unmountOnExit>
        <div
          style={{
            position: "fixed",
            top: "64px",
            right: "0",
            left: "0",
            zIndex: "99",
          }}
        >
          <Search
            showSearchBox={showSearchBox}
            sx={{ display: { sm: "none" } }}
          >
            <SearchIconWrapper>
              <MdSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
      </Slide> */}
      {/*Menu for mobile*/}
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggMobileMenuClose}
        onOpen={toggMobileMenuOpen}
        PaperProps={{
          sx: { width: "50vw" },
        }}
      >
        {/* Mobile menu items */}
        <List dense>
          <Typography variant="h6">
            <span> &nbsp;</span>
            DEV Community{" "}
          </Typography>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              {" "}
              {loginMobileItem.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={toggMobileMenuClose}
                  component={Link}
                  to={item.to}
                  color="inherit"
                >
                  {item.text}
                </MenuItem>
              ))}
              <Divider />
            </>
          )}
          {/* Create an array of MenuItems */}
          {mobileMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={toggMobileMenuClose}
              component={Link}
              to={item.to}
              color="inherit"
            >
              {item.icon} <span> &nbsp;&nbsp;</span>
              {item.text}
            </MenuItem>
          ))}
          <Divider />
        </List>
      </SwipeableDrawer>

      {/*Menu for avatar*/}

      <Menu
        anchorEl={showAvatarMenu}
        open={Boolean(showAvatarMenu)}
        onClose={toggleAvatarMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* Create an array of MenuItems without wrapping in Fragment */}
        {avatarMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={toggleAvatarMenuClose}
            component={Link}
            to={item.to}
            color="inherit"
          >
            {item.text}
          </MenuItem>
        ))}

        <Divider />

        {/* Create an array of MenuItems without wrapping in Fragment */}
        {logoutMenuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>

      {/* Custom confirmation dialog */}
      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDeactivate}
        message="Are you sure you want to deactivate your account?"
      />
    </>
  );
}

export default Header;
