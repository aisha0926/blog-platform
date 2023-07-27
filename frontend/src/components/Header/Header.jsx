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
  const isLoggedIn = true;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };
  const toggMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const userData = {
    firstName: "Grace",
    lastName: "Sy",
    avatar: "imageUploads\\1690455835879-53414882.png",
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
            DAG
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
                {" "}
                <AvatarImage height={40} userData={userData} />
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
    </React.Fragment>
  );
}

export default Header;
