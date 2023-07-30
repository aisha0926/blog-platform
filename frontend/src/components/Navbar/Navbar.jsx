import React from "react";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const [value, setValue] = useState("Relevant");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="Relevant"
          label="Relevant"
          to="/relevant"
          component={Link}
        />
        <Tab value="Latest" label="Latest" to="/latest" component={Link} />
        <Tab value="Top" label="Top" to="/top" component={Link} />
      </Tabs>
    </Box>
  );
}

export default Navbar;
