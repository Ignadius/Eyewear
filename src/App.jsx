import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AppCanvas from "./components/AppCanvas";
import Box from "@mui/material/Box";
import styles from "./components/css/styles.module.css";
import background1 from "./components/backgrounds/background.jpg";
import background2 from "./components/backgrounds/background2.jpg";
import background3 from "./components/backgrounds/background3.jpg";
import background4 from "./components/backgrounds/background4.jpg";

export default function Demo() {
   // Store all available backgrounds
  const backgrounds = [
    background1,
    background2,
    background3,
    background4,
  ];

  // Track which background is currently selected
  const [selected, setSelected] = useState(0);

  // Cycle through backgrounds when button is clicked
  const handleBackground = () => {
    setSelected((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <Box
      className={styles.root}

      // Dynamically update background image
      style={{
        backgroundImage: `url(${backgrounds[selected]})`,
      }}
    >

      {/* Change background button */}
      <Button
        variant="contained"
        onClick={handleBackground}
      >
        Change background
      </Button>

      {/* Page title */}
      <Typography className={styles.title}>
        Try on your favourite sunglasses
      </Typography>

      {/* Virtual Try-On component */}
      <AppCanvas />
    </Box>
  );
}
