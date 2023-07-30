import React from "react";
import { useState } from "react";
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

function Header() {
  // for testing
  const isLoggedIn = true;
  //for testing
  const userData = {
    _id: "64c2458551211926a8d2d685",
    username: "test",
    email: "test03@gmail.com",
    password: "$2b$10$zL444Y/6JdZo6OhzPOk2r.ip1kOl7QBako3Gbi2.S2ytkFIksKIMm",
    firstName: "test03",
    lastName: "test03",
    status: "active",
    deletedAt: null,
    createdAt: "2023-07-27T10:23:01.127Z",
    updatedAt: "2023-07-30T00:16:37.561Z",
    avatar:
      "https://res.cloudinary.com/dbgtb8axp/image/upload/v1690676197/blog/bnj5fuehmurudwyg0nay.jpg",
    bio: "hello this is a test6",
  };

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(null);

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

          {/*Login and Register buttons */}
          <Stack spacing={1} direction="row">
            {isLoggedIn ? (
              <>
                <div
                  onClick={toggleAvatarMenuOpen}
                  style={{ cursor: "pointer" }}
                >
                  <AvatarImage height={40} userData={userData} />
                </div>
              </>
            ) : (
              <>
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
          <MenuItem onClick={toggleAvatarMenuClose}>
            Deactivate Account
          </MenuItem>
          <MenuItem onClick={toggleAvatarMenuClose}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

export default Header;
