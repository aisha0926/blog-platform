import React from "react";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

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
        <Tab value="Relevant" label="Relevant" />
        <Tab value="Latest" label="Latest" />
        <Tab value="Top" label="Top" />
      </Tabs>
    </Box>
  );
}

export default Navbar;
