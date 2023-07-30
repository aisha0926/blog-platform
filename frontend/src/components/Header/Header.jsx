import React from "react";
import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
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
} from "@mui/material";
import { Button } from "@mui/material";
import { MdSearch, MdMenu } from "react-icons/md";
import { Stack } from "@mui/system";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledLogo,
} from "./headerStyle.js";
import AvatarImage from "../Avatar/AvatarImage.jsx";
import { handleDeactivateAPI } from "./handleDeactivateAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import ConfirmationDialog from "../Confirmation Dialog/ConfirmationDialog.jsx";

function Header(isLoggedIn) {
  const { authToken, logout, userData } = useContext(AuthContext); // get userData from token
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      // navigate("/);
      localStorage.removeItem("token");
      window.location.reload(true);
      logout();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to deactivate");
    }
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const toggMobileMenuOpen = (event) => {
    setShowMobileMenu(event.currentTarget);
  };

  const toggMobileMenuClose = () => {
    setShowMobileMenu(null);
  };

  const toggleAvatarMenuOpen = (event) => {
    setShowAvatarMenu(event.currentTarget);
  };

  const toggleAvatarMenuClose = () => {
    setShowAvatarMenu(null);
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

          <StyledLogo src="/assets/logo.png" />

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
            {authToken ? (
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
                >
                  Login
                </Button>
                <Button color="inherit" size="medium" variant="outlined">
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
      <Menu
        anchorEl={showMobileMenu}
        open={Boolean(showMobileMenu)}
        onClose={toggMobileMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList dense>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              {" "}
              <MenuItem onClick={toggMobileMenuClose}>Login</MenuItem>
              <MenuItem onClick={toggMobileMenuClose}>Register</MenuItem>
              <Divider />
            </>
          )}
          <MenuItem onClick={toggMobileMenuClose}>Tag1</MenuItem>
          <MenuItem onClick={toggMobileMenuClose}>Tag2</MenuItem>
          <MenuItem onClick={toggMobileMenuClose}>Tag3</MenuItem>
          <MenuItem onClick={toggMobileMenuClose}>Tag4</MenuItem>
        </MenuList>
      </Menu>
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
          <MenuItem onClick={toggleAvatarMenuClose}>View Profile</MenuItem>
          <MenuItem onClick={toggleAvatarMenuClose}>Edit Profile</MenuItem>
          <MenuItem onClick={toggleAvatarMenuClose}>Private Posts</MenuItem>
          <MenuItem onClick={toggleAvatarMenuClose}>Public Posts</MenuItem>
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
              toggleAvatarMenuClose();
              logout();
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
