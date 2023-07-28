import React from "react";
import { useState } from "react";
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
import { Search, SearchIconWrapper, StyledInputBase } from "./headerStyle.js";
import AvatarImage from "../Avatar/AvatarImage.jsx";

function Header() {
  // for testing
  const isLoggedIn = true;
  //for testing
  const userData = {
    firstName: "Grace",
    lastName: "Sy",
    // avatar: "imageUploads\\1690421783247-661998272.png",
    // "https://cdn2.f-cdn.com\\contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
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
            sx={{ display: { sm: "none" }, marginRight: "10px" }}
            onClick={toggMobileMenuOpen}
          >
            <MdMenu />
          </IconButton>

          {/*Logo*/}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginRight: "10px" }}
          >
            BitBlog
          </Typography>

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
          <Search sx={{ display: { sm: "none" } }}>
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
