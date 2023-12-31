import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Toolbar,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import { Button } from "@mui/material";
import { MdSearch, MdMenu } from "react-icons/md";
import { AiOutlineHome, AiOutlineTags, AiOutlineBulb } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { Stack } from "@mui/system";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledLogo,
} from "./headerStyle.js";
import AvatarImage from "../Avatar/AvatarImage.jsx";
import { handleDeactivateAPI } from "./handleDeactivateAPI.js";
import ConfirmationDialog from "../Confirmation Dialog/ConfirmationDialog.jsx";

function Header() {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [userData, setUserData] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Check for the authToken in localStorage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
      const fetchUserData = async () => {
        try {
          const userDataResponse = await fetch(
            "http://localhost:4000/api/v1/user/me",
            {
              method: "GET",
              headers: {
                authorization: "Bearer " + storedToken,
                "Content-Type": "application/json",
              },
            }
          );
          const user = await userDataResponse.json();
          setUserData(user.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchUserData();
    }
  }, []);

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

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <React.Fragment>
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

          <StyledLogo src="/assets/logo.png" alt="PostIT" />

          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, marginRight: "10px" }}
          ></Typography>

          {/* Search Icon*/}
          <IconButton
            color="inherit"
            arial-label="search"
            sx={{
              display: { xs: "block", sm: "none" },
              marginLeft: "auto",
            }}
            onClick={toggleSearchBox}
          >
            <MdSearch />
          </IconButton>

          {/*Search box */}
          <Search
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
          </Search>

          <Stack spacing={1} direction="row">
            {isLoggedIn ? (
              <>
                {/* Display user avatar and menu */}
                <div
                  onClick={toggleAvatarMenuOpen}
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage
                    height={40}
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
      <Slide direction="down" in={showSearchBox} mountOnEnter unmountOnExit>
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
      </Slide>

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
        <MenuList dense>
          <Typography variant="h6">
            <span> &nbsp;</span>
            DEV Community{" "}
          </Typography>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              {" "}
              <MenuItem
                onClick={toggMobileMenuClose}
                component={Link}
                to="/login"
                color="inherit"
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={toggMobileMenuClose}
                component={Link}
                to="/register"
                color="inherit"
              >
                Register
              </MenuItem>
              <Divider />
            </>
          )}
          {/* Create an array of MenuItems */}
          {[
            { to: "/", text: "Home", icon: <AiOutlineHome /> },
            { to: "/tags", text: "Tags", icon: <AiOutlineTags /> },
            { to: "/FAQ", text: "FAQ", icon: <AiOutlineBulb /> },
            { to: "/about", text: "About", icon: <GrCircleInformation /> },
          ].map((item, index) => (
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
        </MenuList>
      </SwipeableDrawer>

      {/*Menu for avatar*/}
      <Menu
        anchorEl={showAvatarMenu}
        open={Boolean(showAvatarMenu)}
        onClose={toggleAvatarMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList dense>
          <MenuItem
            onClick={toggleAvatarMenuClose}
            component={Link}
            to="/profile"
            color="inherit"
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={toggleAvatarMenuClose}
            component={Link}
            to="/editprofile"
            color="inherit"
          >
            Edit Profile
          </MenuItem>
          <MenuItem
            onClick={toggleAvatarMenuClose}
            component={Link}
            to="/user/privateposts"
            color="inherit"
          >
            Private Posts
          </MenuItem>
          <MenuItem
            onClick={toggleAvatarMenuClose}
            component={Link}
            to="/user/publicposts"
            color="inherit"
          >
            Public Posts
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              toggleAvatarMenuClose();
              handleDeactivateConfirmation();
            }}
          >
            Deactivate Account
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Custom confirmation dialog */}
      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDeactivate}
        message="Are you sure you want to deactivate your account?"
      />
    </React.Fragment>
  );
}

export default Header;
