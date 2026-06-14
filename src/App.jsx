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
  const backgrounds = [background1, background2, background3, background4];
  const [selected, setSelected] = useState(0);

  const handleBackground = () => {
    setSelected((prev) => (prev + 1) % backgrounds.length);
  }; //This automatically loops through all backgrounds.

  return (
    <Box
      className={styles.root}
      style={{ backgroundImage: `url(${backgrounds[selected]})` }}
    >
      <Button
        variant="contained"
        style={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}
        onClick={handleBackground}
      >
        Change background
      </Button>
      <div style={{ flex: 1 }} />
      <Typography className={styles.title}>
        Try on your favourite sunglasses
      </Typography>
      <div style={{ flex: 1 }} />
      <AppCanvas />
      <div style={{ flex: 1 }} />
    </Box>
  );
}
