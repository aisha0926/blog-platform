import React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { MdSearch, MdMenu } from "react-icons/md";
import { Stack } from "@mui/system";
import { Search, SearchIconWrapper, StyledInputBase } from "./headerStyle.js";

function Header() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };
  const toggMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
            onClick={toggMobileMenu}
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
    </React.Fragment>
  );
}

export default Header;
